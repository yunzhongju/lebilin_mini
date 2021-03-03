<template>
	<view class="choose-supplier">
		<!-- 顶部搜索栏 -->
		<view class="search-box">
			<input type="text" :focus="isFocus" value="" v-model="searchContent" placeholder="请输入关键字"/>
			<text>搜索</text>
			<image class="search-icon" src="/pagesC/static/imgs/search_icon.png" mode=""></image>
			<image class="close-icon" src="/pagesC/static/imgs/close.png" mode="" v-if="searchContent" @click="clearContent"></image>
		</view>
		<!-- 供应商列表 -->
		<view class="list-box">
			
			<view class="list-item" v-for="(item,index) in supplierList" :key="index">
				<view class="left">
					<text class="top">{{ item.supplierName }}</text>
					<text class="middle">联系人：{{ item.orgContactor }}</text>
					<text class="km">送货范围：{{ item.distance + item.unit }}</text>
					<text class="bottom">地址：{{ item.detailAddress }}</text>
				</view>
				<view class="right" @click="pageToGoodsShelves(item.supplierId)">
					商品上架
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import StoreApi from '@/servies/StoreApi.js'
	export default {
		data() {
			return {
				searchContent:'',
				idFocus:false,
				storeId:'',
				pageNo:1,
				supplierList:[] ,//供应商列表
				allowPull:false, //允许上拉加载
			};
		},
		methods:{
			getSupplierList(storeId,type='one'){ //获取供应商列表
				let _this = this
				StoreApi.getSupplierList({
					storeId,
					pageSize:6,
					pageNo:_this.pageNo
				}, res => {
					if( type == 'one' ){ //加载第一页
						_this.supplierList = res.list
						_this.allowPull = !res.lastPage
					}else{ //上拉加载更多
						_this.supplierList = [..._this.supplierList,...res.list]
						_this.allowPull = !res.lastPage
					}
				})
			},
			clearContent(){
				this.searchContent = '',
				this.isFocus = true
			},
			pageToGoodsShelves(supplierId){
				uni.navigateTo({
					url:"/pagesC/pages/goodsshelves/goodsshelves?supplierId=" + supplierId +'&storeId=' + this.storeId
				})
			}
		},
		onLoad(options) {
			this.storeId = options.storeId || ''
			this.getSupplierList(this.storeId) //供应商第一页
		},
		onReachBottom() {
			if( this.allowPull ){
				this.pageNo++
				this.getSupplierList(this.storeId,'more') //供应商第一页
			}
		},
		onPullDownRefresh() {
			this.pageNo = 1
			this.getSupplierList(this.storeId) //供应商第一页
		}
	}
</script>

<style lang="scss">
	.choose-supplier{
		box-sizing: border-box;
		padding: 0 24rpx;
		/* 顶部搜索 */
		.search-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 20rpx;
			position: relative;
			input{
				width: 613rpx;
				height: 55rpx;
				background-color: #efefef;
				border-radius: 22rpx;
				font-size: 25rpx;
				line-height: 55rpx;
				padding-left: 56rpx;
				box-sizing: border-box;
			}
			text{
				font-size: 30rpx;
				letter-spacing: 3rpx;
				color: #272636;
			}
			.search-icon{
				position: absolute;
				width: 34rpx;
				height: 34rpx;
				left: 10rpx;
				top: 11rpx;
			}
			.close-icon{
				position: absolute;
				width: 34rpx;
				height: 34rpx;
				right: 100rpx;
				top: 11rpx;
				z-index: 99;
			}
		}
		/* 供应商列表 */
		.list-box{
			.list-item{
				padding-top: 20rpx;
				padding-bottom: 10rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				border-bottom: solid 1rpx #eee;;
				.left{
					display: flex;
					flex-direction: column;
					width: 380rpx;
					.top{
						width: 100%;
						font-size: 30rpx;
						line-height: 48rpx;
						letter-spacing: 3rpx;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
					.middle,.km,.bottom{
						width: 100%;
						font-size: 25rpx;
						letter-spacing: 3rpx;
						line-height: 48rpx;
						color: #9c9c9c;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
				}
				.right{
					width: 140rpx;
					height: 50rpx;
					background-color: #ff2f2a;
					font-size: 25rpx;
					line-height: 50rpx;
					letter-spacing: 3rpx;
					color: #ffffff;
					text-align: center;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>
