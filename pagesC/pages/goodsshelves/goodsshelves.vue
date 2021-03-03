<template>
	<view class="goods-shelves">
		<!-- 顶部tab-title -->
		<view class="top-tab-title">
			<view class="item" v-for="(item,index) in tabArr" :key="index" @click="changeTabIndex(index)">
				<text class="title" :class="{active:tabIndex == index}">{{ item }}</text>
				<text class="bottom-line" v-if="tabIndex == index"></text>
			</view>
		</view>
		<!-- search -->
		<view class="search-box" v-if="tabIndex == 0">
			<input type="text" :focus="isFocus" value="" v-model="searchContent" placeholder="请输入关键字" />
			<text @click="getList">搜索</text>
			<image class="search-icon" src="/pagesC/static/imgs/search_icon.png" mode=""></image>
			<image class="close-icon" src="/pagesC/static/imgs/close.png" mode="" v-if="searchContent" @click="clearContent"></image>
		</view>
		<view class="search-box" v-if="tabIndex == 1">
			<input type="text" :focus="isFocus" value="" v-model="searchContent2" placeholder="请输入关键字" />
			<text>搜索</text>
			<image class="search-icon" src="/pagesC/static/imgs/search_icon.png" mode=""></image>
			<image class="close-icon" src="/pagesC/static/imgs/close.png" mode="" v-if="searchContent" @click="clearContent"></image>
		</view>
		<!-- tab-content -->
		<view class="tab-content">

			<scroll-view scroll-x=true>
				<view class="child-tab">
					<view class="item" v-for="(item,i) in classifyArr" :key="i" @click="changeChildIndex(i)">
						<text class="title">{{ item.classifyName }}</text>
						<text class="bottom-line" :class="{active:childIndex == i}"></text>
					</view>
				</view>
			</scroll-view>

			<view class="child-content" v-if="tabIndex == 0">
				<view style="line-height: 100rpx;font-size: 25rpx;text-align: center;color: #999999;" v-if="canSelectSellArr.length == 0">
					暂无相关类别商品~
				</view>
				<view class="item1" @click="pageToManage(item.goodsId,supplierId,item.isSell)" v-for="(item,index) in canSelectSellArr"
				 :key="index">
					<image class="left" :src="state.baseUrl + item.picture" mode=""></image>
					<view class="middle">
						<text class="name">{{ item.goodsName }}</text>
						<text class="quality">{{ item.depict }}</text>
						<text class="price">￥{{ item.supplyPrice }}元</text>
					</view>
					<image v-if="item.isSell" class="right" src="/pagesC/static/imgs/shelves.png" mode=""></image>
					<text v-else class="right"></text>
				</view>

			</view>
			<view class="child-content" v-if="tabIndex == 1">
				
				<view style="color: #C0C0C0;font-size: 26rpx;line-height: 60rpx;text-align: center;" v-if="!sellArr.length">
					暂时没有相关类型商品
				</view>
				
				<view class="item2" v-for="(item,index) in sellArr" :key="index">
					<view class="left">
						<image class="goods" :src="state.baseUrl + item.picture" mode=""></image>
						<image class="tag" v-if="item.isTuan" src="/pagesC/static/imgs/tuangou.png" mode=""></image>
						<image class="tag" v-if="item.isDiscount" src="/pagesC/static/imgs/tejia.png" mode=""></image>
					</view>
					<view class="middle">
						<text class="name">{{ item.goodsName }}</text>
						<text class="supplier">供应商：{{ item.supplierName }}</text>
						<view class="price">
							<text class="price1">￥{{ item.defaultPrice }}元</text>
							<text class="price2">￥{{ item.sellPrice }}元</text>
						</view>
						<text class="date">上架日期：{{ item.createtime }}</text>
					</view>
					<view class="right">
						<text class="inventory">库存 {{ item.stock }}</text>
						<image class="call" src="/pagesC/static/imgs/call.png" mode="" @click="makeCall(item.supplierPhoneNum)"></image>
						<text class="btn" @click="removeGoods(item.productId)">商品下架</text>
					</view>
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
				state: store.state,
				tabArr: ['可选商品', '在售商品'],
				tabIndex: 0,
				searchContent: '',
				searchContent2: '',
				idFocus: false,
				childIndex: 0,
				supplierId: '',
				storeId: '',
				supplierInfo: null, //供应商信息
				classifyArr: [],
				pageNo: 1,
				allowPull: false, //允许上拉加载更多
				sellArr: [], //在售商品列表
				canSelectSellArr: [], //可选商品列表
			};
		},
		methods: {
			removeGoods(productId){ //店铺下架商品
				StoreApi.removeStoreGoods({productId}, res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if( res.status == 1 ){
						this.pageNo = 1
						this.getSupplyGoods()
					}
					
				})
			},
			makeCall(phoneNum){
				uni.makePhoneCall({
					phoneNumber:phoneNum
				})
			},
			getSupplyGoods(type = 'one') { //获取供商品列表-供应商商品和已上架商品 
				let _that = this
				if (this.tabIndex == 0) { //供应商商品列表
					let paramsObj = {
						supplierId: _that.supplierId,
						storeId: _that.storeId,
						goodsClassify: _that.classifyArr[_that.childIndex].classifyId,
						pageSize: 10,
						pageNo: _that.pageNo
					}
					if (_that.searchContent) {
						paramsObj.searchContent = _that.searchContent
					}
					StoreApi.getSupplyGoods(paramsObj, res => {
						console.log('可选商品列表', res)
						if (type == 'one') { //第一页
							this.canSelectSellArr = res.list
							this.allowPull = !res.lastPage
						} else { //上拉加载更多
							this.canSelectSellArr = [...this.canSelectSellArr, ...res.list]
							this.allowPull = !res.lastPage
						}
					})
				} else if (this.tabIndex == 1) { //店铺已上架商品列表
					let paramsObj = {
						storeId: _that.storeId,
						goodsClassify: _that.classifyArr[_that.childIndex].classifyId,
						pageSize: 10,
						pageNo: _that.pageNo
					}
					if (_that.searchContent) {
						paramsObj.searchContent = _that.searchContent
					}
					StoreApi.getStoreGoods(paramsObj, res => {
						console.log('已上架商品列表', res)
						if( type == 'one' ){
							this.sellArr = res.list
							this.allowPull = !res.lastPage
						}else {
							this.sellArr = [...this.sellArr, ...res.list]
							this.allowPull = !res.lastPage
						}
					})
				}

			},
			getGoodsClassify(params) { //获取商品类别
				let _this = this
				StoreApi.getGoodsClassify(params, res => {
					_this.classifyArr = res
					_this.getSupplyGoods()
				})
			},
			changeTabIndex(index) {
				if (this.tabIndex != index) {
					this.tabIndex = index
					this.pageNo = 1
					this.getSupplyGoods()
				}
			},
			changeChildIndex(index) {
				if (this.childIndex != index) {
					this.childIndex = index
					this.getSupplyGoods()
				}
			},
			getList(){
				this.pageNo = 1
				this.getSupplyGoods()
			},
			clearContent() {
				this.searchContent = '',
					this.isFocus = true
			},
			pageToManage(goodsId, supplierId,isSell) {
				if( isSell ){
					return uni.showToast({
						title:'请先下架该商品',
						icon:'none'
					})
				}
				uni.navigateTo({
					url: `/pagesC/pages/goodsmanage/goodsmanage?goodsId=${goodsId}&supplierId=${supplierId}&storeId=${this.storeId}`
				})
			}
		},
		onLoad(options) {
			this.supplierId = options.supplierId || ''
			this.storeId = options.storeId || ''
			this.getGoodsClassify({
				supplierId: options.supplierId
			})
		},
		onReachBottom() { // 上拉加载更多
			if( this.allowPull ){
				this.pageNo ++ 
				this.getSupplyGoods('more')
			}
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getSupplyGoods()
		}
	}
</script>

<style lang="scss">
	.goods-shelves {

		// 顶部tab-title
		.top-tab-title {
			display: flex;
			justify-content: space-around;
			padding: 20rpx 0;

			.item {
				position: relative;

				.title {
					font-size: 30rpx;
					line-height: 48rpx;
					font-weight: bold;
					letter-spacing: 3rpx;
					color: #969696;

					&.active {
						color: #FF2F29;
					}
				}

				.bottom-line {
					width: 50%;
					height: 4rpx;
					background-color: #FF2F29;
					position: absolute;
					left: 25%;
					bottom: -10rpx;
				}
			}
		}

		//search              
		.search-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			margin: 20rpx 28rpx;

			input {
				width: 613rpx;
				height: 55rpx;
				background-color: #efefef;
				border-radius: 22rpx;
				font-size: 25rpx;
				line-height: 55rpx;
				padding-left: 56rpx;
				box-sizing: border-box;
			}

			text {
				font-size: 30rpx;
				letter-spacing: 3rpx;
				color: #272636;
			}

			.search-icon {
				position: absolute;
				width: 34rpx;
				height: 34rpx;
				left: 10rpx;
				top: 11rpx;
			}

			.close-icon {
				position: absolute;
				width: 34rpx;
				height: 34rpx;
				right: 100rpx;
				top: 11rpx;
				z-index: 99;
			}
		}

		//tab-content
		.tab-content {
			margin: 0 10rpx;

			.child-tab {
				display: flex;
				align-items: center;
				height: 72rpx;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					margin-right: 40rpx;
					flex-shrink: 0;

					.title {
						font-size: 30rpx;
						line-height: 48rpx;
						font-weight: bold;
						letter-spacing: 3rpx;
					}

					.bottom-line {
						width: 50%;
						height: 4rpx;

						&.active {
							background-color: #FF2F29;
						}

						/* position: absolute;
						left: 25%;
						bottom: -10rpx; */
					}
				}
			}

			.child-content {
				box-sizing: border-box;
				padding: 0 34rpx;

				.item1 {
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 30rpx;
					border-bottom: 1rpx solid #eee;

					.left {
						width: 178rpx;
						height: 178rpx;
					}

					.middle {
						width: 284rpx;
						display: flex;
						flex-direction: column;

						.name {
							font-size: 30rpx;
							line-height: 48rpx;
							letter-spacing: 3rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.quality {
							font-size: 25rpx;
							line-height: 48rpx;
							letter-spacing: 3rpx;
							color: #969696;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.price {
							font-size: 25rpx;
							line-height: 48rpx;
							letter-spacing: 3rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
					}

					.right {
						width: 136rpx;
						height: 109rpx;
					}
				}

				.item2 {
					border-bottom: 1rpx solid #eee;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30rpx 0;

					.left {
						width: 178rpx;
						height: 178rpx;
						position: relative;

						.goods {
							width: 100%;
							height: 100%;
						}

						.tag {
							position: absolute;
							left: 0rpx;
							top: 0rpx;
							width: 66rpx;
							height: 71rpx;
						}
					}

					.middle {
						width: 318rpx;
						display: flex;
						flex-direction: column;

						.name {
							font-size: 30rpx;
							line-height: 48rpx;
							letter-spacing: 3rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.supplier {
							font-size: 25rpx;
							line-height: 48rpx;
							letter-spacing: 3rpx;
							color: #969696;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}

						.price {
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;

							.price1,
							.price2 {
								text-decoration: line-through;
								font-size: 25rpx;
								line-height: 48rpx;
								letter-spacing: 3rpx;
								color: #969696;
							}

							.price2 {
								color: #FF2F29;
								text-decoration: none;
								margin-left: 10rpx;
							}
						}

						.date {
							font-size: 20rpx;
							letter-spacing: 2rpx;
							color: #969696;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
					}

					.right {
						width: 130rpx;
						display: flex;
						flex-direction: column;
						align-items: center;

						.inventory {
							font-size: 25rpx;
							letter-spacing: 3rpx;
							color: #969696;
						}

						.call {
							width: 49rpx;
							height: 49rpx;
							margin: 26rpx 0;
						}

						.btn {
							width: 130rpx;
							height: 48rpx;
							background-color: #ff2f29;
							border-radius: 10rpx;
							line-height: 48rpx;
							font-size: 25rpx;
							text-align: center;
							color: #fff;
						}
					}
				}

			}
		}
	}
</style>
