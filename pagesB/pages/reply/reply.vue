<template>
	<view class="reply-detail">
		<!-- 评论-->
		<view class="comment-box-all">
			<view class="comment-box">
				<view class="comment-content">
					<view class="content-item-box">
						<view class="item-info">
							<view class="info-left">
								<image :src="commentArr.headerUrl" mode="widthFix"></image>
							</view>
							<view class="info-right">
								<view class="right-top">
									<view class="person">
										<text>{{commentArr.nickName}}</text>
										<view class="right-center-tocomment">
											<text class="time">{{commentArr.commentTime}}</text>
										</view>
									</view>
									<view class="to-click">
										<image v-if="commentArr.isThumbsUp" class="click" src="/pagesB/static/imgs/dianzan_success.png" mode=""></image>
										<image @click="checkState(1)" v-else class="click" src="/pagesB/static/imgs/dianzan_n.png" mode=""></image>
										<text>{{commentArr.thumbsUp}}</text>
										<!-- <image class="pinglun" src="/pagesB/static/imgs/tocomment_icom.png" mode="widthFix"></image> -->
									</view>
								</view>
								<view class="right-center-content">
									{{commentArr.commentContent}}
								</view>
								<view class="reply-img" v-if="commentArr.commentPic.length > 0">
									<view style="display: inline-block;width: 196rpx;height: 152rpx;overflow: hidden;margin: 10rpx 10rpx 0 0;" v-for="(img,ind) in commentArr.commentPic" :key="ind">
										<image class="img-item" lazy-load="true" :src="img" mode="widthFix" @click="lookImg(img)"></image>
									</view>
									<!-- <image :src="item.commentpic['0']" mode=""></image> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 回复 -->
		<view class="reply-box">
			<text class="reply-top">
				全部回复({{replyCount == 0 ? '' : replyCount}})
			</text>
			<view class="reply-item-box">
				<view class="comment-box" v-for="(item,index) in commentArr.replyList" :key="index">
					<view class="comment-content">
						<view class="content-item-box">
							<view class="item-info">
								<view class="info-left">
									<image :src="item.headerUrl" mode=""></image>
								</view>
								<view class="info-right">
									<view class="right-top">
										<view class="person">
											<text>{{item.fromPerson}}</text>
										</view>
										<view class="to-click">
											
										</view>
									</view>
									<view class="right-center-content">
										{{item.replyContent}}
									</view>
									<!-- <view class="right-center-tocomment">
										<text class="time">2019-9-25 12:00:00</text>
									</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="zhanwei">
			
		</view>
		<!-- 评论 -->
		<view class="to-reply">
			<textarea maxlength="200" v-model="replyContent" type="text" cursor-spacing=20 fixed=true auto-height=true placeholder="发表评论"></textarea>
			<text class="sure-reply" @click="published">发表</text>
		</view>
	</view>
</template>

<script>
	import ActivityApi from '@/servies/ActivityApi.js'
	export default {
		data() {
			return {
				replyContent:'',
				commentArr:[],
				replyCount:0,
				activityId:''
			};
		},
		methods:{
			lookImg(img){
				console.log( img )
				uni.previewImage({
					urls:[img],
					success(res) {
						//预览图片
					}
				})
			},
			checkState(num){
					this.commentArr.isThumbsUp = !this.commentArr.isThumbsUp
					this.commentArr.thumbsUp += num
					this.thumbsUp({
						likeContent:this.commentArr.commentId,
						likeType:'comment'
						// activityId:this.activityId
					})
			},
			thumbsUp(params){ //点赞活动或评论
				ActivityApi.thumbsUp(params, res => {
					
				})
			},
			published(){
				console.log( this.replyContent )
				
				this.addCommentPerly({
					activityId:this.activityId,
					commentId:this.commentArr.commentId,
					replyContent:this.replyContent,
					toPerson:this.commentArr.commentPerson
				})
				
				this.replyContent = ""
			},
			addCommentPerly(params){ //回复
				ActivityApi.addCommentReply(params, res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.timer = setTimeout( () => {
						uni.navigateBack({
							delta:1
						})
					},500 )
				})
			}
		},
		onLoad(options) {
			console.log( 'options',JSON.parse(options.item))
			this.commentArr = JSON.parse(options.item)
			this.activityId = options.activityId
			this.replyCount = this.commentArr.replyList.length
		},
		onHide() {
			this.timer = null
		}
	}
</script>

<style lang="scss">
	.reply-img{
		display: flex;
		flex-wrap: wrap;
		.img-item{
			width: 196rpx;
			// height: 152rpx;
		}
	}
	.reply-detail {
		.zhanwei{
			height: 140rpx;
		}
		.to-reply{
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
			textarea{
				width: 500rpx;
				background-color: #dfdee3;
				font-size: 26rpx;
				border-radius: 29rpx;
				padding: 16rpx 20rpx;
			}
			.sure-reply{
				font-size: 26rpx;
				line-height: 58rpx;
				height: 58rpx;
				padding: 0 30rpx;
				color: #fff;
				background-color: #FF2F29;
				border-radius: 29rpx;
			}
		}

		//评论
		.comment-box-all {
			.comment-box {
				display: flex;
				flex-direction: column;
				border-bottom: 1rpx solid #EFEFEF;
				border-top: 1rpx solid #EFEFEF;

				.comment-title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 20rpx;
					line-height: 60rpx;
					font-size: 26rpx;
					border-bottom: 2rpx solid #dcdddd;

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
						border-bottom: 2rpx solid #dcdddd;
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
									align-items: flex-start;

									.person {
										font-size: 30rpx;
										color: #7B92AB;
									}

									.to-click {
										display: flex;
										align-items: center;

										.click {
											width: 30rpx;
											height: 30rpx;
											margin-right: 6rpx;
										}

										text {
											font-size: 16rpx;
											line-height: 22rpx;
										}

										.pinglun {
											width: 30rpx;
											margin-left: 30rpx;
										}
									}
								}

								.right-center-content {
									font-size: 26rpx;
									line-height: 36rpx;
									color: #505050;
									// display: -webkit-box;
									// -webkit-box-orient: vertical;
									// -webkit-line-clamp: 3;
									// overflow: hidden;
									// text-overflow: hidden;
									// word-break: break-all;
									// text-indent: 48rpx;
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
		}

		//回复
		.reply-box {
			.reply-top {
				line-height: 50rpx;
				font-size: 26rpx;
				margin-left: 20rpx;
			}

			.reply-item-box {
				.comment-box {
					display: flex;
					flex-direction: column;
					border-bottom: 1rpx solid #EFEFEF;
				
					.comment-title {
						display: flex;
						align-items: center;
						justify-content: space-between;
						box-sizing: border-box;
						padding: 0 20rpx;
						line-height: 60rpx;
						font-size: 26rpx;
						border-bottom: 2rpx solid #dcdddd;
				
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
							border-bottom: 2rpx solid #dcdddd;
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
										align-items: flex-start;
										margin-bottom: 26rpx;
										.person {
											font-size: 30rpx;
											color: #7B92AB;
										}
				
										.to-click {
											display: flex;
											align-items: center;
				
											.click {
												width: 24rpx;
												margin-right: 6rpx;
											}
				
											text {
												font-size: 16rpx;
												line-height: 22rpx;
											}
				
											.pinglun {
												width: 30rpx;
												margin-left: 30rpx;
											}
										}
									}
				
									.right-center-content {
										font-size: 26rpx;
										line-height: 36rpx;
										color: #505050;
										// display: -webkit-box;
										// -webkit-box-orient: vertical;
										// -webkit-line-clamp: 3;
										// overflow: hidden;
										// text-overflow: hidden;
										// word-break: break-all;
										// text-indent: 48rpx;
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
			}
		}
	}
</style>
