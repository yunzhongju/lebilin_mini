<template>
	<view class="goods-detail">
		<!-- 商品图片 -->
		<!-- <image class="goods-img" :src="goodsDetail.picture" mode=""></image> -->
		<view class="goods-img">
			<swiper class="swiper-box" indicator-active-color="#f39800" :indicator-dots="true" :interval="5000" :duration="1000"
			 :circular="true">
				<swiper-item class="swiper-item" v-for="(item,index) in goodsDetail.introducePic" :key="index">
					<image class="swiper-img" :src="state.baseUrl + item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>


		<!-- 商品信息 -->
		<view class="top-msg">
			<view class="price">
				<view class="pri-detail">
					<text style="color: #e62329;" v-if="goodsDetail.sellPrice">¥{{ goodsDetail.sellPrice }}元</text>
					<text v-if="goodsDetail.integral">+</text>
					<text style="color: #438f11;" v-if="goodsDetail.integral">{{ goodsDetail.integral }}</text>
					<text v-if="goodsDetail.integral">分</text>
				</view>
				<text class="sell">售出{{ goodsDetail.saleVolume }}份 剩余{{ goodsDetail.stock }}份</text>
			</view>
			<text class="old-price">¥{{ goodsDetail.defaultPrice }}元</text>
			<text class="name">{{ goodsDetail.goodsName }}</text>
			<text class="detail">{{ goodsDetail.depict }}</text>

		</view>

		<!-- 拼单 -->
		<view class="pindan" v-if="goodsDetail.isTuan">
			<text class="title">直接参与拼单</text>
			<view class="group-text" v-if="goodsDetail.groupBuy.length == 0">
				暂时没有拼单，快去发起拼单吧~
			</view>

			<swiper v-else class="pindan-list-swiper" :class="{justOne:groupList[0].length == 1}" :autoplay="true" :interval="3000"
			 :duration="1000" :circular="true" :vertical="true">
				<swiper-item class="pindan-list" v-for="(item,index) in groupList" :key="index">
					<view class="item" v-for="(i,v) in item" :key="v">
						<view class="info">
							<image class="avatar" :src="i.headerUrl" mode=""></image>
							<text class="nick-name">{{ i.nickName }}</text>
						</view>
						<text>还差<text style="color: #FF2F29;">1人</text>拼成</text>
						<text class="btn" @click="showModal(1,true,i.hypdzjlid)">去拼单</text>
					</view>
				</swiper-item>
			</swiper>

		</view>

		<!-- 商品详情 -->
		<view class="goods-detail">
			<view class="title">
				商品详情
			</view>
			<view class="img-list">
				<image class="detail-img" :src="state.baseUrl + item" :lazy-load="true" mode="widthFix" v-for="(item,index) in goodsDetail.detailPic"
				 :key="index"></image>
			</view>
		</view>

		<!-- 加入购物车和购买 -->
		<view class="bottom-fixed">
			<view class="collection one">
				<image src="/static/activity_icon/shoucang_icon.png" mode=""></image>
				<text class="text">收藏</text>
			</view>
			<button class="share one" open-type="share">
				<image src="/static/activity_icon/share_icon.png" mode=""></image>
				<text class=".text">分享</text>
			</button>

			<view class="buy two" @click="showModal(1,false)" v-if="goodsDetail.isTuan">
				<text class="price">¥{{ goodsDetail.sellPrice }}元</text>
				<text class="to-buy">单独购买</text>
			</view>
			<view class="add two" @click="showModal(1,true)" v-if="goodsDetail.isTuan">
				<text class="price">¥{{ goodsDetail.groupbuyprice }}元</text>
				<text class="to-add">发起拼单</text>
			</view>

			<view class="buy two" @click="showModal(1,false)" v-if="!goodsDetail.isTuan">
				<text class="to-buy-now">立即购买</text>
			</view>
			
			<view class="add two" v-if="!goodsDetail.isDiscount && !goodsDetail.isTuan && goodsDetail.goodsType == 'gysplx_ptsp'">
				<text class="to-add-car" @click="showModal(2,false)">加入购物车</text>
			</view>
			<view class="add two not-use" v-if="!goodsDetail.isTuan && (goodsDetail.isDiscount || goodsDetail.goodsType != 'gysplx_ptsp')">
				<text class="to-add-car">加入购物车</text>
			</view>
		</view>

		<!-- 立即购买和加购物车时弹出框 -->
		<popup-layer ref="popupRef" :direction="'top'">
			<view class="specifications-box">
				<text class="close" @click="closeModal">X</text>

				<!-- 规格 -->
				<view class="choose-specifications" v-if="goodsDetail.specification.length">
					<view class="item" v-for="(item,index) in goodsDetail.specification" :key="index">
						<text class="title">{{ item.type }}</text>
						<view class="specifications-detail">
							<text class="items" :class="{active:specials[item.type].id == i.id}" @click="chooseOne(item.type,item.param[v])"
							 v-for="(i,v) in item.param" :key="v">{{ i.name }}</text>
						</view>
					</view>

				</view>

				<!-- 选择数量 -->
				<view class="choose-count">
					<text class="title">选择数量</text>
					<view class="num">
						<button type="" :disabled="goodsCount == 1" class="reduce" @click="changeNum(-1)">-</button>
						<input type="number" disabled class="count" v-model="goodsCount" />
						<button type="" class="add" @click="changeNum(1)">+</button>
					</view>
				</view>
				<text class="sure-btn" @click="pageToPay">确定</text>
			</view>
		</popup-layer>

		<!-- 去购物车页面悬浮窗 -->
		<view class="shop-car-btn" @click="pageToShopCar">
			<image class="img" src="/pagesC/static/imgs/shopcar.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	import PopupLayer from '@/pagesC/components/popup-layer.vue'
	import CartApi from '@/servies/CartApi.js'
	import StoreApi from '@/servies/StoreApi.js'
	import OrderApi from '@/servies/OrderApi.js'
	import store from '@/store'
	export default {
		components: {
			PopupLayer
		},
		data() {
			return {
				state: store.state,
				goodsCount: 1,
				byOrAdd: 1, //直接买1还是加入购物车2
				storeId: '',
				goodsId: '',
				goodsDetail: null, //商品详情
				specials: null, //规格
				isTuan:false, //是否拼团
				hypdzjlid:'', //好友拼团标识
			};
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
			pageToPay() {
				let _this = this
				if (this.byOrAdd == 1) { //直接购买--是否拼单购买
					let paramsObj = {
						storeId:this.goodsDetail.storeId,
						productId:this.goodsId,
						quantity:this.goodsCount.toString()
					}
					if( this.specials != null ){ //规格
						let specificationId = [];
						for (let key in this.specials) {
							specificationId.push(this.specials[key].id);
						}
						paramsObj.specificationId = specificationId.join(";")
					}
					if( this.isTuan == true ){ //拼团商品
						paramsObj.isTuan = true
						if( this.hypdzjlid != '' ){
							paramsObj.hypdzjlid = this.hypdzjlid
						}
					}else{
						paramsObj.isTuan = false
					}
					
					console.log( '参数',paramsObj )
					OrderApi.confirmOrder(paramsObj, res => {
						if(res){
							store.commit('setStoreIdtwo',res.storeId)
							uni.navigateTo({
								url: `/pagesC/pages/sureorder/sureorder?confirmOrderInfo=` + encodeURIComponent(JSON.stringify(res))
							})
						}
						
					})
					
				} else if (this.byOrAdd == 2) { //加入购物车--普通商品
					let paramsObj = {
						productId:this.goodsId,
						quantity:this.goodsCount,
					}
					if( this.specials != null ){ //规格
						let specificationId = [];
						for (let key in this.specials) {
							specificationId.push(this.specials[key].id);
						}
						paramsObj.specificationId = specificationId.join(";")
					}
					
					console.log( '参数',paramsObj )
					CartApi.addToCart(paramsObj,res => {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						
						_this.$refs.popupRef.close() // 关闭
						_this.getShoppingCart()
					})

				}
			},
			chooseOne(type, param) {
				this.specials = Object.assign({ ...this.specials}, {[type]: param});
				console.log("规格", this.specials);
			},
			getGoodsDetail() { //获取商品详情
				let _that = this
				StoreApi.getGoodsDetail({
					goodsId: this.goodsId
				}, res => {
					console.log(res)
					this.goodsDetail = res
					store.commit('setStoreId',res.storeId)
					if (res.specification && res.specification.length) {
						res.specification.forEach(item => {
							let keys = item.type;
							let obj = {
								[keys]: item.param[0]
							};
							_that.specials = Object.assign({ ..._that.specials
							}, obj);
						});
					}
				})
			},
			showModal(num,bool,id='') {
				this.$refs.popupRef.show() // 弹出
				this.byOrAdd = num
				this.isTuan = bool
				id != '' ? this.hypdzjlid = id : this.hypdzjlid = ''
			},
			closeModal() {
				this.$refs.popupRef.close() // 关闭
			},
			changeNum(num) {
				if( this.goodsDetail.stock <= this.goodsCount && num == 1 ){ //超出库存
					return uni.showToast({
						title:'库存不足~',
						icon:'none'
					})
				}
				this.goodsCount += num
			},
			pageToShopCar() {
				uni.navigateTo({
					url: "/pagesC/pages/shopcar/shopcar?storeId=" + this.goodsDetail.storeId
				})
			}
			
		},
		computed: {
			groupList() { //拼单列表
				let newArr = []

				if (this.goodsDetail != null && this.goodsDetail.groupBuy.length) { // 团购商品-已经有人拼单
					let middleArr = []
					for (let i = 0; i < this.goodsDetail.groupBuy.length; i++) {
						middleArr.push(this.goodsDetail.groupBuy[i])
						if (i % 2 == 1 || i == this.goodsDetail.groupBuy.length - 1) {
							newArr.push(middleArr)
							middleArr = []
						}
					}
				}
				console.log('拼单列表',newArr)
				return newArr

			}
		},
		onLoad(options) {
			this.goodsId = options.goodsId
			this.getGoodsDetail() //获取商品详情
		},
		onHide() {
			this.$refs.popupRef.close() // 关闭
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				let goodsId = this.goodsId
				return {
					title: this.goodsDetail.goodsName,
					path: '/pagesC/pages/goodsdetail/goodsdetail?goodsId=' + goodsId,
					imageUrl:this.state.baseUrl + this.goodsDetail.detailPic[0]
				}
			}
		
		},
	}
</script>

<style lang="scss">
	.goods-detail {

		//积分兑换
		.integral-exchange {
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 220rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.exchange-btn {
				width: 450rpx;
				height: 60rpx;
				background-color: #ff2f29;
				border-radius: 20rpx;
				line-height: 60rpx;
				text-align: center;
				letter-spacing: 3rpx;
				font-size: 30rpx;
				font-weight: bold;
				color: #fff;
			}
		}

		//弹出框
		.specifications-box {
			box-sizing: border-box;
			padding: 44rpx 60rpx;
			position: relative;

			//规格
			.choose-specifications {
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #eee;

				.item {
					display: flex;
					flex-direction: column;

					.title {
						line-height: 55rpx;
						letter-spacing: 3rpx;
						font-size: 30rpx;
					}

					.specifications-detail {
						display: flex;
						flex-wrap: wrap;

						.items {
							background-color: #efefef;
							height: 40rpx;
							font-size: 25rpx;
							line-height: 40rpx;
							text-align: center;
							border-radius: 20rpx;
							padding: 0 12rpx;
							margin-right: 40rpx;
							margin-bottom: 20rpx;

							&.active {
								background-color: #e62329;
								color: #fff;
							}
						}
					}
				}
			}

			// 选择数量
			.choose-count {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 0 250rpx 0;

				.title {
					font-size: 25rpx;
					line-height: 55rpx;
					letter-spacing: 3rpx;
				}

				.num {
					display: flex;
					align-items: center;

					button {
						padding: 0;
						margin: 0;
						height: 40rpx;
						width: 40rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						text-align: center;
						border-radius: 0;
						background-color: #DCDCDC;

						&:after {
							content: "";
							border: none;
						}
					}

					.reduce {
						border-radius: 20rpx 0 0 20rpx;
					}

					.count {
						width: 58rpx;
						height: 40rpx;
						font-size: 26rpx;
						line-height: 40rpx;
						text-align: center;
						background-color: #eeeeee;
						padding: 0;
						min-height: 0;
					}

					.add {
						border-radius: 0 20rpx 20rpx 0;
					}
				}
			}

			.close {
				position: absolute;
				height: 20rpx;
				width: 16rpx;
				top: 24rpx;
				right: 24rpx;
				padding: 4rpx;
			}

			.sure-btn {
				width: 450rpx;
				height: 60rpx;
				background-color: #ff2f29;
				font-size: 30rpx;
				font-weight: bold;
				letter-spacing: 3rpx;
				color: #ffffff;
				line-height: 60rpx;
				text-align: center;
				position: absolute;
				bottom: 98rpx;
				left: 50%;
				margin-left: -225rpx;
				border-radius: 20rpx;
			}
		}

		//商品图片
		.goods-img {
			width: 100%;
			height: 506rpx;
			display: block;
			margin: 10rpx 0;

			.swiper-box {
				width: 100%;
				height: 100%;
				background-color: #fff;

				.swiper-item {
					width: 506rpx;
					height: 506rpx;
					margin: 0 auto;

					.swiper-img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		// 商品信息
		.top-msg {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0 44rpx;

			.price {
				display: flex;
				justify-content: space-between;

				.pri-detail {
					text {
						font-size: 30rpx;
						line-height: 50rpx;
					}
				}

				.sell {
					font-size: 22rpx;
					line-height: 50rpx;
					letter-spacing: 2rpx;
					color: #b5b5b6;
				}
			}

			.old-price {
				line-height: 50rpx;
				letter-spacing: 3rpx;
				color: #b5b5b6;
				font-weight: bold;
				font-size: 25rpx;
				text-decoration: line-through;
			}

			.name {
				font-size: 30rpx;
				letter-spacing: 3rpx;
				line-height: 50rpx;
			}

			.detail {
				font-size: 25rpx;
				letter-spacing: 3rpx;
				line-height: 50rpx;
				color: #9fa0a0;
			}
		}

		// 拼单
		.pindan {
			padding: 10rpx 0;
			display: flex;
			flex-direction: column;

			.group-text {
				font-size: 26rpx;
				color: #999999;
				text-align: center;
				line-height: 40rpx;
			}

			.title {
				font-size: 25rpx;
				line-height: 50rpx;
				letter-spacing: 3rpx;
				color: #000000;
				padding: 0 44rpx;
				border-bottom: 4rpx solid #eee;
			}

			.pindan-list-swiper {
				height: 174rpx;
				padding: 0 44rpx;
				box-sizing: border-box;

				&.justOne {
					height: 87rpx;
				}

				.pindan-list {
					.item {
						padding-top: 24rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;

						text {
							font-size: 25rpx;
						}

						.info {
							display: flex;
							align-items: center;

							.avatar {
								width: 60rpx;
								height: 60rpx;
								border-radius: 50%;
								margin-right: 8rpx;
							}

							.nick-name {
								font-size: 25rpx;
							}
						}

						.btn {
							width: 110rpx;
							height: 48rpx;
							background-color: #e62329;
							border-radius: 10rpx;
							font-size: 20rpx;
							color: #fff;
							line-height: 48rpx;
							text-align: center;
						}
					}
				}
			}



		}

		// 商品详情
		.goods-detail {
			margin-bottom: 220rpx;

			.title {
				height: 65rpx;
				background-color: #efefef;
				font-size: 35rpx;
				font-weight: bold;
				letter-spacing: 4rpx;
				line-height: 65rpx;
				text-align: center;
			}

			.img-list {
				.detail-img {
					width: 100%;
					display: block;
				}
			}
		}

		// 底部固定栏
		.bottom-fixed {
			background-color: #fff;
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 100rpx;
			display: flex;
			justify-content: space-between;

			.one {
				width: 179rpx;
			}

			.two {
				width: 196rpx;
			}

			.collection {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				image {
					width: 40rpx;
					height: 38rpx;
					margin-bottom: 10rpx;
				}

				.text {
					font-size: 25rpx;
					line-height: 30rpx;
					letter-spacing: 3rpx;
				}
			}

			.share {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				padding: 0;
				padding-right: 78rpx;
				margin: 0;

				&:after {
					content: "";
					border: none;
				}

				image {
					width: 38rpx;
					height: 38rpx;
					margin-bottom: 10rpx;
				}

				.text {
					font-size: 25rpx;
					line-height: 30rpx;
					letter-spacing: 3rpx;
				}
			}

			.buy,
			.add {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background-color: #f39800;

				.price {
					font-size: 25rpx;
					line-height: 50rpx;
					letter-spacing: 0rpx;
					color: #ffffff;
				}

				.to-buy {
					font-size: 25rpx;
					line-height: 30rpx;
					letter-spacing: 3rpx;
					color: #ffffff;
				}

				.to-buy-now {
					font-size: 30rpx;
					font-weight: bold;
					color: #ffffff;
					letter-spacing: 3rpx;
				}
			}

			.add {
				background-color: #e62329;

				&.not-use {
					background-color: #C0C0C0;
				}

				.to-add {
					font-size: 25rpx;
					line-height: 30rpx;
					letter-spacing: 3rpx;
					color: #ffffff;
				}

				.to-add-car {
					font-size: 30rpx;
					font-weight: bold;
					color: #ffffff;
					letter-spacing: 3rpx;

					&.not-use {}
				}
			}
		}

		//去购物车页面悬浮窗
		.shop-car-btn {
			.img {
				position: fixed;
				right: 55rpx;
				top: 660rpx;
				height: 81rpx;
				width: 81rpx;
				border-radius: 50%;
				// box-shadow: -8rpx -8rpx 8rpx #333;
			}
		}
	}
</style>
