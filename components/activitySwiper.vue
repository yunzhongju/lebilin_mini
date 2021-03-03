<template>

	<swiper class="swiper" @change="showInfo" :style="{height:height + 'rpx'}" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
	 :duration="duration" :circular="circular" :vertical="vertical" :previousMargin="previousMargin" :nextMargin="nextMargin"
	 :indicator-active-color="indicatoractivecolor">
		<swiper-item :item-id="index" v-for="(item,index) in imgs" :key="index" class="border-radio" @click="jumpFun">
			<image :class="{whe:currentIndex != index}" :style="{borderRadius:radius + 'rpx'}" class="img-wh" :src="item" mode=""></image>
		</swiper-item>

	</swiper>
</template>

<script>
	export default {
		props: {
			imgs: {
				type: Array
			},
			jumpMsg:{
				type:Array
			},
			indicatoractivecolor: { 
				type: String,
				default: "#0DBA09"
			},
			height: {
				type: Number,
				default: 280
			},
			indicatorDots: { //是否显示面板指示点
				type: Boolean,
				default: false
			},
			autoplay: {
				type: Boolean,
				default: false
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
			radius:{
				type:String,
				default:'20'
			}
		},
		data() {
			return {
				currentIndex:0
			}
		},
		methods: {
			jumpFun(){ //跳转函数
				if( this.jumpMsg[this.currentIndex].jump ){
					uni.navigateTo({
						url:this.jumpMsg[this.currentIndex].jumpUrl
					})
				}
			},
			showInfo(e){
				this.currentIndex = e.target.current
				
			}
		},
		beforeDestroy() {
			this.currentIndex = 0
		}
	}
</script>

<style lang="scss">
	.border-radio{
	}
	.img-wh {
		width: 100%;
		height: 100%;
		// border-radius: 10px;
		display: block;
		padding: 0;
		vertical-align: middle;
	};
	.whe{
		height: 80% !important;
		width: 97%;
		display: block;
		margin: 0 auto;
		margin-top: 4%;
		
	}
</style>
