<template>
	<view class="work-detail">
		<!-- 顶部 -->
		<view class="top">
			<text class="top-title">{{serviceObj.serviceName}}</text>
			<image class="top-img" :src="serviceObj.thumbnail" mode="widthFix"></image>
		</view>
		<!-- 信息 -->
		<view class="msg">
			<text>联系地址：{{serviceObj.serviceAdd}}</text>
			<text>联系电话：{{ serviceObj.serviceTel }}</text>
			<text>星期：{{serviceObj.week}}</text>
			<text>服务时间：{{serviceObj.hourTime}}</text>
		</view>
		<!-- 联系方式 -->
		<view class="connect">
			<rich-text class="font24" :nodes="String"></rich-text>
		</view>
		
	</view>
</template>

<script>
	import ServiceApi from '@/servies/ServiceApi.js'
	export default {
		data() {
			return {
				serviceId:'',
				serviceObj:null,
				String:""
			};
		},
		methods:{
			getServiceDetail(){
				ServiceApi.getServiceDetail({serviceId:this.serviceId}, res => {
					this.serviceObj = res
					console.log( res )
					let string = res.serviceDesc
					this.String = string = string.replace(/<img/gi,
							'< img style="max-width:100%;height:auto;display:block" class="imgsty" ')
						.replace(/<html/g, '<div')
						.replace(/\/html>/g, '\div>')
						.replace(/<body/g, '<div')
						.replace(/\/body>/g, '\div>');
					console.log(string)
				})
			}
		},
		onLoad(options) {
			this.serviceId = options.serviceId || ''
			this.getServiceDetail()
		},
		onHide() {
			this.serviceObj = null
		}
	}
</script>

<style lang="scss">
	.work-detail{
		// 顶部
		.top{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 10rpx;
			.top-title{
				width: 600rpx;
				text-align: center;
				font-size: 30rpx;
				font-weight: bold;
				color: #000000;
				line-height: 70rpx;
			}
			.top-img{
				width: 324rpx;
				
				border-radius: 10rpx;
			}
		}
		//信息
		.msg{
			display: flex;
			flex-direction: column;
			padding: 10rpx 62rpx;
			border-bottom: 1rpx solid #eee;
			text{
				line-height: 50rpx;
				font-size: 25rpx;
			}
		}
		//联系方式
		.connect{
			box-sizing: border-box;
			padding: 20rpx 62rpx;
			.font24{
				font-size: 28rpx;
				line-height:40rpx;
				width: 100%;
				overflow: hidden;
				text-align: justify;
				// text-align-last: justify;
				span{
					text-align: center;
					display: inline-block;
				}
				.imgsty{
					max-width: 100%;
					margin:6rpx auto;
					border-radius:10rpx
				}
			}
			/* display: flex;
			flex-direction: column;
			text{
				font-size: 25rpx;
				line-height: 50rpx;
				color: #000000;
			} */
			/* .connect-title{
				font-size: 30rpx;
				font-weight: bold;
			} */
		}
		//需完善材料
		.perfect{
			box-sizing: border-box;
			padding: 20rpx 62rpx;
			display: flex;
			flex-direction: column;
			text{
				font-size: 25rpx;
				line-height: 50rpx;
				color: #000000;
			}
			.perfect-title{
				font-size: 30rpx;
				font-weight: bold;
			}
		}
	}
</style>
