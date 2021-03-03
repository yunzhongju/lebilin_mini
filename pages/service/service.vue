<template>
	<view class="service-box">
		<!-- <view class="top-bg"></view> -->

		<!-- 顶部轮播 -->
		<view class="swiper-box">
			<activity-swiper previousMargin="30rpx" nextMargin="30rpx" :jumpMsg="jumpMsg" :imgs='imgs'></activity-swiper>
		</view>


		<!-- 办事指南 -->
		<view class="card card-all">
			<view class="title">
				<text class="title-name">办事指南</text>
			</view>
			<view class="things-swiper-box">
				<swiper class="shequ-swiper" circular indicator-active-color="#FFC500" :indicator-dots="true" :interval="3000"
				 :duration="500">
					<swiper-item class="item-style">
						<view class="swiper-item" @click="pageToGuide">
							<image src="/static/service_icon/study_icon.png" mode=""></image>
							<text>办事指南</text>
						</view>
						<view class="swiper-item" @click="pageToInnovationMain">
							<image src="/static/service_icon/house_icon.png" mode=""></image>
							<text>创新创业</text>
						</view>
						<view class="swiper-item">
							<image src="/static/service_icon/work_icon.png" mode=""></image>
							<text>便民服务</text>
						</view>
						<view class="swiper-item">
							<image src="/static/service_icon/child_icon.png" mode=""></image>
							<text>小区服务</text>
						</view>
					</swiper-item>
					<swiper-item class="item-style">
						<view class="swiper-item">
							<image src="/static/service_icon/house_icon.png" mode=""></image>
							<text>居住办理</text>
						</view>
						<view class="swiper-item">
							<image src="/static/service_icon/work_icon.png" mode=""></image>
							<text>创业服务</text>
						</view>
					</swiper-item>

				</swiper>
			</view>
		</view>


		<!-- 居民心愿 -->
		<view class="card">
			<view class="title">
				<text class="title-name">居民心愿</text>
				<!-- <text class="right" @click="pageToHopemain">···</text> -->
				<image src="/static/home_icon/more.png" mode="" class="right" @click="pageToHopemain"></image>
			</view>

			<view class="wish-box">
				<view v-if="hopeArr.length == 0" style="font-size: 26rpx;text-align: center;width: 100%;line-height: 100rpx;">
					<image src="/static/service_icon/hope.jpg" mode="widthFix" style="width: 100%;border-radius: 20rpx;" @click="pageToHopemain"></image>
				</view>

				<view class="wish-item wish-box" v-for="(item,index) in hopeArr" :key="index">
					<text class="wish-title" @click="pageToHopeDetail(item.msgId)">
						{{item.msgTitle}}（{{item.needPerson}}名）
					</text>
					<text class="wish-content" @click="pageToHopeDetail(item.msgId)">
						{{item.msgContent}}
					</text>
					<view class="wish-person">
						<image class="avatar" :src="item.headerUrl" mode=""></image>
						<text class="need">需<text style="color: #e62329;">{{item.needPerson}}</text>人</text>
						<text class="to-recieve" @click="toLingqu(item.msgId)">认领</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 居商联盟 -->
		<view class="card">
			<view class="title">
				<text class="title-name">居商联盟</text>
				<!-- <text class="right" v-if="state.isPassAddr && state.lat && state.lng" @click="pageToUnion">···</text> -->
				<image src="/static/home_icon/more.png" mode="" class="right" v-if="state.isPassAddr && state.lat && state.lng" @click="pageToUnion"></image>
				<image src="/static/home_icon/more.png" mode="" class="right" v-if="state.isPassAddr && !(state.lat && state.lng)" @click="getLocation"></image>
				<button class="right get-btn" v-if="!state.isPassAddr" open-type="openSetting" @opensetting="goSetting">
					<image style="width: 100%;height: 100%;" src="/static/home_icon/more.png" mode=""></image>
				</button>
			</view>
			<view class="dangjian-box">
				
				<view class="lianmeng-item" v-for="(item,index) in mercgantinfoArr" :key="index" @click="pageToMerchanInfo(item)">
					<view class="img-box">
						<image class="top-img" :src="item.thumbnail" mode=""></image>
					</view>
					<view class="merchat">
						<text class="merchat-name">{{ supplierName }}</text>
						<view class="star">
							<image v-for="(i,v) in item.score" :key="v" class="one-star" src="/static/service_icon/star_icon.png" mode="widthFix"></image>
							
							<image v-for="(e,m) in 5 - item.score" :key="m" class="one-star" src="/static/service_icon/star_icon_false.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="bottom-items">
						<view class="item-box" v-for="(tags,i) in serviceTag[index]" :key="i">
							<image :src="tags.pic" mode=""></image>
							<text>{{ tags.name }}</text>
						</view>
						
					</view>
				</view>

			</view>
		</view>

		<!-- 社区优选 -->
		<!-- <view class="card2 padding-zero"> -->
		<view class="community-select padding-zero">
			<view class="title">
				<text class="title-name">社区优选</text>
			</view>
		</view>
		<view class="service-box">

			<view class="youxuan-item" v-for="(item,index) in listArr" :key="index" @click="pageToWelfare(item.storeId,item.productId)">
				<!-- goods-tag -->
				<view class="tag-box">
					<text class="tag-items" v-for="(tag,i) in item.lables" :key="i">{{tag}}</text>
				</view>
				<!-- goods-img -->
				<image class="goods-img" :src="state.baseUrl + item.picture" mode=""></image>
				<!-- goods-price -->
				<view class="price-box">
					<text class="goods-name">{{ item.goodsName }}</text>
					<text class="goods-depict">{{ item.depict }}</text>
					<view class="price">
						<text style="color: #3bb81e;" v-if="item.integral">{{ item.integral }}分+</text>
						<text style="color: #e62329;" v-if="item.sellPrice">￥{{ item.sellPrice }}元</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getLocatio_LBS
	} from 'utils'
	import activitySwiper from '@/components/activitySwiper.vue'
	import SupplierApi from '@/servies/SupplierApi.js'
	import WishApi from '@/servies/WishApi.js'
	import store from '@/store'
	import StoreApi from '@/servies/StoreApi.js'
	import CommonApi from '@/servies/CommonApi.js'
	export default {
		data() {
			return {
				state: store.state,
				imgs: [],
				jumpMsg:[],
				hopeArr: [], //心愿
				pageNo: 1,
				allowPull: false, //允许上拉加载更多
				listArr: [], //商品列表
				mercgantinfoArr: [], //居商联盟列表
			}
		},
		components: {
			activitySwiper
		},
		computed:{
			serviceTag(){ //居商联盟服务标签
				let TagArr = []
				if( this.mercgantinfoArr != [] ){
					let temArr = this.mercgantinfoArr.map(item => item.serviceTag)
					
					TagArr = temArr.map(item => {
						let arr = []
						for( let i = 0; i< item.length; i++ ){
							if( item[i] == '雨伞' ){
								arr.push({
									pic:'/static/service_icon/yusan_icon.png',
									name:'雨伞'
								})
							}
							if( item[i] == '歇脚' ){
								arr.push({
									pic:'/static/service_icon/xiejiao_icon.png',
									name:'歇脚'
								})
							}
							if( item[i] == '开水' ){
								arr.push({
									pic:'/static/service_icon/kaishui_icon.png',
									name:'开水'
								})
								
							}
							if( item[i] == '兼职' ){
								arr.push({
									pic:'/static/service_icon/jianzhi_icon.png',
									name:'兼职'
								})
								
							}
							if( item[i] == '微波炉' ){
								arr.push({
									pic:'/static/service_icon/weibolu_icon.png',
									name:'微波炉'
								})
								
							}
							
						}
						if( arr.length > 4 ){
							return arr.slice(0,4)
						}
						return arr
					})

				}
				
				return TagArr
				
				
			}
		},
		methods: {
			getAdvertBanner(){ //获取广告
				CommonApi.getAdvertBanner({
					communityId:this.state.communityId,
					displayPosition:'ggwz_fw'
				},res => {
					console.log('轮播图片地址',res)
					this.imgs = res.map(item => this.state.baseUrl + item.picUrl)
					this.jumpMsg = res.map(item => {
						let temObj = {}
						temObj.jump = item.jump
						temObj.jumpUrl = item.jumpUrl
						return temObj
					})
				})
			},
			pageToMerchanInfo(item){
				uni.navigateTo({
					url:'/pagesB/pages/merchantinfo/merchantinfo?item=' + JSON.stringify(item)
				})
			},
			goSetting(res) { //选择地址
				const vm = this;
				// 获取定位权限
				if (res.mp.detail.authSetting["scope.userLocation"]) {
					getLocatio_LBS(flag => {
						uni.navigateTo({
							url: '/pagesC/pages/union/union'
						})
					});
				}else{
					uni.showToast({
						title:'拒绝定位授权将获取不到您的位置~',
						icon:'none'
					})
				}
			},
			getLocation(){ //获取定位
				getLocatio_LBS(flag => {
					uni.navigateTo({
						url: '/pagesC/pages/union/union'
					})
				});
				
			},
			getBusinessLeagues() { //获取居商联盟列表
				let _this = this
				let paramsObj = {
					communityId: this.state.communityId,
					pageSize: 2,
					pageNo: 1,
				}
				
				if (this.state.lat && this.state.lng) {
					paramsObj.location = this.state.lng + ',' + this.state.lat
				}
				
				SupplierApi.getBusinessLeagues(paramsObj, res => {
					_this.mercgantinfoArr = res.list
					console.log('居商列表', res)
				})

			},
			pageToUnion() {
				uni.navigateTo({
					url: '/pagesC/pages/union/union'
				})
			},
			pageToWelfare(storeId, goodsId) {
				store.commit('setStoreId', storeId)
				store.commit('setGoodsId', goodsId)
				uni.switchTab({
					url: `/pages/welfare/welfare`
				})
			},
			getOptimizationGoods(type = 'one') { //获取社区优选商品
				StoreApi.getOptimizationGoods({
					communityId: this.state.communityId,
					pageSize: 8,
					pageNo: this.pageNo
				}, res => {
					if (type == 'one') { //第一页
						this.listArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.listArr = [...this.listArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			toLingqu(msgId) { //领取心愿
				WishApi.claimWish({
					msgId
				}, res => {
					uni.showToast({
						title: "心愿领取成功",
						icon: 'none',
						mask: true
					})
					if (res.status == 1) {
						uni.navigateTo({
							url: "/pagesB/pages/hopemain/hopemain?index=1"
						})
					}
				})
			},
			pageToHopeDetail(msgId) {
				uni.navigateTo({
					url: '/pagesB/pages/hopeevaluation/hopeevaluation?msgId=' + msgId
				})
			},
			pageToHopemain() {
				uni.navigateTo({
					url: '/pagesB/pages/hopemain/hopemain'
				})
			},
			pageToInnovationMain() {
				uni.navigateTo({
					url: '/pagesB/pages/innovationmain/innovationmain'
				})
			},
			pageToGuide() {
				uni.navigateTo({
					url: '/pagesB/pages/guideaction/guideaction'
				})
			}
		},
		onLoad(options) {
			
			this.getAdvertBanner()
			
			WishApi.getWishList({
				communityId: this.state.communityId,
				pageSize: 20,
				pageNo: 1
			}, res => {
				let newArr = res.list.filter(item => {
					return !item.isPublisher && item.progress == 1
				})
				this.hopeArr = newArr.slice(0, 2)
			})

			this.getOptimizationGoods() //获取社区优选商品第一页

			this.getBusinessLeagues() // 获取居商联盟列表
		},
		onPullDownRefresh() { //下拉刷新

			this.pageNo = 1

			WishApi.getWishList({
				communityId: this.state.communityId,
				pageSize: 20,
				pageNo: 1
			}, res => {
				let newArr = res.list.filter(item => {
					return !item.isPublisher
				})
				this.hopeArr = newArr.slice(0, 2)
			})

			this.getOptimizationGoods() //获取社区优选商品第一页
			this.getBusinessLeagues()
		},
		onReachBottom() { //上拉加载更多
			if (this.allowPull) {
				this.pageNo++
				this.getOptimizationGoods('more')
			}
		}
	}
</script>

<style lang="scss">
	.service-box {
		position: relative;

		.top-bg {
			margin-top: 1rpx;
			height: 220rpx;
			background-color: $uni-bgc-top;
			margin-bottom: 180rpx;
		}

		//顶部轮播
		.swiper-box {
			// position: absolute;
			width: 100%;
			padding-top: 20rpx;
			// top: 40rpx;
			// left: 0;
		}

		//办事指南
		.things-swiper-box {
			.shequ-swiper {
				height: 176rpx;

				.item-style {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					padding-top: 10rpx;

					.swiper-item {
						width: 140rpx;
						margin: 0rpx 23rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						image {
							width: 80rpx;
							height: 80rpx;
						}

						text {
							font-size: 28rpx;
							line-height: 50rpx;
						}
					}
				}
			}
		}

		//党建商家联盟
		.dangjian-box {
			display: flex;
			justify-content: space-between;

			.lianmeng-item {
				border-radius: 10rpx;
				width: 340rpx;
				// background-color: #E62329;
				box-sizing: border-box;
				padding: 10rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				border: solid 2rpx #eeeeee;
				border-radius: 10rpx;

				.img-box {
					width: 100%;
					padding: 0 10rpx;
					box-sizing: border-box;

					.top-img {
						width: 100%;
						height: 196rpx;
						display: block;
						margin: 0 auto;
						border-radius: 10rpx;
					}
				}

				.merchat {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 8rpx;

					.merchat-name {
						font-size: 26rpx;
						// color: #fff;
						line-height: 50rpx;
					}

					.star {
						margin: 16rpx 0;
						display: flex;
						justify-content: center;

						.one-star {
							width: 15rpx;
							margin: 0 2rpx;
						}
					}
				}

				.bottom-items {
					display: flex;
					justify-content: flex-start;
					align-items: flex-start;
					width: 100%;

					.item-box {
						width: 80rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						text {
							font-size: 22rpx;
							// color: #fff;
							line-height: 50rpx;
						}

						image {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
		}

		//创新创业
		.innovation-box {
			display: flex;
			justify-content: space-between;

			.innovation-item {
				border-radius: 10rpx;
				width: 340rpx;
				height: 310rpx;
				background-color: #EFEFEF;
				padding: 10rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
			}

			.item-left {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				// padding: 40rpx;
				box-sizing: border-box;

				.top-img {
					width: 100%;
				}

				.bottom-title {
					font-size: 26rpx;
					line-height: 60rpx;
				}
			}

			.item-right {
				display: flex;
				flex-direction: column;
				box-sizing: border-box;
				padding: 16rpx;

				// justify-content: space-around;
				.right-title {
					font-size: 26rpx;
					line-height: 45rpx;
					margin-bottom: 20rpx;
				}

				.right-content {
					font-size: 22rpx;
					color: #727171;

					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 5;
					-webkit-box-orient: vertical;
				}
			}
		}

		//居民心愿
		.wish-box {
			display: flex;
			justify-content: space-between;

			.wish-item {
				border-radius: 10rpx;
				width: 340rpx;
				// background-color: #E62329;
				padding: 20rpx;
				box-sizing: border-box;
				display: flex;
				flex-direction: column;
				align-items: center;
				// height: 210rpx;
				border-radius: 10rpx;
				border: solid 2rpx #eeeeee;
			}

			.wish-box {
				// background-color: #3745AA;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: flex-start;

				.wish-title {
					font-size: 26rpx;
					// color: #fff;
					line-height: 50rpx;
				}

				.wish-content {
					font-size: 22rpx;
					// color: #dcdddd;
					margin-bottom: 10rpx;

					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.wish-person {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.avatar {
						width: 56rpx;
						height: 56rpx;
						border-radius: 50%;
					}

					.need {
						font-size: 22rpx;
						// color: #dcdddd;
					}

					.to-recieve {
						width: 80rpx;
						height: 30rpx;
						border: solid 2rpx #e62329;
						line-height: 30rpx;
						font-size: 22rpx;
						color: #e62329;
						text-align: center;
						border-radius: 8rpx;
					}
				}
			}
		}

		//社区优选
		.community-select{
			height: 70rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.title{
				text-align: center;
				.title-name{
					display: inline-block;
					font-size: 34rpx;
					font-weight: bold;
					line-height: 42rpx;
					width: 258rpx;
					height: 42rpx;
					background: url(../../static/service_icon/recommend_icon.png) no-repeat center center;
					background-size: 100% 100%;
				}
			}
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
				// box-shadow: 0rpx 12rpx 27rpx 2rpx rgba(85, 94, 98, 0.15);

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
					width: 320rpx;
					height: 320rpx;
					display: block;
					margin: 16rpx auto;
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

	//公共卡片
	.card {
		background-color: #fff;
		border-radius: 10rpx;
		// box-shadow: 0rpx 12rpx 27rpx 2rpx rgba(85, 94, 98, 0.15);
		box-sizing: border-box;
		margin: 20rpx;
		padding: 10rpx;

		.title {
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f2f2f3;
			margin-bottom: 16rpx;
			.title-name {
				font-size: 34rpx;
				font-weight: bold;
				line-height: 70rpx;
				position: relative;

				&:after {
					content: "";
					width: 0;
					height: 27rpx;
					position: absolute;
					left: -15rpx;
					top: 20rpx;
					border-radius: 4rpx;
					border: 4rpx solid #e62329;
				}
			}

			.right {
				width: 36rpx;
				height: 36rpx;
				margin-left: 16rpx;
			}
		}
	}

	.card2 {
		border-radius: 10rpx;
		margin: 20rpx;
		padding: 10rpx;

		.title {
			margin: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title-name {
				font-size: 34rpx;
				font-weight: bold;
				line-height: 60rpx;
				position: relative;

				&:after {
					content: "";
					width: 0;
					height: 27rpx;
					position: absolute;
					left: -15rpx;
					top: 20rpx;
					border-radius: 4rpx;
					border: 4rpx solid #e62329;
				}
			}

			.right {
				width: 36rpx;
				height: 36rpx;
				margin-left: 16rpx;
			}
		}
	}
	
	.card-all{
		margin: 20rpx 0;
		border-radius: 0;
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	
	.padding-zero {
		padding: 0;
	}

	.padding-ten {
		padding: 10rpx;
	}
	
	.get-btn{
		background-color: #fff;
		padding: 0;
		border: 0;
		margin: 0;
		line-height: 36rpx;
		&:after{
			content: "";
			border: none;
		}
	}
	page{
		background-color: #f7f7f7;
	}
</style>
