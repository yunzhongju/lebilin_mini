<template>
	<view class="innovation-enterprise-detail">
		<text class="title">{{ item.supplierName }}</text>
		<image class="logo" :src="item.thumbnail" mode=""></image>
		<rich-text class="font24" :nodes="Strings"></rich-text>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: null,
				Strings: '', //富文本
			};
		},
		methods: {

		},
		onLoad(options) {
			this.item = options.item ? JSON.parse(decodeURIComponent(options.item)) : null
			console.log(this.item)

			if (this.item.detailIntroduce) {
				let string = this.item.detailIntroduce

				this.Strings = string = string
					.replace(/<img/gi,'< img style="max-width:100%;height:auto;display:block" class="imgsty" ')
					.replace(/<html/g, '<div')
					.replace(/\/html>/g, '/div>')
					.replace(/<body/g, '<div')
					.replace(/\/body>/g, '/div>');
			}

		}
	}
</script>

<style lang="scss">
	.innovation-enterprise-detail {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 10rpx 50rpx 40rpx 50rpx;

		.title {
			font-size: 30rpx;
			font-weight: bold;
			line-height: 60rpx;
			text-align: center;
		}

		.logo {
			width: 204rpx;
			height: 204rpx;
			border-radius: 16rpx;
			display: block;
			margin: 20rpx auto;
		}
		
		.font24 {
			font-size: 28rpx;
			line-height: 40rpx;
			width: 100%;
			overflow: hidden;
			text-align: justify;
		
			// text-align-last: justify;
			span {
				text-align: center;
				display: inline-block;
			}
		
			.imgsty {
				max-width: 100%;
				margin: 6rpx auto;
				border-radius: 10rpx
			}
		}

		
	}
</style>
