<template>
	<view class="container">
		<!-- 首页轮播 -->
		<!-- <mySwiper height=362 :imgs="imgs"></mySwiper> -->

		<!-- <view style="height: 220rpx">

		</view> -->

		<view class="swiper-box">
			<activity-swiper indicatoractivecolor="#0DBA09" :jumpMsg="jumpMsg" autoplay=true indicatorDots=true previousMargin="30rpx"
			 nextMargin="30rpx" :imgs='imgs' height="280"></activity-swiper>
		</view>

		<!-- 我的圈子 -->
		<view class="card circle-box">
			<view class="my-circle">
				我的圈子
			</view>

			<view class="circle-choose">
				<view class="all-circle">
					<image @click="pageToAllCircle" src="/static/activity_icon/all-circle.png" mode=""></image>
					<text class="text">所有圈子</text>
					<text class="team-persons">成员{{circleNum}}</text>
				</view>
				<view class="circle-swiper-box">
					<swiper class="quanzi-swiper" circular indicator-active-color="#FFC500" :indicator-dots="true" :interval="3000"
					 :duration="500">
						<swiper-item class="item-style" v-for="(item,index) in circleArr" :key="index">

							<view class="swiper-item" v-for="(obj,i) in item" :key="i" @click="pageToCircleDetail(obj.circleId,obj.isCreater)">
								<image :src="obj.headerUrl" mode=""></image>
								<text class="team-name">{{obj.circleName}}</text>
								<text class="team-persons">成员{{obj.joinNum}}</text>
							</view>

						</swiper-item>

					</swiper>
				</view>
			</view>
		</view>

		<view class="card">

			<view class="choose-box">
				<view class="choose-activity">
					<view class="identify-list">
						<view class="identify-item" :class="{active:newOrMoreIndex == 0}" @click="changeNM(0)">
							最新活动
						</view>
						<view class="identify-item" :class="{active:newOrMoreIndex == 1}" @click="changeNM(1)">
							参与最多
						</view>

					</view>
					<view class="choose-more">
						<image @click="changeShowChoose" style="width: 36rpx;height: 36rpx;margin-right: 16rpx;" src="/static/activity_icon/choose_more.png" mode=""></image>
						<!-- <text style="margin-left: 16rpx;font-size: 30rpx;" @click="pageToMore">···</text> -->
						<image style="height: 36rpx;width: 36rpx;margin-left: 16rpx;" src="/static/home_icon/more.png" mode="" @click="pageToMore"></image>
					</view>

				</view>
				<view class="choose-more-activity" v-if="showChoose">
					<view class="choose-type">
						<view class="type-title">
							{{chooseType.type}}
						</view>
						<view class="acive-item-box">
							<view @click="changeType(index)" :class="{active:item['check']}" v-for="(item,index) in chooseType.value" :key="index"
							 class="type-item">
								{{item.themeName}}
							</view>
						</view>

					</view>
					<view class="choose-type">
						<view class="type-title">
							{{chooseTime.type}}
						</view>
						<view class="acive-item-box">
							<view @click="changeIndex(index)" :class="{active:index == currentIndex}" v-for="(item,index) in chooseTime.value"
							 :key="index" class="type-item">
								{{item.title}}
							</view>
						</view>
					</view>

					<view class="reset-sure">
						<text class="reset" @click="resetChoose">重置</text>
						<text class="sure" @click="sureChoose">确定</text>
					</view>
				</view>
			</view>


			<!-- tab-内容 -->
			<view class="tab-content">
				<!-- 社区活动 -->
				<view class="activity">
					<view style="font-size: 30rpx;text-align: center;line-height: 100rpx;" v-if="activityArr.length == 0">
						暂时没有相关活动哦 ~
					</view>

					<view class="item-box" v-for="(item,index) in activityArr" :key="index">
						<view class="acive-item">
							<view class="img-box" @click="pageToDetail(item.activityId)">
								<image class="active-item-img" lazy-load :src="item.acpicUrl" mode=""></image>
								<view class="sign-box">
									<text v-for="(items,i) in item.theme" :key="i">{{items}}</text>
								</view>
							</view>
							<view class="active-detail">
								<view class="detail-left">
									<text class="title">{{item.activityName}}</text>
									<text class="time">活动日期:{{item.acStartTime.slice(2,-3)}}--{{item.acEndTime.slice(2,-3)}}</text>
									<text class="address">{{item.addr}}</text>
								</view>
								<view class="detail-right">
									<view class="baoming-status">
										<image src="/static/home_icon/baoming_icon.png" mode="widthFix"></image>
										<text>{{item.integral}}</text>
									</view>
									<view class="is-baoming">
										{{item.status}}
									</view>
								</view>
							</view>
							<view class="bottom-share">
								<view class="redu">
									<image style="width: 38rpx;" src="/static/home_icon/redu.png" mode="widthFix"></image>
									<text> {{item.viewCount}}</text>
								</view>
								<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
									<image style="width: 38rpx;" src="/static/home_icon/fenxiang.png" mode="widthFix"></image>
									<text> 分享 {{item.shareCount}}</text>
								</button>
								<button class="share-btn" v-if="state.userInfo.headerUrl" open-type="share" :data-activityId='item.activityId'
								 :data-title="item.activityName" :data-imgUrl="item.acpicUrl">
									<image style="width: 38rpx;" src="/static/home_icon/fenxiang.png" mode="widthFix"></image>
									<text> 分享 {{item.shareCount}}</text>
								</button>
								<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
									<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
									<text>{{item.admireCount}}</text>
								</button>
								<view class="dianzan" v-if="state.userInfo.headerUrl">
									<view class="dianzan" v-if="!item.isAdmire" @click="toAdmire(item.activityId,index)">
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
										<text>{{item.admireCount}}</text>
									</view>
									<view class="dianzan" v-else>
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan_success.png" mode=""></image>
										<text>{{item.admireCount}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="split-line"></view>
					</view>


				</view>
			</view>
		</view>

		<!-- 发布活动 -->
		<view class="to-release" @click="pageToCreateActivity"></view>
	</view>
</template>

<script>
	import mySwiper from '@/components/mySwiper.vue'
	import activitySwiper from '@/components/activitySwiper.vue'
	import store from '@/store'
	import ActivityApi from '@/servies/ActivityApi.js'
	import CircleApi from '@/servies/CircleApi.js'
	import CommonApi from '@/servies/CommonApi.js'
	export default {
		data() {
			return {
				state: store.state,
				imgs: [],
				jumpMsg: [],
				newOrMoreIndex: 0, //最新和参与最多活动
				chooseType: {
					type: '类型',
					value: []
				},
				themeId: '', // 主题标识
				chooseTime: {
					type: '日期',
					value: [{
						title: '今日',
						time: 'today'
					}, {
						title: '明天',
						time: 'tomorrow'
					}, {
						title: '本周',
						time: 'thisWeek'
					}, {
						title: '本月',
						time: 'thisMonth'
					}]
				},
				time: '', //日期选择
				showChoose: false, //是否显示筛选活动
				currentIndex: -1,
				activitySign: ['公益服务', '文化体育', '免费'],
				activityArr: [], //活动列表
				circleNum:0, //所有圈子总人数
				pageNo: 1, //页码
				allowPull: true, //允许下拉刷新
				circleArr: [], //圈子列表
			}
		},
		// 注册组件
		components: {
			mySwiper,
			activitySwiper
		},
		methods: {
			getCircleTotalPeople(){ //获取所有圈子总人数
				CircleApi.getCircleTotalPeople(res => {
					this.circleNum = res
				})
			}, 
			getAdvertBanner() { //获取广告
				CommonApi.getAdvertBanner({
					communityId: this.state.communityId,
					displayPosition: 'ggwz_hdy'
				}, res => {
					console.log('轮播图片地址', res)
					this.imgs = res.map(item => this.state.baseUrl + item.picUrl)
					this.jumpMsg = res.map(item => {
						let temObj = {}
						temObj.jump = item.jump
						temObj.jumpUrl = item.jumpUrl
						return temObj
					})
				})
			},
			pageToCircleDetail(id, creater) {
				uni.navigateTo({
					url: '/pagesB/pages/circledetail/circledetail?circleId=' + id + '&isCreater=' + creater,
				});
			},
			getActivityTheme() { //获取活动主题
				ActivityApi.getActivityTheme(res => {
					let newRes = []
					for (const value of res) {
						newRes.push(Object.assign(value, {
							check: false
						}))
					}
					this.chooseType.value = newRes
					console.log(this.chooseType)
				})
			},
			changeNM(num) {

				if (this.newOrMoreIndex != num) {
					this.newOrMoreIndex = num
					let order = this.newOrMoreIndex == 0 ? 'newest' : 'mostJoin'
					this.pageNo = 1
					this.getActivityList({
						communityId: this.state.communityId,
						pageSize: 4,
						pageNo: this.pageNo,
						order: order
					})
				}
			},
			pageToCreateActivity() {
				uni.navigateTo({
					url: '/pagesB/pages/createactivity/createactivity'
				})
			},
			toAdmire(activityId, index) { //点赞活动
				this.activityArr[index].isAdmire = true
				this.activityArr[index].admireCount++
				ActivityApi.thumbsUp({
					likeContent: activityId,
					likeType: 'activity'
				}, res => {
					console.log(res)
				})
			},

			getActivityList(params, type = 'one') { //获取活动列表
				ActivityApi.getActivityList(params, res => {
					console.log('活动列表', res.list)
					if (type == 'one') { //获取第一个活动
						this.activityArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.pageNo++
						this.activityArr = [...this.activityArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			//是否显示筛选活动
			changeShowChoose() {
				this.showChoose = !this.showChoose
			},
			pageToDetail(activityId) {
				uni.navigateTo({
					url: "/pagesB/pages/activitydetail/activitydetail?activityId=" + activityId
				})
			},
			pageToMore() {
				uni.navigateTo({
					url: '/pagesB/pages/moreactivity/moreactivity'
				})
			},
			pageToAllCircle() {
				uni.navigateTo({
					url: '/pagesB/pages/allcircle/allcircle',
				});
			},
			changeIndex(index) {
				this.currentIndex != index ? this.currentIndex = index : '',

					// 获取选择的日期
					this.time = this.chooseTime['value'][index]['time']
				console.log(this.time)
			},
			changeType(index) {
				this.chooseType.value[index]['check'] = !this.chooseType.value[index]['check']

				//获取主题标识
				let chooseThemeArr = this.chooseType.value.filter(item => item['check'])
				let themeIdArr = chooseThemeArr.map(item => item['themeId'])
				this.themeId = themeIdArr.join()
				console.log(this.themeId)
			},
			resetChoose() { //重置筛选
				// 重置日期
				this.currentIndex = -1
				this.time = ''

				// 重置类型
				this.themeId = ''
				for (const value of this.chooseType['value']) {
					value['check'] = false
				}
			},
			sureChoose() { //确定筛选
				this.pageNo = 1
				let order = this.newOrMoreIndex == 0 ? 'newest' : 'mostJoin'
				this.getActivityList({
					themeId: this.themeId,
					time: this.time,
					communityId: this.state.communityId,
					pageSize: 4,
					pageNo: this.pageNo,
					order: order,
				})
				this.showChoose = false
			}

		},
		onLoad(options) {
			let order = this.newOrMoreIndex == 0 ? 'newest' : 'mostJoin'
			this.getCircleTotalPeople() //获取所有圈子总人数
			this.getAdvertBanner() //获取轮播图片
			this.getActivityList({
				communityId: this.state.communityId,
				pageSize: 4,
				pageNo: this.pageNo,
				order: order
			}) //加载活动
			this.getActivityTheme() //获取活动主题
			CircleApi.getCircleList({ //获取圈子列表
				communityId: this.state.communityId,
				type: 'IJoined',
				pageSize: 100,
				pageNo: 1
			}, res => {
				// console.log( res.list )
				let newArr = []
				for (let i = 0; i < res.list.length; i++) {
					if( i == res.list.length - 1 || (i + 1) % 4 == 0){
						newArr.push(res.list[i])
						this.circleArr.push(newArr)
						newArr = []
					}else if( (i + 1) % 4 != 0 ){
						newArr.push(res.list[i])
					}
				}
				console.log(this.circleArr)
			})
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				let activityId = res.target.dataset.activityid
				let title = res.target.dataset.title
				let imgUrl = res.target.dataset.imgurl
				ActivityApi.shareActivity({
					activityId
				}, res => {
					console.log(res)
				})
				return {
					title: title,
					path: '/pagesB/pages/activitydetail/activitydetail?activityId=' + activityId,
					imageUrl: imgUrl
				}
			}

		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			let order = this.newOrMoreIndex == 0 ? 'newest' : 'mostJoin'
			this.getActivityList({
				themeId: this.themeId,
				time: this.time,
				communityId: this.state.communityId,
				pageSize: 4,
				pageNo: this.pageNo,
				order: order,
			})
		},
		onReachBottom() { //上拉加载更多
			if (this.allowPull) { //加载活动
				this.pageNo++
				let order = this.newOrMoreIndex == 0 ? 'newest' : 'mostJoin'
				this.getActivityList({
					themeId: this.themeId,
					time: this.time,
					communityId: this.state.communityId,
					pageSize: 4,
					pageNo: this.pageNo,
					order: order,
				}, 'more')
			}
		}

	}
</script>

<style lang="scss">
	.container {
		position: relative;

		//首页轮播
		.swiper-box {
			padding-top: 20rpx;
			width: 100%;
		}

		// 我的圈子
		.circle-box {
			display: flex;
			flex-direction: column;

			.my-circle {
				font-size: 30rpx;
				line-height: 60rpx;
				font-weight: bold;
				position: relative;
				text-indent: 30rpx;

				&:before {
					content: "";
					width: 0;
					height: 40%;
					border: 2px solid #e62329;
					position: absolute;
					left: 10rpx;
					top: 15rpx;
					border-radius: 2px;
				}
			}

			.circle-choose {
				display: flex;
				align-items: flex-start;
				// margin-top: 20rpx;

				.all-circle {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 140rpx;
					flex-shrink: 0;

					image {
						margin-top: 8rpx;
						width: 106rpx;
						height: 106rpx;
					}

					.text {
						font-size: 22rpx;
						color: #000;
						line-height: 40rpx;
					}
					.team-persons{
						font-size: 22rpx;
						color: #c9caca;
						display: inline-block;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						text-align: center;
					}
				}

				.circle-swiper-box {
					width: 100%;

					.quanzi-swiper {
						height: 216rpx;

						.item-style {
							display: flex;
							justify-content: flex-start;
							align-items: flex-start;
							padding-top: 10rpx;

							.swiper-item {
								width: 110rpx;
								margin: 0rpx 18rpx;
								display: flex;
								flex-direction: column;
								align-items: center;

								image {
									width: 106rpx;
									height: 106rpx;
									border-radius: 20rpx;
								}

								.team-name {
									font-size: 22rpx;
									color: #222;
									width: 110rpx;
									overflow: hidden;
									white-space: nowrap;
									text-overflow: ellipsis;
									text-align: center;
									line-height: 40rpx;
								}

								.team-persons {
									font-size: 22rpx;
									color: #c9caca;
									display: inline-block;
									width: 100%;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
									text-align: center;
								}
							}
						}
					}
				}
			}
		}

		//活动选择
		.choose-box {
			position: relative;

			.choose-activity {
				display: flex;
				justify-content: space-between;
				align-items: center;
				// background-color: #fff;
				padding: 12rpx 30rpx;

				.identify-list {
					display: flex;
					justify-content: space-around;

					.identify-item {
						width: 140rpx;
						height: 40rpx;
						border-radius: 7rpx;
						background-color: #e6e6e6;
						line-height: 40rpx;
						font-size: 26rpx;
						text-align: center;
						margin-right: 30rpx;

						&.active {
							background-color: #f4adaf;
						}
					}
				}

				.choose-more {
					font-size: 26rpx;
				}
			}

			.choose-more-activity {
				position: absolute;
				top: 64rpx;
				left: 0rpx;
				background-color: #fff;
				border-top: 1px solid #ddd;
				display: flex;
				flex-direction: column;
				z-index: 1000;

				.choose-type {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					align-items: flex-start;

					.type-title {
						width: 100rpx;
						line-height: 40rpx;
						text-align: center;
						flex-shrink: 0;
						font-size: 26rpx;
						margin: 14rpx 0;
						font-weight: bold;
					}

					.acive-item-box {
						width: 650rpx;
						display: flex;
						flex-wrap: wrap;

						.type-item {
							width: 196rpx;
							height: 40rpx;
							border-radius: 7rpx;
							background-color: #e6e6e6;
							line-height: 40rpx;
							font-size: 26rpx;
							text-align: center;
							margin: 14rpx 10rpx;

							&.active {
								background-color: #f4adaf;
							}
						}
					}


				}

				.reset-sure {
					margin-top: 20rpx;
					display: flex;

					.reset {
						width: 50%;
						text-align: center;
						border: 1px solid #ddd;
						line-height: 60rpx;
					}

					.sure {
						width: 50%;
						text-align: center;
						border: 1px solid #ddd;
						line-height: 60rpx;
						color: #fff;
						background-color: #E51C23;
					}
				}
			}
		}

		.tab-content {
			margin-top: 10rpx;

			.activity {
				.item-box {
					// margin-bottom: 20rpx;
					padding: 0rpx 20rpx 20rpx 20rpx;

					.acive-item {
						display: flex;
						flex-direction: column;

						.img-box {
							position: relative;

							.active-item-img {
								width: 100%;
								height: 296rpx;
								vertical-align: middle;
								border-radius: 10rpx;
							}

							.sign-box {
								display: flex;
								position: absolute;
								flex-wrap: wrap;
								top: 0;
								left: 0;

								text {
									color: #fff;
									background-color: #FF2F29;
									font-size: 22rpx;
									line-height: 36rpx;
									padding: 0 30rpx;
									text-align: center;
									border-radius: 10rpx;
									margin-right: 10rpx;
									letter-spacing: 6rpx;
								}
							}
						}

						.active-detail {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin: 0 10rpx;

							.detail-left {
								display: flex;
								flex-direction: column;
								width: 80%;

								.title {
									font-size: 30rpx;
									line-height: 60rpx;
									color: #333333;
								}

								.time,
								.address {
									font-size: 24rpx;
									line-height: 40rpx;
									color: #9fa0a0;
								}

							}

							.detail-right {
								display: flex;
								flex-direction: column;
								align-items: center;
								width: 20%;

								.is-baoming {
									margin-top: 20rpx;
									width: 110rpx;
									height: 30rpx;
									border: solid 2rpx #e62329;
									color: #e62329;
									font-size: 24rpx;
									line-height: 30rpx;
									text-align: center;
									border-radius: 6px;
								}

								.baoming-status {
									display: flex;
									align-items: center;

									image {
										width: 42rpx;
										margin-right: 10rpx;
									}

									text {
										color: #e62329;
										font-size: 26rpx;
									}
								}
							}
						}

						.bottom-share {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin: 10rpx;

							.redu,
							.share-btn {
								background-color: #fff;
								border: none;
								outline: none;
								display: flex;
								align-items: center;
								font-size: 26rpx;
								color: #a0a1a1;

								&:after {
									border: none;
								}
							}

							,
							.dianzan {
								display: flex;
								align-items: center;
								line-height: 60rpx;
								font-size: 25rpx;
								color: #a0a1a1;

								image {
									margin-right: 10rpx;
								}
							}
						}
					}
				}

			}

		}

		.split-line {
			height: 2rpx;
			background-color: #eee;
		}

		.card {
			background-color: #fff;
			border-radius: 10rpx;
			margin: 20rpx;
			// box-shadow: 0rpx 6rpx 10rpx #ddd;
		}

		.padding-item {
			box-sizing: border-box;
			padding: 20rpx 20rpx 0 20rpx;
		}
	}

	// .mt-circle {
	// 	margin-top: 150rpx !important;
	// }

	//发布活动
	.to-release {
		width: 105rpx;
		height: 105rpx;
		border-radius: 50%;
		background: url("/static/activity_icon/reverse.png") 50% no-repeat;
		background-size: 100%;
		position: fixed;
		bottom: 55rpx;
		right: 45rpx;
		z-index: 2000;
	}

	page {
		background-color: #f7f7f7;
	}
</style>
