<template>
	<view class="more-activity-box">
		<!-- 选项卡标题 -->
		<view class="tab-title">
			<view class="title-item" v-for="(item, index) in titleArr" :key="index" @click="changeIndex(index)">
				<text class="title" :class="{active:activeIndex == index}">{{item}}</text>
				<text class="bottom-active" v-show="activeIndex == index"></text>
			</view>
		</view>
		
		<!-- 活动内容 -->
		<view class="tab-content">
			<view v-if="activityArr.length == 0" style="font-size: 30rpx;text-align: center;line-height: 100rpx;">
				暂时还没有活动哦 ~
			</view>
			<view v-else>
				<view class="activity card">
					<view class="item-box" v-for="(item,index) in activityArr" :key='index'>
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
									<text class="address">{{item.addr}}228号</text>
								</view>
								<view class="detail-right">
									<view class="baoming-status">
										<image src="/pagesB/static/imgs/baoming_icon.png" mode="widthFix"></image>
										<text>{{item.integral}}</text>
									</view>
									<view class="is-baoming">
										{{item.status}}
									</view>
								</view>
							</view>
							<view class="bottom-share">
								
								<view class="redu">
									<image style="width: 38rpx;" src="/pagesB/static/imgs/redu.png" mode="widthFix"></image>
									<text> {{item.viewCount}}</text>
								</view>
								
								<button class="share" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
									<image style="width: 38rpx;margin-right: 10rpx;" src="/pagesB/static/imgs/fenxiang.png" mode="widthFix"></image>
									<text> 分享 {{item.shareCount}}</text>
								</button>
								<button class="share" v-if="state.userInfo.headerUrl" open-type="share" :data-activityid="item.activityId" :data-title="item.activityName" :data-imgUrl="item.acpicUrl">
									<image style="width: 38rpx;margin-right: 10rpx;" src="/pagesB/static/imgs/fenxiang.png" mode="widthFix"></image>
									<text> 分享 {{item.shareCount}}</text>
								</button>
								
								<button class="share" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
									<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
									<text>{{item.admireCount}}</text>
								</button>
								<view v-if="state.userInfo.headerUrl">
									<view class="dianzan" v-if="!item.isAdmire" @click="toAdmire(item.activityId,index)">
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
										<text>{{item.admireCount}}</text>
									</view>
									<view class="dianzan" v-if="item.isAdmire">
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
		<view class="to-release" @click="pageToCreateActivity">
			
		</view>
	
	</view>
</template>

<script>
	import store from '@/store'
	import ActivityApi from '@/servies/ActivityApi.js'
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				state:store.state,
				titleArr:['全部','新发布','即将开始','已结束','我发布的'],
				activeIndex:0,
				activitySign:['公益服务','文化体育','免费'],
				activityArr:[], // 活动列表
				
				pageNo:1,
				allowPull:false //允许上拉加载更多
			};
		},
		methods: {
			getInfo(e) {
				api.bindgetuserinfo(e)
			},
			toAdmire(activityId,index){ //点赞活动
				this.activityArr[index].isAdmire = true
				this.activityArr[index].admireCount ++
				ActivityApi.thumbsUp({likeContent:activityId,likeType:'activity'},res => {
					console.log( res )
				})
			},
			getMyActivity(params,type='one'){ //获取我的活动活动
				ActivityApi.getMyActivity(params, res => {
					if( type == 'one' ){ //请求第一页
						this.activityArr = res.list
						this.allowPull = !res.lastPage
					}else{ //上拉加载更多
						this.activityArr =[...this.activityArr,...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			changeIndex(index){  //改变index
				if( this.activeIndex != index ){
					this.activeIndex = index
					this.pageNo = 1
					this.getMyActivity({
						communityId:this.state.communityId,
						type:this.sureType(),
						pageSize:4,
						pageNo:this.pageNo
					})
				}
			},
			pageToCreateActivity(){
				uni.navigateTo({
					url:'/pagesB/pages/createactivity/createactivity'
				})
			},
			pageToDetail(activityId){
				uni.navigateTo({
					url:'/pagesB/pages/activitydetail/activitydetail?activityId=' + activityId
				})
			},
			sureType(){  //tab-title类型
				switch(this.activeIndex){
					case 0:
						return ''
					case 1:
						return 'newest'
					case 2:
						return 'willStart'
					case 3:
						return 'finished'
					case 4:
						return 'Ipublished'
					default:
						return ''
				}
			}
			
		},onLoad(options) {
			this.activeIndex = Number(options.index) || 0 //跳到我发布的圈子
			console.log( this.activeIndex )
			this.getMyActivity({
				communityId:this.state.communityId,
				type:this.sureType(),
				pageSize:4,
				pageNo:this.pageNo
			})
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
		onReachBottom(){ //上拉加载更多
			if( this.allowPull ){ //加载活动
				this.pageNo++
				this.getMyActivity({
					communityId:this.state.communityId,
					type:this.sureType(),
					pageSize:4,
					pageNo:this.pageNo
				},'more')
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F3F4F4;
	}
	.card {
			background-color: #fff;
			border-radius: 10rpx;
			margin: 20rpx;
			box-shadow: 0rpx 6rpx 10rpx #ddd;
		}
	
	.split-line {
		height: 2rpx;
		background-color: #eee;
	}	
	
	.more-activity-box{
		//选项卡标题
		.tab-title{
			border-top: solid 2rpx #eeeeee;
			border-bottom: solid 2rpx #eeeeee;
			padding: 16rpx 0 8rpx 0;
			display: flex;
			justify-content: space-around;
			.title-item{
				text-align: center;
				width: 100rpx;
				flex: 1;
				position: relative;
				/* &:not(:last-child){
					&:after{
						content: "";
						height: 40%;
						width: 2rpx;
						position: absolute;
						top: 30%;
						right: 0;
						background-color: #eee;
					}
				} */
				.title{
					font-size: 30rpx;
					line-height: 66rpx;
					&.active{
						font-size: 34rpx;
						font-weight: bold;
					}
				}
				.bottom-active{
					width: 40%;
					height: 0;
					border: 3rpx solid #e62329;
					position: absolute;
					bottom: -8rpx;
					left: 30%;
				}
			}
		}
		
		//活动内容
		.tab-content{
			.activity {
				.item-box {
					margin-bottom: 20rpx;
					padding: 20rpx 20rpx 0 20rpx;
					.acive-item {
						display: flex;
						flex-direction: column;
			
						.img-box{
							position: relative;
							.active-item-img {
								width: 100%;
								height: 296rpx;
								vertical-align: middle;
								border-radius: 10rpx;
							}
							.sign-box{
								display: flex;
								position: absolute;
								flex-wrap: wrap;
								top: 0;
								left: 0;
								text{
									color: #fff;
									background-color: #FF2F29;
									font-size: 22rpx;
									line-height: 36rpx;
									padding:0 30rpx;
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
			
								.title {
									font-size: 30rpx;
									line-height: 60rpx;
									color: #333333;
								}
			
								.time,
								.address {
									font-size: 24rpx;
									line-height: 30rpx;
									color: #9fa0a0;
								}
								.address{
									margin-top: 10rpx;
								}
							}
			
							.detail-right {
								display: flex;
								flex-direction: column;
								align-items: center;
			
								.is-baoming {
									margin-top: 12rpx;
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
							margin: 0 10rpx;
							.redu{
								display: flex;
								align-items: center;
								line-height: 60rpx;
								font-size: 26rpx;
								color: #a0a1a1;
											
								image {
									margin-right: 10rpx;
								}
							}
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
		
		//发布活动
		.to-release{
			width: 105rpx;
			height: 105rpx;
			border-radius: 50%;
			background: url("/static/activity_icon/reverse.png") 50% no-repeat;
			background-size: 100%;
			position: fixed;
			bottom: 105rpx;
			right: 45rpx;
		}
	}
</style>
