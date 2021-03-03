<template>
	<view class="super-shop-box">
		<!-- 导航栏 -->
		<uni-nav-bar fixed status-bar :shadow="false">
			<view style="position: relative;">
				<image class="search-icon" src="/static/home_icon/search_icon.png"></image>
				<input confirm-type="search" @confirm="consoleValue" class="search-color" type="text" v-model="searchGoods"
				 placeholder="搜索" placeholder-style="color: #bababa;" />
			</view>
			<view class="text-white" slot="left">福利</view>
		</uni-nav-bar>


		


		<!-- store-title -->
		<view class="store-title">
			<view class="left">
				<image class="img" :src="storeInfo.thumbnail" mode=""></image>
				<text class="title">{{ storeInfo.storeName }}</text>
				<image class="is-open" v-if="storeInfo.isOpen" src="/static/welfare_icon/open_store.png" mode=""></image>
				<image class="is-open" v-else src="/static/welfare_icon/close_store.png" mode=""></image>
			</view>
			<view class="right" @click="pageToChooseStore">
				<image class="img" :src="state.baseUrl + '/images/wxa_pic/more_store.png'" mode=""></image>
			</view>
		</view>

		<!-- goods-list -->
		<view class="goods-list" :style="{height: state.statusBarHeight + 'px'}">
			<!-- 左边菜单 -->
			<scroll-view scroll-y="true" class="left-menu">
				<view class="item-box">
					<text @click="changeIndex(index)" class="item" :class="{active:index==activeIndex}" v-for="(item,index) in menuOne"
					 :key="index">{{ item.name }}</text>
				</view>
			</scroll-view>
			<!-- 右边内容 -->
			<view class="right-list">
				
				
				
				<!-- 广告 -->
				<!-- top-swiper -->
				<view class="top-swiper-box">
					<!-- 公告 -->
					<view class="notice_box" v-if="storeInfo.storeTip">
						<text class="icon"></text>
						<scroll-view class="marquee_box_container">
							<view class="scrolltxt">
								<view class="marquee_box">
									<view class="marquee_text" :style="{'transform': 'translateX(-' + marqueeDistance + 'rpx)'}">
										<text>{{ storeInfo.storeTip }}</text>
									</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<activity-swiper :jumpMsg="jumpMsg" autoplay=true :imgs='imgs' height="250" radius='0'></activity-swiper>
				</view>
				
				<!-- 选项卡标题 -->
				<scroll-view class="tab-box" scroll-x='true' v-if="childArr">
					<view class="child-tab">
						<view class="item" v-for="(item,index) in childArr" :key="index" @click="changeChildIndex(index)">
							<text class="title" :class="{active:childIndex == index}">{{ item.classifyName }}</text>
							<text class="bottom-line" v-if="childIndex == index"></text>
						</view>
					</view>
				</scroll-view>

				<!-- 商品列表 -->
				<scroll-view class="goods-box" scroll-y="true" @scrolltolower="onLoadMore" :style="{height: state.goodsHei + 'px'}">
					<view class="content-box">

						<!-- 商品列表 -->
						<view class="goods-item-box">

							<view class="goods-item" v-for="(item,index) in goodsListArr" :key="index">
								<!-- 商品标签 -->
								<view class="tag" @click="pageToGoodsDetail(item.productId)">
									<text class="tag-item" v-for="(tag,i) in item.lables" :key="i">{{tag}}</text>
								</view>
								<!-- 商品图片 -->
								<image class="goods-img" @click="pageToGoodsDetail(item.productId)" :src="state.baseUrl + item.picture" :lazy-load="true" mode=""></image>
								<!-- 商品参数 -->
								<view class="parameter">
									<text class="goods-name" @click="pageToGoodsDetail(item.productId)">{{item.goodsName}}</text>
									<text class="goods-depict" @click="pageToGoodsDetail(item.productId)">{{item.depict}}</text>
									<view class="price">
										<view class="left_price" @click="pageToGoodsDetail(item.productId)">
											<text v-if="item.sellPrice" style="color: #e62329;">￥{{ item.sellPrice }}元</text>
											<text v-if="item.integral" style="color: #3bb81e;">+{{ item.integral }}分</text>
										</view>
										<view class="right_icon">
											<image @click="pageToGoodsDetail(item.productId)" v-if="item.isTuan" :src="state.baseUrl + '/images/wxa_pic/pin_icon.png'" mode=""></image>
											<image @click="pageToGoodsDetail(item.productId)" v-if="item.isDiscount" :src="state.baseUrl + '/images/wxa_pic/tuan_icon.png'" mode=""></image>
										</view>
									</view>
									
								</view>
							</view>

						</view>
					</view>
				</scroll-view>


			</view>

		</view>

		<!-- 去购物车页面悬浮窗 -->
		<view class="shop-car-btn" :class="{hui:!state.hasGoods,hong:state.hasGoods}" @click="pageToShopCar">
			<image v-if="!state.hasGoods" class="wawa" src="/static/welfare_icon/wawa_hui.png" mode=""></image>
			<image v-else class="wawa" src="/static/welfare_icon/wawa_hong.png" mode=""></image>
			<text v-if="state.hasGoods" class="count">{{ goodsCount }}</text>
			<view class="right-content">
				<text class="title">支持配送|自提</text>
				<text class="price">￥{{goodsPrice == 0 ? '0.00':goodsPrice}}元</text>
			</view>
		</view>
	</view>
</template>

<script>
	import activitySwiper from '@/components/activitySwiper.vue'
	import {
		uniNavBar
	} from '@dcloudio/uni-ui'
	import StoreApi from '@/servies/StoreApi.js'
	import CommonApi from '@/servies/CommonApi.js'
	import CartApi from '@/servies/CartApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				searchGoods: '', //搜索内容
				imgMsg: [], //轮播图片
				imgs: [],
				jumpMsg: [],
				activeIndex: 0,
				childArr: [], //二级菜单
				childIndex: 0,
				intervalTime: null,
				allStoreData: '测试广告，今天暂停营业，请不要下单,就算你下单了我也不会送，气死你，哈哈哈',
				marqueePace: 2, //滚动速度
				marqueeDistance: 0, // 初始滚动距离
				marquee_margin: 60,
				size: 24,
				interval: 60, // 时间间隔
				storeInfo: null, //店铺信息
				menuOne: [], //一级菜单
				pageNo: 1, //商品页码
				goodsListArr: [], //商品列表
				allowPull: false, //允许下拉刷新
			}
		},
		components: {
			activitySwiper,
			uniNavBar
		},
		computed:{
			goodsCount(){ //商品数量
				let count = 0
				this.state.cartGoods.forEach(item => {
					count += item.countNum
				})
				
				return count
			},
			goodsPrice(){ //商品价格
				let price = 0
				this.state.cartGoods.forEach(item => {
					price += item.countNum * item.sellPrice
				})
				
				return price
			}
		},
		methods: {
			getShoppingCart(){ //获取购物车商品
				CartApi.getShoppingCart({storeId:this.storeInfo.storeId},res => {
					console.log( '购物车商品列表',res )
					store.commit('setCartGoods',res.cartGoods)
					if( res.cartGoods.length == 0 ){
						store.commit('setHasGoods',false)
					}else{
						store.commit('setHasGoods',true)
					}
				})
			},
			jumpFun(jump, url) {
				if (jump) {
					uni.navigateTo({
						url
					})
				}
			},
			getAdvertBanner() { //获取广告
				CommonApi.getAdvertBanner({
					communityId: this.state.communityId,
					displayPosition: 'ggwz_fl'
				}, res => {
					console.log('轮播图片地址', res)
					this.imgMsg = res.map(item => {
						item.picUrl = this.state.baseUrl + item.picUrl
						return item
					})
					this.imgs = res.map(item => item.picUrl)
					this.jumpMsg = res.map(item => {
						let temObj = {}
						temObj.jump = item.jump
						temObj.jumpUrl = item.jumpUrl
						return temObj
					})
					console.log('图片信息', this.imgs, this.imgMsg)
				})
			},
			getStoreGoods(type = 'one') { //获取店铺商品列表
				let paramsObj = {
					storeId: this.storeInfo.storeId,
					pageSize: 10,
					pageNo: this.pageNo
				}

				if (this.childArr.length) { //如果有二级分类
					if (this.menuOne[this.activeIndex].type == 'activity') { //活动分类
						paramsObj.activitySubType = this.childArr[this.childIndex].classifyId
					} else {
						paramsObj.goodsClassify = this.childArr[this.childIndex].classifyId
					}

				} else {
					if (this.menuOne[this.activeIndex].type == 'activity') { //活动分类
						paramsObj.activityType = this.menuOne[this.activeIndex].classifyId
					} else {
						paramsObj.goodsClassify = this.menuOne[this.activeIndex].classifyId
					}
				}



				StoreApi.getStoreGoods(paramsObj, res => {
					if (type == 'one') { //获取第一页
						this.goodsListArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.goodsListArr = [...this.goodsListArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			pageToGoodsDetail(goodsId) {
				uni.navigateTo({
					url: '/pagesC/pages/goodsdetail/goodsdetail?goodsId=' + goodsId
				})
			},
			getSecondClassify() { //获取二级分类
				if (this.menuOne[this.activeIndex].classifyId) { //商品类别二级分类
					StoreApi.getSecondClassify({
						pId: this.menuOne[this.activeIndex].classifyId
					}, res => {
						this.childArr = res
						this.getStoreGoods()
					})
				} else { //活动类型二级分类
					CommonApi.getDataDictionary2({
						parentId: this.menuOne[this.activeIndex].id
					}, res => {
						let classArr = res.map(item => {
							item.classifyId = item.id
							item.classifyName = item.name
							return item
						})
						this.childArr = classArr
						this.getStoreGoods()
					})
				}

			},
			getDataDictionary() { //获取活动类型
				CommonApi.getDataDictionary2({
					parentId: 'sphdlx'
				}, res => {
					let newRes = res.filter(item => item.id != 'none')
					this.menuOne = [...this.menuOne, ...newRes]
					this.getGoodsClassify()
				})
			},
			getGoodsClassify() { //获取商品类别
				StoreApi.getGoodsClassify({
					storeId: this.storeInfo.storeId
				}, res => {
					console.log('商品类别', res)
					let midArr = res.map(item => {
						item.id = item.classifyId
						item.name = item.classifyName
						return item
					})
					this.menuOne = [...this.menuOne, ...midArr]

					this.getSecondClassify()
				})
			},
			getStoreInfo() { //获取店铺信息
				let _this = this
				let paramsObj = {
					communityId: this.state.communityId
				}
				if (this.state.storeId) {
					paramsObj.storeId = this.state.storeId
				}
				StoreApi.getStoreInfo(paramsObj, res => {
					_this.storeInfo = res
					_this.storeInfo.storeTip = '店铺关门了,就算你点我也不送,哈哈哈,啥玩意？就这？大威天龙'
					store.commit('setStoreId', res.storeId)
					_this.getDataDictionary()
					_this.getShoppingCart()
					_this.scrolltxt()
				})
			},
			scrolltxt: function() {
				var that = this;
				if (!this.storeInfo.storeTip) {
					return;
				}
				const length = this.storeInfo.storeTip.length * this.size; // 滚动文字的宽度
				const windowWidth = 460; // 屏幕宽度
				console.log( '文字宽度',length,this.storeInfo.storeTip.length )
				if (length > windowWidth) {
					that.intervalTime = setInterval(function() {
						var maxscrollwidth = length; //滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
						var crentleft = that.marqueeDistance;
						if (crentleft < maxscrollwidth) {
							//判断是否滚动到最大宽度
							that.marqueeDistance = crentleft + that.marqueePace;
						} else {
							that.marqueeDistance = 0;
							clearInterval(that.intervalTime);
							that.scrolltxt();
						}
					}, that.interval);
				} else {
					this.marquee_margin = 1000; //只显示一条不滚动右边间距加大，防止重复显示
				}
			},
			pageToShopCar() {
				uni.navigateTo({
					url: "/pagesC/pages/shopcar/shopcar?storeId=" + this.storeInfo.storeId
				})
			},
			pageToChooseStore() {
				uni.navigateTo({
					url: '/pagesC/pages/choosestore/choosestore'
				})
			},
			consoleValue() {
				if (!this.searchGoods.trim()) {
					return uni.showToast({
						title: '搜索内容不能为空',
						icon: 'none'
					})
				}
				uni.navigateTo({
					url: '/pagesC/pages/goodsseachresult/goodsseachresult?content=' + this.searchGoods + '&storeId=' + this.storeInfo
						.storeId
				})
			},
			changeIndex(index) {
				if (this.activeIndex != index) {
					this.activeIndex = index
					this.childIndex = 0
					this.pageNo = 1
					this.getSecondClassify()
				}
			},
			changeChildIndex(index) {
				if (this.childIndex != index) {
					this.childIndex = index
					this.pageNo = 1
					this.getStoreGoods()
				}
			},
			onLoadMore() { //上拉加载更多
				if (this.allowPull) {
					this.pageNo++
					this.getStoreGoods('more')
				}
			}
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getStoreGoods()
		},
		onShow() {
			
			uni.getSystemInfo({
				success(res) {
					let middle = res.windowWidth / 750 //rpx
					let boxHei = ((res.windowHeight - res.statusBarHeight - 44) / middle - 70) * middle //px
					store.commit('setstatusBarHeight', boxHei)
					let goodsHei = boxHei - 322 * middle
					store.commit('setGoodsHei',goodsHei)
				}
			})

			this.getStoreInfo()

			if (this.state.goodsId) { //从社区优选跳转
				this.timer2 = setTimeout(() => {
					uni.navigateTo({
						url: '/pagesC/pages/goodsdetail/goodsdetail?goodsId=' + this.state.goodsId,
						success(res) {
							store.commit('setGoodsId', '')
						}
					})
				}, 500)
			}
		},
		onLoad(options) {
			this.getAdvertBanner()
		},
		onHide() {
			clearInterval(this.intervalTime)
			clearTimeout(this.timer2)
			this.goodsListArr = []
			this.menuOne = []
		},
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.super-shop-box {
		height: 100%;
		position: relative;

		//去购物车页面悬浮窗
		.shop-car-btn {
			position: fixed;
			bottom: 94rpx;
			left: 105rpx;
			width: 540rpx;
			height: 78rpx;
			border-radius: 39rpx;
			box-shadow: 3rpx 4rpx 5rpx 0rpx rgba(0, 0, 0, 0.75);
			position: relative;
			box-sizing: border-box;
			padding-left: 164rpx;
			padding-right: 26rpx;
			&.hui{
				background-color: #a8a8a8;
			}
			&.hong{
				background-color: #F4665C;
			}
			.wawa {
				width: 102rpx;
				height: 144rpx;
				position: absolute;
				left: 33rpx;
				bottom: 0;
			}
			.count{
				position: absolute;
				width: 32rpx;
				height: 32rpx;
				border-radius: 50%;
				color: #fff;
				background-color: #ff2f29;
				font-size: 20rpx;
				line-height: 32rpx;
				text-align: center;
				left: 109rpx;
				bottom: 31rpx;
			}
			
			.right-content {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
			
				.title {
					font-size: 25rpx;
					letter-spacing: 3rpx;
					line-height: 78rpx;
					color: #ffffff;
				}
			
				.price {
					font-size: 25rpx;
					line-height: 78rpx;
					letter-spacing: 3rpx;
					color: #ffffff;
				}
			}
		}

		// top-swiper
		.top-swiper-box {
			// width: 710rpx;
			// height: 350rpx;
			// background-color: #ffffff;
			// box-shadow: 7rpx 10rpx 27rpx 2rpx rgba(85, 94, 98, 0.15);
			margin: 12rpx auto 0rpx;
			position: relative;
			padding: 0 26rpx 0 29rpx;

			//公告
			.notice_box {
				box-sizing: border-box;
				position: absolute;
				width: 580rpx;
				top: 0rpx;
				left: 0;
				padding: 0 26rpx 0 32rpx;
				background-color: rgba(255, 255, 255, .5);
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 60rpx;
				z-index: 100;
			
				.icon {
					display: inline-block;
					width: 48rpx;
					height: 40rpx;
					background: url(../../static/welfare_icon/notice.png) no-repeat center top;
					background-size: contain;
					margin-right: 20rpx;
				}
			
				.marquee_box_container {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					box-sizing: border-box;
				}
			
				.marquee_box {
					position: relative;
					height: 75rpx;
					display: block;
					overflow: hidden;
				}
			
				.marquee_text {
					font-size: 24rpx;
					white-space: nowrap;
					color: #FF2F29;
					position: absolute;
					top: 0;
					height: 75rpx;
					line-height: 75rpx;
				}
			}

			.top-swiper {
				width: 100%;
				height: 100%;
				// border-radius: 10rpx;
				display: block;


				.swiper-item {
					width: 100%;
					height: 100%;

					.show-img-style {
						border-radius: 10rpx;
						width: 100%;
						height: 100%;
					}
				}
			}
		}


		// store-title
		.store-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0 42rpx;
			height: 70rpx;
			background-color: #f7f7f7;
			// box-shadow: 2rpx 2rpx 3rpx 0rpx rgba(3, 0, 0, 0.1);

			.left {
				display: flex;
				align-items: center;

				.img {
					width: 50rpx;
					height: 50rpx;
					margin-right: 10rpx;
					margin-top: 2rpx;
				}

				.title {
					font-size: 30rpx;
					letter-spacing: 3rpx;
					color: #222222;
					max-width: 256rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					text-align: center;
				}

				.is-open {
					width: 43rpx;
					height: 43rpx;
					// margin-top: 12rpx;
					margin-left: 10rpx;
					align-self: baseline;
				}
			}

			.right {
				display: flex;
				align-items: center;

				.title {
					font-size: 30rpx;
					letter-spacing: 3rpx;
					color: #222222;
				}

				.img {
					width: 41rpx;
					height: 41rpx;
					margin-left: 10rpx;
				}
			}
		}

		//goods-list
		.goods-list {
			display: flex;
			overflow: hidden;

			.left-menu {
				width: 170rpx;
				height: 100%;
				background-color: #f7f7f7;
				// box-shadow: 3rpx 0rpx 3rpx 0rpx rgba(3, 0, 0, 0.1);

				.item-box {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 50rpx;
					box-sizing: border-box;
					.item {
						line-height: 95rpx;
						letter-spacing: 3rpx;
						color: #222222;
						font-size: 28rpx;
						// margin: 10rpx 0;
						// margin-top: 30rpx;
						width: 100%;
						text-align: center;
						position: relative;
						
						&.active {
							font-size: 30rpx;
							font-weight: bold;
							background-color: #fff;
							transition: all 0.3s;
							-webkit-transition: all 0.3s;
							&:after{
								content: "";
								height: 60%;
								width: 15rpx;
								background-color: #e62329;
								position: absolute;
								top: 20%;
								left: 0;
							}
						}
					}
				}
			}
			
			.right-list {
				flex: 1;
				height: 100%;
				box-sizing: border-box;
			
				//广告
				/* .advertising {
					width: 525rpx;
					height: 250rpx;
					box-shadow: 0rpx 0rpx 10rpx rgba(85, 94, 98, 0.3);
					// border-radius: 20rpx;
					// margin-bottom: 20rpx;
					background-color: #fff;
					display: block;
					margin: 0 auto;
				} */

				// 选项卡标题
				.tab-box {
					width: 556rpx;
					margin: 0 auto;

					.child-tab {
						display: flex;
						align-items: center;
						padding-top: 10rpx;
						background-color: #fff;

						.item {
							position: relative;
							margin-right: 40rpx;
							flex-shrink: 0;

							.title {
								font-size: 22rpx;
								line-height: 50rpx;
								letter-spacing: 3rpx;

								&.active {
									font-weight: bold;
									font-size: 25rpx;
								}
							}

							.bottom-line {
								width: 60%;
								height: 4rpx;
								background-color: #FF2F29;
								position: absolute;
								left: 20%;
								bottom: 0rpx;
							}
						}
					}
				}


				//商品列表
				.goods-box {
					height: 100%;
					
					.content-box {

						//商品列表
						.goods-item-box {
							margin-bottom: 100rpx;
							margin-top: 30rpx;
							height: 100%;
							width: 100%;
							box-sizing: border-box;
							padding: 0 10rpx;
							display: flex;
							flex-wrap: wrap;
							align-items: center;

							.goods-item {
								margin: 0 5rpx 10rpx 5rpx;
								border-radius: 10rpx;
								width: 270rpx;
								height: 400rpx;
								background-color: #ffffff;
								box-shadow: 0rpx 0rpx 20rpx rgba(85, 94, 98, 0.1);
								box-sizing: border-box;
								.tag {
									width: 100%;
									margin: 0 auto;
									display: flex;
									height: 40rpx;
									box-sizing: border-box;
									padding: 0 10rpx;
									.tag-item {
										width: 70rpx;
										line-height: 40rpx;
										background-color: #ff2f29;
										border-radius: 10rpx;
										letter-spacing: 3rpx;
										color: #ffffff;
										font-size: 25rpx;
										margin: 0 2rpx;
										text-align: center;
									}
								}

								.goods-img {
									width: 270rpx;
									height: 212rpx;
									display: block;
									margin: 10rpx auto;
								}

								.parameter {
									display: flex;
									flex-direction: column;
									justify-content: center;
									padding: 0 14rpx;
									.goods-name {
										width: 100%;
										line-height: 40rpx;
										font-size: 30rpx;
										letter-spacing: 3rpx;
										color: #222222;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}
									
									.goods-depict{
										width: 164rpx;
										height: 40rpx;
										line-height: 40rpx;
										font-size: 25rpx;
										color: #9fa0a0;
										overflow: hidden;
										text-overflow: ellipsis;
										white-space: nowrap;
									}

									.price {
										width: 100%;
										line-height: 40rpx;
										font-size: 20rpx;
										display: flex;
										align-items: baseline;
										justify-content: space-between;
										.left_price{
											flex: 1;
											display: flex;
											align-items: baseline;
											justify-content: space-between;
											margin-right: 20rpx;
										}
										.right_icon{
											width: 34rpx;
											height: 34rpx;
											image{
												width: 100%;
												height: 100%;
											}
										}
									}
								}
							}
						}
					}
				}


			}
		}


		// 导航搜索
		.search-icon {
			width: 38rpx;
			height: 38rpx;
			position: absolute;
			left: 20rpx;
			top: 6rpx;
		}

		.search-color {
			width: 260rpx;
			height: 50rpx;
			background-color: #f4f4f4;
			border-radius: 50rpx;
			padding-left: 80rpx;
			font-size: 26rpx;
		}

		.text-white {
			color: #000;
			display: flex;
			justify-content: center;
			font-size: 32rpx;
			width: 150rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
</style>
