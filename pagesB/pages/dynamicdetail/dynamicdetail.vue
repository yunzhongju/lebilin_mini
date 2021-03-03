<template>
	<view class="dynamic-box">

		<!-- 动态 -->
		<view class="dynamic-detail">
			<!-- 顶部 -->
			<view class="top-title">
				<view class="title">
					<text style="font-size: 30rpx;">{{dynamicObj.title}}</text>
				</view>
				<view class="title-detail">
					<text>作者:{{dynamicObj.personName}}</text>
					<text>{{ dynamicObj.createtime}}</text>
					<text>阅读{{dynamicObj.hintcount}}</text>
				</view>
			</view>

			<rich-text class="font24" :nodes="String"></rich-text>
		</view>

		<!-- 点赞评论数量 -->
		<view class="count">
			<text class="left">点赞评论</text>
			<view class="right">
				<view class="comment">
					<image src="/static/home_icon/commen_icon.png" mode=""></image>
					<text>{{dynamicObj.commentCount}}</text>
				</view>
				<view class="click">
					<image src="/static/home_icon/click_icon.png" mode=""></image>
					<text>{{dynamicObj.admireCount}}</text>
				</view>
			</view>
		</view>

		<!-- 评论 -->
		<view class="comment-box">
			<view class="comment-title">
				<text>评论</text>
				<view class="to-comment" @click="showReplyFun('comment')">
					<image src="/static/activity_icon/tocomment_icom.png" mode="widthFix"></image>
					<text>发表评论</text>
				</view>
			</view>

			<view class="no-comment" style="text-align: center; line-height: 60rpx;" v-if="commentArr.length == 0">
				暂时没有评论哦,赶紧去评论吧 ~
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
							<view class="right-center-tocomment">
								<text class="time" @click="showReplyFun('reply',{commentId:item.commentId,toPerson:item.commentPerson})">{{item.commentTime}}
									· <text>回复ta</text></text>
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

		<!-- 底部固定栏 -->
		<view class="to-reply" v-if="showReply">
			<textarea @blur="hideReplyFun" show-confirm-bar="false" focus maxlength="200" v-model="replyContent" cursor-spacing=20
			 fixed auto-height placeholder="发表评论"></textarea>
			<text class="sure-reply" @click="published">发表</text>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import ActivityApi from '@/servies/ActivityApi.js'
	import parseHtml from '@/utils/paseHtml.js'
	export default {
		data() {
			return {
				state: store.state,
				articleId: '', //动态标识
				inputType: 'comment', //评论还是回复
				commentArr: [], //评论列表
				pageNo: 1, //评论页码
				allowPull: true, //允许评论上拉加载更多
				replyObj: null,
				showReply: false,
				replyContent: '',
				String: '', //富文本
				dynamicObj: {}, //动态
			};
		},
		methods: {
			getArticleDetail() { //获取动态详情
				let _this = this
				ActivityApi.getArticleDetail({
					articleId: _this.articleId
				}, res => {
					this.dynamicObj = res
					let string = res.content
					this.String = string = string.replace(/<img/gi,
							'< img style="max-width:100%;height:auto;display:block" class="imgsty" ')
						.replace(/<html/g, '<div')
						.replace(/\/html>/g, '/div>')
						.replace(/<body/g, '<div')
						.replace(/\/body>/g, '/div>');
						console.log( this.String )
				})
			},
			getActivityComment(params, type = 'one') { //获取动态评论列表
				if (type == 'one') { //评论第一页
					ActivityApi.getActivityComment(params, res => {
						console.log(res.list)
						this.commentArr = res.list
						this.allowPull = !res.lastPage
					})
				} else { //上拉加载时调用
					ActivityApi.getActivityComment(params, res => {
						console.log('评论列表', res)
						this.commentArr = [...this.commentArr, ...res.list]
						this.allowPull = !res.lastPage
					})
				}
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
				ActivityApi.thumbsUp(params, res => {
					console.log(res.msg)
				})
			},
			published() {
				console.log(this.replyContent, this.inputType)
				if (this.inputType == 'reply') {
					//回复
					this.replyObj.activityId = this.articleId
					this.replyObj.replyContent = this.replyContent
					this.addCommentReply(this.replyObj)
				} else if (this.inputType == 'comment') {
					//评论
					console.log({
						activityId: this.articleId,
						commentContent: this.replyContent
					})
					this.addActivityComment({
						activityId: this.articleId,
						commentContent: this.replyContent
					})
				}
				this.replyContent = ""
				this.showReply = false
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
						activityId: this.articleId,
						pageNo: 1,
						pageSize: 4
					})
				})
			},
			addCommentReply(params) { //回复评论
				const _that = this
				ActivityApi.addCommentReply(params, res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					_that.pageNo = 1
					_that.getActivityComment({
						activityId: _that.articleId,
						pageNo: 1,
						pageSize: 4
					})
				})
			},
			showReplyFun(type, obj = null) {
				this.showReply = true
				this.inputType = type
				this.replyObj = obj
			},
			hideReplyFun() {
				this.showReply = false
			},
			pageToReply(item) {
				uni.navigateTo({
					url: '/pagesB/pages/reply/reply?item=' + JSON.stringify(item) + '&activityId=' + this.articleId
				})
			}
		},
		onLoad(options) {
			this.articleId = options.articleId
			console.log(this.articleId)
			this.getArticleDetail() //获取动态详情
			this.getActivityComment({ //获取动态评论第一页
				activityId: this.articleId,
				pageNo: 1,
				pageSize: 4
			})

		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getActivityComment({ //获取动态评论第一页
				activityId: this.articleId,
				pageNo: this.pageNo,
				pageSize: 4
			})
		},
		onReachBottom() {
			if (this.allowPull) { //上拉加载更多评论
				this.pageNo++
				this.getActivityComment({
					activityId: this.articleId,
					pageNo: this.pageNo,
					pageSize: 4
				}, 'more')
			}
		},
	}
</script>

<style lang="scss">
	.dynamic-box {
		margin-bottom: 124rpx;
		.font24{
			font-size: 28rpx;
			line-height:40rpx;
			width: 100%;
			overflow: hidden;
			text-align: justify;
			.imgsty{
				max-width: 100%;
				margin:6rpx auto;
				border-radius:10rpx
			}
		}
		// 动态
		.dynamic-detail {
			box-sizing: border-box;
			padding: 20rpx;

			// 顶部
			.top-title {
				display: flex;
				flex-direction: column;

				// align-items: center;
				.title {
					font-size: 30rpx;
					line-height: 60rpx;
				}

				.title-detail {
					width: 100%;
					box-sizing: border-box;
					padding: 0 40rpx;
					display: flex;
					justify-content: space-between;
					font-size: 22rpx;
					color: #595757;
					line-height: 40rpx;
				}
			}

			//动态图片
			.dynamic-img {
				width: 100%;
				vertical-align: middle;
				margin: 20rpx 0;
			}

			//动态详情
			.dynamic-text {
				font-size: 26rpx;
				line-height: 40rpx;
				text-indent: 48rpx;
			}
		}

		// 评论点赞数量
		.count {
			box-sizing: border-box;
			padding: 0 20rpx;
			display: flex;
			margin-top: 30rpx;
			border-bottom: 4rpx solid #eee;
			padding-bottom: 16rpx;
			justify-content: space-between;

			.left {
				font-size: 26rpx;
			}

			.right {
				display: flex;

				.comment {
					margin-right: 20rpx;
					font-size: 26rpx;
					display: flex;
					align-items: center;

					image {
						width: 28rpx;
						height: 28rpx;
					}

					text {
						color: #ff2f2a;
					}
				}

				.click {
					font-size: 26rpx;
					display: flex;
					align-items: center;

					image {
						width: 26rpx;
						height: 26rpx;
					}

					text {
						color: #ff2f2a;
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
				justify-content: space-between;
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
										width: 22rpx;
										height: 22rpx;
										margin-right: 6rpx;
									}

									text {
										font-size: 16rpx;
										line-height: 22rpx;
									}
								}
							}

							.right-center-content {
								font-size: 26rpx;
								line-height: 36rpx;
								color: #505050;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 3;
								overflow: hidden;
								text-overflow: hidden;
								word-break: break-all;
							}

							.right-center-tocomment {
								.time {
									font-size: 22rpx;
									line-height: 36rpx;
									color: #8f8f8f;

									text {
										font-size: 26rpx;
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
										font-size: 26rpx;
										line-height: 36rpx;
										margin-right: 6rpx;
									}
								}

								.show-more {
									line-height: 50rpx;
									font-size: 26rpx;
									display: inline;
								}
							}
						}
					}
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
	}
</style>
