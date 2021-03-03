<template>
	<view class="volunteer-team-box">
		<!-- 选项卡标题 -->
		<view class="team-tab-title">
			<view @click="changeIndex(0)"><text class="title" :class="{active:currentindex == 0}">我是志愿者<text v-if="currentindex == 0"
					 class="under-line"></text></text><text>({{volTotal}})</text></view>
			<view @click="changeIndex(1)"><text class="title" :class="{active:currentindex == 1}">志愿者服务队<text v-if="currentindex == 1"
					 class="under-line"></text></text><text>({{volCircleTotal}})</text></view>
		</view>

		<!-- 选项卡内容-我是志愿者 -->

		<view class="add-box">
			<button v-if="!state.userInfo.headerUrl" class="add-volunteer" type="default" open-type="getUserInfo" @getuserinfo="getInfo"
			 style="padding: 0;">加入志愿者</button>
			<view v-else>
				<text class="add-volunteer" v-if="currentindex == 0 && !isVolunteer" @click="pageToVolunteerNeedKnow">加入志愿者</text>
				<text class="add-volunteer" v-if="currentindex == 0 && isVolunteer" @click="showShareModal">邀请志愿者</text>
			</view>
		</view>
		<view class="volunteers" v-if="currentindex == 0">
			<view class="volunteer-item" v-for="(item,index) in volArr" :key="index">
				<image class="left" :src="item.headerUrl" mode=""></image>
				<view class="right">
					<view class="right-top">
						<text>{{item.personname}}</text>
						<image src="/pagesB/static/imgs/member.png" mode="" v-if="item.isPartyMember"></image>
					</view>
					<view class="right-bottom">
						<text class="type-item" v-for="(skill,i) in item.skills" :key="i">{{skill}}</text>
					</view>
				</view>
			</view>


		</view>
		<!-- 志愿者服务队 -->
		<view class="volunteer-circle" v-if="currentindex == 1">

			<view class="item" @click="pageToCircleDetail(item.circleId)" v-for="(item,index) in volCircleList" :key="index">
				<view class="left">
					<image :src="item.headerUrl" mode=""></image>
					<text>{{item.joinNum}}人</text>
				</view>
				<view class="right">
					<text>{{item.circleName}}</text>
					<!-- <text>028-28283233</text>
					<text>专门为社区居民治安巡逻服务</text> -->
				</view>
			</view>
		</view>

		<!-- 海报 -->
		<volunteerSgareModal ref="poster" title="志愿不仅是一种精神，更是一种生活态度。加入我们，人生将更加美好!" :headerImg="state.baseUrl + '/images/wxa_pic/volunteer_share.jpg'"
		 :qrcode="qr_desc"></volunteerSgareModal>
	</view>
</template>

<script>
	import volunteerSgareModal from '@/pagesB/components/volunteerShareModal.vue'
	import api from '@/utils/api.js'
	import UserApi from '@/servies/UserApi.js'
	import CircleApi from '@/servies/CircleApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				isVolunteer: false, //是否已加入志愿者
				currentindex: 0, //选项卡
				volArr: [], //志愿者列表
				volTotal: 0, //志愿者总条数
				volCircleList: [], //志愿者圈子列表
				volCircleTotal: 0, //志愿者圈子总条数
				pageSize: 9, //志愿者每页条数
				pageNo: 1,
				allowPull: true, //允许上拉加载更多
				qr_desc: ''
			};
		},
		components: {
			volunteerSgareModal
		},
		methods: {
			showShareModal() {
				UserApi.getMyVolunteerCert(res => {
					this.qr_desc = res.qrCodeUrl
					setTimeout(() => {
						this.$refs.poster.showCanvas()
					}, 300);
				})
			},
			getInfo(e) {
				api.bindgetuserinfo(e)
			},
			getVolunteerList(params) { //获取志愿者列表
				UserApi.getVolunteerList({
					communityId: this.state.communityId,
					pageSize: params.pageSize,
					pageNo: params.pageNo
				}, res => {
					if (params.first) { //第一页
						this.volTotal = res.totalRow
						this.volArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.volArr = [...this.volArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			getCircleList(params) { //获取志愿者圈子列表
				CircleApi.getCircleList({
					communityId: this.state.communityId,
					type: 'volunteer',
					pageSize: params.pageSize,
					pageNo: params.pageNo
				}, res => {
					if (params.first) { //第一页
						this.volCircleTotal = res.totalRow
						this.volCircleList = res.list
						this.allowPull = !res.lastPage
						console.log(this.volCircleList)
					} else { //上拉加载更多
						this.volCircleList = [...this.volCircleList, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			changeIndex(num) {
				if (this.currentindex != num) {
					this.currentindex = num
					this.pageNo = 1
					if (num == 0) {
						// 获取志愿者列表
						this.getVolunteerList({
							pageSize: this.pageSize,
							pageNo: this.pageNo,
							first: true
						})
					} else {
						// 获取圈子列表
						this.getCircleList({
							communityId: this.state.communityId,
							type: 'volunteer',
							pageSize: this.pageSize,
							pageNo: this.pageNo,
							first: true
						})
					}
				}
			},
			pageToVolunteerNeedKnow() {
				uni.navigateTo({
					url: "/pagesB/pages/volunteerneedknow/volunteerneedknow"
				})
			},
			pageToCircleDetail(id) {
				uni.navigateTo({
					url: "/pagesB/pages/circledetail/circledetail?circleId=" + id
				})
			}
		},
		onLoad(options) {
			this.currentindex = options.currentindex || 0

			// 获取是否志愿者信息
			UserApi.getuserInfo(res => {
				this.isVolunteer = res.isVolunteer
			})

			// 获取志愿者列表
			this.getVolunteerList({
				pageSize: this.pageSize,
				pageNo: this.pageNo,
				first: true
			})

			// 获取圈子列表
			this.getCircleList({
				communityId: this.state.communityId,
				type: 'volunteer',
				pageSize: this.pageSize,
				pageNo: this.pageNo,
				first: true
			})

		},
		onReachBottom() { //上拉加载更多
			if (this.allowPull) {
				this.pageNo++
				if (this.currentindex == 0) { //加载更多志愿者
					this.getVolunteerList({
						pageSize: this.pageSize,
						pageNo: this.pageNo,
					})
				} else if (this.currentindex == 1) { //加载更多志愿者圈子
					this.getVolunteerList({
						communityId: this.state.communityId,
						type: 'volunteer',
						pageSize: this.pageSize,
						pageNo: this.pageNo
					})
				}
			}
		},
		onHide() {
			this.pageNo = 1
		}
	}
</script>

<style lang="scss">
	.volunteer-team-box {

		//选项卡标题
		.team-tab-title {
			display: flex;
			justify-content: center;
			margin: 30rpx 0;

			&>view {
				// width: 240rpx;
				padding: 0 16rpx;
				text-align: center;

				text {
					font-size: 26rpx;
				}

				.title {
					font-size: 30rpx;
					letter-spacing: 3rpx;
					position: relative;

					&.active {
						font-size: 34rpx;
						font-weight: bold;
					}

					.under-line {
						position: absolute;
						width: 40%;
						height: 0;
						background-color: #FF2F29;
						border: 2rpx solid #FF2F29;
						bottom: -10rpx;
						left: 30%;
					}
				}

			}
		}

		//选项卡内容
		.add-box {
			text-align: end;
			display: flex;
			justify-content: flex-end;

			.add-volunteer {
				border: 1rpx solid #000;
				font-size: 22rpx;
				line-height: 40rpx;
				display: block;
				width: 140rpx;
				text-align: center;
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}

		.volunteers {
			.volunteer-item {
				margin: 30rpx 0;
				display: flex;
				align-items: center;
				justify-content: flex-start;

				.left {
					width: 96rpx;
					height: 96rpx;
					border-radius: 50%;
					margin: 0 30rpx 0 50rpx;
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: column;

					.right-top {
						display: flex;
						align-items: center;
						margin-bottom: 8rpx;

						text {
							font-size: 26rpx;
							margin-right: 20rpx;
						}

						image {
							width: 26rpx;
							height: 29rpx;
						}
					}

					.right-bottom {
						display: flex;
						justify-content: flex-start;

						text {
							font-size: 22rpx;
							line-height: 30rpx;
							background-color: #e62329;
							color: #fff;
							padding: 0 10rpx;
							border-radius: 8rpx;
							margin-right: 20rpx;
						}
					}
				}
			}

		}

		.volunteer-circle {
			.item {
				display: flex;
				align-items: center;

				.left {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin: 30rpx 40rpx 30rpx 70rpx;

					image {
						width: 96rpx;
						height: 96rpx;
					}

					text {
						font-size: 26rpx;
					}
				}

				.right {
					display: flex;
					flex-direction: column;

					text {
						font-size: 30rpx;
						line-height: 46rpx;
						margin-bottom: 30rpx;
					}
				}
			}

		}
	}
</style>
