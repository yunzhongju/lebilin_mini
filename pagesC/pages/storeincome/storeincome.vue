<template>
	<view class="store-income">
		<!-- 店铺信息 -->
		<view class="store-msg">
			<image class="left-img" :src="state.userInfo.headerUrl" mode=""></image>
			<view class="right-msg">
				<text class="manager">{{ incomeObj.headmanName }}</text>
				<text class="store">{{ incomeObj.storeName }}</text>
				<text class="address">{{ incomeObj.detailAdd }}</text>
			</view>
		</view>
		
		<!-- 订单 -->
		<view class="order-box">
			<view class="order-item" @click="pageToStoreOrder(1)">
				<image class="icon" src="/pagesC/static/imgs/dsh_icon.png" mode=""></image>
				<text class="title">待配送</text>
			</view>
			
			<view class="order-item" @click="pageToStoreOrder(2)">
				<image class="icon" src="/pagesC/static/imgs/dzt_icon.png" mode=""></image>
				<text class="title">待自提</text>
			</view>
			
			<view class="order-item" @click="pageToStoreOrder(3)">
				<image class="icon" src="/pagesC/static/imgs/ywc_icon.png" mode=""></image>
				<text class="title">已完成</text>
			</view>
		</view>
		
		<!-- 全部订单 -->
		<view class="all-order">
			<view class="all-item">
				<image class="imgs" src="/pagesC/static/imgs/today_order.png" mode=""></image>
				<text class="title">今日订单</text>
				<text class="count">{{ incomeObj.todayOrder }}</text>
			</view>
			
			<view class="all-item">
				<image class="imgs" src="/pagesC/static/imgs/yestoday_order.png" mode=""></image>
				<text class="title">昨日订单</text>
				<text class="count">{{ incomeObj.yestodayOrder }}</text>
			</view>
			
			<view class="all-item">
				<image class="imgs" src="/pagesC/static/imgs/total_order.png" mode=""></image>
				<text class="title">累计订单</text>
				<text class="count">{{ incomeObj.totalOrder }}</text>
			</view>
		</view>
		
		<!-- 店铺收益 -->
		<view class="income-box">
			<view class="title">
				店铺收益
			</view>
			<view class="incomes">
				<view class="income-item borderright">
					<image class="income-img" src="/pagesC/static/imgs/today_income.png" mode=""></image>
					<text class="name">今日收益</text>
					<text class="income-price">￥{{ incomeObj.todayIncome }}</text>
				</view>
				
				<view class="income-item borderright">
					<image class="income-img" src="/pagesC/static/imgs/today_income.png" mode=""></image>
					<text class="name">昨日收益</text>
					<text class="income-price">￥{{ incomeObj.yestodayIncome }}</text>
				</view>
				
				<view class="income-item">
					<image class="income-img" src="/pagesC/static/imgs/today_income.png" mode=""></image>
					<text class="name">累计收益</text>
					<text class="income-price">￥{{ incomeObj.totalIncome }}</text>
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
				storeId:'',
				incomeObj:null, // 收益信息
			};
		},
		methods:{
			pageToStoreOrder(index){
				uni.navigateTo({
					url:'/pagesC/pages/storeorder/storeorder?index=' + index + '&storeId=' + this.storeId
				})
			},
			getStoreIncome(){ //获取店铺收益信息
				StoreApi.getStoreIncome({
					storeId:this.storeId
				},res=> {
					this.incomeObj = res
				})
			}
		},
		onLoad(options) {
			this.storeId = options.storeId
			this.getStoreIncome()
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		background-color: #F3F3F1;
	}
	.store-income{
		box-sizing: border-box;
		padding: 0 24rpx;
		// 店铺信息
		.store-msg{
			height: 170rpx;
			background-color: #ff2f29;
			border-radius: 20rpx;
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 0 40rpx;
			.left-img{
				width: 122rpx;
				height: 122rpx;
				border-radius: 50%;
				margin-right:40rpx;
			}
			.right-msg{
				display: flex;
				flex-direction: column;
				flex: 1;
				.manager,.store,.address{
					font-size: 25rpx;
					line-height: 48rpx;
					letter-spacing: 3rpx;
					color: #efefef;
					width: 460rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	
		//订单
		.order-box{
			margin: 20rpx 0;
			background-color: #fff;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 28rpx 76rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.order-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				.icon{
					width: 51rpx;
					height: 50rpx;
					margin-bottom: 10rpx;
				}
				.title{
					font-size: 25rpx;
					line-height: 30rpx;
					letter-spacing: 3rpx;
				}
			}
		}
	
		// 全部订单
		.all-order{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0;
			.all-item{
				width: 225rpx;
				height: 225rpx;
				border-radius: 20rpx;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.imgs{
					width: 60rpx;
					height: 60rpx;
					border-radius: 50%;
				}
				.title{
					font-size: 25rpx;
					line-height: 60rpx;
					letter-spacing: 3rpx;
				}
				.count{
					font-size: 25rpx;
					line-height: 50rpx;
					letter-spacing: 3rpx;
					color: #ff2f29;
				}
			}
		}
	
		//店铺收益
		.income-box{
			border-radius: 20rpx;
			background-color: #fff;
			margin: 20rpx 0;
			padding: 32rpx 20rpx;
			box-sizing: border-box;
			.title{
				font-size: 25rpx;
				letter-spacing: 3rpx;
				text-indent: 54rpx;
				margin-bottom: 32rpx;
			}
			.incomes{
				display: flex;
				align-items: center;
				.income-item{
					display: flex;
					// height: 185rpx;
					width: 220rpx;
					box-sizing: border-box;
					flex-direction: column;
					align-items: center;
					// justify-content: space-around;
					&.borderright{
						border-right: 1rpx solid #eee;
					}
					.income-img{
						width: 55rpx;
						height: 55rpx;
						border-radius: 50%;
					}
					.name{
						font-size: 25rpx;
						line-height: 60rpx;
						letter-spacing: 3rpx;
					}
					.income-price{
						font-size: 25rpx;
						line-height: 50rpx;
						letter-spacing: 3rpx;
						color: #ff2f29;
					}
				}
			}
		}
	}
</style>
