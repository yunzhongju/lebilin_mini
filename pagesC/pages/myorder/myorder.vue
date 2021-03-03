<template>
	<view class="my-order">
		<!-- tab-title -->
		<view class="tab-title">
			<view class="title-item" v-for="(item,index) in tabArr" :key="index" @click="changeActiveIndex(index)">
				<text class="title" :class="{active:activeIndex == index}">{{ item }}</text>
				<text class="bottom-line" v-show='activeIndex == index'></text>
			</view>
		</view>

		<!-- tab-content -->
		<view class="tab-content">

			<view class="item" v-for="(item,index) in orderArr" :key="index">
				<view class="shop-name" @click="pageToOrderDetail(item.orderId)">
					<image v-if="item.thumbnail" :src="item.thumbnail" mode=""></image>
					<image v-else src="/static/home_icon/store_logo.png" mode=""></image>
					<text>{{ item.storeName }}</text>
				</view>
				<view class="order-state" @click="pageToOrderDetail(item.orderId)">
					<text class="order">订单号：{{ item.orderSn }}</text>
					<text class="state">{{ statusArr[index] }}</text>
				</view>

				<view class="order-detail" v-for="(goods,i) in item.orderGoods" :key="i"  @click="pageToOrderDetail(item.orderId)">
					<image class="left" :src="state.baseUrl + goods.picture" mode=""></image>
					<view class="right">
						<view class="name">
							<text class="name-title">{{ goods.productName }}</text>
							<text class="price">￥{{ goods.unitPrice }}元</text>
						</view>

						<view class="count">
							<text class="intru">{{ goods.depict }}</text>
							<text class="cou">-{{ goods.unitIntegeral }}分</text>
						</view>

						<view class="tag-integral">
							<text class="integral">X{{ goods.quantity }}</text>
						</view>

					</view>
				</view>

				<view class="order-time"  @click="pageToOrderDetail(item.orderId)">
					<text class="time">下单时间：{{ item.createtime }}</text>
					<text class="total">共{{ item.toatalQuantity }}件商品&nbsp;&nbsp; 合计￥{{ item.fee }}元</text>
				</view>
				<view class="bottom-btns">
					<text v-if="item.orderStatus=='order_dfk'" @click="pageToToPay(item.orderSn,item.fee)">去支付</text>
					<text v-if="item.orderStatus=='order_dzt' || item.orderStatus=='order_dps'" @click.stop="applyReFound(index,item.orderId)">申请退款</text>
					<text v-if="item.orderStatus=='order_dfk' || item.orderStatus=='order_ywc' || item.orderStatus=='order_ytk'" @click.stop="deleteOrder(item.orderId,index)">删除订单</text>
					<text @click="makePhone(item.phonenum)">联系卖家</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import OrderApi from '@/servies/OrderApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				tabArr: ['全部订单', '待支付', '待自提', '待配送', '已完成'],
				stateArr: ['', 'order_dfk', 'order_dzt', 'order_dps', 'order_ywc'],
				activeIndex: 0,
				pageNo: 1,
				allowPull: false, //允许上拉加载更多
				orderArr: [], //订单列表

			};
		},
		methods: {
			pageToToPay(orderSn,fee){
				uni.navigateTo({
					url:'/pagesC/pages/topay/topay?orderSn=' + orderSn + '&fee=' + fee
				})
			},
			makePhone(phoneNumber){
				uni.makePhoneCall({
					phoneNumber
				})
			},
			applyReFound(index,orderId) { //申请退款
				let _this = this
				uni.showModal({
					title: '提示',
					content: '退款金额将按原路返回，确定退款吗?',
					success(res) {
						if (res.confirm) {
							OrderApi.orderRefound({
								orderId
							}, res => {
								if (res.status == 1) {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
									
									_this.changeActiveIndex(4)
									
								}
							})
						}
					}
				})

			},
			deleteOrder(orderId, index) { //删除订单
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否确认删除订单',
					success(res) {
						if (res.confirm) {
							OrderApi.deleteOrder({
								orderId
							}, res => {
								if (res.status == 1) {
									_this.orderArr.splice(index, 1)
								}
							})
						}
					}
				})
			},
			pageToOrderDetail(orderId) {
				uni.navigateTo({
					url: '/pagesC/pages/orderdetail/orderdetail?orderId=' + orderId
				})
			},
			getOrderList(type = 'one') { //获取订单列表
				OrderApi.getOrderList({
					orderStatus: this.stateArr[this.activeIndex] ? this.stateArr[this.activeIndex] : '',
					pageSize: 6,
					pageNo: this.pageNo
				}, res => {
					console.log('订单列表', res)
					if (type == 'one') { //第一页
						this.orderArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.orderArr = [...this.orderArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			changeActiveIndex(index) {
				if (this.activeIndex != index) {
					this.activeIndex = index
					this.pageNo = 1
					this.getOrderList()
				}
			}
		},
		computed: {
			statusArr() {
				if (this.orderArr.length == 0) return []
				let newArr = []
				for (let i = 0; i < this.orderArr.length; i++) {
					newArr.push(this.orderArr[i].orderStatus)
				}
				return newArr.map(item => {
					if (item == 'order_dps') return '待配送'
					if (item == 'order_dfk') return '待支付'
					if (item == 'order_dzt') return '待自提'
					if (item == 'order_ywc') return '已完成'
					if (item == 'order_ytk') return '已退款'
				})
			}
		},
		onLoad(options) {
			this.activeIndex = options.index || 0
			this.getOrderList() //获取订单列表
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getOrderList()
		},
		onReachBottom() { // 上拉加载更多
			if (this.allowPull) {
				this.pageNo++
				this.getOrderList('more')
			}
		}
	}
</script>

<style lang="scss">
	.my-order {

		// tab-title
		.tab-title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20rpx;
			padding: 38rpx 32rpx 0 32rpx;

			.title-item {
				position: relative;

				.title {
					font-size: 30rpx;
					&.active{
						font-weight: bold;
						font-size: 34rpx;
					}
				}

				.state {
					width: 10rpx;
					height: 10rpx;
					background-color: #e62329;
					border-radius: 50%;
					position: absolute;
					right: -12rpx;
					top: 0rpx;
				}

				.bottom-line {
					position: absolute;
					width: 50%;
					height: 4rpx;
					background-color: #e62329;
					bottom: -10rpx;
					left: 25%;
				}
			}
		}

		//tab-content
		.tab-content {
			.item {
				padding: 0 32rpx 20rpx 32rpx;
				display: flex;
				flex-direction: column;
				border-bottom: 10rpx solid #efefef;

				.shop-name {
					display: flex;
					align-items: center;
					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 8rpx;
					}

					text {
						font-size: 30rpx;
						line-height: 80rpx;
						letter-spacing: 3rpx;
					}
				}

				.order-state {
					display: flex;
					justify-content: space-between;

					.order {
						font-size: 25rpx;
						line-height: 30rpx;
					}

					.state {
						font-size: 25rpx;
						line-height: 30rpx;
						color: #e62329;
						font-weight: bold;
					}
				}

				.order-detail {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.left {
						width: 152rpx;
						height: 141rpx;
						margin-right: 16rpx;
					}

					.right {
						flex: 1;
						display: flex;
						flex-direction: column;

						.name {
							display: flex;
							justify-content: space-between;

							.name-title {
								font-size: 30rpx;
								letter-spacing: 3rpx;
								line-height: 57rpx;
								width: 310rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.price {
								font-size: 25rpx;
								letter-spacing: 3rpx;
								line-height: 57rpx;
							}
						}

						.count {
							display: flex;
							justify-content: space-between;

							.intru {
								letter-spacing: 3rpx;
								color: #9e9e9e;
								font-size: 25rpx;
								line-height: 57rpx;
								width: 310rpx;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
							}

							.cou {
								font-size: 25rpx;
								letter-spacing: 3rpx;
								line-height: 57rpx;
							}
						}

						.tag-integral {
							display: flex;
							flex-direction: row-reverse;

							.integral {
								font-size: 25rpx;
								letter-spacing: 3rpx;
								line-height: 57rpx;
							}
						}
					}
				}

				.order-time {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time {
						font-size: 20rpx;
						line-height: 57rpx;
						color: #9fa0a0;
					}

					.total {
						line-height: 57rpx;
						font-size: 25rpx;
					}
				}

				.note {
					font-size: 25rpx;
					letter-spacing: 3rpx;
					color: #ff2f29;
					line-height: 57rpx;
				}

				.bottom-btns {
					display: flex;
					justify-content: flex-end;
					font-size: 20rpx;

					text {
						border: 1rpx solid #d2d2d2;
						padding: 4rpx 10rpx;
						border-radius: 10rpx;
						margin-left: 10rpx;
					}
				}

			}
		}
	}
</style>
