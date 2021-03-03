<template>
	<view class="intergral-shop">
		<!-- 顶部信息 -->
		<view class="top-info">
			<view class="nick">
				<image class="avatar" :src="state.userInfo.headerUrl" mode=""></image>
				<text class="nick-name">{{ state.userInfo.personName }}</text>
			</view>

			<view class="intergral">
				我的积分：<text style="color: #fff100;">{{ state.userInfo.integral }}</text>分
			</view>

			<view class="right">
				<text class="btn" @click="pageToExchangeRecord">兑换记录</text>
			</view>
			
			<text class="message" @click="showModal">阅读规则</text>
		</view>

		<!-- tab-title -->
		<view class="tab-title">
			<view class="title-item" v-for="(item,index) in tabArr" :key="index" @click="changeIndex(index)">
				<text class="title" :class="{active:tabIndex == index}">{{ item }}</text>
				<text class="bottom-line" v-if="tabIndex == index "></text>
			</view>
		</view>

		<!-- tab-content -->
		<view class="tab-content">

			<view class="goods-item" v-for="(item,index) in integralArr" :key="index">
				<image class="left" :src="state.baseUrl + item.picUrl" mode=""></image>
				<view class="middle">
					<text class="title">{{ item.presentName }}</text>
					<view class="need-intergral">
						<text style="color: #FF2F29;">{{ item.needIntegeral }}</text>积分
					</view>
					<text class="sales">已有120人兑换</text>
				</view>
				<view class="exchange-btn" @click="pageToIntegralGoodsDetail(item.presentId,item.needIntegeral)">
					去兑换
				</view>
			</view>

		</view>

		<!-- left-fixed -->
		<!-- <view class="left-fixed" @click="showModal">
			阅读兑换规则 >
		</view> -->

		<!-- 兑换规则 -->
		<neil-modal :show-cancel="false" @close="closeModal" :show="show" title="兑换规则">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view>1、积分获取。通过参加积极参加平台组织的活动、发布转评文章、签到等方式获取积分。</view>
				<view>2、礼品兑换。在积分商城用积分购买商品，并抵扣积分账户的相应分值。</view>
				<view>3、商品领取。根据订单说明中获取收货信息。</view>
			</view>
		</neil-modal>
	</view>
</template>

<script>
	import NeilModal from '@/pagesC/components/neil-modal.vue'
	import IntergralApi from '@/servies/IntegralApi.js'
	import store from '@/store'
	import api from '@/utils/api.js'
	export default {
		components: {
			NeilModal
		},
		data() {
			return {
				state: store.state,
				tabArr: ['全部', '0-500', '501-1000', '1001-3000', '3001以上'],
				tabIndex: 0,
				show: false,
				integralArr: [], //积分商品列表
			};
		},
		methods: {
			pageToExchangeRecord() {
				uni.navigateTo({
					url: '/pagesC/pages/exchangerecord/exchangerecord'
				})
			},
			getIntegralGoodsList() { //获取积分兑换商品列表
				let paramsObj = {
					communityId: this.state.communityId
				}

				if (this.tabIndex != 0) {
					if (this.tabIndex == 4) {
						paramsObj.range = '3001'
					} else {
						paramsObj.range = this.tabArr[this.tabIndex]
					}
				}

				IntergralApi.getIntegralGoodsList(paramsObj, res => {
					console.log('积分商品', res)
					this.integralArr = res
				})
			},
			changeIndex(index) {
				if (this.tabIndex != index) {
					this.tabIndex = index
					this.getIntegralGoodsList()
				}
			},
			showModal() {
				this.show = true
			},
			closeModal() {
				this.show = false
			},
			pageToIntegralGoodsDetail(presentId, integral) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: `是否要花费${integral}积分兑换该商品？`,
					success(res) {
						if (res.confirm) {
							IntergralApi.exchangePresent({
								presentId
							}, res => {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})

								api.getUserInfo()

								if (res.status == 1) {
									_this.timer = setTimeout(() => {
										uni.navigateTo({
											url: '/pagesC/pages/exchangerecord/exchangerecord'
										})
									}, 1000)
								}
							})
						} else if (res.cancel) {

						}
					}
				})
			}
		},
		onLoad(options) {
			this.getIntegralGoodsList()
		},
		onHide() {
			clearTimeout(this.timer)
		}
	}
</script>

<style lang="scss">
	.intergral-shop {

		//left-fixed
		.left-fixed {
			position: fixed;
			width: 50rpx;
			text-align: center;
			background-color: #FF2F29;
			letter-spacing: 4rpx;
			color: #fff;
			padding: 10rpx 0;
			font-size: 34rpx;
			left: 0;
			top: 30%;
			border-radius: 8rpx;

		}

		// 顶部信息
		.top-info {
			height: 160rpx;
			background-color: #FF2F29;
			padding: 0 42rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			.nick {
				display: flex;
				align-items: center;
				width: 238rpx;

				.avatar {
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					margin-right: 26rpx;
				}

				.nick-name {
					font-size: 30rpx;
					letter-spacing: 3rpx;
					color: #ffffff;
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.intergral {
				font-size: 30rpx;
				color: #ffffff;
				width: 300rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.right {
				display: flex;
				align-items: center;
				flex-direction: column;
				.btn {
					width: 110rpx;
					height: 48rpx;
					border: solid 2rpx #ffffff;
					border-radius: 10rpx;
					line-height: 48rpx;
					text-align: center;
					color: #fff;
					letter-spacing: 4rpx;
					font-size: 20rpx;
				}

			}
			
			.message{
				position: absolute;
				line-height: 60rpx;
				font-size: 22rpx;
				color: #fff;
				text-decoration: underline;
				right: 51rpx;
				bottom: 0rpx;
				letter-spacing: 3rpx;
			}

		}

		//tab-title
		.tab-title {
			display: flex;
			align-items: center;
			justify-content: space-around;
			height: 75rpx;
			background-color: #f3f3f3;

			.title-item {
				position: relative;

				.title {
					font-size: 30rpx;

					&.active {
						font-size: 34rpx;
						font-weight: bold;
					}
				}

				.bottom-line {
					position: absolute;
					height: 4rpx;
					width: 100%;
					background-color: #FF2F29;
					bottom: -8rpx;
					left: 0;
				}
			}
		}

		//tab-content
		.tab-content {
			.goods-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 54rpx;
				border-bottom: 4rpx solid #eee;

				.left {
					width: 197rpx;
					height: 143rpx;
					border-radius: 10rpx;
				}

				.middle {
					width: 264rpx;

					.title {
						font-size: 30rpx;
						line-height: 59rpx;
						letter-spacing: 3rpx;
					}

					.need-intergral {
						letter-spacing: 3rpx;
						font-size: 25rpx;
						line-height: 59rpx;
					}

					.sales {
						font-size: 25rpx;
						letter-spacing: 3rpx;
						color: #9fa0a0;
						line-height: 59rpx;
					}
				}

				.exchange-btn {
					width: 110rpx;
					height: 48rpx;
					background-color: #ff2f29;
					border-radius: 10rpx;
					line-height: 48rpx;
					color: #fff;
					letter-spacing: 4rpx;
					font-size: 20rpx;
					text-align: center;
				}
			}
		}
	}
</style>
