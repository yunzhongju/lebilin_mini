<template>
	<view class="settle-community">
		<view class="box">
			<text class="title">社区商圈招募公告</text>
			<text class="start">尊敬的社区企业同仁：</text>
			<text class="content">人工智能的发展给人们的生活带来了翻天覆地的变化，清洁等一些简单化、重复性的工作被机器设备逐渐取代，未来的社区服务，家政保洁、快递寄取可能不再是重要领域，人文关怀、精神服务的地位会变得越来越高，社区服务企业应重视精神文化的力量，开拓新的服务领域、服务方式。</text>
		</view>
		
		<view class="bottom-fixed">
			<text class="to">入驻社区商圈</text>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.settle-community {
		box-sizing: border-box;
		padding: 0 54rpx;

		.box {
			display: flex;
			flex-direction: column;
			margin-bottom: 240rpx;

			.title {
				text-align: center;
				line-height: 120rpx;
				letter-spacing: 3rpx;
				font-size: 30rpx;
			}

			.start,
			.content {
				font-size: 25rpx;
				line-height: 48rpx;
				letter-spacing: 3rpx;
			}
		}
	
		.bottom-fixed{
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;
			position: fixed;
			width: 100%;
			height: 240rpx;
			left: 0;
			bottom: 0;
			.to{
				width: 450rpx;
				height: 60rpx;
				background-color: #ff2f29;
				line-height: 60rpx;
				text-align: center;
				letter-spacing: 3rpx;
				color: #ffffff;
				font-size: 30rpx;
				font-weight: bold;
				border-radius: 20rpx;
			}
		}
	}
</style>
