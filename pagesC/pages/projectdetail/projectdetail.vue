<template>
	<view class="project-detail">
		<!-- <image style="width: 100%;" src="/pagesC/static/imgs/main_img.jpg" mode="widthFix"></image> -->
		<view class="project-title">
			{{ projectName }}
		</view>

		<view class="project-progress">

			<view class="progress-item" v-for="(item,index) in detailArr" :key="index">
				<text class="right">
					<text v-if="item && item.startTime">{{item.startTime}}</text>
					<text v-if="item && item.endTime">-{{item.endTime}}</text>
				</text>
				<view class="middle">
					<text class="circle"></text>
					<text class="line" v-if="index != detailArr.length - 1" :style="{height:40 + item.projectFileList.length * 60 + 'rpx'}"></text>
				</view>
				<view class="left">
					<text class="left-title">{{ item.nodeName }}</text>
					<text class="left-item"  @click="pageToDocumentDetail(v.fileId)" v-for="(v,i) in item.projectFileList" :key="i">{{ v.fileName }}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import ProjectApi from '@/servies/ProjectApi.js'
	export default {
		data() {
			return {
				state: store.state,
				projectId: '',
				detailArr: [],
				projectName: ''
			};
		},
		methods: {
			pageToDocumentDetail(fileId){
				uni.navigateTo({
					url:'/pagesC/pages/documentdetail/documentdetail?fileId=' + fileId
				})
			},
			getProjectDetail() { //获取项目详情
				ProjectApi.getProjectDetail({
					projectId: this.projectId
				}, res => {
					console.log('详情', res)
					this.detailArr = res
				})
			}
		},
		onLoad(options) {
			this.projectId = options.projectId || ''
			this.projectName = options.projectName || ''
			this.getProjectDetail()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EFEFEF;
	}

	.project-detail {

		.project-title {
			font-size: 34rpx;
			font-weight: bold;
			line-height: 108rpx;
			text-align: center;
			box-sizing: border-box;
			padding: 0 80rpx;
		}

		.project-progress {
			box-sizing: border-box;
			width: 680rpx;
			margin: 0 auto;
			padding: 64rpx 56rpx;
			background-color: #ffffff;
			border-radius: 10rpx;

			.progress-item {
				display: flex;
				justify-content: space-between;

				.right {
					width: 133rpx;
					font-size: 24rpx;
					color: #ff2f29;
				}

				.middle {
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;

					.circle {
						width: 24rpx;
						height: 24rpx;
						background-color: #ff2f29;
						border-radius: 50%;
					}

					.line {
						width: 3rpx;
						// height: 71rpx;
						background-color: #ff2f29;
						margin: 10rpx 0;
					}
				}

				.left {
					width: 313rpx;
					display: flex;
					flex-direction: column;

					.left-title {
						font-size: 30rpx;
						font-weight: bold;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						margin-bottom: 12rpx;
					}

					.left-item {
						font-size: 24rpx;
						line-height: 60rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
