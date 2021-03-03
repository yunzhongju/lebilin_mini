<template>
	<view class="store-order">
		<!-- tab-title -->
		<view class="tab-title">
			<view class="title-item" v-for="(item,index) in tabArr" :key="index" @click="changeActiveIndex(index)">
				<text class="title" :class="{active:activeIndex == index}">{{ item }}</text>
				<text class="bottom-line" v-show='activeIndex == index'></text>
			</view>
		</view>

		<!-- tab-content -->
		<view class="tab-content">
			
			<view class="item" v-for="(item,index) in orderArr" :key="index" @click="pageToOrderDetail(item.orderId,true)">
				<view class="order-state">
					<text class="order">订单号：{{ item.ordersn }}</text>
					<text class="state" v-if="item.orderStatus == 'order_dps'">待配送</text>
					<text class="state" v-if="item.orderStatus == 'order_dzt'">待自提</text>
					<text class="state" v-if="item.orderStatus == 'order_ywc'">已完成</text>
					<text class="state" v-if="item.orderStatus == 'order_ytk'">已退款</text>
				</view>
				
				<view class="order-detail" v-for="(i,dex) in item.orderGoods" :key="dex">
					<image class="left" :src="state.baseUrl + i.picture" mode=""></image>
					<view class="right">
						<view class="name">
							<text class="name-title">{{ i.productName }}</text>
							<text class="price">￥{{ i.unitPrice }}元</text>
						</view>

						<view class="count">
							<text class="intru">{{ i.depict }}</text>
							<text class="integral" v-if="i.integral">-{{ i.integral }}分</text>
						</view>

						<view class="tag-integral">
							<text class="cou">X{{ i.quantity }}</text>
							
						</view>
					</view>
				</view>
				
				<view class="order-time">
					<text class="time">下单时间：{{ item.paytime }}</text>
					<text class="total">共{{ item.toatalQuantity }}件商品&nbsp;&nbsp; 合计￥{{ item.realpayAmount }}元</text>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import StoreApi from '@/servies/StoreApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state:store.state,
				tabArr: ['全部订单', '待配送', '待自提', '已完成'],
				orderStatusArr: ['', 'order_dps', 'order_dzt', 'order_ywc'],
				activeIndex: 0,
				storeId: '',
				orderArr: [], //订单列表
				allowPull: false,
				pageNo: 1
			};
		},
		methods: {
			pageToOrderDetail(orderId,isStore){
				uni.navigateTo({
					url:'/pagesC/pages/orderdetail/orderdetail?orderId=' + orderId +`&isStore=${isStore}`
				})
			},
			getStoreOrderList(type = 'one') { //获取店铺订单列表
				let paramsObj = {
					storeId: this.storeId,
					pageSize: 6,
					pageNo: this.pageNo
				}

				if (this.activeIndex != 0) {
					paramsObj.orderStatus = this.orderStatusArr[this.activeIndex]
				}

				StoreApi.getStoreOrderList(paramsObj, res => {
					if (type == 'one') {
						this.orderArr = res.list
						this.allowPull = !res.lastPage
					} else {
						this.orderArr = [...this.orderArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			changeActiveIndex(index) {
				if (this.activeIndex != index) {
					this.activeIndex = index
					this.pageNo = 1
					this.getStoreOrderList()
				}
			}
		},
		onLoad(options) {
			this.activeIndex = options.index || 0
			this.storeId = options.storeId || ''
			this.getStoreOrderList()
		},
		onReachBottom() {
			if( this.allowPull ){
				this.pageNo ++
				this.getStoreOrderList('more')
			}
		},
		onPullDownRefresh() {
			this.pageNo = 1
			this.getStoreOrderList()
		}
	}
</script>

<style lang="scss">
	.store-order {

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
				padding: 20rpx 32rpx;
				display: flex;
				flex-direction: column;
				border-bottom: 10rpx solid #efefef;

				.shop-name {
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
							.integral {
								font-size: 25rpx;
								letter-spacing: 3rpx;
								line-height: 57rpx;
							}

							
						}

						.tag-integral {
							display: flex;
							flex-direction: row-reverse;
							height: 57rpx;
							.tag {

								letter-spacing: 4rpx;
								color: #e62329;

								text {
									font-size: 20rpx;
									border: 1rpx solid #e62329;
									border-radius: 6rpx;
									margin-right: 6rpx;
									padding: 2rpx 4rpx;
								}
							}

							.cou {
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
