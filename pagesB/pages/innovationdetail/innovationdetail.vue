<template>
	<view class="work-detail">
		<!-- 顶部 -->
		<view class="top">
			<text class="top-title">{{serviceObj.title}}</text>
		</view>
		

		<view class="connect">
			<rich-text class="font24" :nodes="Strings"></rich-text>
		</view>
		
	</view>
</template>

<script>
	import ActivityApi from '@/servies/ActivityApi.js'
	export default {
		data() {
			return {
				articleId:'',
				serviceObj:null,
				Strings:""
			};
		},
		methods:{
			getArticleDetail(){
				ActivityApi.getArticleDetail({articleId:this.articleId}, res => {
					this.serviceObj = res
					console.log( res )
					let string = res.content
					this.Strings = string = string.replace(/<img/gi,
							'< img style="max-width:100%;height:auto;display:block" class="imgsty" ')
						.replace(/<html/g, '<div')
						.replace(/\/html>/g, '/div>')
						.replace(/<body/g, '<div')
						.replace(/\/body>/g, '/div>');
					
					console.log( this.Strings )
				})
			}
		},
		onLoad(options) {
			this.articleId = options.articleId || ''
			this.getArticleDetail()
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
