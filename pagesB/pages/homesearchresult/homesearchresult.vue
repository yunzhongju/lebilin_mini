<template>
	<view class="home-search-box">
		<!-- 顶部搜索 -->
		<view class="top-key">
			<image class="search-icon" src="/pagesB/static/imgs/search_icon.png" mode=""></image>
			<input class="input-box" confirm-type="search" @confirm="subSearchResult" type="text" v-model="searchResult" value=""
			 placeholder="请输入关键字" />
			<text class="clear" @click="clearContent">清空</text>
		</view>

		<!-- 选项卡标题 -->
		<view class="tab-title">
			<view class="title-item" v-for="(item,index) in titleArr" :key="index" @click="changeIndex(index)">
				<text class="item-title">{{item}}</text>
				<text class="item-underline" v-if="currentIndex == index"></text>
			</view>
		</view>

		<!-- 选项卡内容 -->
		<view class="tab-content">
			<!-- 活动 -->
			<view class="activity-list-box" v-if="currentIndex == 0">
				<view v-if="activityArr.length == 0" style="font-size: 30rpx;text-align: center;line-height: 100rpx;">
					暂时没有相关活动哦~
				</view>

				<view v-else class="activity">
					<view class="card padding-item">
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
										<text class="time">活动日期:{{item.acStartTime.slice(0,-3)}}―{{item.acEndTime.slice(0,-3)}}</text>
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
									<button class="share-btn" v-if="state.userInfo.headerUrl" open-type="share" :data-activityId='item.activityId' :data-title="item.activityName" :data-imgUrl="item.acpicUrl">
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
						
						<!-- <view class="item-box">
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
										<text class="time">活动日期:{{item.acStartTime}}――{{item.acEndTime}}</text>
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
										<image style="width: 30rpx;" src="/static/home_icon/redu.png" mode="widthFix"></image>
										<text> {{item.viewCount}}</text>
									</view>
									<button class="share" open-type="share" :data-activityid="item.activityId">
										<image style="width: 38rpx;" src="/static/home_icon/fenxiang.png" mode="widthFix"></image>
										<text> 分享 {{item.shareCount}}</text>
									</button>
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
							<view class="split-line"></view>
						</view> -->
					</view>
				</view>
			</view>

			<!-- 社区动态 -->
			<view class="dynamic card" v-if="currentIndex == 1">
				<view style="font-size: 30rpx;text-align: center;line-height: 100rpx;" v-if="articleArr.length == 0">
					暂时没有相关动态哦 ~
				</view>
				<view class="item-box" v-for="(item,index) in articleArr" :key="index">
					<view class="dynamic-item">
						<image @click="pageToDynamicDetail(item.articleId)" class="dynamic-item-img" lazy-load :src="item.thumbnail"
						 mode=""></image>
						<text class="title">{{item.title}}</text>
						<view class="bottom-share">
							<view class="redu">
								<image style="width: 38rpx;" src="/static/home_icon/guanzhu.png" mode="widthFix" @click="pageToDynamicDetail(item.articleId)"></image>
								<text> {{item.hintcount}}</text>
							</view>
							<view class="share" @click="pageToDynamicDetail(item.articleId)">
								<image style="width: 38rpx;" src="/static/home_icon/pinglun.png" mode="widthFix"></image>
								<text>{{item.commentCount}}</text>
							</view>
							<view class="dianzan">
								<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
									<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png"
									 mode=""></image>
								</button>
								<view v-if="state.userInfo.headerUrl">
									<image @click="toAdmireArticle(item.articleId,index,'shequ')" style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png"
									 mode="" v-if="!item.isAdmire"></image>
									<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan_success.png" mode="" v-else></image>
								</view>
								<text>{{item.admireCount}}</text>
							</view>
						</view>
					</view>
					<view class="split-line"></view>
				</view>

			</view>

			<!-- 圈子 -->
			<view class="circle-list" v-if="currentIndex == 2">
				<view class="no-data" v-if="allCircleArr.length == 0">
					暂时没有圈子哦 ~ ~
				</view>
				<view v-else>
					<view class="circle-item" v-for="(item,index) in allCircleArr" :key="index">
						<view class="left-info" @click="pageToCircleDetail(item.circleId,item.isCreater)">
							<image class="left-icon" :src="item.headerUrl" mode=""></image>
							<view class="left-name">
								<text style="font-size: 30rpx;">{{item.circleName}}</text>
								<text style="color: #aaa;">{{item.joinNum}}人</text>
							</view>
							<image v-if="item.circleType == 1" class="is-volunteer" src="/pagesB/static/imgs/is_volunteer_circle.png" mode="widthFix"></image>
						</view>
						<text class="right-status add" v-if="!item.isJoin" @click="joinCircle(item.circleId)">加入</text>
						<text class="right-status has-add" v-else>已加入</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import ActivityApi from '@/servies/ActivityApi.js'
	import CircleApi from '@/servies/CircleApi.js'
	export default {
		data() {
			return {
				state: store.state,
				searchResult: '',
				titleArr: ['活动', '社区动态', '圈子'],
				currentIndex: 0,
				allowPull: false, //允许上拉加载
				pageNo: 1, //页码
				activityArr: [], //活动列表
				articleArr: [], //动态列表
				allCircleArr: [], //	圈子列表
			};
		},
		methods: {
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
			toAdmireArticle(articleId, index) { //点赞动态
				this.articleArr[index].isAdmire = true
				this.articleArr[index].admireCount++
				ActivityApi.thumbsUp({
					likeContent: articleId,
					likeType: 'dynamic'
				}, res => {
					console.log(res)
				})
			},
			searchContent() { //根据搜索内容搜索对应活动、动态和圈子
				if (this.currentIndex == 0) { //活动
					this.getActivityList({
						communityId: this.state.communityId,
						searchContent: this.searchResult,
						pageSize: 4,
						pageNo: this.pageNo
					})
				} else if (this.currentIndex == 1) { //动态
					this.getArticleList({
						companyId: this.state.communityId,
						channelId: this.state.channelId,
						searchContent: this.searchResult,
						pageSize: 4,
						pageNo: this.pageNo
					})
				} else { //圈子
					this.getCircleListFun()
				}
			},
			getActivityList(params, type = 'one') { //获取活动列表
				ActivityApi.getActivityList(params, res => {
					if (type == 'one') { //第一页
						this.activityArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.activityArr = [...this.activityArr, ...res.list]
						this.allowPull = !res.lastPage
					}

				})
			},
			getArticleList(params, type = 'one') { //获取社区动态
				ActivityApi.getArticleList(params, res => {
					console.log('社区动态列表', res.list)
					if (type == 'one') { //第一页
						this.articleArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.articleArr = [...this.articleArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			getCircleListFun(type = 'one', _type = '') { //获取圈子列表
				CircleApi.getCircleList({
					communityId: this.state.communityId,
					searchContent: this.searchResult,
					type: _type,
					pageSize: 8,
					pageNo: this.pageNo
				}, res => {
					// console.log( '圈子列表',res )
					if (type == 'one') { //第一页
						this.allowPull = !res.lastPage
						this.allCircleArr = res.list
					} else { //上拉加载更多
						this.allowPull = !res.lastPage
						this.allCircleArr = [...this.allCircleArr, ...res.list]
					}
				})
			},
			joinCircle(circleId) { //加入圈子
				let _that = this
				CircleApi.joinCircle({
					circleId
				}, res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					_that.pageNo = 1
					this.getCircleListFun()
				})
			},
			changeIndex(index) {
				this.currentIndex != index ? this.currentIndex = index : "",
					this.pageNo = 1
				this.searchContent() //获取搜索结果
			},
			pageToDetail(activityId) {
				uni.navigateTo({
					url: "/pagesB/pages/activitydetail/activitydetail?activityId=" + activityId
				})
			},
			pageToDynamicDetail(articleId) {
				uni.navigateTo({
					url: '/pagesB/pages/dynamicdetail/dynamicdetail?articleId=' + articleId
				})
			},
			pageToCircleDetail(id, creater) {
				uni.navigateTo({
					url: '/pagesB/pages/circledetail/circledetail?circleId=' + id + '&isCreater=' + creater,
				});
			},
			clearContent() {
				if (this.searchResult) {
					this.searchResult = ""
					this.searchContent()
				}
			},
			subSearchResult(e) {
				console.log(this.searchResult)
				// this.searchResult = ""
				this.searchContent() //获取搜索结果
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				let activityId = res.target.dataset.activityid
				let title = res.target.dataset.title
				let imgUrl = res.target.dataset.imgurl
				ActivityApi.shareActivity({activityId},res => {
					console.log( res )
				})
				return {
					title: title,
					path: '/pagesB/pages/activitydetail/activitydetail?activityId=' + activityId,
					imageUrl:imgUrl
				}
			}
		},
		onLoad(options) {
			this.searchContent()
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.searchContent()
		},
		onReachBottom() { //上拉加载更多
			if (this.currentIndex == 0 && this.allowPull) { //活动
				this.pageNo++
				this.getActivityList({
					communityId: this.state.communityId,
					searchContent: this.searchResult,
					pageSize: 4,
					pageNo: this.pageNo
				}, 'more')
			} else if (this.currentIndex == 1 && this.allowPull) { //动态
				this.pageNo++
				this.getArticleList({
					companyId: this.state.communityId,
					channelId: this.state.channelId,
					searchContent: this.searchResult,
					pageSize: 4,
					pageNo: this.pageNo
				}, 'more')
			} else if (this.currentIndex == 2 && this.allowPull) { //圈子
				this.pageNo++
				this.getCircleListFun('more')
			}
		}
	}
</script>

<style lang="scss">

	.home-search-box {

		// 顶部搜索
		.top-key {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 20rpx 0;
			position: relative;

			.search-icon {
				width: 44rpx;
				height: 44rpx;
				position: absolute;
				left: 44rpx;
				top: 28rpx;
			}

			.input-box {
				width: 590rpx;
				line-height: 60rpx;
				height: 60rpx;
				border-radius: 10rpx;
				background-color: #f4f4f4;
				font-size: 30rpx;
				padding-left: 60rpx;
				box-sizing: border-box;
			}

			.clear {
				margin-left: 20rpx;
			}
		}

		// 选项卡标题
		.tab-title {
			display: flex;
			align-items: center;
			justify-content: space-around;
			border-bottom: 1rpx solid #eee;

			.title-item {
				position: relative;

				.item-title {
					line-height: 66rpx;
					font-size: 34rpx;
				}

				.item-underline {
					position: absolute;
					bottom: 0;
					height: 0;
					width: 70%;
					bottom: 0rpx;
					left: 10%;
					border: 2rpx solid #FF2F29;
					background-color: #ff2f29;

				}
			}
		}

		// 选项卡内容
		.tab-content {

			// 活动
			.activity-list-box {
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
										line-height: 32rpx;
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
										font-size: 26rpx;
										line-height: 40rpx;
										color: #9fa0a0;
									}
									
								}
				
								.detail-right {
									display: flex;
									flex-direction: column;
									align-items: center;
				
									.is-baoming {
										margin-top: 20rpx;
										width: 110rpx;
										height: 30rpx;
										border: solid 2rpx #e62329;
										color: #e62329;
										font-size: 22rpx;
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
											font-size: 25rpx;
										}
									}
								}
							}
				
							.bottom-share {
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin:10rpx;
				
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

			// 社区动态
			.dynamic {
				.item-box {
					// margin-bottom: 20rpx;
					padding: 20rpx 20rpx 0 20rpx;
				
					.dynamic-item {
						display: flex;
						flex-direction: column;
				
						.dynamic-item-img {
							width: 100%;
							height: 296rpx;
							border-radius: 10rpx;
						}
				
						.title {
							font-size: 30rpx;
							line-height: 60rpx;
							color: #333333;
							margin: 0 10rpx;
						}
				
						.bottom-share {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin: 0 10rpx 20rpx 10rpx;
							.redu,
							.share,
							.dianzan {
								display: flex;
								align-items: center;
								line-height: 60rpx;
								font-size: 26rpx;
								color: #a0a1a1;
				
								image {
									margin-right: 10rpx;
								}
							}
						}
					}
				}
			}

			// 圈子
			.circle-list {
				.circle-item {
					display: flex;
					box-sizing: border-box;
					padding: 20rpx;
					justify-content: space-between;
					align-items: center;

					.left-info {
						display: flex;
						align-items: center;
						flex: 1;

						.left-icon {
							width: 106rpx;
							height: 106rpx;
							margin-right: 20rpx;
							border-radius: 18rpx;
						}

						.left-name {
							display: flex;
							flex-direction: column;

							text {
								font-size: 26rpx;
								color: #000;
								line-height: 36rpx;
							}

						}

						.is-volunteer {
							width: 41rpx;
							height: 38rpx;
							margin-left: 10rpx;
							margin-top: -28rpx;
						}
					}

					.right-status {
						width: 110rpx;
						height: 40rpx;
						font-size: 26rpx;
						line-height: 40rpx;
						text-align: center;
						border-radius: 20rpx;
						margin-right: 10rpx;

					}

					.add {
						background-color: #e62329;
						color: #fff;
					}

					.has-add {
						background-color: #dcdddd;
						color: #000;
					}
				}
			}
		}

		.card {
			background-color: #fff;
			border-radius: 10rpx;
			margin: 20rpx;
			box-shadow: 0rpx 6rpx 10rpx #ddd;
		}

		.padding-item {
			box-sizing: border-box;
			padding: 20rpx 20rpx 0 20rpx;
		}
		
		.split-line {
			height: 2rpx;
			background-color: #eee;
		}
	}
</style>
