<template>
	<view class="document-detail">
		<!-- 动态 -->
		<view class="dynamic-detail">
			<!-- 顶部 -->
			<view class="top-title">
				<view class="title">
					<text style="font-size: 30rpx;">{{documentObj.fileName}}</text>
				</view>
				<view class="title-detail">
					<!-- <text>作者:{{documentObj.uploadPerson}}</text> -->
					<text>作者:钟翔</text>
					<text>阅读:111</text>
					<text v-if="documentObj">{{documentObj.uploadTime}}</text>
				</view>
			</view>

			<rich-text class="font24" :nodes="String"></rich-text>
		</view>
	
		<!-- 附件 -->
		<view class="fujian-box">
			<view class="top-title">
				<image class="img" src="/pagesC/static/imgs/fujian.png" mode=""></image>
				<text class="title">附件</text>
			</view>
			
			<view class="item-box">
				<view class="item">
					<image class="imgs" src="/pagesC/static/imgs/word.png" mode=""></image>
					<text class="title">小组成员名单.doc</text>
				</view>
				
				<view class="item">
					<image class="imgs" src="/pagesC/static/imgs/ppt.png" mode=""></image>
					<text class="title">小组成员名单.ppt</text>
				</view>
				
				<view class="item">
					<image class="imgs" src="/pagesC/static/imgs/dll.png" mode=""></image>
					<text class="title">小组成员名单.dll</text>
				</view>
				
				<view class="item">
					<image class="imgs" src="/pagesC/static/imgs/pdf.png" mode=""></image>
					<text class="title">小组成员名单.pdf</text>
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
				fileId: '',
				String: '', //富文本
				documentObj:null
			};
		},
		methods: {
			getFileDetail() { //获取项目文件详情
				ProjectApi.getFileDetail({
					fileId: this.fileId
				}, res => {
					console.log('项目文件详情', res)
					this.documentObj = res
					let string = res.content
					this.String = string = string.replace(/<img/gi,
							'< img style="max-width:100%;height:auto;display:block" class="imgsty" ')
						.replace(/<html/g, '<div')
						.replace(/\/html>/g, '/div>')
						.replace(/<body/g, '<div')
						.replace(/\/body>/g, '/div>');
				})
			}
		},
		onLoad(options) {
			this.fileId = options.fileId || ''
			this.getFileDetail()
		}
	}
</script>

<style lang="scss">
	.document-detail {

		// 动态
		.dynamic-detail {
			box-sizing: border-box;
			padding: 20rpx;
			border-bottom: 7rpx solid #efefef;
			.font24{
				font-size: 25rpx;
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
					margin-bottom: 10rpx;

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
	
		//附件
		.fujian-box{
			box-sizing: border-box;
			padding: 20rpx;
			.top-title{
				display: flex;
				align-items: center;
				margin-bottom: 8rpx;
				.img{
					width: 32rpx;
					height: 36rpx;
					margin-right: 27rpx;
				}
				.title{
					font-size: 25rpx;
					letter-spacing: 3rpx;
				}
			}
		
			.item-box{
				.item{
					display: flex;
					align-items: center;
					.imgs{
						width: 38rpx;
						height: 47rpx;
						margin: 8rpx 0;
						margin-right: 21rpx;
						
					}
					.title{
						font-size: 25rpx;
						line-height: 30rpx;
						letter-spacing: 3rpx;
						color: #396695;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}
	}
</style>
