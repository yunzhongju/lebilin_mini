<template>
	<view class="merchant-info">
		<!-- 商家图片 -->
		<image class="merchant-img" :src="item.thumbnail" mode=""></image>

		<!-- 商家名和评分 -->
		<view class="name-score">
			<text class="name">{{ item.supplierName }}</text>
			<view class="score">
				<image v-for="(i,v) in item.score" :key="v" class="score-items" src="/static/service_icon/star_icon.png" mode="widthFix"></image>

				<image v-for="(e,m) in 5 - item.score" :key="m" class="score-items" src="/static/service_icon/star_icon_false.png"
				 mode="widthFix"></image>
				<text class="num">{{ item.score }}</text>
			</view>
		</view>

		<!-- 商家服务 -->
		<view class="merchant-service">
			<view class="address">
				<image class="address-img" src="/static/service_icon/address.png" mode=""></image>
				<text class="title">{{ item.detailAddress }}</text>
			</view>
			<view class="phone" @click="makeCall(item.phonenum)">
				<image class="phone-img" src="/static/service_icon/phone.png" mode=""></image>
				<text class="title">{{ item.phonenum }}</text>
			</view>
			<view class="services">
				<view class="item" v-for="(z,y) in serviceTag" :key="y">
					<image class="service-img" :src="z.pic" mode=""></image>
					<text class="title">{{ z.name }}</text>
				</view>
				
			</view>
		</view>

		<!-- 本店提供 -->
		<view class="shop-provide">
			<view class="title">本店提供</view>

			<view class="service-box">
				
				<view class="youxuan-item" v-for="(item,index) in goodsList" :key="index" @click="pageToGoodsDetail(item.productId)">
					<!-- goods-tag -->
					<view class="tag-box">
						<text class="tag-items" v-for="(i,v) in item.lables" :key="v">{{ i }}</text>
						
					</view>
					<!-- goods-img -->
					<image class="goods-img" :src="state.baseUrl + item.picture" mode=""></image>
					<!-- goods-price -->
					<view class="price-box">
						<text class="goods-name">{{ item.goodsName }}</text>
						<text class="goods-depict">{{ item.depict }}</text>
						<view class="price">
							<text style="color: #3bb81e;" v-if="item.integral">{{ item.integral }}分+</text>
							<text style="color: #e62329;" v-if="item.sellPrice">￥{{ item.sellPrice }}元/斤</text>
						</view>
					</view>
				</view>

				
			</view>
		</view>

		<!-- share -->
		<button class="share-btn" type="default">
			<image class="share-img" src="/static/service_icon/share_float.png" mode=""></image>
		</button>
	</view>
</template>

<script>
	import StoreApi from '@/servies/StoreApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state:store.state,
				item: null, //居商详情
				pageNo:1,
				allowPull:false,
				goodsList:[], //商品列表
			};
		},
		methods: {
			pageToGoodsDetail(goodsId){
				uni.navigateTo({
					url:'/pagesC/pages/goodsdetail/goodsdetail?goodsId=' + goodsId
				})
			},
			getStoreGoods(type='one'){ //获取商品列表
				let paramsObj = {
					supplierId:this.item.supplierId,
					pageSize:10,
					pageNo:this.pageNo
				}
				
				if( this.state.storeId ){
					paramsObj.storeId = this.state.storeId
				}else{
					paramsObj.storeId = ''
					paramsObj.communityId = this.state.communityId
				}
				
				StoreApi.getStoreGoods(paramsObj,res => {
					console.log( '商品列表',res )
					if( type == 'one' ){
						this.goodsList = res.list
						this.allowPull = !res.lastPage
					}else{
						this.goodsList = [...this.goodsList,...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			makeCall(num) {
				uni.makePhoneCall({
					phoneNumber: num
				})
			}
		},
		computed: {
			serviceTag() { //服务标签
				let TagArr = []
				if (this.item) {
					TagArr = this.item.serviceTag.map(item => {
						if (item == '雨伞') {
							return {
								name: '雨伞',
								pic: '/static/service_icon/yusan_icon.png'
							}
						}
						if (item == '歇脚') {
							return {
								name: '歇脚',
								pic: '/static/service_icon/xiejiao_icon.png'
							}
						}
						if (item == '开水') {
							return {
								name: '开水',
								pic: '/static/service_icon/kaishui_icon.png'
							}
						}
						if (item == '兼职') {
							return {
								name: '兼职',
								pic: '/static/service_icon/jianzhi_icon.png'
							}
						}
						if (item == '微波炉') {
							return {
								name: '微波炉',
								pic: '/static/service_icon/weibolu_icon.png'
							}
						}
					})
				}
				console.log( 'TagArr',TagArr )
				return TagArr
			}
		},
		onLoad(options) {
			this.item = options.item ? JSON.parse(options.item) : null
			this.getStoreGoods()
		}
	}
</script>

<style lang="scss">
	.merchant-info {

		// 商家图片
		.merchant-img {
			width: 100%;
			height: 379rpx;
		}

		//商家名和评分
		.name-score {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			height: 108rpx;
			background-color: #efefef;

			.name {
				font-size: 35rpx;
				line-height: 60 rpx;
				letter-spacing: 3rpx;
				color: #000000;
			}

			.score {
				display: flex;
				align-items: center;

				.score-items {
					width: 28rpx;
					height: 28rpx;
					margin-right: 6rpx;
				}

				.num {
					font-size: 25rpx;
					left: 48rpx;
					letter-spacing: 3rpx;
				}
			}
		}

		//商家服务
		.merchant-service {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 32rpx 58rpx;
			border-bottom: 14rpx solid #efefef;

			.address {
				display: flex;
				align-items: center;

				.address-img {
					width: 24rpx;
					height: 31rpx;
					margin-right: 34rpx;
				}

				.title {
					font-size: 25rpx;
					line-height: 60rpx;
					letter-spacing: 3rpx;
				}
			}

			.phone {
				display: flex;
				align-items: center;
				margin-bottom: 30rpx;

				.phone-img {
					width: 30rpx;
					height: 30rpx;
					margin-right: 34rpx;
				}

				.title {
					font-size: 25rpx;
					line-height: 60rpx;
					letter-spacing: 3rpx;
				}
			}

			.services {
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 20rpx;

					.service-img {
						width: 41rpx;
						height: 41rpx;
					}

					.title {
						width: 126rpx;
						font-size: 25rpx;
						letter-spacing: 3rpx;
						text-align: center;
					}
				}
			}
		}

		//本店提供
		.shop-provide {
			.title {
				line-height: 100rpx;
				text-align: center;
				font-size: 35rpx;
				letter-spacing: 4rpx;
			}

			.service-box {
				box-sizing: border-box;
				padding: 0 10rpx;
				display: flex;
				flex-wrap: wrap;
				align-items: center;

				.youxuan-item {
					border-radius: 20rpx;
					width: 345rpx;
					height: 522rpx;
					margin: 0 10rpx 20rpx 10rpx;
					background-color: #ffffff;
					box-shadow: 0rpx 12rpx 27rpx 2rpx rgba(85, 94, 98, 0.3);

					// goods-tag
					.tag-box {
						margin-left: 20rpx;
						display: flex;
						flex-wrap: wrap;
						height: 40rpx;
						.tag-items {
							width: 81rpx;
							line-height: 40rpx;
							background-color: #ff2f29;
							border-radius: 6rpx;
							text-align: center;
							font-size: 25rpx;
							letter-spacing: 3rpx;
							color: #ffffff;
							margin-right: 4rpx;
							margin-bottom: 4rpx;
						}
					}

					// goods-img
					.goods-img {
						width: 305rpx;
						height: 305rpx;
						margin: 26rpx auto;
						display: block;
					}

					//goods-price
					.price-box {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						.goods-name {
							font-size: 30rpx;
							letter-spacing: 3rpx;
							color: #222222;
							line-height: 50rpx;
						}
						
						.goods-depict{
							
							height: 40rpx;
							line-height: 40rpx;
							font-size: 25rpx;
							color: #9fa0a0;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						.price {
							font-size: 25rpx;
							letter-spacing: 3rpx;
						}
					}
				}
			}
		}

		//share
		.share-btn {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			padding: 0;
			position: fixed;
			right: 39rpx;
			bottom: 338rpx;
			border: 0;

			&:after {
				content: "";
				border: none;
			}

			.share-img {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
		}
	}
</style>
