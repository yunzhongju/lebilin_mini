<template>
	<view class="goods-search-result">
		<!-- 选项卡标题 -->
		<view class="tab-title-box">
			<view class="tab-item" v-for="(item,index) in sortArr" :key="index" @click="changeIndex(index)">
				<text class="title" :class="{active:tabIndex == index}">{{ item }}<text class="bottom-line" v-if="tabIndex == index"></text></text>
			</view>
		</view>

		<!-- 选项卡内容 -->
		<view class="tab-content">
			<view class="no-content" v-if="!goodsList.length">
				暂无数据
			</view>

			<view class="goods-list-box" v-else>
				<view class="goods-item" v-for="(item,index) in goodsList" :key="index">
					<image class="goods-img" :src="item.picture" :lazy-load="true" mode=""></image>
					<view class="middle-msg">
						<text class="goods-name">{{ item.goodsName }}</text>
						<view class="price">
							<text style="color: #3bb81e;">{{ item.integral }}分</text>
							<text style="color: #e62329;">+￥{{ item.sellPrice }}元/斤</text>
						</view>
					</view>
					<!-- <image class="shop-car" src="/pagesC/static/imgs/shop-car.png" mode=""></image> -->
				</view>

				
			</view>

		</view>
	</view>
</template>

<script>
	import StoreApi from '@/servies/StoreApi.js'
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				state:store.state,
				sortArr: ['销量', '价格'],
				tabIndex: 0,
				searchContent: '',
				storeId: '',
				pageNo: 1,
				goodsList: [], //商品列表
				allowPull: false, //允许上拉加载更对
			};
		},
		methods: {
			getStoreGoods(type = 'one') { //获取商品列表
				let orderBy = ''
				if (this.tabIndex == 0) { //按销量排序
					orderBy = 'saleVolume'
				} else { //按价格排序
					orderBy = 'price'
				}
				StoreApi.getStoreGoods({
					storeId: this.storeId,
					searchContent: this.searchContent,
					pageSize: 10,
					pageNo: this.pageNo,
					orderBy,
					order: 'DESC'
				}, res => {
					console.log('搜索结果', res.list)
					if (type = 'one') { //第一页
						this.goodsList = res.list
						this.allowPull = res.lastPage
					} else { //上拉加载更多
						this.goodsList = [...this.goodsList, ...res.list]
						this.allowPull = res.lastPage
					}

				})
			},
			changeIndex(index) {
				if (this.tabIndex != index) {
					this.tabIndex = index
					this.pageNo = 1
					this.getStoreGoods()
				}
			}
		},
		onLoad(options) {
			this.searchContent = options.content
			this.storeId = options.storeId
			this.getStoreGoods()
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getStoreGoods()
		},
		onReachBottom() { //上拉加载更多
			if( this.allowPull ){
				this.pageNo ++
				this.getStoreGoods('more')
			}
		}
	}
</script>

<style lang="scss">
	.goods-search-result {

		// 选项卡标题
		.tab-title-box {
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 40rpx;

			.tab-item {
				width: 100rpx;
				text-align: center;

				.title {
					font-size: 30rpx;
					line-height: 80rpx;
					position: relative;
					&.active{
						font-size: 34rpx;
						font-weight: bold;
					}
					.bottom-line {
						width: 50%;
						height: 4rpx;
						background-color: #FF2F29;
						position: absolute;
						left: 25%;
						bottom: -8rpx;
					}
				}

				
			}
		}

		// 选项卡内容
		.tab-content {
			.no-content {
				line-height: 100rpx;
				font-size: 26rpx;
				color: #999;
				text-align: center;
			}

			.goods-list-box {
				.goods-item {
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 30rpx;
					border-bottom: 10rpx solid #eee;

					.goods-img {
						width: 195rpx;
						height: 195rpx;
						flex-shrink: 0;
						margin-right: 30rpx;
					}

					.middle-msg {
						flex: 1;
						display: flex;
						flex-direction: column;

						.goods-name {
							width: 382rpx;
							line-height: 100rpx;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						.price {
							// text-align: end;
							flex: 1;
							width: 100%;
							line-height: 40rpx;
							font-size: 20rpx;
						}
					}

					.shop-car {
						width: 54rpx;
						height: 54rpx;
						margin-left: 30rpx;
						flex-shrink: 0;
					}
				}
			}
		}
	}
</style>
