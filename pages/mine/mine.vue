<template>
	<view class="mine-box">
		<!-- 头部信息 -->
		<view class="top-personal" :class="{
			bggold:state.userInfo.isVolunteer && state.userInfo.serviceLevel == 3,
			bgsilver:state.userInfo.isVolunteer && state.userInfo.serviceLevel==2,
			bgcopper:state.userInfo.isVolunteer && state.userInfo.serviceLevel==1,
			bgnot:state.userInfo && !state.userInfo.isVolunteer,
		}">
			<!-- 个人信息 -->
			<view class="top">
				<view class="personal-info">
					<image class="left-avatar" :src="state.userInfo.headerUrl" mode=""></image>
					<text class="nickname" v-if="state.userInfo.headerUrl">{{state.userInfo.nickName}}</text>
					<image class="is-member" v-if="state.userInfo.isPartyMember" src="/static/mine_icon/part_member.png" mode=""></image>
					<button class="login-btn" v-if="!state.userInfo.headerUrl" type="default" open-type="getUserInfo" @getuserinfo="getInfo">立即登录</button>
				</view>

				<view class="message">
					<view class="message-item" @click="pageToMineInfo">
						<image class="icon2" src="/static/mine_icon/setting.png" mode=""></image>
					</view>
					<view class="message-item" @click="pageToMyMessage">
						<image class="icon" src="/static/mine_icon/message.png" mode=""></image>
						<text class="sign-point" v-if="hasMessage"></text>
					</view>
				</view>
			</view>
			<!-- 余额和积分 -->
			<view class="money-intergral">
				<view class="intergral">
					<image class="img1" src="/static/mine_icon/intergral.png" mode=""></image>
					<text class="number">{{ myIntergral }}</text>
				</view>

				<view class="sign" @click="pageToSortSign">
					<image class="img2" src="/static/mine_icon/sign.png" mode=""></image>
					<text class="number">签到</text>
				</view>

				<view class="active-time">
					<image class="img3" src="/static/mine_icon/active_time.png" mode=""></image>
					<text class="number">{{ state.userInfo.serviceCount }}</text>
				</view>

				<view class="money" @click="pageToWithdrawals">
					<image class="img4" src="/static/mine_icon/money.png" mode=""></image>
					<text class="number">￥{{ state.userInfo.balance || '0.00' }}</text>
				</view>
			</view>
			<!-- 志愿者信息 -->
			<view class="msg-bottom">
				<view class="become-volunteer" v-if="state.userInfo.isVolunteer">
					<image v-if="state.userInfo.serviceLevel == 3" class="score" src="/static/mine_icon/gold.png" mode=""></image>
					<image v-if="state.userInfo.serviceLevel == 2" class="score" src="/static/mine_icon/silver.png" mode=""></image>
					<image v-if="state.userInfo.serviceLevel == 1" class="score" src="/static/mine_icon/copper.png" mode=""></image>
					<text class="title">您已是{{ state.userInfo.serviceLevel == 1 ? '铜牌' : state.userInfo.serviceLevel == 2 ? '银牌' : '金牌' }}志愿者</text>
				</view>
				<view class="apply-volunteer" v-if="state.userInfo && !state.userInfo.isVolunteer">
					<text class="title">您还不是志愿者</text>
					<text class="btn" @click="pageToApplyVolunteer">加入</text>
				</view>
			</view>
		</view>

		<!-- 我的订单 -->
		<view class="my-order card">

			<view class="top">
				<text class="title">我的订单</text>
				<view class="all-order" @click="pageToMyOrder(0)">
					<text>全部订单</text>
					<image src="/static/mine_icon/arrow.png" mode=""></image>
				</view>
			</view>

			<view class="items-box">
				<view class="item" @click="pageToMyOrder(1)">
					<image class="item-img1" src="/static/mine_icon/need_pay.png" mode=""></image>
					<text class="title">待支付</text>
				</view>
				<view class="item" @click="pageToMyOrder(2)">
					<image class="item-img2" src="/static/mine_icon/need-recive.png" mode=""></image>
					<text class="title">待收货</text>
				</view>
				<view class="item" @click="pageToMyOrder(4)">
					<image class="item-img3" src="/static/mine_icon/compoment.png" mode=""></image>
					<text class="title">已完成</text>
				</view>
				<view class="item" @click="pageToMyOrder(2)">
					<image class="item-img4" src="/static/mine_icon/shouhou.png" mode=""></image>
					<text class="title">售后/退款</text>
				</view>
			</view>
		</view>

		<!-- 导航 -->
		<view class="navigation card">
			<view class="items-box">
				<view class="item" @click="pageToVolunteerInfo">
					<image class="item-img" src="/static/mine_icon/volunteer_icon.png" mode=""></image>
					<text class="title">志愿者证书</text>
				</view>
				<view class="item" @click="pageToSupplier">
					<image class="item-img" src="/static/mine_icon/supplier_icon.png" mode=""></image>
					<text class="title">供应商</text>
				</view>
				<view class="item" @click="pageToShopManage">
					<image class="item-img" src="/static/mine_icon/store_icon.png" mode=""></image>
					<text class="title">店铺管理</text>
				</view>
				<view class="item" @click="pageToStoreManage">
					<image class="item-img" src="/static/mine_icon/boss_icon.png" mode=""></image>
					<text class="title">店长入驻</text>
				</view>
			</view>
			<view class="items-box2">
				<view class="item" @click="pageToPlayWithIntegral">
					<image class="item-img" src="/static/mine_icon/play_intergral_icon.png" mode=""></image>
					<text class="title">玩转积分</text>
				</view>
				<view class="item" @click="pageToIntergral">
					<image class="item-img2" src="/static/mine_icon/intergral_shop_icon.png" mode=""></image>
					<text class="title">积分商城</text>
				</view>
				<view class="item" @click="pageToMyBill">
					<image class="item-img3" src="/static/mine_icon/intergral_list_icon.png" mode=""></image>
					<text class="title">账单</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UserApi from '@/servies/UserApi.js'
	import api from '@/utils/api.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				hasMessage:false,
			}
		},
		methods: {
			getUnreadMessage(){ //获取我的消息列表
				UserApi.getUnreadMessage({
					pageNo:1,
					pageSize:20
				},res => {
					this.hasMessage = res.list.every(item => !item.isRead)
				})
			},
			getInfo(e) {
				api.bindGetWxInfo(e)
			},
			pageToMyBill() {
				uni.navigateTo({
					url: '/pagesC/pages/mybill/mybill'
				})
			},
			pageToApplyVolunteer() {
				uni.navigateTo({
					url: "/pagesB/pages/volunteerneedknow/volunteerneedknow"
				})
			},
			pageToMyMessage() {
				uni.navigateTo({
					url: '/pagesC/pages/mymessage/mymessage'
				})
			},
			pageToPlayWithIntegral() {
				uni.navigateTo({
					url: '/pagesC/pages/playwithintegral/playwithintegral'
				})
			},
			pageToMyOrder(num) {
				uni.navigateTo({
					url: '/pagesC/pages/myorder/myorder?index=' + num
				})
			},
			pageToSortSign() {
				uni.navigateTo({
					url: '/pagesC/pages/sortsign/sortsign'
				})
			},
			pageToStoreManage() {
				uni.navigateTo({
					url: '/pagesC/pages/storemanager/storemanager'
				})
			},
			pageToVolunteerInfo() {
				let _this = this
				if (this.state.userInfo.isVolunteer) {
					uni.navigateTo({
						url: '/pagesC/pages/volunteerinfo/volunteerinfo'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '您还不是志愿者，是否前往申请？',
						success(res) {
							if (res.confirm) {
								_this.pageToApplyVolunteer()
							}
						}
					})
				}

			},
			pageToMineInfo() {
				uni.navigateTo({
					url: '/pagesB/pages/mineinfo/mineinfo'
				})
			},
			pageToSupplier() {
				uni.navigateTo({
					url: "/pagesC/pages/supplierregist/supplierregist"
				})
			},
			pageToGoodsManage() {
				uni.navigateTo({
					url: "/pagesC/pages/goodsshelves/goodsshelves"
				})
			},
			pageToIntergral() {
				uni.navigateTo({
					url: "/pagesC/pages/intergralshop/intergralshop"
				})
			},
			pageToShopManage() {
				if (this.state.userInfo.isHeadman) {
					uni.navigateTo({
						url: "/pagesC/pages/shopmanage/shopmanage"
					})
				} else {
					return uni.showToast({
						title: '您还不是店长，请先申请成为店长吧',
						icon: 'none'
					})
				}

			},
			pageToWithdrawals() {
				// 提现
				/* if (this.state.userInfo.balance == 0) {
					return wx.showToast({
						icon: "none",
						title: "暂无余额～"
					});
				}
				if (this.state.userInfo.balance && this.state.userInfo.balance < 1) {
					return wx.showToast({
						icon: "none",
						title: "提现需大于1元～"
					});
				} */
				uni.navigateTo({
					url: '/pagesC/pages/withdrawals/withdrawals'
				})
			}
		},
		computed: {
			myIntergral() { //积分
				if (!this.state.userInfo || this.state.userInfo == undefined || !this.state.userInfo.integral) return 0
				if (this.state.userInfo.integral >= 10000) {
					let temNum = this.state.userInfo.integral / 10000
					return temNum.toFixed(2) + '万';
				} else {
					return this.state.userInfo.integral
				}

			}
		},
		onShow() {

		},
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.mine-box {
		height: 100%;

		// 头部信息
		.top-personal {
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100%;

			&.bgnot {
				background-image: url("http://132.232.74.143:5711/images/wxa_pic/bg_not.png"); //非志愿者	
			}

			&.bggold {
				background-image: url("http://132.232.74.143:5711/images/wxa_pic/bg_gold.png"); //金牌志愿者
			}

			&.bgsilver {
				background-image: url("http://132.232.74.143:5711/images/wxa_pic/bg_silver.png"); //银牌志愿者
			}

			&.bgcopper {
				background-image: url("http://132.232.74.143:5711/images/wxa_pic/bg_copper.png"); //铜牌志愿者
			}

			height: 399rpx;
			box-sizing: border-box;
			padding: 0 28rpx;
			display: flex;
			flex-direction: column;
			position: relative;

			.top {
				box-sizing: border-box;
				padding: 29rpx 22rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.personal-info {
					width: 400rpx;
					display: flex;
					align-items: center;

					.login-btn {
						font-size: 25rpx;
						color: #fff;
						letter-spacing: 3rpx;
						background-color: #FF2F29;
						text-align: center;
						width: 130rpx;
						border-radius: 10rpx;
						line-height: 50rpx;
						padding: 0;

						&:after {
							content: "";
							border: none;
						}
					}

					.left-avatar {
						width: 105rpx;
						height: 105rpx;
						border-radius: 50%;
						margin-right: 38rpx;
					}

					.nickname {
						max-width: 168rpx;
						margin-right: 10rpx;
						font-size: 30rpx;
						line-height: 114rpx;
						letter-spacing: 3rpx;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					.is-member {
						width: 80rpx;
						height: 30rpx;
					}
				}

				.message {
					display: flex;
					align-items: center;

					.message-item {
						position: relative;

						.icon {
							width: 46rpx;
							height: 46rpx;
							margin-left: 37rpx;
						}

						.icon2 {
							width: 45rpx;
							height: 43rpx;
							margin-left: 37rpx;
						}

						.sign-point {
							position: absolute;
							width: 10rpx;
							height: 10rpx;
							border-radius: 50%;
							background-color: #fff100;
							top: 0rpx;
							right: -10rpx;
						}
					}
				}
			}

			.money-intergral {
				box-sizing: border-box;
				// padding: 0 70rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.money,
				.intergral,
				.sign,
				.active-time {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 140rpx;
					flex: 1;

					.img1 {
						width: 59rpx;
						height: 52rpx;
					}

					.img2 {
						width: 46rpx;
						height: 46rpx;
					}

					.img3 {
						width: 55rpx;
						height: 54rpx;
					}

					.img4 {
						width: 54rpx;
						height: 53rpx;
					}

					.number {
						font-size: 30rpx;
						letter-spacing: 3rpx;
						width: 100%;
						text-align: center;
					}

				}
			}

			.msg-bottom {
				width: 624rpx;
				height: 92rpx;
				background-image: url(../../static/mine_icon/msg_box.png);
				background-repeat: no-repeat;
				background-position: center;
				background-size: 100%;
				position: absolute;
				bottom: 0;
				left: calc(50% - 312rpx);

				.become-volunteer {
					display: flex;
					justify-content: center;
					align-items: center;

					.score {
						width: 32rpx;
						height: 41rpx;
						margin-right: 16rpx;
					}

					.title {
						font-size: 25rpx;
						line-height: 92rpx;
						letter-spacing: 3rpx;
						color: #ffffff;
					}
				}

				.apply-volunteer {
					box-sizing: border-box;
					padding: 0 60rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.title {
						font-size: 25rpx;
						line-height: 92rpx;
						letter-spacing: 3rpx;
						color: #ffffff;
					}

					.btn {
						background-color: #FFDE6D;
						line-height: 36rpx;
						letter-spacing: 3rpx;
						text-align: center;
						font-size: 25rpx;
						border-radius: 12rpx;
						padding: 0 20rpx;
					}
				}
			}
		}

		// 我的订单
		.my-order {
			.top {
				display: flex;
				justify-content: space-between;
				margin-bottom: 39rpx;

				.title {
					font-size: 25rpx;
					letter-spacing: 3rpx;
				}

				.all-order {
					text {
						font-size: 25rpx;
						letter-spacing: 3rpx;
					}

					image {
						width: 11rpx;
						height: 21rpx;
						margin-left: 10rpx;
					}
				}
			}

			.items-box {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.title {
						width: 116rpx;
						text-align: center;
						font-size: 20rpx;
						letter-spacing: 2rpx;
						line-height: 60rpx;
					}

					.item-img1 {
						width: 61rpx;
						height: 50rpx;
					}

					.item-img2 {
						width: 62rpx;
						height: 50rpx;
					}

					.item-img3 {
						width: 51rpx;
						height: 49rpx;
					}

					.item-img4 {
						width: 53rpx;
						height: 51rpx;
					}
				}
			}
		}

		// 导航
		.navigation {
			.items-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 0;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;

					.item-img {
						width: 61rpx;
						height: 61rpx;
					}

					.title {
						width: 116rpx;
						text-align: center;
						font-size: 20rpx;
						letter-spacing: 2rpx;
						line-height: 60rpx;
					}
				}
			}

			.items-box2 {
				display: flex;
				align-items: center;
				margin: 20rpx 0;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-right: 58rpx;

					.item-img {
						width: 61rpx;
						height: 61rpx;
					}

					.item-img2 {
						width: 60rpx;
						height: 55rpx;
					}

					.item-img3 {
						width: 45rpx;
						height: 54rpx;

					}

					.title {
						width: 116rpx;
						text-align: center;
						font-size: 20rpx;
						letter-spacing: 2rpx;
						line-height: 60rpx;

					}
				}
			}
		}

		.card {
			margin: 20rpx 20rpx;
			border-radius: 20rpx;
			background-color: #fff;
			box-sizing: border-box;
			padding: 35rpx;
		}
	}
</style>
