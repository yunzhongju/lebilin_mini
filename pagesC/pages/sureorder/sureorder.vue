<template>
	<view class="sure-order">
		<!-- 收货地址 -->
		<view class="shipping-address" v-if="confirmOrderInfo">
			<view class="left" v-if="state.orderAddress && state.orderAddress.detailAddress">
				<text class="title">收货地址</text>
				<text class="address">{{ state.orderAddress.gisDisplayAdd }}{{state.orderAddress.detailAddress}}</text>
				<view class="buyer-info">
					<text class="person">联系人：{{ state.orderAddress.consignee }}</text>
					<text class="tel">电话：{{ state.orderAddress.phonenum }}</text>
				</view>
			</view>
			<view class="right" @click="pageToChooseAddress" v-if="state.orderAddress && state.orderAddress.detailAddress">
				修改
			</view>
			
			<view class="left" v-if="!state.orderAddress">
				<text class="title">收货地址</text>
				<text class="address">暂无商家配送距离内的收货地址，快新增一个吧~</text>
			</view>
			<view class="right" @click="pageToChooseAddress" v-if="!state.orderAddress">
				新增
			</view>
		</view>

		<!-- 订单列表 -->
		<view class="order-list">
			<view class="store-name">
				{{ confirmOrderInfo.storeName }}
			</view>

			<view class="list-item">

				<view class="list-item-box" v-for="(item,index) in confirmOrderInfo.goods" :key="index">
					<view class="top-msg">
						<image class="goods-img" :src="state.baseUrl + item.picture" mode=""></image>
						<view class="goods-msg">
							<text class="title">{{ item.goodsName }}</text>
							<text class="detail-info">{{ item.depict }}</text>
							<view class="price-count">
								<text class="old-price">￥10.00元</text>
								<text class="price">￥{{ item.price }}元<text v-if="item.integral">+</text><text style="color: #3bb81e;" v-if="item.integral">{{ item.integral }}积分</text></text>
								<text class="count">x{{ item.quantity }}</text>
							</view>
							<text class="detail-info">{{ item.specification }}</text>
						</view>
					</view>


				</view>
			</view>

		</view>

		<!-- 底部固定栏 -->
		<view class="bottom-fixed">
			<view class="send-info">
				<text class="title">配送信息</text>
				<view class="choose-method">
					<view class="top">
						<view class="item" @click="changeSendMethod(true)">
							<image v-if="sendOrget" src="/pagesC/static/imgs/choose_now.png" mode=""></image>
							<image v-else src="/pagesC/static/imgs/choose_no.png" mode=""></image>
							<text>送货上门</text>
						</view>
						<view class="item" @click="changeSendMethod(false)">
							<image v-if="!sendOrget" src="/pagesC/static/imgs/choose_now.png" mode=""></image>
							<image v-else src="/pagesC/static/imgs/choose_no.png" mode=""></image>
							<text>到店自提</text>
						</view>
					</view>
					<view class="method-remarks" v-if="sendOrget">
						运费：￥{{ confirmOrderInfo.distributionFee }}元
					</view>
					<view class="method-remarks" v-else>
						<view>
							注：自提时间{{ confirmOrderInfo.businessTime }}
						</view>
					</view>
				</view>
			</view>

			<view class="send-info">
				<text class="title">自提地址</text>
				<view class="address">
					{{ confirmOrderInfo.storeAddress }}
				</view>
			</view>

			<view class="total">
				<text class="count">共{{ confirmOrderInfo.totalQuantity }}件商品</text>
			</view>
			<view class="bottom-pay">
				<text class="total">总价:¥{{ confirmOrderInfo.totalPrice }}元<text style="color: #000;" v-if="confirmOrderInfo.totalIntegral">+</text><text
					 v-if="confirmOrderInfo.totalIntegral">{{ confirmOrderInfo.totalIntegral }}积分</text></text>
				<text class="to-pay" @click="subOrder">提交订单</text>
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
				sendOrget: false, //配送true / 自提false
				distribution: null, //默认收货地址
				shopcar:'', //购物车标识
				confirmOrderInfo:null, // 订单信息
			};
		},
		methods: {
			subOrder(){ //提交订单
				if( !this.confirmOrderInfo || (this.confirmOrderInfo && !this.confirmOrderInfo.storeId) ){
					return uni.showToast({
						icon: "none",
						title: "订单信息不存在～",
						mask: true
					})
				}
				
				if( (this.sendOrget && !this.state.orderAddress) || (this.sendOrget && this.state.orderAddress) && !this.state.orderAddress.oid ){
					if( !this.state.confirmOrderInfo || (this.state.confirmOrderInfo && !this.state.confirmOrderInfo.storeId) ){
						return uni.showToast({
							icon: "none",
							title: "收货地址不存在～",
							mask: true
						})
					}
				}
				
				let paramsObj = {
					storeId:this.confirmOrderInfo.storeId,
					distributionWay:this.sendOrget ? 'store' : 'self',
					communityId:this.state.communityId
				}
				
				
				if( !this.shopcar ){// 直接购买
					paramsObj.specificationId = this.confirmOrderInfo.specificationId
					paramsObj.productId = this.confirmOrderInfo.productId
					paramsObj.quantity = this.confirmOrderInfo.totalQuantity
					if( this.confirmOrderInfo.isTuan ){
						paramsObj.isTuan = this.confirmOrderInfo.isTuan
					}
					if( this.confirmOrderInfo.hypdzjlid ){
						paramsObj.hypdzjlid = this.confirmOrderInfo.hypdzjlid
					}
				}else{// 购物车跳转
					paramsObj.shopId = this.confirmOrderInfo.shopId
				}
				
				if( this.sendOrget ){
					paramsObj.addressId = this.state.orderAddress.oid
				}
				
				console.log( 'paramsObj',paramsObj )
				
				OrderApi.submitOrder(paramsObj, res => {
					console.log( '提交订单',res )
					// store.state.orderSnInfo = res
					if( res && res.orderSn ){
						uni.redirectTo({
							url: "/pagesC/pages/topay/topay?orderSn=" + res.orderSn + '&fee=' + res.fee
						})
					}else{
						wx.showToast({ icon: "none", title: "获取签名错误～", mask: true });
					}
				})
			},
			pageToChooseAddress() {
				uni.navigateTo({
					url: '/pagesC/pages/chooseaddress/chooseaddress'
				})
			},
			pageToToPay() {
				
			},
			changeSendMethod(bool) {
				if (this.confirmOrderInfo.goodsType != 'gysplx_ptsp') {
					this.sendOrget = false
				} else {
					this.sendOrget = bool
				}

			}
		},
		onLoad(options) {
			let that = this
			this.shopcar = options.shopcar || ''
			this.confirmOrderInfo = JSON.parse(decodeURIComponent(options.confirmOrderInfo))
			if (that.confirmOrderInfo) {
				// 判断订单是否可配送
				OrderApi.isDistribution({
						addressId: "",
						storeId: that.confirmOrderInfo.storeId
					},
					data => {
						// 是否有地址
						console.log( '收货地址',data )
						if (data && data.isDistribution) {
							that.distribution = data.address;
							store.state.orderAddress = data.address;
						}
					}
				);
			}
		}
	}
</script>

<style lang="scss">
	.sure-order {

		// 收货地址
		.shipping-address {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			box-sizing: border-box;
			border-bottom: 10rpx solid #eee;

			.left {
				display: flex;
				flex-direction: column;
				width: 570rpx;

				.title {
					font-size: 30rpx;
					line-height: 60rpx;
					letter-spacing: 3rpx;
				}

				.address {
					font-size: 24rpx;
					line-height: 41rpx;
					letter-spacing: 2rpx;
					color: #696969;
				}

				.buyer-info {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.person,
					.tel {
						font-size: 25rpx;
						line-height: 60rpx;
						letter-spacing: 3rpx;
					}

				}
			}

			.right {
				width: 75rpx;
				height: 40rpx;
				background-color: #e62329;
				border-radius: 10rpx;
				letter-spacing: 2rpx;
				color: #ffffff;
				font-size: 24rpx;
				;
				line-height: 40rpx;
				text-align: center;
			}
		}

		// 订单列表 
		.order-list {
			margin-bottom: 300rpx;

			.store-name {
				font-size: 30rpx;
				text-indent: 30rpx;
				line-height: 80rpx;
				border-bottom: 1rpx solid #eee;
			}

			.list-item {
				// border-bottom: 6rpx solid #eee;
				padding: 40rpx 30rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;

				.top-msg {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 42rpx;

					.goods-img {
						width: 138rpx;
						height: 129rpx;
						margin-right: 16rpx;
					}

					.goods-msg {
						width: 520rpx;
						display: flex;
						flex-direction: column;

						.title {
							letter-spacing: 3rpx;
							font-size: 30rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.detail-info {
							font-size: 25rpx;
							letter-spacing: 3rpx;
							color: #a7a7a7;
							line-height: 40rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.price-count {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.old-price {
								font-size: 25rpx;
								letter-spacing: 3rpx;
								text-decoration: line-through;
								color: #999999;
								width: 160rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.price {
								flex: 1;
								margin-left: 20rpx;
								font-size: 25rpx;
								letter-spacing: 3rpx;
								color: #ff0022;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.count {
								font-size: 25rpx;
								letter-spacing: 3rpx;
							}
						}
					}
				}

				.intergral {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 12rpx;
					box-sizing: border-box;

					.need {
						font-size: 30rpx;
						line-height: 94rpx;
						letter-spacing: 3rpx;
					}

					.intergrals {
						line-height: 94rpx;
						font-size: 24rpx;
						letter-spacing: 2rpx;
					}
				}


				.order-remarks {
					padding: 0 12rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						margin-right: 20rpx;
						font-size: 30rpx;
						line-height: 94rpx;
						letter-spacing: 3rpx;
					}

					.white-remarks {
						flex: 1;
						line-height: 30rpx;
						letter-spacing: 2rpx;
						color: #9fa0a0;
						font-size: 24rpx;
					}
				}


			}
		}

		// 底部固定栏
		.bottom-fixed {

			position: fixed;
			width: 100%;
			height: 298rpx;
			border-top: 3rpx solid #eee;
			left: 0;
			bottom: 0;
			background-color: #fff;
			z-index: 200;
			box-sizing: border-box;
			padding: 20rpx 10rpx 0 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.send-info {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				padding: 0 12rpx;
				box-sizing: border-box;

				.title {
					font-size: 30rpx;
					// line-height: 94rpx;
					letter-spacing: 3rpx;
				}

				.address {
					font-size: 25rpx;
					flex: 1;
					margin-left: 36rpx;
				}

				.choose-method {
					margin-right: 134rpx;
					// width: 406rpx;
					display: flex;
					flex-direction: column;

					.top {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.item {
							display: flex;
							align-items: center;

							image {
								width: 25rpx;
								height: 25rpx;
								margin-right: 8rpx;
							}

							text {
								font-size: 25rpx;
								line-height: 30rpx;
								letter-spacing: 3rpx;
							}
						}
					}

					.method-remarks {
						width: 406rpx;
						font-size: 20rpx;
						line-height: 30rpx;
						letter-spacing: 2rpx;
						color: #575757;
						// text-align: end;
						margin-top: 14rpx;
					}
				}
			}

			.total {
				display: flex;
				align-items: center;
				flex-direction: row-reverse;

				.count {
					font-size: 25rpx;
					// line-height: 60rpx;
					letter-spacing: 3rpx;
					margin-right: 68rpx;
				}
			}

			.bottom-pay {
				height: 97rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 40rpx;

				.total {
					font-size: 28rpx;
					font-weight: bold;
					letter-spacing: 3rpx;
					color: #e62329;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					max-width: 380rpx;
				}

				.to-pay {
					width: 175rpx;
					height: 60rpx;
					background-color: #e62329;
					border-radius: 30rpx;
					letter-spacing: 6rpx;
					color: #ffffff;
					font-size: 30rpx;
					line-height: 60rpx;
					text-align: center;
				}
			}

		}
	}
</style>
