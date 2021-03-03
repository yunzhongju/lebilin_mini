<template>
	<view class="hope-main">

		<!-- 顶部功能 -->
		<view class="top-function">
			<view class="function-item" @click="pageToFound('dangyuan')">
				<image src="/pagesB/static/imgs/found_member.png" mode=""></image>
				<text>找党员</text>
			</view>

			<view class="function-item" @click="pageToFound('zhiyuanzhe')">
				<image src="/pagesB/static/imgs/found_vol.png" mode=""></image>
				<text>找志愿者</text>
			</view>
			
			<view class="function-item" v-if="!state.userInfo.isVolunteer" @click="pageToVolunteerNeedKnow">
				<image src="/pagesB/static/imgs/add_vol.png" mode=""></image>
				<text>加入志愿者</text>
			</view>
			
			<view class="function-item" v-else @click="showMsg">
				<image src="/pagesB/static/imgs/add_vol.png" mode=""></image>
				<text>邀请志愿者</text>
			</view>
			

			<view class="function-item" @click="pageToCreateHope">
				<image src="/pagesB/static/imgs/create_hope.png" mode=""></image>
				<text>发布心愿</text>
			</view>
		</view>

		<!-- 选项卡标题 -->
		<view class="tab-title">
			<view class="title-item" v-for="(item,index) in tabTitieArr" :key="index" @click="changeIndex(index)">
				<text class="title" :class="{active:activeIndex == index}">{{item}}</text>
				<text class="bottom-active" v-if="activeIndex == index"></text>
			</view>
		</view>

		<!-- 选项卡内容 -->
		<view class="tab-content">

			<view class="hope card" v-for="(item,index) in wishArr" :key="index">
				<text class="title" @click="pageToHopeDetail(item.msgId)">{{item.msgTitle}} {{item.needPerson}}人</text>
				<text class="content" @click="pageToHopeDetail(item.msgId)">{{item.msgContent}}</text>
				<view class="to-claim">
					<view class="need">
						<image class="img" :src="item.headerUrl" mode=""></image>
						<text class="need-content">{{item.nickName}}</text>
					</view>

					<view class="intergral">
						<image class="img" src="/pagesB/static/imgs/intergral.png" mode=""></image>
						<text class="need-content">{{item.integral}}分</text>
					</view>
					
					<view class="btn" v-if="activeIndex == 0">
						<text class="btn-item" v-if="item.progress == 1 && item.isPublisher">待领取</text>
						<text class="btn-item" v-if="item.progress == 1 && !item.isPublisher" @click="toLingqu(item.msgId,item.isPublisher)">领取</text>
						
						<text class="btn-item" v-if="item.progress == 2 && item.isAssignPerson" @click="pageToServicefill(item.msgId,item.msgTitle)">填写</text>
						<text class="btn-item" v-if="item.progress == 2 && !item.isAssignPerson">已领取</text>
						
						<text class="btn-item" v-if="item.progress == 3 && item.isPublisher" @click="pageToHopeDetail(item.msgId)">去评价</text>
						<text class="btn-item" v-if="item.progress == 3 && !item.isPublisher">待评价</text>
						
						<text class="btn-item" v-if="item.progress == 4" @click="pageToHopeDetail(item.msgId)">已完成</text>
					</view>
					
					<view class="btn" v-if="activeIndex == 1">
						<text class="btn-item" v-if="item.progress == 2 && item.isAssignPerson" @click="pageToServicefill(item.msgId,item.msgTitle)">填写</text>
						<text class="btn-item" v-if="item.progress == 2 && item.isPublisher">服务中</text>
					</view>
					
					<view class="btn" v-if="activeIndex == 2">
						<text class="btn-item" v-if="item.progress == 3" @click="pageToHopeDetail(item.msgId)">去评价</text>
					</view>
					
					<view class="btn" v-if="activeIndex == 3">
						<text class="btn-item" v-if="item.progress == 4" @click="pageToHopeDetail(item.msgId)">已完成</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import WishApi from '@/servies/WishApi.js'
	export default {
		data() {
			return {
				state: store.state,
				tabTitieArr: ['心愿', '服务', '评价', '完成'],
				activeIndex: 0,
				pageNo: 1,
				allowPull: false, //允许上拉加载更多
				wishArr: [] //心愿列表
			};
		},
		methods: {
			pageToFound(str){
				uni.navigateTo({
					url:'/pagesB/pages/foundvolunteer/foundvolunteer?type=' + str
				})
			},
			showMsg(){
				uni.showToast({
					title:'您已经是志愿者了哦~',
					icon:'none'
				})
			},
			pageToVolunteerNeedKnow(){
				uni.navigateTo({
					url:"/pagesB/pages/volunteerneedknow/volunteerneedknow"
				})
			},
			pageToServicefill(msgId, title) {
				uni.navigateTo({
					url: `/pagesB/pages/servicefill/servicefill?msgId=${msgId}&title=${title}`
				})
			},
			toLingqu(msgId,isPublisher) { //领取心愿
				if( isPublisher ){
					return uni.showToast({
						title:'本人不能领取心愿哦',
						icon:"none"
					})
				}
				WishApi.claimWish({
					msgId
				}, res => {
					console.log(res)
					if (res.status == 1) {
						this.changeIndex(1)
					}
				})
			},
			pageToCreateHope() {
				uni.navigateTo({
					url: "/pagesB/pages/hopecreate/hopecreate"
				})
			},
			pageToHopeDetail(msgId) {
				uni.navigateTo({
					url: '/pagesB/pages/hopeevaluation/hopeevaluation?msgId=' + msgId
				})
			},
			changeIndex(index) { //改变index
				this.activeIndex = index
				this.pageNo = 1

				if (this.activeIndex == 0) { //心愿列表
					this.getWishList({ //获取心愿列表第一页
						communityId: this.state.communityId,
						pageSize: 6,
						pageNo: 1
					})
				} else if (this.activeIndex == 1) { //已认领
					this.getWishList({ //获取心愿列表第一页
						communityId: this.state.communityId,
						processType: "1",
						pageSize: 6,
						pageNo: 1
					})
				} else if (this.activeIndex == 2) { //评价
					this.getWishList({ //获取心愿列表第一页
						communityId: this.state.communityId,
						processType: "2",
						pageSize: 6,
						pageNo: 1
					})
				} else { //完成
					this.getWishList({ //获取心愿列表第一页
						communityId: this.state.communityId,
						processType: "3",
						pageSize: 6,
						pageNo: 1
					})
				}


			},
			onReach(){ //上拉加载更多
				if( this.allowPull ){
					this.pageNo ++
					if (this.activeIndex == 0) { //心愿列表
						this.getWishList({ //获取心愿列表第一页
							communityId: this.state.communityId,
							pageSize: 6,
							pageNo: this.pageNo
						},'more')
					} else if (this.activeIndex == 1) { //已认领
						this.getWishList({ //获取心愿列表第一页
							communityId: this.state.communityId,
							processType: "1",
							pageSize: 6,
							pageNo: this.pageNo
						},'more')
					} else if (this.activeIndex == 2) { //评价
						this.getWishList({ //获取心愿列表第一页
							communityId: this.state.communityId,
							processType: "2",
							pageSize: 6,
							pageNo: this.pageNo
						},'more')
					} else { //完成
						this.getWishList({ //获取心愿列表第一页
							communityId: this.state.communityId,
							processType: "3",
							pageSize: 6,
							pageNo: this.pageNo
						},more)
					}
				}
			},

			getWishList(params, type = 'one') { //获取心愿列表
				WishApi.getWishList(params, res => {

					console.log('心愿列表', res)

					if (type == 'one') { //加载第一页
						this.wishArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.wishArr = [...this.wishArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			}
		},
		onLoad(options) {
			this.activeIndex = options.index || 0
			this.changeIndex(this.activeIndex)
		},
		onPullDownRefresh() { //下拉刷新
			this.changeIndex(this.activeIndex)
		},
		onReachBottom() { //上拉加载更多
			this.onReach()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EFEFEF;
	}

	.card {
		background-color: #ffffff;
		border-radius: 20rpx;
	}

	.hope-main {
		box-sizing: border-box;
		padding: 34rpx 22rpx 0rpx 22rpx;

		/* 顶部功能 */
		.top-function {
			display: flex;
			justify-content: space-around;

			.function-item {
				width: 145rpx;
				height: 144rpx;
				background-color: #ffffff;
				border-radius: 23rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				image {
					width: 64rpx;
					height: 64rpx;
				}

				text {
					font-size: 26rpx;
					// font-weight: bold;
					line-height: 40rpx;
				}
			}
		}

		/* 选项卡标题 */
		.tab-title {
			display: flex;
			justify-content: space-around;
			margin-top: 10rpx;
			.title-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;

				.title {
					font-size: 30rpx;
					line-height: 70rpx;
					&.active{
						font-weight: bold;
						font-size: 34rpx;
					}
				}

				.bottom-active {
					width: 80%;
					height: 4rpx;
					background-color: #e62329;
					position: absolute;
					bottom: -2rpx;
					left: 10%;
				}
			}
		}

		/* 选项卡内容 */
		.tab-content {
			margin-top: 10rpx;
			.hope {
				box-sizing: border-box;
				padding: 0rpx 52rpx;
				display: flex;
				flex-direction: column;
				margin-bottom: 14rpx;

				.title {
					font-size: 30rpx;
					font-weight: bold;
					line-height: 64rpx;
				}

				.content {
					font-size: 26rpx;
					// font-weight: bold;
					line-height: 47rpx;
				}

				.to-claim {
					margin: 20rpx 0;
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.need {
						display: flex;
						align-items: center;
						width: 258rpx;

						.img {
							width: 56rpx;
							height: 56rpx;
							border-radius: 50%;
						}

						.need-content {
							font-size: 26rpx;
							margin-left: 6rpx;
							// font-weight: bold;
						}
					}

					.intergral {
						display: flex;
						align-items: center;
						flex-grow: 1;

						.img {
							width: 40rpx;
							height: 43rpx;

						}

						.need-content {
							font-size: 26rpx;
							margin-left: 6rpx;
							// font-weight: bold;
						}
					}

					.btn {
						border: solid 2rpx #e62329;
						border-radius: 10rpx;
						height: 30rpx;
						padding: 0rpx 12rpx;
						display: flex;
						align-items: center;
						.btn-item{
							color: #e62329;
							line-height: 30rpx;
							font-size: 22rpx;
						}
					}
				}
			}
		}
	}
</style>
