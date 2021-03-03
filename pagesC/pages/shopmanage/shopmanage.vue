<template>
	<view class="shop-manage">
		<view class="title">
			<text class="left-title">我的店铺</text>
			<text class="right-btn" @click="pageToAddStore">开店</text>
		</view>
		
		<!-- 店铺列表 -->
		<view class="shop-list" v-if="storeArr.length">
			
			<view class="item" v-for="(item,index) in storeArr" :key="index">
				<view class="left">
					<text class="title">{{ item.storeName }}</text>
					<text class="address">地址：{{ item.gisDisplayAdd }}</text>
					<view class="functions">
						<view class="items" @click="pageToAddPerson(item.storeId)">
							<image src="/pagesC/static/imgs/white_offs.png" mode=""></image>
							<text>核销人员</text>
						</view>
						<view class="items" @click="pageToChoose(item.storeId)">
							<image src="/pagesC/static/imgs/goods_repair.png" mode=""></image>
							<text>商品维护</text>
						</view>
						<view class="items" @click="pageToStoreIncome(item.storeId)">
							<image src="/pagesC/static/imgs/income.png" mode=""></image>
							<text>店铺收益</text>
						</view>
					</view>
				</view>
				<image v-if="item.isOpen" @click="changeOpenState(item.storeId,false,index)" class="right" src="/pagesC/static/imgs/shop_open.png" mode=""></image>
				<image v-else @click="changeOpenState(item.storeId,true,index)" class="right" src="/pagesC/static/imgs/shop_close.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import StoreApi from '@/servies/StoreApi.js'
	export default {
		data() {
			return {
				state:store.state,
				storeArr:[]
			};
		},
		methods:{
			changeOpenState(storeId,isOpen,index){ //修改店铺营业状态
				StoreApi.closeOrOpenStore({storeId,isOpen}, res => {
					this.storeArr[index].isOpen = !this.storeArr[index].isOpen
				})
			},
			getMyStores(){ //获取团长所属店铺列表
				StoreApi.getMyStores(res => {
					console.log( res )
					this.storeArr = res
				})
			},
			pageToStoreIncome(storeId){
				uni.navigateTo({
					url:'/pagesC/pages/storeincome/storeincome?storeId=' + storeId
				})
			},
			pageToAddStore(){
				uni.navigateTo({
					url:'/pagesC/pages/addstore/addstore'
				})
			},
			pageToAddPerson(storeId){
				uni.navigateTo({
					url:"/pagesC/pages/addpersonal/addpersonal?storeId=" + storeId
				})
			},
			pageToChoose(storeId){
				uni.navigateTo({
					url:'/pagesC/pages/choosesupplier/choosesupplier?storeId=' + storeId
				})
			}
		},
		onLoad(options) {
			this.getMyStores()
		}
	}
</script>

<style lang="scss">
	.shop-manage{
		& > .title{
			padding:0 48rpx;
			margin-top: 36rpx;
			box-sizing: border-box;
			border-bottom: 8rpx solid #eee;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left-title{
				font-size: 30rpx;
				letter-spacing: 3rpx;
				line-height: 76rpx;
			}
			.right-btn{
				width: 110rpx;
				height: 48rpx;
				background-color: #ff2f29;
				border-radius: 10rpx;
				font-size: 25rpx;
				line-height: 48rpx;
				text-align: center;
				letter-spacing: 3rpx;
				color: #FFFFFF;
			}
		}
		//店铺列表
		.shop-list{
			box-sizing: border-box;
			padding: 0rpx 48rpx;
			.item{
				display: flex;
				align-items: flex-start;
				justify-content: space-between;
				border-bottom: 1rpx solid #eee;
				padding: 20rpx 0;
				.left{
					width: 497rpx;
					display: flex;
					flex-direction: column;
					.title{
						font-size: 30rpx;
						line-height: 55rpx;
						letter-spacing: 3rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.address{
						font-size: 25rpx;
						letter-spacing: 3rpx;
						color: #9c9c9c;
						line-height: 55rpx;
						padding-bottom: 10rpx;
					}
					.functions{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.items{
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							padding: 0 20rpx;
							image{
								width: 56rpx;
								height: 56rpx;
							}
							text{
								font-size: 25rpx;
								line-height: 36rpx;
								letter-spacing: 3rpx;
							}
						}
					}
				}
				.right{
					width: 95rpx;
					height: 36rpx;
				}
			}
		}
	}
</style>
