<template>
	<view class="goods-manage">
		<image class="top-img" :src="state.baseUrl + goodsDetail.picture" mode="aspectFit"></image>

		<view class="form">
			<!-- 商品名 -->
			<view class="goods-name">
				<text class="title"><text style="color: #FF2F29;">*</text>商品名称：{{ goodsDetail.goodsName }}</text>
			</view>
			<!-- 商品分类 -->
			<view class="goods-name">
				<text class="title">商品分类：{{ goodsDetail.classifyName }}</text>
			</view>

			<!-- 商品定价 -->
			<view class="pricing">
				<view class="old">
					<text class="title"><text style="color: #FF2F29;">*</text>原价(元)：</text>
					<input class="content" type="digit" :value="goodsDetail.marketPrice" disabled="true" />
				</view>
				<view class="new">
					<text class="title"><text style="color: #FF2F29;">*</text>售价(元)：</text>
					<input class="content" type="digit" value="" v-model="sellPrice" />
				</view>
			</view>

			<!-- 上架数量-->
			<view class="sell-box">
				<text class="title"><text style="color: #FF2F29;">*</text>上架数量：</text>
				<input class="sell-count" type="number" v-model="sellCount" />
			</view>

			<!-- 选择标签 -->
			<view class="choose-tag">
				<text class="title">选择标签：</text>
				<view class="tag-box">
					<text class="item" @click="changeCheck(index)" :class="{active:item.check}" v-for="(item,index) in tagArr" :key="index">{{ item.name }}</text>
				</view>
			</view>

			<!-- 是否置顶 -->
			<view class="top-set">
				<text class="title">是否置顶：</text>
				<view class="box">
					<view class="item" @click="changeSetTop(true)">
						<image src="/pagesC/static/imgs/choose_no.png" v-if="!setTop" mode=""></image>
						<image src="/pagesC/static/imgs/choose_now.png" v-else mode=""></image>
						<text>是</text>
					</view>
					<view class="item" @click="changeSetTop(false)">
						<image src="/pagesC/static/imgs/choose_no.png" v-if="setTop" mode=""></image>
						<image src="/pagesC/static/imgs/choose_now.png" v-else mode=""></image>
						<text>否</text>
					</view>
				</view>
			</view>

			<!-- 活动分类 -->
			<view class="activity-type">
				<text class="title">活动分类：</text>
				<view class="content" v-if="list.length != 0">
					<xfl-select @change="setChoose" :list="list" :clearable="false" :showItemNum="5" :style_Container="'height: 60rpx; font-size: 30rpx;border:none;background-color: #efefef;'"
					 :placeholder="'placeholder'" :initValue="list[0]['value']" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
			</view>

			<!-- 活动子分类 -->
			<view class="activity-type" v-if="xianshiOrpin != 0">
				<text class="title">活动子分类：</text>
				<view class="content" v-if="goodsPartTwo.length">
					<xfl-select @change="setChoose2" :list="goodsPartTwo" :clearable="false" :showItemNum="5" :style_Container="'height: 60rpx; font-size: 30rpx;border:none;background-color: #efefef;'"
					 :placeholder="'placeholder'" :initValue="goodsPartTwo[0]['value']" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
			</view>

			<!-- 截止时间 -->
			<view class="activity-type" v-if="xianshiOrpin == 1">
				<text class="title">截止时间：</text>
				<view class="content time" @click="showTime">
					<text class="title">{{ acStarTime }}</text>
					<image class="bottom" src="/pagesC/static/imgs/bottom.png" mode=""></image>
				</view>
			</view>

			<!-- 拼单价格 -->
			<view class="fight-alon" v-if="xianshiOrpin == 2">
				<text class="title">拼单价格(元)：</text>
				<input class="content" type="digit" v-model="fightPrice" />
			</view>

			<!-- 单人购买数量 -->
			<view class="fight-alon" v-if="xianshiOrpin == 1">
				<text class="title">单人购买数量：</text>
				<input class="content" type="number" v-model="oneByCount" />
			</view>
		</view>


		<!-- 时间选择 -->
		<yu-datetime-picker @confirm="getStopTimer" @cancel='showBtns' ref="dateTime" startYear="2020">
		</yu-datetime-picker>

		<!-- 货物上架按钮 -->
		<view class="shangjia" v-if="showBtn">
			<text class="btn" @click="subFun">货物上架</text>
		</view>
	</view>
</template>

<script>
	import xflSelect from '@/pagesC/components/xfl-select.vue'
	import yuDatetimePicker from '@/pagesC/components/yu-datetime-picker.vue'
	import StoreApi from '@/servies/StoreApi.js'
	import CommonApi from '@/servies/CommonApi.js'
	import {
		getNowTime
	} from '@/utils'
	import store from '@/store'
	export default {
		components: {
			xflSelect,
			yuDatetimePicker
		},
		data() {
			return {
				state: store.state,
				tagArr: [], //商品标签
				list: [], //活动分类
				acStarTime: '请选择时间',
				goodsId: '',
				supplierId: '',
				storeId: '',
				sellCount: 10, //上架数量
				goodsDetail: null,
				sellPrice: '', //售价
				setTop: true, //是否置顶
				xianshiOrpin: 0,
				showBtn: true, //是否显示上架按钮
				goodsPartTwo: [],
				activityTypeTwo: 0,
				fightPrice: '', //拼单价格
				oneByCount: 1, //单人购买数量
			};
		},
		methods: {
			subFun() { //货物上架
				let _this = this
				let paramsObj = {
					supplyGoodsId: this.goodsId,
					supplierId: this.supplierId,
					storeId: this.storeId,
					price: this.goodsDetail.marketPrice,
					sellPrice: this.sellPrice ? parseFloat(this.sellPrice).toFixed(2) : '',
					quantity: this.sellCount,
					totop: this.setTop
				}

				// 选择标签
				let middleArr = this.tagArr.filter(item => {
					return item.check
				})
				if (middleArr.length) {
					paramsObj.goodsLable = middleArr.map(item => item.id).join(';')
				}


				if (this.xianshiOrpin == 1) { // 限时购
					paramsObj.activityType = this.list[1].id
					paramsObj.activitySubType = this.goodsPartTwo[this.activityTypeTwo].id
					paramsObj.endTime = this.acStarTime
					paramsObj.limitNumber = this.oneByCount
				} else if (this.xianshiOrpin == 2) { //好友拼
					paramsObj.activityType = this.list[2].id
					paramsObj.activitySubType = this.goodsPartTwo[this.activityTypeTwo].id
					paramsObj.groupBuyPrice = this.fightPrice ? parseFloat(this.fightPrice).toFixed(2) : ''
				}


				// 表单验证
				if (!paramsObj.supplyGoodsId || !paramsObj.supplierId || !paramsObj.storeId ||
					!paramsObj.price || !paramsObj.sellPrice || !paramsObj.quantity) {
					return uni.showToast({
						title: '信息不全',
						icon: 'none'
					})
				}
				//商品数量为整数
				if (paramsObj.quantity.toString().includes('.') || paramsObj.quantity <= 0) {
					return uni.showToast({
						title: '上架数量必须为整数且大于0',
						icon: 'none'
					})
				}

				//售价大于0 
				if (paramsObj.sellPrice && paramsObj.sellPrice <= 0) {
					return uni.showToast({
						title: '商品售价必须大于0',
						icon: 'none'
					})
				}

				//限时购截止时间和单人购买数量
				if (this.xianshiOrpin == 1) {
					if (paramsObj.endTime == '请选择时间') {
						return uni.showToast({
							title: '请选择截止时间',
							icon: 'none'
						})
					}
					if (paramsObj.limitNumber.toString().includes('.') || paramsObj.limitNumber <= 0) {
						return uni.showToast({
							title: '限购数量必须为整数且大于0',
							icon: 'none'
						})
					}
				}

				//好友拼得拼单价格
				if (this.xianshiOrpin == 2) {
					if (paramsObj.groupBuyPrice <= 0) {
						uni.showToast({
							title: '拼单价格必须大于0',
							icon: 'none'
						})
					}
				}

				StoreApi.addStoreGoods(paramsObj, res => {
					if (res.status == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						_this.timer = setTimeout(() => {
							uni.redirectTo({
								url: `/pagesC/pages/goodsshelves/goodsshelves?supplierId=${this.supplierId}&storeId=${this.storeId}`
							})
						}, 1500)

					}
				})
			},
			getDataDictionarypartTwo(params) { //获取商品子分类
				let _that = this
				CommonApi.getDataDictionary2(params, res => {
					let newArr = res.map(item => {
						item.value = item.name
						return item
					})
					_that.goodsPartTwo = Array.from(newArr)
				})
			},

			getDataDictionary(string) { //获取活动类型和商品标签
				let _this = this
				CommonApi.getDataDictionary2({
					parentId: string
				}, res => {
					if (string == 'goods_lable') { //商品标签
						_this.tagArr = res.map(item => {
							item.check = false
							return item
						})
					} else if (string == 'sphdlx') { //活动类型
						let newlist = res.map(item => {
							item.value = item.name
							return item
						})
						_this.list = Array.from(newlist)
						_this.getDataDictionarypartTwo({
							parentId: res[0].id
						})
					}
				})
			},
			getSupplyGoodsDetail(params) { //获取供应商商品详情
				StoreApi.getSupplyGoodsDetail(params, res => {
					console.log(res)
					this.goodsDetail = res
				})
			},
			changeSetTop(bool) {
				this.setTop = bool
			},
			changeCheck(index) {
				this.tagArr[index].check = !this.tagArr[index].check
			},
			setChoose(e) { //活动分类
				this.xianshiOrpin = e.index
				this.goodsPartTwo = []
				this.getDataDictionarypartTwo({
					parentId: this.list[e.index].id
				})
			},
			setChoose2(e) { //活动子分类
				this.activityTypeTwo = e.index
			},
			showBtns() {
				this.showBtn = true
			},
			getStopTimer(e) {
				let selectTime = e.selectArr.join('')
				let nowTime = getNowTime()
				this.showBtn = true
				if (selectTime <= nowTime) {
					return uni.showToast({
						title: '截止时间必须大于当前时间',
						icon: 'none'
					})
				}
				this.acStarTime = e.selectRes

			},
			showTime() {
				this.$refs.dateTime.show();
				this.showBtn = false
			},
		},
		onLoad(options) {
			this.goodsId = options.goodsId || ''
			this.supplierId = options.supplierId || ''
			this.storeId = options.storeId || ''
			this.getSupplyGoodsDetail({ //获取商品详情
				goodsId: options.goodsId,
				supplierId: options.supplierId
			})
			this.getDataDictionary('sphdlx') //获取活动类型
			this.getDataDictionary('goods_lable') //获取商品标签

		},
		onHide() {
			clearTimeout(this.timer)
		}
	}
</script>

<style lang="scss">
	.goods-manage {
		.top-img {
			width: 396rpx;
			height: 396rpx;
			display: block;
			margin: 10rpx auto;
		}

		.form {
			margin-bottom: 400rpx;
			box-sizing: border-box;
			padding: 0 42rpx;

			.goods-name {
				display: flex;
				align-items: center;

				.title {
					line-height: 80rpx;
					font-size: 30rpx;
					letter-spacing: 3rpx;
				}
			}

			// 上架数量
			.sell-box {
				display: flex;
				align-items: center;

				.title {
					line-height: 80rpx;
					font-size: 30rpx;
					letter-spacing: 3rpx;
				}

				.sell-count {
					line-height: 60rpx;
					height: 60rpx;
					font-size: 30rpx;
					background-color: #efefef;
					border-radius: 5rpx;
					padding-left: 30rpx;
					flex: 1;
				}
			}

			//商品定价
			.pricing {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.old,
				.new {
					display: flex;
					align-items: center;
					flex: 1;

					.title {
						line-height: 80rpx;
						font-size: 30rpx;
					}

					.content {
						width: 155rpx;
						height: 50rpx;
						background-color: #efefef;
						line-height: 50rpx;
						text-align: center;
						border-radius: 5rpx;
					}
				}
			}

			//选择标签
			.choose-tag {
				display: flex;
				align-items: flex-start;

				.title {
					line-height: 80rpx;
					font-size: 30rpx;
				}

				.tag-box {
					flex: 1;
					display: flex;
					align-items: flex-start;
					flex-wrap: wrap;

					.item {
						height: 45rpx;
						background-color: #e5e5e5;
						line-height: 45rpx;
						font-size: 30rpx;
						padding: 0 36rpx;
						margin: 20rpx;
						border-radius: 10rpx;

						&.active {
							color: #fff;
							background-color: #e62329;
						}
					}
				}
			}

			//是否置顶
			.top-set {
				display: flex;
				align-items: center;

				.title {
					font-size: 30rpx;
					line-height: 80rpx;
				}

				.box {
					flex: 1;
					display: flex;
					align-items: center;

					.item {
						width: 200rpx;
						text-align: center;

						image {
							width: 25rpx;
							height: 25rpx;
							margin-right: 8rpx;
						}

						text {
							font-size: 30rpx;
						}
					}
				}
			}

			//活动分类
			.activity-type {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					font-size: 30rpx;
					line-height: 80rpx;
				}

				.content {
					width: 476rpx;
				}

				.time {
					height: 60rpx;
					background-color: #efefef;
					border-radius: 8rpx;
					position: relative;

					.title {
						display: block;
						text-indent: 10rpx;
						color: #9fa0a0;
						font-size: 30rpx;
						line-height: 60rpx;
					}

					.bottom {
						width: 25rpx;
						height: 25rpx;
						position: absolute;
						bottom: 17rpx;
						right: 16rpx;
					}
				}
			}

			// 拼单价格-单人购买数量
			.fight-alon {
				display: flex;
				align-items: center;

				.title {
					line-height: 80rpx;
					font-size: 30rpx;
					width: 210rpx;
				}

				.content {
					width: 155rpx;
					height: 50rpx;
					background-color: #efefef;
					line-height: 50rpx;
					text-align: center;
					border-radius: 5rpx;
				}
			}
		}

		// 货物上架
		.shangjia {
			background-color: #fff;
			position: fixed;
			height: 200rpx;
			width: 100%;
			z-index: 1000;
			display: flex;
			align-items: center;
			justify-content: center;
			left: 0;
			bottom: 0;

			.btn {
				width: 450rpx;
				height: 60rpx;
				background-color: #ff2f29;
				font-size: 30rpx;
				font-weight: bold;
				text-align: center;
				line-height: 60rpx;
				letter-spacing: 3rpx;
				color: #fff;
				border-radius: 20rpx;
			}
		}
	}
</style>
