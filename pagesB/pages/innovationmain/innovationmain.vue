<template>
	<view class="innovation-main">
		<!-- tab标题 -->
		<view class="tab-title">
			<view class="title-item" v-for="(item,index) in tabTitleArr" :key="index" @click="changeIndex(index)">
				<text :class="{active:tabIndex == index}">{{item}}</text>
				<text class="bottom-line" v-show="tabIndex == index"></text>
			</view>
		</view>

		<!-- tab内容 -->
		<view class="tab-content">
			<!-- 社区企业 -->
			<view class="enterprise" v-if="tabIndex == 0">

				<view class="item-box" @click="pageToInnovationinterprisedetail(item)" v-for="(item,index) in businessArr" :key="index">
					<view class="enterprise-item">
						<image class="left" :src="item.thumbnail" mode=""></image>
						<view class="right">
							<text class="right-title">{{ item.supplierName }}</text>
							<text class="right-introduce">{{ item.resume }}</text>
						</view>
					</view>
					<view class="split-line"></view>
				</view>

			</view>

			<!-- 创新动态 -->
			<view class="dynamic" v-if="tabIndex == 1">
				<view style="font-size: 30rpx;text-align: center;line-height: 100rpx;" v-if="activityArr.length == 0">
					暂时没有相关动态哦 ~
				</view>

				<view class="item-box" v-for="(item,index) in activityArr" :key="index">
					<view class="dynamic-item">
						<image class="dynamic-item-img" lazy-load :src="item.thumbnail" mode="" @click="pageToDynamicDetail(item.articleId)"></image>
						<text class="title">{{ item.channelName }}</text>
						<view class="bottom-share">
							<view class="redu">
								<image style="width: 38rpx;" src="/pagesB/static/imgs/guanzhu.png" mode="widthFix"></image>
								<text> {{ item.hintcount }}</text>
							</view>
							<view class="share">
								<image style="width: 38rpx;" src="/pagesB/static/imgs/pinglun.png" mode="widthFix"></image>
								<text>{{ item.commentCount }}</text>
							</view>
							<view class="dianzan">
								<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
									<image style="width: 38rpx;height: 38rpx;" src="/pagesB/static/imgs/dianzan.png" mode=""></image>
								</button>
								<view v-if="state.userInfo.headerUrl">
									<image style="width: 38rpx;height: 38rpx;" @click="toClick(item.articleId,index)" src="/pagesB/static/imgs/dianzan.png" mode="" v-if="!item.isAdmire"></image>
									<image style="width: 38rpx;height: 38rpx;" src="/pagesB/static/imgs/dianzan_success.png" mode="" v-else></image>
								</view>
								<text>{{ item.admireCount }}</text>
							</view>
						</view>
					</view>
					<view class="split-line"></view>
				</view>

			</view>

			<!-- 创新创业指南 -->
			<view class="guide" v-if="tabIndex == 2">

				<view class="guide-box" @click="pageToinnovationDetail(item.articleId)" v-for="(item,index) in innovationArr" :key="index">
					<view class="guide-item">
						<text class="question">{{ item.title }}</text>
						<image class="to" src="/pagesB/static/imgs/arrow.png" mode=""></image>
					</view>
					<view class="split-line"></view>
				</view>

				

			</view>
		</view>
	</view>
</template>

<script>
	import SupplierApi from '@/servies/SupplierApi.js'
	import ActivityApi from '@/servies/ActivityApi.js'
	import store from '@/store'
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				state: store.state,
				tabTitleArr: ['社区企业', '创新动态', '创新创业指南'],
				tabIndex: 0,
				pageNo: 1,
				businessArr: [], //社区企业列表
				activityArr:[], //创新动态列表
				innovationArr:[], //创新创业指南
				allowPull: false //允许上拉加载更多
			};
		},
		methods: {
			pageToDynamicDetail(articleId){
				uni.navigateTo({
					url:'/pagesB/pages/dynamicdetail/dynamicdetail?articleId=' + articleId
				})
			},
			toClick(likeContent,index){ //点赞动态
				ActivityApi.thumbsUp({
					likeContent,
					likeType:'dynamic'
				},res => {
					if( res.status == 1 ){
						this.activityArr[index].isAdmire = true
						this.activityArr[index].admireCount ++
					}
				})
			},
			changeTab(type = 'one') { 
				if (this.tabIndex == 0) { //获取社区企业列表
					SupplierApi.getCommunityBusiness({
						communityId: this.state.communityId,
						pageSize: 8,
						pageNo: this.pageNo
					}, res => {
						console.log( '企业列表',res )
						if (type == 'one') { 
							this.businessArr = res.list
							this.allowPull = !res.lastPage
						} else { 
							this.businessArr = [...this.businessArr, ...res.list]
							this.allowPull = !res.lastPage
						}
					})
				}else if( this.tabIndex == 1 ){ //获取创新动态
					ActivityApi.getArticleList({
						companyId:this.state.communityId,
						channelId:'91d827e5-9b94-408c-b265-5d07cc9bf477',
						pageSize:6,
						pageNo:this.pageNo
					}, res => {
						console.log( '创新动态',res )
						if (type == 'one') {
							this.activityArr = res.list
							this.allowPull = !res.lastPage
						} else { 
							this.activityArr = [...this.activityArr, ...res.list]
							this.allowPull = !res.lastPage
						}
					})
				}else{ //创新创业指南
					ActivityApi.getArticleList({
						companyId:this.state.communityId,
						channelId:'3400ed69-25de-472b-9c35-3a3e9b3b88c8',
						pageSize:6,
						pageNo:this.pageNo
					}, res => {
						console.log( '创新创业指南',res )
						if (type == 'one') {
							this.innovationArr = res.list
							this.allowPull = !res.lastPage
						} else { 
							this.innovationArr = [...this.innovationArr, ...res.list]
							this.allowPull = !res.lastPage
						}
					})
				}

			},
			getInfo(e) {
				api.bindgetuserinfo(e)
			},
			changeIndex(num) {
				if (this.tabIndex != num) {
					this.tabIndex = num
					this.pageNo = 1
					this.changeTab()
				}
			},
			pageToInnovationinterprisedetail(item) {
				uni.navigateTo({
					url: '/pagesB/pages/innovationinterprisedetail/innovationinterprisedetail?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			pageToinnovationDetail(articleId) {
				uni.navigateTo({
					url: '/pagesB/pages/innovationdetail/innovationdetail?articleId=' + articleId
				})
			}
		},
		onLoad(options) {
			this.changeTab()
		},
		onReachBottom() { //上拉加载更多
			if (this.allowPull) {
				this.changeTab('more')
			}
		},
		onPullDownRefresh() {
			this.pageNo = 1
			this.changeTab()
		}
	}
</script>

<style lang="scss">
	.innovation-main {
		box-sizing: border-box;
		padding: 20rpx 30rpx;

		/* tab标题 */
		.tab-title {
			display: flex;
			justify-content: space-between;
			margin-bottom: 40rpx;

			.title-item {
				display: flex;
				flex-direction: column;

				text {
					font-size: 30rpx;
					line-height: 60rpx;

					&.active {
						font-size: 34rpx;
						font-weight: bold;

					}
				}

				.bottom-line {
					width: 80%;
					height: 4rpx;
					background-color: #e62329;
					margin-left: 10%;
				}
			}
		}

		/* tab内容 */
		.tab-content {

			/* 社区企业 */
			.enterprise {
				.item-box {
					box-sizing: border-box;
					padding: 0 10rpx;

					.enterprise-item {
						display: flex;
						align-items: center;
						margin: 16rpx 0;

						.left {
							width: 150rpx;
							height: 150rpx;
							margin-right: 84rpx;
							border-radius: 20rpx;
						}

						.right {
							display: flex;
							flex-direction: column;

							.right-title {
								font-size: 30rpx;
								line-height: 48rpx;
							}

							.right-introduce {
								font-size: 26rpx;
								color: #9fa0a0;
								line-height: 40rpx;
								height: 40rpx;
							}
						}
					}
				}
			}

			/* 创新动态 */
			.dynamic {
				.item-box {
					// margin-bottom: 20rpx;
					padding: 0rpx 0rpx 20rpx 0rpx;

					.dynamic-item {
						display: flex;
						flex-direction: column;

						.dynamic-item-img {
							width: 100%;
							height: 296rpx;
							border-radius: 10rpx;
						}

						.title {
							font-size: 25rpx;
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

			/* 创新创业指南 */
			.guide {
				.guide-box {
					.guide-item {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.question {
							line-height: 76rpx;
							font-size: 26rpx;
						}

						.to {
							width: 14rpx;
							height: 24rpx;
							padding: 20rpx;
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
</style>
