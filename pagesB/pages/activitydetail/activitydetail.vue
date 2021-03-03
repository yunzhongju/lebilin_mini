<template>
	<view class="activity-detail">

		<!-- 顶部活动状态 -->
		<view class="activity-status">
			<image class="top-img" :src="activityDetailArr.acpicUrl" mode=""></image>
			<text class="interview">{{activityDetailArr.activityName}}，邀请你参加</text>
			<text class="activity-status">{{activityDetailArr.status}}</text>
		</view>

		<!-- 选项卡标题 -->
		<view class="activity-person">
			<view @click="changeIndex(0)">
				<image style="width: 37rpx;height: 35rpx;margin-right: 8rpx;" src="/pagesB/static/imgs/activity_detail.png" mode=""></image>
				<text class="title" :class="{active:activeIndex == 0}">活动详情<text class="bottom-active" v-show="activeIndex == 0"></text></text>
			</view>
			<view @click="changeIndex(1)">
				<image style="width: 28rpx;height: 38rpx;margin-right: 8rpx;" src="/pagesB/static/imgs/checkon.png" mode=""></image>
				<text class="title" :class="{active:activeIndex == 1}">报名考勤<text class="bottom-active" v-show="activeIndex == 1"></text></text>
				<text class="persons">(<text style="color: #e62329;">{{attendanceNum}}</text>/{{personTotal || 0}})</text>
				
			</view>
		</view>

		<!-- 活动信息 -->
		<view class="activity-msg-box" v-if="activeIndex == 0">
			<view class="activity-msg">
				<view class="activity-title">
					活动信息
				</view>
				<view class="activity-content">
					<view class="activity-item">
						<image src="/static/activity_icon/sponsor_icon.png" mode="widthFix"></image>
						<text>活动主办方 :{{activityDetailArr.sponsor}} </text>
					</view>
					<view class="activity-item">
						<image src="/static/activity_icon/addr.png" mode="widthFix"></image>
						<text>活动地点 : {{activityDetailArr.addr}}</text>
					</view>
					<view class="activity-item">
						<image src="/static/activity_icon/stoptime.png" mode="widthFix"></image>
						<text>报名截止时间 :<text style="color: #EB6668;margin-left: 6rpx;">{{activityDetailArr.endTime}}</text></text>
					</view>
					<view class="activity-item">
						<image src="/static/activity_icon/type.png" mode="widthFix"></image>
						<text>活动类型 : {{activityType}}</text>
					</view>
				</view>
			</view>
			<view class="sign-up-msg">
				<view class="sign-up-title">
					报名信息
				</view>
				<view class="sign-up-content">
					<view class="sign-item">
						<image style="width: 41rpx;height: 38rpx;margin-right: 12rpx;margin-left: 20rpx;" src="/static/activity_icon/signup_count.png" mode=""></image>
						<view>报名人数 : <text style="color: #EB6668;">{{activityDetailArr.nowLimitNum}}/{{activityDetailArr.limitNum}}</text></view>
					</view>
					<view class="sign-item">
						<image style="width: 42rpx;height: 36rpx;margin-right: 4rpx;margin-left: 20rpx;" src="/static/activity_icon/volunteer_count.png" mode=""></image>
						<view>志愿者报名人数 : <text style="color: #EB6668;">{{activityDetailArr.nowVLimitNum}}/{{activityDetailArr.vLimitNum}}</text></view>
					</view>
					<view class="sign-item">
						<view style="text-indent: 50rpx;">{{activityDetailArr.activityIntroduce}}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 评论列表 -->
		<view class="comment-box" v-if="activeIndex == 0">

			<view class="comment-title">
				<text>评论</text>
				<!-- <view class="to-comment">
					<image src="/static/activity_icon/tocomment_icom.png" mode="widthFix"></image>
					<text>发表评论</text>
				</view> -->
			</view>

			<view class="no-comment" v-if="commentArr.length == 0" style="text-align: center; line-height: 60rpx;">
				暂时没有评论哦 ~
			</view>
			<view class="comment-content" v-else>
				<!-- 评论列表 -->
				<view class="content-item-box" v-for="(item,index) in commentArr" :key="index">
					<view class="item-info">
						<view class="info-left">
							<image :src="item.headerUrl" mode="widthFix"></image>
						</view>
						<view class="info-right">
							<view class="right-top">
								<text class="person">{{item.nickName}}</text>
								<view class="to-click">
									<image v-if="item.isThumbsUp" src="/static/activity_icon/dianzan_y.png" mode=""></image>
									<image v-else @click="checkState(index)" src="/static/activity_icon/dianzan_n.png" mode=""></image>
									<text>{{item.thumbsUp}}</text>
								</view>
							</view>
							<view class="right-center-content">
								{{item.commentContent}}
							</view>
							<view class="reply-img" v-if="item.commentPic.length > 0">
								<view style="display: inline-block;width: 196rpx;height: 152rpx;overflow: hidden;margin: 10rpx 10rpx 0 0;" v-for="(img,ind) in item.commentPic" :key="ind">
									<image class="img-item" lazy-load="true" :src="img" mode="widthFix" @click="lookImg(ind,item.commentPic)"></image>
								</view>
							</view>
							<view class="right-center-tocomment">
								<text class="time" @click="showReplyFun('reply',{commentId:item.commentId,toPerson:item.commentPerson})">{{item.commentTime}} · <text>回复ta</text></text>
							</view>

							<view class="right-bottom-reply" v-if="item.replyList.length > 0" @click="pageToReply(item)">
								<view class="reply-item" v-for="(items,i) in item.replyList" :key="i">
									<text class="all" v-if="i < 2"><text class="person">{{items.fromPerson}} :</text>{{items.replyContent}}</text>
								</view>
								<view class="show-more" v-if="item.replyList.length > 2">
									查看更多
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 考勤 -->
		<view class="work-box" v-if="activeIndex == 1">

			<view class="qs-sta" style="display: flex;align-items: center;justify-content: center;width: 100%;margin: 20rpx 0;">
				<image :src="qrCodeUrl" mode="" style="width: 200rpx; height: 200rpx;"></image>
				<view class="click-big" style="display: flex;flex-direction: column;margin-left: 30rpx;">
					<text style="font-weight: bold;font-size: 26rpx;">微信扫一扫签到</text>
					<!-- <text style="font-size: 24rpx;">点击放大保存</text> -->
				</view>
			</view>

			<view class="work-item" v-for="(item,index) in memberArr" :key="index">
				<view class="top-img">
					<image class="avatar" :src="item.headerUrl" mode=""></image>
					<image v-if="item.isVolunteer" class="is-zhiyuanzhe" src="/static/activity_icon/volunteers.png" mode=""></image>
					<image v-if="item.attendance" class="is-sure" src="/static/activity_icon/correct.png" mode=""></image>
				</view>
				<text class="bottom-name">
					{{item.nickName}}
				</text>
			</view>

		</view>

		<!-- 底部固定栏 -->
		<view class="to-reply" v-if="showReply">
			<textarea @blur="hideReplyFun" show-confirm-bar="false" focus maxlength="200" v-model="replyContent" cursor-spacing=20
			 fixed auto-height placeholder="发表评论"></textarea>
			<text class="sure-reply" @click="published">发表</text>
		</view>
		<view class="bottom-choose" v-else>
			<view class="bottom-left">
				<button class="left-item btn-left-item" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
					<image src="/static/activity_icon/share_icon.png" mode="widthFix"></image>
					<text>分享</text>
				</button>
				<button class="left-item btn-left-item" v-if="state.userInfo.headerUrl" :data-activityId="activityId" open-type="share">
					<image src="/static/activity_icon/share_icon.png" mode="widthFix"></image>
					<text>分享</text>
				</button>

				<view class="left-item" v-if="!state.userInfo.headerUrl" :data-activityId="activityId" open-type="share">
					<image src="/static/activity_icon/dianzan_icon.png" mode="widthFix"></image>
					<text>点赞</text>
				</view>
				<view v-if="state.userInfo.headerUrl">
					<view class="left-item" @click="clickActivity" v-if="!activityDetailArr.isAdmire">
						<image src="/static/activity_icon/dianzan_icon.png" mode="widthFix"></image>
						<text>点赞</text>
					</view>
					<view class="left-item" v-if="activityDetailArr.isAdmire">
						<image src="/static/activity_icon/dianzan_y.png" mode="widthFix"></image>
						<text style="color: #FF2F29;">已点赞</text>
					</view>
				</view>

				<view class="left-item" @click="pageToRelease">
					<image src="/static/activity_icon/to_reply.png" mode="widthFix"></image>
					<text>评论</text>
				</view>
			</view>
			<view class="bottom-right">
				<button class="left-item btn-left-item" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
					<view class="to-comment" @click="openModel" v-if="!activityDetailArr.isEnter">
						立即报名
					</view>
				</button>
				<view>
					<view class="to-comment" @click="openModel" v-if="!activityDetailArr.isEnter">
						立即报名
					</view>
					<view class="to-comment" style="background-color: #C0C0C0;" v-if="activityDetailArr.isEnter">
						已报名
					</view>
				</view>
			</view>
		</view>

		<!-- 选择活动角色 -->
		<view class="choose-type" :class="{show:showModel}">
			<view class="top-close">
				<text @click="closeModel" style="font-size: 30rpx;margin: 10rpx 20rpx;">×</text>
			</view>
			<view class="title">
				<text>请选择你的活动角色</text>
			</view>

			<form @submit="subType">
				<radio-group @change="radioChange" class="check-box">
					<label>
						<radio value="志愿者" color="#FF2F29" checked />
						<text>志愿者</text>
					</label>

					<label>
						<radio value="群众" color="#FF2F29" />
						<text>群众</text>
					</label>
				</radio-group>
				<button class="sub-type" form-type="submit">确定</button>
			</form>

		</view>
	
	</view>
</template>

<script>
	import activitySwiper from '@/components/activitySwiper.vue'
	import store from '@/store'
	import ActivityApi from '@/servies/ActivityApi.js'
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				state: store.state,
				activeIndex: 0, 
				replyContent: '',
				showReply: false,
				showModel: false,
				checkType: '志愿者',
				activityId: '', //活动Id
				activityDetailArr: [], //活动详情
				activityType: '', //活动类型
				inputType: '', //评论还是回复
				commentArr: [], //评论列表
				pageNo: 1, //评论页码
				allowPull: true, //允许评论上拉加载更多
				replyObj: null,
				memberArr: [], // 报名成员列表
				pageNoM: 1, //成员页码
				personTotal: 0, //总成员
				qrCodeUrl: '', //考勤二维码
				allowMemberPull: false, //允许成员上拉加载更多
				attendanceNum: 0, //考勤人数
			};
		},
		components: {
			activitySwiper
		},
		methods: {
			lookImg(index,picList){ // 预览图片
				uni.setStorageSync("currentImgIndex",index)
				let newPic = picList.map( item => {
					return {
						filePath:item
					}
				} )
				uni.setStorageSync('imgPreviewPicList', newPic)
				uni.navigateTo({
					url:'/pagesB/pages/imgPreview/imgPreview'
				})
			},
			getInfo(e) {
				api.bindgetuserinfo(e)
			},
			getActivityMember(params, type = 'one') { //获取活动报名成员
				ActivityApi.getActivityMember(params, res => {
					console.log(res)
					this.attendanceNum = res.attendanceNum
					if (type = 'one') { //第一页

						this.qrCodeUrl = res.qrCodeUrl
						this.personTotal = res.member.totalRow
						this.memberArr = res.member.list
						this.allowMemberPull = !res.lastPage
						console.log('成员信息第一页', this.qrCodeUrl, this.personTotal)
					} else { //上拉加载更多
						console.log('成员信息更多', res.member.list)
						this.memberArr = [...this.memberArr, ...res.member.list]
						this.allowMemberPull = !res.lastPage
					}
				})
			},
			clickActivity() { //点赞活动
				this.thumbsUp({
					likeContent: this.activityId,
					likeType: 'activity'
				})
			},
			checkState(index) { //点赞评论
				this.commentArr[index].isThumbsUp = !this.commentArr.isThumbsUp
				this.commentArr[index].thumbsUp += 1
				this.thumbsUp({
					likeContent: this.commentArr[index].commentId,
					likeType: 'comment'
				})
			},
			thumbsUp(params) { //点赞活动,评论,动态
				let _that = this
				ActivityApi.thumbsUp(params, res => {
					console.log(res.msg)
					if (params.likeType == 'activity') {
						_that.getActivityDetail({
							activityId: params.likeContent
						})
					}
				})
			},
			addCommentReply(params) { //回复评论
				const _that = this
				if (params.replyContent.trim().length == 0) return
				ActivityApi.addCommentReply(params, res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					_that.pageNo = 1
					_that.getActivityComment({
						activityId: _that.activityId,
						pageNo: 1,
						pageSize: 4
					})
				})
			},
			addActivityComment(params) { //发表评论
				if (params.commentContent.trim().length == 0) return
				ActivityApi.addActivityComment(params, res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.pageNo = 1
					this.getActivityComment({
						activityId: this.activityId,
						pageNo: 1,
						pageSize: 4
					})
				})
			},
			pageToRelease(){
				uni.navigateTo({
					url:'/pagesB/pages/release/release?id=' + this.activityId
				})
			},
			getActivityComment(params, type = 'one') { //获取活动评论列表
				if (type == 'one') { //评论第一页
					ActivityApi.getActivityComment(params, res => {
						console.log( res.list )
						this.commentArr = res.list
						this.allowPull = !res.lastPage
					})
				} else { //上拉加载时调用
					ActivityApi.getActivityComment(params, res => {
						console.log('评论列表', res.list)
						this.commentArr = [...this.commentArr, ...res.list]
						this.allowPull = !res.lastPage
					})
				}
			},
			getActivityDetail(params) { //获取活动详情
				ActivityApi.getActivityDetail(params, res => {
					this.activityDetailArr = res
					this.activityType = res.theme.join()
				})
			},
			signUpActivity(params) { //报名活动
				const _that = this
				ActivityApi.signUpActivity(params, res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					_that.timer = setTimeout(() => {
						_that.getActivityDetail({
							activityId: this.activityId
						})
					}, 500)
				})
			},
			openModel() {
				this.showModel = true
			},
			closeModel() {
				this.showModel = false
			},
			radioChange(e) {
				this.checkType = e.target.value
			},
			subType(e) {
				let role = this.checkType == '志愿者' ? 'volunteer' : 'user' //判断用户报名身份
				console.log(role)
				this.signUpActivity({
					activityId: this.activityId,
					role
				})
				this.showModel = false
			},
			pageToReply(item) {
				uni.navigateTo({
					url: '/pagesB/pages/reply/reply?item=' + JSON.stringify(item) + '&activityId=' + this.activityId
				})
			},
			changeIndex(num) {
				if (this.activeIndex != num) {
					this.activeIndex = num
				}
			},
			published() {
				console.log(this.replyContent, this.inputType)
				if (this.inputType == 'reply') {
					//回复
					this.replyObj.activityId = this.activityId
					this.replyObj.replyContent = this.replyContent
					this.addCommentReply(this.replyObj)
				} else if (this.inputType == 'comment') {
					//评论
					console.log({
						activityId: this.activityId,
						commentContent: this.replyContent
					})
					this.addActivityComment({
						activityId: this.activityId,
						commentContent: this.replyContent
					})
				}
				this.replyContent = ""
				this.showReply = false
			},
			showReplyFun(type, obj = null) {
				this.showReply = true
				this.inputType = type
				this.replyObj = obj
			},
			hideReplyFun() {
				this.showReply = false
			}
		},
		onLoad(options) {
			// console.log( options )
			if( options.activeIndex ){
				this.activeIndex = options.activeIndex 
			}
			this.activityId = options.activityId || '' //分享或者活动点进来
			
			this.getActivityDetail({
				activityId: options.activityId
			}) //活动详情
			this.getActivityComment({
				activityId: options.activityId,
				pageNo: 1,
				pageSize: 4
			}) //评论列表
			this.getActivityMember({ //活动报名成员列表
				activityId: this.activityId,
				pageSize: 100,
				pageNo: this.pageNoM
			})
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getActivityDetail({
				activityId: this.activityId
			}) //活动详情
			this.getActivityComment({
				activityId: this.activityId,
				pageNo: 1,
				pageSize: 4
			}) //评论列表
		},
		onReachBottom() {
			if (this.allowPull && this.activeIndex == 0) { //上拉加载更多评论
				this.pageNo++
				this.getActivityComment({
					activityId: this.activityId,
					pageNo: this.pageNo,
					pageSize: 4
				}, 'more')
			} else if (this.allowMemberPull && this.activeIndex == 1) { //上拉加载更多报名成员
				this.pageNoM++
				this.getActivityMember({
					activityId: this.activityId,
					pageSize: 30,
					pageNo: this.pageNoM
				}, 'more')
			}
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				let activityId = res.target.dataset.activityid
				ActivityApi.shareActivity({
					activityId
				}, res => {
					console.log(res)
				})
				return {
					title: '活动分享',
					path: '/pagesB/pages/activitydetail/activitydetail?activityId=' + activityId
				}
			}

		},

		onHide() {
			this.timer = ''
		}
	}
</script>

<style lang="scss">
	.activity-detail {
		margin-bottom: 124rpx;

		.choose-type {
			width: 600rpx;
			height: 400rpx;
			background-color: #fff;
			box-shadow: 0rpx 0rpx 20rpx #eee;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			margin: auto;
			z-index: 1000;
			border-radius: 20rpx;
			box-sizing: border-box;
			padding: 10rpx;
			visibility: hidden;
			opacity: 0;
			transition: all 0.5s ease;

			&.show {
				visibility: visible;
				opacity: 1;
			}

			.top-close {
				display: flex;
				flex-direction: row-reverse;
			}

			.title {
				text {
					display: block;
					line-height: 60rpx;
					font-weight: bold;
					font-size: 30rpx;
					text-align: center;
				}
			}

			.check-box {
				display: flex;
				justify-content: space-around;
				margin: 50rpx;
			}

			.sub-type {
				height: 50rpx;
				line-height: 50rpx;
				width: 360rpx;
				font-size: 24rpx;
				border-radius: 20rpx;
				background-color: #FF2F29;
				color: #fff;
			}
		}

		// 活动状态
		.activity-status {
			box-sizing: border-box;
			padding: 6rpx 20rpx;
			display: flex;
			flex-direction: column;

			.top-img {
				width: 100%;
				height: 314rpx;
			}

			.interview {
				font-size: 30rpx;
				line-height: 60rpx;
				color: #000000;
			}

			.activity-status {
				font-size: 24rpx;
				color: #e62329;
				padding: 0;
				align-self: flex-end;
				padding: 0 47rpx;
				line-height: 46rpx;
				height: 46rpx;
				border-radius: 23rpx;
				border: 2rpx solid #e62329;
			}
		}

		//活动详情
		.activity-person {
			margin-top: 24rpx;
			display: flex;
			justify-content: center;
			border-top: 4rpx dashed #eee;
			border-bottom: 4rpx dashed #eee;
			padding: 6rpx 0;
			line-height: 50rpx;

			view {
				padding: 0 50rpx;
				display: flex;
				align-items: center;
				
				.title{
					position: relative;
					font-size: 24rpx;
					&.active {
						font-size: 30rpx;
						font-weight: bold;
					}
					.bottom-active {
						width: 50%;
						height: 4rpx;
						position: absolute;
						background-color:#e62329;
						bottom: -4rpx;
						left: 25%;
					}
				}
				

				.persons {
					font-size: 24rpx;
					font-weight: normal;
					align-self: baseline;
				}
			}
		}

		//活动信息
		.activity-msg-box {
			padding: 20rpx;
			box-sizing: border-box;
			border-bottom: 8rpx solid #EFEFEF;

			.activity-msg {
				.activity-title {
					font-size: 28rpx;
					font-weight: bold;
					line-height: 50rpx;
				}

				.activity-content {
					display: flex;
					flex-direction: column;

					.activity-item {
						display: flex;
						align-items: center;
						padding-left: 20rpx;
						box-sizing: border-box;
						margin: 6rpx 0;

						image {
							width: 38rpx;
							height: 38rpx;
							margin-right: 10rpx;
						}

						text {
							font-size: 26rpx;
							line-height: 48rpx;
							color: #000000;
						}
					}
				}
			}

			.sign-up-msg {
				.sign-up-title {
					font-size: 28rpx;
					font-weight: bold;
					line-height: 50rpx;
				}

				.sign-up-content {
					display: flex;
					flex-direction: column;

					.sign-item {
						margin: 6rpx 0;
						line-height: 48rpx;
						display: flex;
						align-items: center;
						view {
							display: block;
							font-size: 26rpx;
						}
					}
				}
			}
		}

		//评论
		.comment-box {
			display: flex;
			flex-direction: column;
			border-bottom: 4rpx solid #eee;

			.comment-title {
				display: flex;
				align-items: center;
				// justify-content: space-between;
				box-sizing: border-box;
				padding: 0 20rpx;
				line-height: 60rpx;
				font-size: 26rpx;
				border-bottom: 2rpx solid #eee;

				.to-comment {
					display: flex;
					align-items: center;

					image {
						width: 36rpx;
						margin-right: 10rpx;
						margin-top: 8rpx;
					}
				}
			}

			.comment-content {
				.content-item-box {
					border-bottom: 2rpx solid #eee;
					padding: 14rpx 0;

					.item-info {
						display: flex;
						justify-content: space-around;
						align-items: flex-start;
						padding: 0 20rpx;

						.info-left {
							width: 70rpx;

							image {
								width: 64rpx;
								height: 64rpx;
								border-radius: 50%;
							}
						}

						.info-right {
							width: 620rpx;

							.right-top {
								display: flex;
								justify-content: space-between;
								align-items: center;
								margin-bottom: 30rpx;

								.person {
									font-size: 30rpx;
									color: #7B92AB;
								}

								.to-click {
									display: flex;
									align-items: center;

									image {
										width: 26rpx;
										height: 26rpx;
										margin-right: 6rpx;
									}

									text {
										font-size: 24rpx;
										line-height: 26rpx;
									}
								}
							}

							.right-center-content {
								font-size: 24rpx;
								line-height: 36rpx;
								color: #505050;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 3;
								overflow: hidden;
								text-overflow: hidden;
								word-break: break-all;
							}
							
							.reply-img{
								display: flex;
								flex-wrap: wrap;
								.img-item{
									width: 196rpx;
									// height: 152rpx;
								}
							}

							.right-center-tocomment {
								.time {
									font-size: 22rpx;
									line-height: 36rpx;
									color: #8f8f8f;

									text {
										font-size: 24rpx;
										line-height: 36rpx;
										color: #000000;
									}
								}
							}

							.right-bottom-reply {
								background-color: #efefef;
								padding: 0 18rpx;

								.reply-item {
									.all {
										color: #505050;
										font-size: 24rpx;
										line-height: 36rpx;
									}

									.person {
										color: #5c748c;
										font-size: 24rpx;
										line-height: 36rpx;
										margin-right: 6rpx;
									}
								}

								.show-more {
									line-height: 50rpx;
									font-size: 24rpx;
									display: inline;
								}
							}
						}
					}
				}
			}
		}

		//考勤
		.work-box {
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;

			.work-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 20rpx 24rpx;

				.top-img {
					position: relative;

					.avatar {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
					}

					.is-zhiyuanzhe {
						width: 20rpx;
						height: 20rpx;
						position: absolute;
						top: 10rpx;
						right: 0rpx;
					}

					.is-sure {
						width: 36rpx;
						height: 36rpx;
						position: absolute;
						bottom: -14rpx;
						right: 29rpx;
					}
				}

				.bottom-name {
					font-size: 24rpx;
					line-height: 60rpx;
					width: 100rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					text-align: center;
				}
			}
		}

		//底部固定栏
		.to-reply {
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			padding: 40rpx 0;
			display: flex;
			background-color: #fff;
			border-top: 1rpx solid #ccc;
			// align-items: bottom;
			justify-content: space-around;

			textarea {
				width: 500rpx;
				background-color: #dfdee3;
				font-size: 26rpx;
				border-radius: 29rpx;
				padding: 16rpx 20rpx;
			}

			.sure-reply {
				font-size: 26rpx;
				line-height: 58rpx;
				height: 58rpx;
				padding: 0 30rpx;
				color: #fff;
				background-color: #FF2F29;
				border-radius: 29rpx;
			}
		}

		.bottom-choose {
			position: fixed;
			bottom: 0rpx;
			left: 0rpx;
			width: 100%;
			height: 124rpx;
			background-color: #fff;
			display: flex;
			justify-content: space-around;
			box-shadow: -2rpx 0rpx 8rpx #ddd;
			align-items: center;

			.bottom-left {
				display: flex;
				width: 350rpx;
				justify-content: space-around;
				align-items: baseline;

				.left-item {
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 44rpx;
						height: 42rpx;
					}

					text {
						font-size: 24rpx;
						line-height: 36rpx;
					}
				}

				.btn-left-item {
					background-color: transparent;
					margin: 0;
					padding: 0;

					&:after {
						border: none;
					}
				}
			}

			.bottom-right {
				.to-comment {
					padding: 0 32rpx;
					height: 50rpx;
					background-color: #FF2F29;
					border-radius: 18rpx;
					color: #fff;
					line-height: 50rpx;
					text-align: center;
					letter-spacing: 3rpx;
					font-size: 25rpx;
				}
			}
		}
	}
</style>
