<template>
	<view class="to-pay">
		<!-- 自定义导航栏 -->
		<view class="navigate-box" :style="{height:navHeight + 'px',marginTop:statusBarHei + 'px'}">
			<image @click="pageToMyOrder(1)" class="return-btn" src="/pagesC/static/imgs/return.png" mode="widthFix" style="margin-left:10px"></image>
			<text @click="pageToMyOrder(1)" class="pay-text" :style="{lineHeight:navHeight + 'px'}">支付</text>
		</view>
		
		<!-- 顶部订单号和订单金额 -->
		<view class="num-prise">
			<text class="order-num">订单号：{{orderSn}}</text>
			<text class="order-prise">订单金额：{{fee}}元</text>

		</view>
		<!-- 信息 -->
		<image class="split-img" src="https://travel.quweiquwei.com/images/wxa_pic/we_line_02.jpg" mode=""></image>
		<image class="wechat" src="/pagesC/static/imgs/to_pay_wechat.png" mode=""></image>
		<view class="recomend">
			<text class="re-name">微信支付</text>
			<text class="re-text">推荐安装6.0版本以上用户使用</text>
		</view>

		<view class="sub-btn" @click="toPays" v-if="firstPay">确认支付</view>
		<view class="sub-btn" @click="payFun" v-else>继续支付</view>
	</view>
</template>

<script>
	import store from '@/store'
	import OrderApi from '@/servies/OrderApi.js'
	export default {
		data() {
			return {
				state: store.state,
				payParams: null, //微信支付接口参数
				firstPay:true,
				orderSn:'',
				fee:'',
				statusBarHei:'', //状态栏高度
				navHeight:'', //导航栏高度
				marginValue:'' //margin值
			};
		},
		methods: {
			pageToMyOrder(num) {
				uni.redirectTo({
					url: '/pagesC/pages/myorder/myorder?index=' + num
				})
			},
			toPays() { //支付-后台接口
				let _this = this
				// 支付
				console.log( 111 )
				if (!_this.orderSn) {
					return wx.showToast({
						icon: "none",
						title: "参数不正确～",
						mask: true
					});
				}
				let paramsObj = {}
				console.log( 'paramsObj', paramsObj )
				
				paramsObj = {
					orderSn: _this.orderSn,
					fee: _this.fee
				}
				
				console.log( 'paramsObj', paramsObj )
				OrderApi.toPay(paramsObj, res => {
					if (res) {
						if (res.data) {
							_this.payParams = res.data;
							_this.payFun();
						} else {
							// 0元无需支付 - 商品详情页面
						}
					} else {
						wx.showToast({
							icon: "none",
							title: "获取签名失败～",
							mask: true
						});
					}
				})
			},
			payFun() {  //微信支付接口
				const that = this;
				const packageObj = this.payParams;

				packageObj.success = function(res) {
					uni.showToast({
						title: '支付成功',
						icon: "success"
					})

					// 跳转店铺首页
					that.timer1 = setTimeout(() => {
						uni.reLaunch({
							url: '/pagesC/pages/myorder/myorder',
						})
					}, 1000)
				}

				packageObj.fail = function(res) {
					wx.showToast({
						icon: "none",
						title: "支付失败～",
						mask: true
					});
					
					that.firstPay = false
				};
				
				if( packageObj ){
					uni.requestPayment(packageObj)
				}

			}
		},
		onLoad(options) {
			this.orderSn = options.orderSn || ''
			this.fee = options.fee || ''
			console.log('options',options )
		},
		onHide() {
			clearTimeout(this.timer1)
		},
		onShow(){
			let _this = this
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.marginValue = menuButtonInfo.right //margin值
			uni.getSystemInfo({
				success(res){
					console.log( '按钮和系统',menuButtonInfo,res )
					_this.navHeight = menuButtonInfo.height + (menuButtonInfo.top - res.statusBarHeight) * 2 //导航栏高度
					_this.statusBarHei = res.statusBarHeight//状态栏高度
					
				},
				fail(err){
					console.log( 'err',err )
				}
			})
		}
	}
</script>

<style lang="scss">
	.to-pay {
		
		.navigate-box{
			display: flex;
			align-items: center;
			.return-btn{
				width: 40rpx;
			}
			.pay-text{
				font-size: 34rpx;
			}
		}
		
		.num-prise {
			display: flex;
			flex-direction: column;
			height: 274rpx;
			justify-content: center;

			.order-num,
			.order-prise {
				margin-left: 66rpx;
				font-size: 30rpx;
				color: #2c2b2b;
				line-height: 74rpx;
			}

		}

		.split-img {
			width: 100%;
			height: 26rpx;
			margin-bottom: 140rpx;
		}

		.wechat {
			width: 260rpx;
			height: 126rpx;
			display: block;
			margin: 0 auto 85rpx;
		}

		.recomend {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-bottom: 210rpx;

			.re-name {
				font-size: 35rpx;
				letter-spacing: 3rpx;
				color: #2c2b2b;
			}

			.re-text {
				font-size: 30rpx;
				letter-spacing: 2rpx;
				color: #949494;
				line-height: 60rpx;
			}
		}

		.sub-btn {
			width: 450rpx;
			height: 60rpx;
			background-color: #ff2f29;
			line-height: 60rpx;
			font-size: 30rpx;
			font-weight: bold;
			letter-spacing: 3rpx;
			color: #ffffff;
			text-align: center;
			border-radius: 20rpx;
			margin: 0 auto;
		}
	}
</style>
