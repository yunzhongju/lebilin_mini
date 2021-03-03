<template>
	<view class="shop-car">
		<!-- 商品列表 -->
		<view class="goods-list">

			<view v-if="isRequest && !goodsList.cartGoods.length" style="color: #C0C0C0;font-size: 25rpx;line-height: 60rpx;text-align: center;">
				购物车空空如也，快去添加商品吧~
			</view>

			<view class="list-items" v-for="(item,index) in goodsList.cartGoods" :key="index">
				<uni-swipe-action>
					<uni-swipe-action-item autoClose=true :options="options" @click="onClick(item.shopId,index)">
						<view class='item'>
							<view class="left-box" @click="changeState(index)">
								<view class="check_btn" :class="{check_ed:item.check}"></view>
							</view>


							<image class="middle" :src="state.baseUrl + item.picture" mode=""></image>
							<view class="right">
								<text class="title">{{ item.goodsName }}</text>
								<text class="specifications">{{ item.depict }}</text>
								<view class="bottom-total">
									<text class="price">价格：¥{{ item.sellPrice }}元<text v-if="item.integral" class="price integrak">+{{ item.integral }}积分</text></text>

									<!-- 选择数量 -->
									<view class="choose-count">
										<!-- <text class="title">选择数量</text> -->
										<view class="num">
											<button type="" :disabled="item.countNum == 1" class="reduce" @click="changeNum(-1,item.shopId,item.countNum,index,item.stock)">-</button>
											<input disabled type="number" class="count" v-model="item.countNum" />
											<button type="" class="add" @click="changeNum(1,item.shopId,item.countNum,index,item.stock)">+</button>
										</view>
									</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>

		</view>

		<!-- 底部固定栏 -->
		<view class="bottom-fixed">
			<view class="left" @click="changeState('all')">
				<view class="bottom_check" :class="{bottom_check_ed:allcheck}">
					
				</view>
				<!-- <image v-if="!allcheck" src="/pagesC/static/imgs/choose_false.png" mode=""></image>
				<image v-else src="/pagesC/static/imgs/choose_true.png" mode=""></image> -->
				<text>全选</text>
			</view>

			<view class="total">
				总价:¥{{calculationPrice}}元
				<text>+{{calculationIntegral}}积分</text>
			</view>

			<view class="settlement" @click="sureOrder">
				去结算
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/pagesC/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/pagesC/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import CartApi from '@/servies/CartApi.js'
	import OrderApi from '@/servies/OrderApi.js'
	import store from '@/store'
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				state: store.state,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				isRequest: false, //是否发送过请求
				storeId: '',
				goodsList: [], //购物车商品列表
				allcheck: true, //是否全选中
			};
		},
		methods: {
			sureOrder() { //确认订单
				if (this.goodsList == [] || !this.goodsList.cartGoods.length || this.goodsList.cartGoods.every(item => !item.check)) {
					return uni.showToast({
						title: '暂时没有选中商品~',
						icon: 'none'
					})
				}

				let paramsObj = {
					storeId: this.storeId,
				}
				let temArr = this.goodsList.cartGoods.filter(item => item.check)
				paramsObj.shopId = temArr.map(item => item.shopId).join(';')

				console.log(paramsObj)

				OrderApi.confirmOrder(paramsObj, res => {
					if (res) {
						store.commit('setStoreIdtwo', res.storeId)
						uni.navigateTo({
							url: `/pagesC/pages/sureorder/sureorder?shopcar=true&confirmOrderInfo=` + encodeURIComponent(JSON.stringify(
								res))
						})
					}
				})

			},
			/* selectAll() { //商品全选
				this.allcheck = !this.allcheck
				this.goodsList.cartGoods.forEach(item => {
					item.check = this.allcheck
				})
			}, */
			changeState(index) { //改变选中状态

				if (index == 'all') {
					this.allcheck = !this.allcheck
					this.goodsList.cartGoods.forEach(item => {
						item.check = this.allcheck ? true : false
					})
				} else {
					/* let middle = this.goodsList
					middle.cartGoods[index].check = !this.goodsList.cartGoods[index].check
					this.goodsList = middle */
					
					let comObj = this.goodsList.cartGoods[index]
					comObj.check = !comObj.check
					this.goodsList.cartGoods.splice(index,1,comObj)
					
					this.allcheck = this.goodsList.cartGoods.every(item => item.check)
					console.log( '商品状态',this.goodsList.cartGoods )
				}

				/* if( bool == 1 ){
					this.goodsList.cartGoods[index].check = true
					this.allcheck = this.goodsList.cartGoods.every(item => item.check) //检查是否已全选
					console.log('改为true',this.goodsList.cartGoods)
				}else{
					this.goodsList.cartGoods[index].check = false
					this.allcheck = this.goodsList.cartGoods.every(item => item.check) //检查是否已全选
					console.log('改为false',this.goodsList.cartGoods)
				} */

			},
			getShoppingCart() { //获取购物车商品列表
				CartApi.getShoppingCart({
					storeId: this.storeId
				}, res => {

					store.commit('setCartGoods', res.cartGoods)
					if (res.cartGoods.length == 0) {
						store.commit('setHasGoods', false)
					} else {
						store.commit('setHasGoods', true)
					}

					res.cartGoods.forEach(item => {
						item.check = true
					})
					this.goodsList = res
					this.isRequest = true
					console.log('商品列表', res)
				})
			},
			onClick(shopId, index) {
				CartApi.removeFromCart({
					shopId
				}, res => {
					console.log(res.msg)
					this.goodsList.cartGoods.splice(index, 1)

				})
			},
			changeNum(num, shopId, oldCount, index,stock) {
				if(stock <= this.goodsList.cartGoods[index].countNum && num == 1){ //超出库存
					return uni.showToast({
						title:'库存不足~',
						icon:'none'
					})
				}
				
				if( this.goodsList.cartGoods[index].countNum == 1 && num == -1 ){ //最小数量为1
					return uni.showToast({
						title:'最小数量为1哦~',
						icon:'none'
					})
				}
				CartApi.modifyGoodsQuantity({
					shopId,
					quantity: oldCount + num
				}, res => {
					console.log(res.msg)
					this.goodsList.cartGoods[index].countNum += num
				})
			}
		},
		computed: {
			calculationPrice() { // 计算总价
				if (this.goodsList == [] || this.goodsList.cartGoods == undefined || (!this.goodsList.cartGoods != undefined &&
						this.goodsList.cartGoods == [])) return '0.00'
				let price = 0
				let newArr = this.goodsList.cartGoods.filter(item => item.check)
				newArr.forEach(item => {
					price += item.countNum * item.sellPrice
				})
				return price.toFixed(2)
			},
			calculationIntegral() { //计算积分
				if (this.goodsList == [] || this.goodsList.cartGoods == undefined || (!this.goodsList.cartGoods != undefined &&
						this.goodsList.cartGoods == [])) return 0
				let integral = 0
				let newArr = this.goodsList.cartGoods.filter(item => item.check)
				newArr.forEach(item => {
					integral += item.countNum * item.integral
				})
				return integral
			}
		},
		onLoad(options) {
			this.storeId = options.storeId || ''
			this.getShoppingCart()
		},
		onUnload() {
			this.isRequest = false,
			this.goodsList = []
		},
		onShow() {
			this.getShoppingCart()
		}
	}
</script>

<style lang="scss">
	.shop-car {

		//底部固定栏
		.bottom-fixed {
			position: fixed;
			height: 104rpx;
			width: 100%;
			left: 0;
			bottom: 0;
			border-top: 4rpx solid #eee;
			background-color: #fff;
			padding: 0 38rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;
				align-items: center;
				.bottom_check{
					width: 42rpx;
					height: 42rpx;
					margin-right: 8rpx;
					background: url('/pagesC/static/imgs/choose_false.png') no-repeat center center;
					background-size: cover;
				}
				.bottom_check_ed{
					background: url('/pagesC/static/imgs/choose_true.png') no-repeat center center;
					background-size: cover;
				}

				text {
					font-size: 24rpx;
					letter-spacing: 2rpx;
				}
			}

			.total {
				font-size: 30rpx;
				// letter-spacing: 3rpx;
				color: #e62329;
				max-width: 382rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.settlement {
				width: 175rpx;
				height: 60rpx;
				background-color: #e62329;
				border-radius: 30rpx;
				letter-spacing: 6rpx;
				color: #ffffff;
				line-height: 60rpx;
				font-size: 30rpx;
				text-align: center;
				// font-weight: bold;
			}
		}

		//商品列表
		.goods-list {
			padding-bottom: 104rpx;

			.list-items {
				border-bottom: 2rpx solid #eee;

				.item {
					width: 100%;
					box-sizing: border-box;
					padding: 20rpx 38rpx;
					display: flex;
					// justify-content: space-between;
					align-items: center;

					.left-box {
						width: 42rpx;
						height: 100%;
						display: flex;
						align-items: center;
						justify-content: center;
						padding-right: 46rpx;

						.check_btn {
							width: 42rpx;
							height: 42rpx;
							background: url('/pagesC/static/imgs/choose_false.png') no-repeat center center;
							background-size: cover;
						}

						.check_ed {
							background: url('/pagesC/static/imgs/choose_true.png') no-repeat center center;
							background-size: cover;
						}

						/* .left {
							width: 42rpx;
							height: 42rpx;
						} */
					}


					.middle {
						width: 140rpx;
						height: 130rpx;
						padding-right: 46rpx;
					}

					.right {
						width: 404rpx;
						display: flex;
						flex-direction: column;

						.title {
							letter-spacing: 3rpx;
							font-size: 30rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							line-height: 40rpx;
						}

						.specifications {
							font-size: 25rpx;
							letter-spacing: 3rpx;
							color: #8c8c8c;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							line-height: 56rpx;
						}

						.bottom-total {
							display: flex;
							justify-content: space-between;
							align-items: center;

							.price {
								font-size: 24rpx;
								line-height: 50rpx;
								letter-spacing: 2rpx;
								color: #e62329;
								flex: 1;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							// 选择数量
							.choose-count {
								display: flex;
								justify-content: space-between;
								align-items: center;

								// margin: 20rpx 0 250rpx 0;
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
						}
					}
				}
			}
		}
	}
</style>
