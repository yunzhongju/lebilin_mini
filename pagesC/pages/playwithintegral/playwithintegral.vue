<template>
	<view class="play-with-integral">
		<view class="play-item" v-for="(item,index) in taskArr" :key="index">
			<image class="left-img" :src="state.baseUrl + item.picUrl" mode=""></image>
			<view class="middle-content">
				<text class="title">{{ item.taskName }}</text>
				<text class="exprise">{{ item.resume }}</text>
				<text class="integral"><text style="color: #e60012;">+{{ item.integralReward }}</text>积分</text>
			</view>
			<view class="right-complate">
				<text class="btn" v-if="item.taskType == 'task_walk' && !item.isFinish" @click="pageToCompate(item.taskType)">去同步</text>
				<text class="btn" v-if="item.taskType != 'task_walk' && !item.isFinish" @click="pageToCompate(item.taskType)">去完成</text>
				<text class="btn finish" v-if="item.isFinish">已完成</text>
				<text class="is-complate"><text style="color: #e60012;">{{ item.nowCount }}</text>/{{ item.sumCount }}</text>
			</view>
		</view>

	</view>
</template>

<script>
	import IntegralApi from '@/servies/IntegralApi.js'
	import {
		getWeRunData
	} from '@/utils/weRunData.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				taskArr: [], //任务列表
			};
		},
		methods: {
			isString(str) {
				return typeof str == "string" && str.constructor == String;
			},
			pageToCompate(taskType) {
				if (taskType == "task_check") { //签到
					uni.navigateTo({
						url: '/pagesC/pages/sortsign/sortsign'
					})
				} else if (taskType == "task_article") { //评论和转发
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else if (taskType == "task_walk") { //同步微信步数
					getWeRunData(res => {
						if (this.isString(res)) {
							setTimeout(function() {
								return wx.showToast({
									title: res + "~",
									icon: "none"
								});
							}, 300);
						}
						this.getTaskList()
					})
				}
			},
			getTaskList() { //获取任务列表
				IntegralApi.getTaskList(res => {
					console.log(res)
					this.taskArr = res
				})
			}
		},
		onShow() {
			this.getTaskList()
		}
	}
</script>

<style lang="scss">
	.play-with-integral {
		box-sizing: border-box;
		padding: 0 34rpx;

		.play-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 20rpx 0;

			.left-img {
				width: 115rpx;
				height: 115rpx;
				border-radius: 50%;
			}

			.middle-content {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				width: 282rpx;

				.title {
					font-size: 25rpx;
					line-height: 33rpx;
					letter-spacing: 3rpx;
				}

				.exprise {
					font-size: 20rpx;
					line-height: 33rpx;
					letter-spacing: 2rpx;
					color: #ababab;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.integral {
					font-size: 25rpx;
					line-height: 33rpx;
					letter-spacing: 3rpx;
				}
			}

			.right-complate {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				text-align: end;
				width: 170rpx;

				.btn {
					width: 110rpx;
					line-height: 48rpx;
					background-color: #e60012;
					border-radius: 10rpx;
					text-align: center;
					font-size: 20rpx;
					letter-spacing: 4rpx;
					color: #ffffff;

					&.finish {
						background-color: #ccc;
					}
				}

				.is-complate {
					font-size: 25rpx;
					line-height: 50rpx;
					letter-spacing: 5rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
	}
</style>
