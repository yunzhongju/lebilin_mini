<template>
	<view class="order-detail">
		<!-- 顶部商品详情 -->
		<view class="top-goods card">
			<view class="title">
				{{ orderDetail.storeName }}
			</view>
			<view class="goods-list">

				<view class="goods-item" v-for="(item,index) in orderDetail.orderGoods" :key="index">
					<image class="left" :src="state.baseUrl + item.picture" mode=""></image>
					<view class="rignt">
						<text class="name">{{ item.productName }}</text>
						<text class="decipt">{{ item.specification || '' }}</text>
						<view class="price">
							<view class="need">
								<text>￥{{ item.unitPrice }}&nbsp;+{{ item.integral }}</text>
								<image style="margin-left: 10rpx;" src="/pagesC/static/imgs/intergral.png" mode=""></image>
								<text>{{ item.unitIntegeral }}</text>
							</view>
							<text class="count">X{{ item.quantity }}</text>
						</view>
					</view>
				</view>

				
			</view>
		</view>
	
		<!-- 联系 -->
		<view class="contact card">
			<view class="contact-servie" @click="makePhone('028-60113652')">
				<image src="/pagesC/static/imgs/contact_servie.png" mode=""></image>
				<text>联系客服</text>
			</view>
			<view class="contact-manager" @click="makePhone(orderDetail.phonenum)" v-if="!isStore">
				<image src="/pagesC/static/imgs/contact_manager.png" mode=""></image>
				<text>联系店长</text>
			</view>
		</view>
	
		<!-- 订单详情 -->
		<view class="order-detail card">
			<view class="left" :class="{isStore:isStore}">
				<view class="list-box">
					<text class="title">订单编号：</text>
					<text class="msg">{{orderDetail.ordersn}}</text>
				</view>
				<view class="list-box">
					<text class="title">下单时间：</text>
					<text class="msg">{{ orderDetail.createtime }}</text>
				</view>
				<view class="split-line">
					
				</view>
				<view class="list-box">
					<text class="title">支付方式：</text>
					<text class="msg">微信支付（现仅限）</text>
				</view>
				<view class="list-box">
					<text class="title">支付时间：</text>
					<text class="msg">{{ orderDetail.paytime || '未支付' }}</text>
				</view>
			</view>
			<view class="right" v-if="!isStore">
				<image class="qr" :src="state.baseUrl + '/order/getOrderQRCode?orderId=' + orderDetail.orderId" mode="widthFix"></image>
				<text class="msg">提货时，向店长出示</text>
			</view>
		</view>
	
		<!-- 配送详情 -->
		<view class="distribution-detail card">
			<view class="list-box">
				<text class="title">配送信息：</text>
				<text class="msg">{{ orderDetail.distributionWay == 'store' ? '送货上门' : '到店自提' }}</text>
			</view>
			<view class="list-box">
				<text class="title">完成时间：</text>
				<text class="msg">{{ finishTime }}</text>
			</view>
			<view class="split-line">
				
			</view>
			<view class="list-box">
				<text class="title">客户信息：</text>
				<text class="msg">{{ orderDetail.nickName }} {{ orderDetail.customerMobile }}</text>
			</view>
			<view class="list-box" v-if="orderDetail.distributionWay == 'self'">
				<text class="title">自提地址：</text>
				<text class="msg">{{ orderDetail.deliveryAdd }}</text>
			</view>
			<view class="list-box" v-else>
				<text class="title">收货地址：</text>
				<text class="msg">{{ orderDetail.deliveryAdd }}</text>
			</view>
		</view>
	
		<!-- 商品价格 -->
		<view class="goods-price">
			<view class="list-box">
				<text class="title">商品总额</text>
				<text class="content">￥{{ orderDetail.sumProductPrice }}</text>
			</view>
			<view class="list-box">
				<text class="title">运费</text>
				<text class="content">￥{{ orderDetail.distributionFee }}</text>
			</view>
			<view class="list-box">
				<text class="title">抵扣积分</text>
				<view class="content" style="display: flex;align-items: center;">
					<image src="/pagesC/static/imgs/intergral.png" style="margin-right: 10rpx;" mode=""></image>
					<text>{{ orderDetail.realpayIntegeral }}</text>
				</view>
			</view>
			<view class="buy-price">
				实付款：￥<text style="font-size: 35rpx;color: #ff2f29;" v-if="orderDetail.realpayAmount">{{ orderDetail.realpayAmount }}</text><text>+</text><text style="font-size: 35rpx;color: #3bb81e;">{{ orderDetail.realpayIntegeral }}</text><text>积分</text>
			</view>
		</view>
	
		<!-- 订单管理 -->
		<view class="del-order" v-if="!isStore">
			<text class="apply-btn" v-if="orderDetail.orderStatus == 'order_ywc' || orderDetail.orderStatus == 'order_ytk' " @click="showMsg">申请售后</text>			
			<text class="del-btn" v-if="orderDetail.orderStatus == 'order_ywc' || orderDetail.orderStatus == 'order_ytk' " @click="deleteOrder">删除订单</text>			
			<text class="apply-btn"  v-if="orderDetail.orderStatus == 'order_dps' || orderDetail.orderStatus == 'order_dzt' " @click="applyReFound(orderDetail.orderId)">申请退款</text>			
			<text class="apply-btn"  v-if="orderDetail.orderStatus == 'order_dfk'" @click="pageToPay(orderDetail.ordersn,orderDetail.realpayAmount)">去支付</text>
		</view>
	</view>
</template>

<script>
	import OrderApi from '@/servies/OrderApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state:store.state,
				orderId:'',
				orderDetail:null,
				isStore:false //是否从店铺订单进入
			};
		},
		methods:{
			showMsg(){
				uni.showToast({
					title:'功能完善中!',
					icon:'none'
				})
			},
			applyReFound(orderId){ //申请退款
				let _this = this
				uni.showModal({
					title:'提示',
					content:'退款金额将按原路返回，确定退款吗?',
					success(res) {
						if( res.confirm ){
							OrderApi.orderRefound({orderId},res => {
								if( res.status == 1 ){
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
									
									_this.timer1 = setTimeout(() => {
										uni.redirectTo({
											url:'/pagesC/pages/myorder/myorder'
										})
									},1000)
								}
							})
						}
					}
				})
				
			},
			deleteOrder(){ //删除订单
				let _this = this
				uni.showModal({
					title:'提示',
					content:'是否确认删除订单',
					success(res) {
						if( res.confirm ){
							OrderApi.deleteOrder({orderId:_this.orderId}, res => {
								if( res.status == 1 ){
									uni.redirectTo({
										url:'/pagesC/pages/myorder/myorder?index=4'
									})
								}
							})
						}
					}
				})
			},
			pageToPay(orderSn,fee){ //去支付
				uni.navigateTo({
					url:'/pagesC/pages/topay/topay?orderSn=' + orderSn + '&fee=' + fee
				})
			},
			makePhone(num){ //打电话
				uni.makePhoneCall({
					phoneNumber:num
				})
			},
			getOrderDetail(){ //获取订单详情
				OrderApi.getOrderDetail({orderId:this.orderId},res => {
					console.log( '订单详情',res )
					this.orderDetail = res
				})
			}
		},
		computed:{
			finishTime(){ //订单完成时间
				if( this.orderDetail ){
					if( this.orderDetail.finishTime ){
						return this.orderDetail.finishTime
					}else if( this.orderDetail.orderStatus == 'order_dfk' ){
						return '待支付'
					}else if( this.orderDetail.orderStatus == 'order_dps' ){
						return '待配送'
					}else if( this.orderDetail.orderStatus == 'order_dzt' ){
						return '待自提'
					}else if( this.orderDetail.orderStatus == 'order_ytk' ){
						return '已退款'
					}
				}
				
			}
		},
		onLoad(options) {
			this.orderId = options.orderId || ''
			this.isStore = options.isStore ? true : false
			this.getOrderDetail()
		},
		onHide() {
			clearTimeout(this.timer1)
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #efefef;
	}

	.order-detail {
		// 顶部商品详情
		.top-goods {

			.title {
				font-size: 30rpx;
				line-height: 60rpx;
				letter-spacing: 3rpx;
			}

			.goods-list {
				.goods-item {
					padding: 40rpx 0;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						width: 146rpx;
						height: 146rpx;
						margin-right: 14rpx;
					}

					.rignt {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.name {
							font-size: 25rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.decipt {
							font-size: 25rpx;
							color: #9fa0a0;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							line-height: 70rpx;
						}

						.price {
							display: flex;
							align-items: center;
							justify-content: space-between;

							.need {
								text {
									font-size: 25rpx;
								}

								image {
									width: 20rpx;
									height: 20rpx;
								}
							}

							.count {
								font-size: 25rpx;
							}
						}

					}
				}
			}
		}

		//联系
		.contact{
			font-size: 25rpx;
			display: flex;
			align-items: center;
			justify-content: space-around;
			.contact-servie{
				display: flex;
				align-items: center;
				image{
					width: 53rpx;
					height: 43rpx;
					margin-right: 10rpx;
				}
			}
			.contact-manager{
				display: flex;
				align-items: center;
				image{
					width: 49rpx;
					height: 21rpx;
					margin-right: 10rpx;
				}
			}
		}

		// 订单详情
		.order-detail{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				width: 400rpx;
				.list-box{
					font-size: 25rpx;
					line-height: 62rpx;
					.title{
						color: #9fa0a0;
						font-size: 25rpx;
						line-height: 62rpx;
					}
				}
				&.isStore{
					width: 100%;
				}
			}
			.right{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.qr{
					width: 170rpx;
					margin-bottom: 20rpx;
				}
				.msg{
					font-size: 20rpx;
					letter-spacing: 2rpx;
					color: #ff2f29;
				}
			}
		}

		// 配送详情
		.distribution-detail{
			display: flex;
			flex-direction: column;
			.list-box{
				display: flex;
				
				.title{
					font-size: 25rpx;
					line-height: 62rpx;
					color: #9fa0a0;
				}
				.msg{
					flex: 1;
					font-size: 25rpx;
					line-height: 62rpx;
				}
			}
			
		}
		
		// 商品价格
		.goods-price{
			background-color: #fff;
			border-radius: 20rpx 20rpx 0 0;
			box-sizing: border-box;
			padding: 26rpx 36rpx;
			display: flex;
			flex-direction: column;
			.list-box{
				display: flex;
				justify-content: space-between;
				font-size: 25rpx;
				.title{}
				.content{
					width: 100rpx;
					line-height: 62rpx;
					image{
						width: 20rpx;
							height: 20rpx;
					}
				}
				
			}
			.buy-price{
				align-self: flex-end;
				font-size: 25rpx;
			}
		}
		
		// 删除订单
		.del-order{
			box-sizing: border-box;
			padding: 26rpx 36rpx;
			border-top: 2rpx solid #eee;
			display: flex;
			background-color: #fff;
			align-items: center;
			flex-direction: row-reverse;
			justify-content: space-between;
			.del-btn{
				font-size: 25rpx;
			}
			.apply-btn{
				border: 1rpx solid #ddd;
				line-height: 50rpx;
				font-size: 25rpx;
				border-radius: 25rpx;
				padding: 0 20rpx;
			}
		}
		
		.card {
			background-color: #fff;
			margin-bottom: 16rpx;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 26rpx 36rpx;
		}
		.split-line{
			height: 2rpx;
			background-color: #eee;
			margin: 12rpx 0;
		}
	}
</style>
