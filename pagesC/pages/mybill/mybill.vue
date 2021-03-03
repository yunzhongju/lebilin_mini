<template>
	<view class="my-bill">
		<!-- tab-title -->
		<view class="tab-title">
			<view class="title-item" @click="changeIndex(index)" v-for="(item,index) in tabTitle" :key="index">
				<text class="title" :class="{active:tabIndex == index}"> {{ item }}</text>
				<text class="bottom-line" v-if="tabIndex == index"></text>
			</view>
		</view>
		<!-- 总计 -->
		<view class="total">
			<text class="in">收入：{{ billAll.integralIncome }}积分</text>
			<view class="out">
				<text>支出：{{ billAll.integralExpenditure }}积分</text>
				<text class="price">￥{{ billAll.moneyExpenditure }}</text>
			</view>
		</view>
		
		<!-- tab-content -->
		<view class="tab-content">
			
			<view class="bill-item" v-for="(item,index) in billArr" :key="index">
				<image class="left-thum" src="/pagesC/static/imgs/sign_icon.png" mode=""></image>
				<view class="middle-detail">
					<text class="title">{{ item.billName }}</text>
					<text class="time">{{ item.creattime }}</text>
				</view>
				<view class="right-price">
					<text><text style="color: #e60012;" v-if="item.billIntegral">{{ item.billIntegral }}</text>积分</text>
					<text style="color: #6dc26d;" v-if="item.billPrice">￥{{ item.billPrice }}元</text>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import IntergralApi from '@/servies/IntegralApi.js'
	export default {
		data() {
			return {
				tabTitle:['本月','所有'],
				tabIndex:0,
				pageNo:1,
				allowPull:false,
				billAll:null,
				billArr:[]
			};
		},
		methods:{
			getMyBillList(type='one'){ //获取账单列表
				let paramsObj = {
					pageSize:10,
					pageNo:this.pageNo
				}
				if( this.tabIndex == 0 ){ //本月
					paramsObj.time = 'thisMonth'
				}
				IntergralApi.getMyBillList(paramsObj, res => {
					console.log( res )
					this.billAll = res
					if( type == 'one' ){
						this.billArr = res.billList.list
						this.billArr.forEach(item => {
							item.billIntegral = item.billIntegral < 0 ? item.billIntegral : '+' + item.billIntegral
							item.billPrice = item.billPrice < 0 ? item.billPrice : '+' + item.billPrice
						})
						this.allowPull = !res.billList.lastPage
					}else{
						this.billArr = [...this.billArr,...res.billList.list]
						this.billArr.forEach(item => {
							item.billIntegral = item.billIntegral <= 0 ? item.billIntegral : '+' + item.billIntegral
							item.billPrice = item.billPrice <= 0 ? item.billPrice : '+' + item.billPrice
						})
						this.allowPull = !res.billList.lastPage
					}
				})
			},
			changeIndex(index){
				if( this.tabIndex != index ){
					this.tabIndex = index
					this.pageNo = 1
					this.getMyBillList()
				}
			}
		},
		onLoad(options) {
			this.getMyBillList()
		},
		onPullDownRefresh() {
			this.pageNo = 1
			this.getMyBillList()
		},
		onReachBottom() {
			if( this.allowPull ){
				this.pageNo ++
				this.getMyBillList('more')
			}
		}
	}
</script>

<style lang="scss">
	.my-bill{
		// tab-title
		.tab-title{
			display: flex;
			align-items: center;
			justify-content: space-around;
			.title-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100rpx;
				position: relative;
				.title{
					font-size: 30rpx;
					line-height: 48rpx;
					letter-spacing: 3rpx;
					&.active{
						font-size: 34rpx;
						font-weight: bold;
					}
				}
				.bottom-line{
					width: 100%;
					height: 4rpx;
					background-color: #e62329;
					position: absolute;
					bottom: 16rpx;
					left: 0;
				}
			}
		}
		// 总计
		.total{
			background-color: #FBFBFB;
			height: 100rpx;
			box-sizing: border-box;
			padding: 0 47rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.in{
				font-size: 25rpx;
				letter-spacing: 2rpx;
			}
			.out{
				font-size: 25rpx;
				letter-spacing: 2rpx;
				.price{
					display: inline-block;
					margin-left: 30rpx;
				}
			}
		}
		// tab-content
		.tab-content{
			padding: 0 24rpx;
			box-sizing: border-box;
			.bill-item{
				border-bottom: 1rpx solid #eee;
				padding: 24rpx 14rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.left-thum{
					width: 115rpx;
					height: 115rpx;
					border-radius: 50%;
				}
				.middle-detail{
					width: 300rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					.title{
						font-size: 25rpx;
						letter-spacing: 3rpx;
						line-height: 48rpx;
					}
					.time{
						font-size: 20rpx;
						color: #ababab;
						line-height: 48rpx;
					}
				}
				.right-price{
					width: 170rpx;
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					text{
						font-size: 25rpx;
						line-height: 38rpx;
					}
				}
				
			}
		}
	}
</style>
