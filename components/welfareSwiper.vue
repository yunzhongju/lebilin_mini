<template>

	<swiper class="swiper" :style="{height:height + 'rpx'}" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
	 :duration="duration" :circular="circular" :vertical="vertical" :previousMargin="previousMargin" :nextMargin="nextMargin"
	 :indicator-active-color="indicatoractivecolor">
		<swiper-item v-for="(item,index) in imgs" :key="index">
			<image class="img-wh" :src="item" mode="aspectFill"></image>
		</swiper-item>

	</swiper>
</template>

<script>
	export default {
		props: {
			
			indicatoractivecolor: {
				type: String,
				default: "#0DBA09"
			},
			height: {
				type: Number,
				default: 100
			},
			indicatorDots: {
				type: Boolean,
				default: true
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number, //自动切换时间间隔
				default: 5000
			},
			duration: {
				type: Number, //滑动动画时长
				default: 500
			},
			circular: {
				type: Boolean, //是否采用衔接滑动
				default: true
			},
			vertical: {
				type: Boolean, //滑动方向是否为纵向
				default: false
			},
			previousMargin: {
				type: String, //前边距
				default: "0rpx"
			},
			nextMargin: {
				type: String, //后边距
				default: "0rpx"
			},
			imgs:{
				type: Array,
				default:[]
			}
		},
		data() {
			return {

			}
		},
		method() {},
	}
</script>

<style lang="scss">
	.swiper{
		// box-sizing: border-box;
		margin: 20rpx 10rpx;
	}
		
	.img-wh {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
		// margin: 8rpx 20rpx;
	}
</style>
