<template>
	<view class="withdrawals">
		<view class="top-money">
			<text>提现位置&emsp;微信钱包</text>
			<text>当前余额&emsp;<text style="color: #FF2F29;">￥{{ state.userInfo.balance == null ? 0.00 : state.userInfo.balance }}</text></text>
		</view>
		<view class="to-get">
			<view class="left">
				<text class="tag">￥</text>
				<input :maxlength="maxLength" @input="bindManual" type="number" v-model="gertPrice" placeholder="1元起"/>
			</view>
			<view class="right" @click="sureShot">
				全部提现
			</view>
		</view>
		<view class="shouxu" style="color: #FF2F29;" v-if="!canShot">
			输入金额超过余额
		</view>
		<view class="shouxu" v-else>
			额外扣除￥{{ shotMsg.serviceFee && gertPrice ? shotMsg.serviceFee : '0.00' }}（微信官方费率{{ shotMsg.rate && gertPrice ? shotMsg.rate : '0.06%' }}）
		</view>
		
		<view class="sub-btn" @click="toShout">
			提现
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
				gertPrice:'', //提现金额
				isFocus:true,
				maxLength:50, //通过maxlength限制输入小数位数
				canShot:true, //是否能提现
				shotMsg:null, //提现信息
			};
		},
		methods:{
			toShout(){ //确认提现
				/* if( !this.gertPrice ){
					return uni.showToast({
						title:'请输入提现金额',
						icon:'none'
					})
				}
				
				if( !this.canShot ){
					return uni.showToast({
						title:'输入金额大于余额',
						icon:'none'
					})
				}
				
				if( this.gertPrice <= 1 ){
					return uni.showToast({
						title:'提现金额必须大于1元',
						icon:'none'
					})
				}
				
				this.cashOut() */
				
				uni.showToast({
					title:'该功能正在开发中，请耐心等待~',
					icon:'none'
				})
			},
			cashOut(){ //提现
				let _this = this
				OrderApi.cashOut({
					amount:this.shotMsg.amout
				},res => {
					console.log( res )
					uni.showToast({
						title:'提现成功',
						icon:'success'
					})
					_this.timer = setTimeout(()=>{
						uni.reLaunch({
							url:'/pages/mine/mine'
						})
					},1000)
				})
			},
			doCashOut(){ //发起提现
				OrderApi.doCashOut({amount:parseFloat(this.gertPrice)},res => {
					this.shotMsg = res
				})
			},
			sureShot(){ //点击全部提现
				this.gertPrice = this.state.userInfo.balance
				this.doCashOut()
			},
			bindManual(e){
				let price = e.detail.value
				let maxlength = price.indexOf('.') + 3;
				if( maxlength == 2 ){
					this.maxLength = 50
				}else{
					this.maxLength = maxlength
				}
				
				if( this.gertPrice > this.state.userInfo.balance ){
					this.canShot = false
				}else{
					this.canShot = true
				}
				if( this.gertPrice && this.gertPrice < this.state.userInfo.balance && this.gertPrice > 1){
					this.doCashOut()
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
	.withdrawals{
		box-sizing: border-box;
		padding: 0 30rpx;
		.top-money{
			padding: 26rpx;
			display: flex;
			flex-direction: column;
			text{
				font-size: 35rpx;
				line-height: 60rpx;
				letter-spacing: 4rpx;
			}
		}
		.to-get{
			display: flex;
			height: 104rpx;
			padding: 0 26rpx;
			border-bottom: 1rpx solid #eee;
			justify-content: space-between;
			align-items: center;
			.left{
				flex: 1;
				display: flex;
				align-items: center;
				.tag{
					font-size: 40rpx;
					line-height: 104rpx;
				}
				input{
					flex: 1;
				}
			}
			.right{
				font-size: 30rpx;
				line-height: 60rpx;
				letter-spacing: 3rpx;
				color: #68b764;
			}
		}
		.shouxu{
			text-indent: 26rpx;
			line-height: 76rpx;
			font-size: 30rpx;
			color: #9fa0a0;
		}
		.sub-btn{
			width: 641rpx;
			height: 86rpx;
			background-color: #ff2f29;
			border-radius: 20rpx;
			color: #fff;
			font-size: 35rpx;
			font-weight: bold;
			letter-spacing: 4rpx;
			line-height: 86rpx;
			text-align: center;
			margin: 76rpx auto;
		}
	}
</style>
