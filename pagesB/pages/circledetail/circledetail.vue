<template>
	<view class="circle-detail-box">
		<!-- 顶部圈子信息 -->
		<view class="top-circle-info">
			<view class="left">
				<image class="left-icon" :src="circleInfo.headerUrl" mode="widthFix"></image>
				<view class="left-name">
					<view class="ciecle-name">
						<view class="name-box">
							<text>{{circleInfo.circleName}}</text>
							<image v-if="circleInfo.circleType == 1" class="is-volunteer" src="/pagesB/static/imgs/is_volunteer_circle.png"
							 mode="" style="width: 36rpx;height: 30rpx;margin-left: 10rpx;"></image>
						</view>
						
						<view class="interview-box">
							<image v-if="circleInfo.isCreater" @click="pageToCreateCircle" class="interview-icon" src="/pagesB/static/imgs/modify.png" mode=""></image>
							<button class="share-btn" open-type="share" id="friends" :data-img="circleInfo.headerUrl" :data-circleId="circleInfo.circleId" :data-title="circleInfo.circleName">
								<image src="/pagesB/static/imgs/fenxiang.png" mode=""></image>
							</button>
						</view>
						
					</view>
					<text class="color-bla">{{circleInfo.joinNum}}人</text>
				</view>
				
			</view>
			
			<!-- <view class="right">
				<view class="right-to-interview">
					<image class="interview-icon" src="/pagesB/static/imgs/interview.png" mode=""></image>
					<button class="share-btn" open-type="share" id="friends" :data-img="circleInfo.headerUrl" :data-circleId="circleInfo.circleId" :data-title="circleInfo.circleName">邀请好友</button>
				</view>
				<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
					<text class="right-status" style="color:#fff;background-color: #FF2F29;">加入</text>
				</button>
				<view v-if="state.userInfo.headerUrl" class="right-is-no">
					<text class="right-status" v-if="circleInfo.isJoin == 1">已加入</text>
					<text class="right-status" style="color:#fff;background-color: #FF2F29;" v-else @click="joinCircle(circleInfo.circleId)">加入</text>
				</view>
			</view> -->
		</view>

		<!-- 选项卡标题 -->
		<view class="tab-title">
			<view class="tab-item" @click="changeIndex(0)">
				<text class="item-title" :class="{activeitem:currentindex == 0}">
					简介
					<text class="active-line" v-if="currentindex == 0"></text>
				</text>
			</view>

			<view class="tab-item" @click="changeIndex(1)">
				<text class="item-title" :class="{activeitem:currentindex == 1}">
					成员
					<text class="active-line" v-if="currentindex == 1"></text>
				</text>
			</view>

			<view class="tab-item" @click="changeIndex(2)">
				<text class="item-title" :class="{activeitem:currentindex == 2}">
					公告
					<text class="active-line" v-if="currentindex == 2"></text>
				</text>
			</view>

			<view class="tab-item" @click="changeIndex(3)" v-if="circleInfo.isCreater">
				<view class="person-manage">
					<text class="item-title" :class="{activeitem:currentindex == 3}">
						成员管理
						<text class="active-line" v-if="currentindex == 3"></text>
					</text>
					<text class="person-num">({{circleInfo.joinNum}})</text>
				</view>
			</view>
		</view>

		<!-- 选项卡内容 -->
		<view class="tab-content">
			<!-- 成员 -->
			<view class="volunteers" v-if="currentindex == 1">
				<!-- 志愿者圈子 -->
				<view v-if="circleInfo.circleType == 1">
					<view v-for="(item,index) in memberArr" :key="index">
						<view class="volunteer-item">
							<image class="left" :src="item.headerUrl" mode=""></image>
							<view class="right">
								<view class="right-top">
									<text>{{item.nickName}}</text>
									<image v-if="item.isPartyMember" src="/pagesB/static/imgs/member.png" mode=""></image>
								</view>
								<view class="right-bottom">
									<text class="type-item" v-for="(s,i) in item.skills" :key='i'>{{s}}</text>
					
								</view>
								<text class="intruduce">{{item.personalExplanation}}</text>
							</view>
							<image @click="makePhoneCall(item.mobile)" v-if="item.mobile" src="/pagesB/static/imgs/phone.png" style="width: 40rpx;height: 40rpx;margin-left: 10rpx;align-self: flex-start;"
							 mode=""></image>
						</view>
					</view>
				</view>
				<!-- 普通圈子 -->
				<view v-else>
					<view class="volunteer-item" v-for="(item,index) in memberArr" :key="index">
						<image class="left" :src="item.headerUrl" mode=""></image>
						
						<view class="person-msg">
							<view class="name-msg">
								<text class="name">{{ item.nickName }}</text>
								<image v-if="item.isVolunteer" class="volunteer" src="/pagesB/static/imgs/volunteer.png" mode=""></image>
								<image v-if="item.isPartyMember" class="member" src="/pagesB/static/imgs/member.png" mode=""></image>
							</view>
							
							<view class="time-msg">
								<text class="times">{{ item.activityNum }}次</text>
								<text class="join-time">{{ item.enterTime }}</text>
							</view>
							<!-- <view class="right-top">
								<text>{{item.nickName}}</text>
							</view> -->
						</view>
					</view>
				</view>

			</view>
			<!-- 成员管理 -->
			<view class="person-manage" v-if="currentindex == 3">

				<!-- <view class="person-item" v-for="(item,index) in memberManageArr" :key="index">
					<image class="avatar" :src="item.headerUrl" mode="widthFix"></image>
					<text class="name">{{item.nickName}}</text>
					<text class="how-time">{{item.activityNum}}次</text>
					<view class="identity">
						<image class="isvol" src="/pagesB/static/imgs/volunteer.png" v-if="circleInfo.circleType == 1 && item.isVolunteer" mode=""></image>
						<image class="ismem" src="/pagesB/static/imgs/member.png" v-if="circleInfo.circleType == 1 && item.isPartyMember" mode=""></image>
					</view>
					<image @click="showModel(item.personCode)" v-if="circleInfo.isCreater && !item.isCreater" class="forbeed" src="/pagesB/static/imgs/forbeed.png"
					 mode="widthFix"></image>
				</view> -->
				
				<view class="volunteer-item" v-for="(item,index) in memberManageArr" :key="index">
					<image class="left" lazy-load="true" :src="item.headerUrl" mode=""></image>
					
					<view class="person-msg">
						<view class="name-msg">
							<text class="name">{{ item.nickName }}</text>
							<image v-if="item.isVolunteer" class="volunteer" src="/pagesB/static/imgs/volunteer.png" mode=""></image>
							<image v-if="item.isPartyMember" class="member" src="/pagesB/static/imgs/member.png" mode=""></image>
						</view>
						
						<view class="time-msg">
							<text class="times">{{ item.activityNum }}次</text>
							<view class="join-time">
							{{ item.enterTime }}
							<view class="delete-box">
								<image class="delete" @click="showModel(item.personCode)" v-if="circleInfo.isCreater && !item.isCreater" src="/pagesB/static/imgs/forbeed.png"
							 mode="widthFix"></image>
							</view>
							
							</view>
						</view>
						<!-- <view class="right-top">
							<text>{{item.nickName}}</text>
						</view> -->
					</view>
				</view>



			</view>
			<!-- 简介 -->
			<view class="intriduce" v-if="currentindex == 0">
				<view class="circle-in">
					<text style="line-height: 60rpx;font-weight: bold;font-size: 30rpx;">圈子介绍:</text>
					<text class="content">{{circleInfo.circleIntroduce}}</text>
					<image class="int_pic" lazy-load="true" :src="item.filePath" v-if="circleInfo.introducePics.length" v-for="(item,index) in circleInfo.introducePics" :key="index" mode=""></image>
				</view>
				<view class="master-in">
					<text style="line-height: 60rpx;font-weight: bold;;font-size: 30rpx;">圈主介绍:</text>
					<text class="content">{{circleInfo.selfIntroduce}}</text>
					<image class="int_pic" lazy-load="true" :src="item.filePath" v-if="circleInfo.selfIntroducePics.length" v-for="(item,index) in circleInfo.selfIntroducePics" :key="index" mode=""></image>
				</view>
			</view>
			<!-- 公告 -->
			<view class="activity-list-box" v-if="currentindex == 2">
				
				<view class="gonggao-box">
					<image class="imgs" lazy-load="true" src="/pagesB/static/imgs/merchant_img.jpg" mode=""></image>
					<view class="text">
						公告：广场舞协会成立于2016年7月，该会的前身是“怡兴园快乐健身队”，始建于2002年，在市级比赛中多次获奖。该会固定活动时间是每晚7:30～9:30，地点怡兴园广场。
					</view>
				</view>

				<!-- <view v-if="activityArr.length == 0" style="font-size: 30rpx;text-align: center;line-height: 100rpx;">
					暂时还没有活动~
				</view> -->

				<!-- <view v-else class="activity">
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
										<image style="width: 30rpx;" src="/static/home_icon/redu.png" mode="widthFix"></image>
										<text> {{item.viewCount}}</text>
									</view>
									<button class="share" open-type="share" id="share" :data-activityid="item.activityId" :data-title="item.activityName" :data-imgUrl="item.acpicUrl">
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
						</view>
					</view>
				</view> -->

			</view>
		</view>
		
		<!-- 加入圈子 -->
		<view class="add-btn">
			<button type="default" class="sub_btn" style="background-color: #dcdddd;" v-if="circleInfo.isJoin == 1">已加入</button>
			<button type="default" class="sub_btn" v-else @click="joinCircle(circleInfo.circleId)">加入圈子</button>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import CircleApi from '@/servies/CircleApi.js'
	import ActivityApi from '@/servies/ActivityApi.js'
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				state: store.state,
				currentindex: 0,
				circleId: '',
				isCreater: false,
				circleInfo: null, //圈子信息
				pageNo: 1, //第几页
				stopPull: true, //阻止下拉刷新
				memberArr: [], //成员
				memberManageArr: [], //成员管理

				activityArr: [], //活动列表
				allowPull: true, //允许下拉刷新

			};
		},
		methods: {
			getInfo(e) {
				api.bindgetuserinfo(e)
			},
			pageToDetail(activityId) {
				uni.navigateTo({
					url: "/pagesB/pages/activitydetail/activitydetail?activityId=" + activityId
				})
			},
			toAdmire(activityId, index) { //点赞活动
				this.activityArr[index].isAdmire = true
				this.activityArr[index].admireCount++
				ActivityApi.thumbsUp({
					activityId
				}, res => {
					console.log(res)
				})
			},
			getActivityList(params, type = 'one') { //获取活动列表
				ActivityApi.getActivityList(params, res => {
					console.log('活动列表', res.list)
					if (type == 'one') { //获取第一页活动
						this.activityArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.pageNo++
						this.activityArr = [...this.activityArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			pageToCreateCircle() {
				uni.navigateTo({
					url: '/pagesB/pages/createcircle/createcircle?circleId=' + this.circleId + '&code=1'
				})
			},
			showModel(personCode) {
				const _that = this
				uni.showModal({
					title: '提示',
					content: '是否要删除该成员?',
					success(res) {
						if (res.confirm) {
							_that.deleteFromCircle({
								circleId: _that.circleId,
								personCode
							})
						} else if (res.cancel) {
							//点击取消
						}
					}
				});
			},
			changeIndex(num) {
				if (this.currentindex != num) {
					this.currentindex = num
					this.pageNo = 1
					if (num == 1 || num == 3) {
						this.getCircleMembers({ //圈子成员
							circleId: this.circleId,
							pageSize: 10,
							pageNo: this.pageNo
						})
					}else if( num == 2 ){
						this.getActivityList({ //加载活动
							communityId: this.state.communityId,
							circleId: this.circleId,
							pageSize: 4,
							pageNo: this.pageNo,
						})
					}
				}
			},
			makePhoneCall(Num) {
				uni.makePhoneCall({
					phoneNumber: Num,
					success() {
						// console.log( '拨打成功' )
					}
				})
			},
			getCircleDetail(params) { //获取圈子信息
				CircleApi.getCircleInfo(params, res => {
					// console.log( '圈子信息',res )
					this.circleInfo = res
					/* if (this.currentindex == 1 || this.currentindex == 3) {
						this.getCircleMembers({
							circleId: this.circleId,
							pageSize: 10,
							pageNo: this.pageNo
						})
					} */
				})
			},
			joinCircle(circleId) { //加入圈子
				CircleApi.joinCircle({
					circleId
				}, res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					this.getCircleDetail({
						circleId: this.circleId
					})
				})
			},
			getCircleMembers(params) { //获取圈子成员
				CircleApi.getCircleMember(params, res => {
					this.memberArr = res.list
					this.memberManageArr = res.list
					this.stopPull = !res.lastPage
					console.log("成员信息", this.memberArr)
				})
			},

			deleteFromCircle(params) { //删除圈子成员
				CircleApi.deleteFromCircle(params, res => {
					console.log(res)
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					//重新获取成员数据
					this.getCircleDetail({
						circleId: this.circleId
					})
				})
			}
		},
		onLoad(options) {
			console.log(options)
			this.pageNo = 1
			this.circleId = options.circleId
			this.isCreater = options.isCreater || false
			this.getCircleDetail({
				circleId: this.circleId
			}) //圈子详情
			
		},

		onPullDownRefresh() { //下拉刷新
			if (this.currentindex == 1 || this.currentindex == 3) { //刷新成员列表
				this.pageNo = 1
				this.getCircleMembers({
					circleId: this.circleId,
					pageSize: 10,
					pageNo: this.pageNo
				})
			}else if( this.currentindex == 2 ){ //刷新活动
				this.pageNo = 1
				this.getActivityList({
					communityId: this.state.communityId,
					circleId: this.circleId,
					pageSize: 4,
					pageNo: this.pageNo
				})
			}
		},
		onReachBottom() { //上拉加载更多
			if (this.currentindex == 1 && this.stopPull) { //加载更多成员信息
				this.pageNo++
				CircleApi.getCircleMember({
					circleId: this.circleId,
					pageSize: 10,
					pageNo: this.pageNo
				}, res => {
					this.memberArr = [...this.memberArr, ...res.list]
					this.stopPull = !res.lastPage
					// console.log( '成员信息',res )
				})
			} else if (this.currentindex == 3 && this.stopPull) { //加载更多成员管理
				this.pageNo++
				CircleApi.getCircleMember({
					circleId: this.circleId,
					pageSize: 10,
					pageNo: this.pageNo
				}, res => {
					this.memberManageArr = [...this.memberManageArr, ...res.list]
					this.stopPull = !res.lastPage
					// console.log( '成员信息',res )
				})
			}else if( this.currentindex == 2 && this.allowPull ){ //加载更多活动
				this.pageNo++
				this.getActivityList({
					communityId: this.state.communityId,
					circleId: this.circleId,
					pageSize: 4,
					pageNo: this.pageNo
				},'more')
			}
		},
		onShareAppMessage(res) { //分享
			console.log( res.target )
			if (res.from === 'button' && res.target.id == 'share') { // 来自页面内分享按钮--活动分享
				let activityId = res.target.dataset.activityid
				let title = res.target.dataset.title
				let imgUrl = res.target.dataset.imgurl
				ActivityApi.shareActivity({activityId},res => {
					// console.log( res )
				})
				return {
					title: title,
					path: '/pagesB/pages/activitydetail/activitydetail?activityId=' + activityId,
					imageUrl:imgUrl
				}
			}else if( res.from === 'button' && res.target.id == 'friends' ){ //邀请好友
				let circleId = res.target.dataset.circleid
				let imgUrl = res.target.dataset.img
				let title = res.target.dataset.title
				return {
					title: `来自好友的邀请(${title})`,
					path: '/pagesB/pages/circledetail/circledetail?circleId=' + circleId,
					imageUrl:imgUrl
				}
			}
		},
	}
</script>

<style lang="scss">
	page {
		background-color: #F8F8F8;
	}
	
	.split-line {
		height: 2rpx;
		background-color: #eee;
	}
	
	.add-btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80rpx;
		padding-top: 10rpx;
		background-color: #fff;
		box-sizing: border-box;
		.sub_btn{
			width: 450rpx;
			height: 60rpx;
			background-color: #ff2f29;
			line-height: 60rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #fff;
		}
	}
	
	.share-btn{
		background-color: #fff;
		border: none;
		outline: none;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #000;
		background-color: #F8F8F8;
		padding: 0;
		&:after {
			border: none;
		}
	}

	.circle-detail-box {

		// 顶部圈子信息
		.top-circle-info {
			display: flex;
			padding: 40rpx;
			justify-content: space-between;
			align-items: center;
			border-top: 3rpx solid #eee;

			.left {
				display: flex;
				align-items: center;
				flex: 1;
				.left-icon {
					width: 166rpx;
					height: 166rpx;
					border-radius: 18rpx;
					margin-right: 26rpx;
				}

				.left-name {
					display: flex;
					flex-direction: column;
					flex: 1;
					.ciecle-name{
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 36rpx;
						.name-box{
							display: flex;
							align-items: center;
							text{
								font-size: 30rpx;
								line-height: 30rpx;
								max-width: 290rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
						.interview-box{
							display: flex;
							align-items: center;
							.interview-icon{
								width: 37rpx;
								height: 37rpx;
								margin-right: 26rpx;
							}
							.share-btn{
								image{
									width: 40rpx;
									height: 36rpx;
								}
								
							}
						}
					}

					.color-bla {
						font-size: 25rpx;
						color: #9fa0a0;
					}
				}
			}

			.right {
				display: flex;
				flex-direction: column;
				align-items: center;

				.right-to-interview {
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;

					.interview-icon {
						width: 26rpx;
						height: 26rpx;
						margin-right: 10rpx;
					}

					text {
						font-size: 26rpx;
						line-height: 42rpx;
					}
				}

				.right-is-no{
					width: 110rpx;
					height: 40rpx;
					.right-status {
						display: inline-block;
						width: 110rpx;
						height: 40rpx;
						font-size: 26rpx;
						line-height: 40rpx;
						text-align: center;
						border-radius: 20rpx;
						background-color: #dcdddd;
						color: #000;
					}
				}
				
			}
		}

		// 选项卡标题
		.tab-title {
			display: flex;
			justify-content: flex-start;
			box-sizing: border-box;
			border-top: 3rpx solid #eee;
			margin-left: 50rpx;
			.tab-item {
				margin-right: 50rpx;
				.item-title {
					position: relative;
					display: inline-block;
					text-align: center;
					font-size: 30rpx;
					line-height: 56rpx;

					.active-line {
						height: 0;
						width: 48rpx;
						border: 2rpx solid #e62329;
						position: absolute;
						bottom: -4rpx;
						left: 48%;
						margin-left: -24rpx;
						background-color: #e62329;
					}
				}

				.person-manage {
					display: flex;
					align-items: baseline;
				}

				.person-num {
					font-size: 26rpx;
				}

				.activeitem {
					font-size: 34rpx;
					font-weight: bold;
				}
			}
		}

		//选项卡内容
		.tab-content {
			.intriduce {
				box-sizing: border-box;
				padding: 24rpx 20rpx 90rpx 20rpx;
				.content {
					display: block;
					font-size: 24rpx;
					text-indent: 48rpx;
					line-height: 50rpx;
				}
				.int_pic{
					width: 710rpx;
					height: 325rpx;
					border-radius: 10rpx;
					margin-bottom: 20rpx;
				}
			}

			//成员
			.volunteers {
				margin-bottom: 90rpx;
				.volunteer-item {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					box-sizing: border-box;
					margin: 0 40rpx;
					padding-top: 22rpx;
					padding-bottom: 28rpx;
					border-bottom: 1rpx solid #efefef;
					.left {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						margin-right: 18rpx;
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
							flex-wrap: wrap;

							text {
								font-size: 22rpx;
								line-height: 30rpx;
								background-color: #e62329;
								color: #fff;
								padding: 0 10rpx;
								border-radius: 8rpx;
								margin: 10rpx 0;
								margin-right: 20rpx;
							}
						}

						.intruduce {
							font-size: 26rpx;
							line-height: 40rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
				
					.person-msg{
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex:1;
						.name-msg{
							display: flex;
							align-items: center;
							.name{
								font-size: 26rpx;
								margin-right: 10rpx;
							}
							.volunteer{
								width: 34rpx;
								height: 30rpx;
								margin-right: 10rpx;
							}
							.member{
								width: 28rpx;
								height: 33rpx;
							}
						}
						
						.time-msg{
							width: 254rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.times{
								font-size: 22rpx;
								letter-spacing: 2rpx;
								color: #898989;
							}
							.join-time{
								font-size: 22rpx;
								letter-spacing: 2rpx;
								color: #898989;
							}
						}
					}
				}

			}

			//成员管理
			.person-manage {
				margin-bottom: 90rpx;
				.volunteer-item {
					display: flex;
					align-items: center;
					justify-content: flex-start;
					box-sizing: border-box;
					margin: 0 40rpx;
					padding-top: 22rpx;
					padding-bottom: 28rpx;
					border-bottom: 1rpx solid #efefef;
					.left {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						margin-right: 18rpx;
					}

					.person-msg{
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex:1;
						.name-msg{
							display: flex;
							align-items: center;
							.name{
								font-size: 26rpx;
								margin-right: 10rpx;
							}
							.volunteer{
								width: 34rpx;
								height: 30rpx;
								margin-right: 10rpx;
							}
							.member{
								width: 28rpx;
								height: 33rpx;
							}
						}
						
						.time-msg{
							width: 316rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.times{
								font-size: 22rpx;
								letter-spacing: 2rpx;
								color: #898989;
							}
							.join-time{
								font-size: 22rpx;
								letter-spacing: 2rpx;
								color: #898989;
								display: flex;
								align-items: center;
								.delete-box{
									width: 37rpx;
									height: 37rpx;
									margin-left: 26rpx;
									.delete{
										width: 37rpx;
										height: 37rpx;
									}
								}
								
							}
						}
					}
				}
				
			}

			//活动列表
			.activity-list-box {
				.gonggao-box{
					margin: 24rpx 30rpx 90rpx 30rpx;
					.imgs{
						width: 100%;
						border-radius: 10rpx;
						height: 350rpx;
						margin-bottom: 20rpx;
					}
					.text{
						font-size: 25rpx;
						line-height: 48rpx;
						letter-spacing: 1rpx;
					}
				}
				.activity {
					.item-box {
						margin-bottom: 20rpx;

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
										font-size: 26rpx;
										line-height: 60rpx;
										color: #333333;
									}

									.time,
									.address {
										font-size: 22rpx;
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
								.redu {
									color: red;
									display: flex;
									align-items: center;
									font-size: 26rpx;
								}

								,
								.share {
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
	}
</style>
