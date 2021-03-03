<template>
	<view class="infomation-disclosure">
		<view class="card information-item" v-for="(item,index) in ProjectArr" :key="index">

			<view class="img-box" @click="pageToProjectDetail(item.projectId,item.projectName)">
				<image class="img" :src="item.thumbnail" mode=""></image>
				<text class="explain">{{item.projectName}}</text>
			</view>

			<view class="progress-box">

				<view class="progress-item" v-for="(v,i) in item.projectFileList" :key="i" @click="pageToDocumentDetail(v.fileId)">
					<text class="title">{{ v.fileName }}</text>
					<view class="time-box">
						<text class="time">{{v.uploadTime}}</text>
						<image class="go" src="/pagesC/static/imgs/right_arrow.png" mode=""></image>
					</view>
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
				state:store.state,
				activeIndex: 0,
				pageNo:1,
				allowPull:false,
				ProjectArr:[]
			};
		},
		methods: {
			getProjectList(type='one'){ //获取项目列表
				ProjectApi.getProjectList({
					communityId:this.state.communityId,
					pageSize:6,
					pageNo:this.pageNo
				},res => {
					console.log( '列表',res.list )
					
					console.log( '列表时间',res.list[0].projectFileList[0].uploadTime.split(' ')[0].split('-').join('.') )
					if( type == 'one' ){ //第一页or刷新
						this.ProjectArr = res.list,
						this.allowPull = !res.lastPage
					}else{ //上拉加载更多
						this.ProjectArr = [...this.ProjectArr,...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			pageToProjectDetail(projectId,projectName) {
				uni.navigateTo({
					url: '/pagesC/pages/projectdetail/projectdetail?projectId=' + projectId + '&projectName=' + projectName
				})
			},
			pageToDocumentDetail(fileId){
				uni.navigateTo({
					url:'/pagesC/pages/documentdetail/documentdetail?fileId=' + fileId
				})
			},
			changeIndex(index) {
				if (this.activeIndex != index) {
					this.activeIndex = index
				}
			}
		},
		onLoad(options) {
			this.getProjectList()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EFEFEF;
	}

	.information-item {
		.img-box {
			position: relative;
			width: 680rpx;

			.img {
				width: 680rpx;
				height: 240rpx;
				border-radius: 10rpx;
			}

			.explain {
				position: absolute;
				height: 60rpx;
				width: 100%;
				bottom: 0;
				left: 0;
				background-color: rgba(35, 24, 21, .5);
				line-height: 60rpx;
				color: #fff;
				font-size: 30rpx;
				font-weight: bold;
				border-radius: 0 0 10rpx 10rpx;
				text-indent: 12rpx;
			}
		}

		.progress-box {
			width: 100%;

			.progress-item {
				width: 658rpx;
				box-sizing: border-box;
				margin: 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.title {
					flex: 1;
					padding-right: 20rpx;
					box-sizing: border-box;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 30rpx;
					line-height: 60rpx;
				}

				.time-box {
					width: 154rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.time {
						font-size: 24rpx;
						line-height: 60rpx;
						color: #9fa0a0;
					}

					.go {
						width: 12rpx;
						height: 20rpx;
					}
				}
			}

		}
	}

	.card {
		width: 710rpx;
		margin: 18rpx auto 0;
		background-color: #ffffff;
		box-shadow: 0rpx 6rpx 10rpx #ddd;
		border-radius: 10rpx;
		padding: 10rpx 15rpx;
		box-sizing: border-box;
	}
</style>
