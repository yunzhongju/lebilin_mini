<template>
	<view class="guide-action">
		<!-- 左边菜单 -->
		<view class="menu">
			<text class="item" @click="changeIndex(index,item.serviceId)" :class="{active:index == activeIndex}" v-for="(item,index) in serviceArr" :key="index">{{ item.serviceName }}</text>
		</view>
		<!-- 右边列表 -->
		<view class="content">
			
			<view class="item" @click="pageToInnonationworkDetail(item.serviceId)" v-for="(item,index) in listArr" :key="index">
				<text class="title">{{ item.serviceName }}</text>
				<image class="to" src="/pagesB/static/imgs/arrow.png" mode=""></image>
			</view>	
		</view>
	</view>
</template>

<script>
	import ServiceApi from '@/servies/ServiceApi.js'
	export default {
		data() {
			return {
				serviceArr:[], //左边菜单
				activeIndex:0,
				listArr:[], //右边列表
			};
		},
		methods:{
			pageToInnonationworkDetail(serviceId){
				uni.navigateTo({
					url:'/pagesB/pages/innovationworkdetail/innovationworkdetail?serviceId=' + serviceId
				})
			},
			getService(){ //获取服务列表
				ServiceApi.getService( {serviceId:'d9362091-b983-4355-9c82-5081c4451cd7'}, res => {
					this.serviceArr = res.list
					
					if( res.dataType == '1' ){ //肯定是栏目
						ServiceApi.getService( {serviceId:this.serviceArr[this.activeIndex].serviceId} ,res => {
							if( res.dataType == '1' ){ //栏目
								for( const item of res.list ){
									ServiceApi.getService( {serviceId:item.serviceId}, res => {
										if( res.dataType == '1' ){  //栏目
											for( const item of res.list ){
												ServiceApi.getService( {serviceId:item.serviceId}, res => { //文章
													
													this.listArr = [...this.listArr,...res.list]
													conso.log( 11111,this.listArr )
												})
											}
										}else{  //文章
											
											this.listArr = [...this.listArr,...res.list]
											console.log( 222,this.listArr)
										}
									} )
								}
							}else{ //文章
								
								this.listArr = [...this.listArr,...res.list]
								console.log( 333,this.listArr )
							}
						} ) 
					}
					
				} )
			},
			changeIndex(index,serviceId){
				if( this.activeIndex != index){
					this.activeIndex = index
					this.listArr = []
					this.getService()
				}
			}
		},
		onLoad(options) {
			this.getService()
		},
		onUnload() {
			this.serviceArr = [],
			this.listArr = []
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.guide-action {
		height: 100%;
		display: flex;
		.menu {
			width: 200rpx;
			height: 100%;
			overflow: auto;
			background-color: #efefef;
			box-shadow: 3rpx 0rpx 3rpx 0rpx rgba(3, 0, 0, 0.1);
			display: flex;
			flex-direction: column;
			align-items: center;
			.item{
				line-height: 50rpx;
				letter-spacing: 3rpx;
				color: #222222;
				font-size: 25rpx;
				margin: 10rpx 0;
				width: 150rpx;
				text-align: center;
				&.active{
					color: #fff;
					background-color: #FF2F29;
					border-radius: 25rpx;
				}
			}
			
		}
		
		.content{
			flex: 1;
			.item{
				height: 88rpx;
				border-bottom: 2rpx solid #eee;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 10rpx;
				box-sizing: border-box;
				padding: 0 10rpx;
				.title{
					font-size: 25rpx;
					line-height: 88rpx;
					letter-spacing: 0rpx;
					color: #222222;
					width: 80%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.to{
					width: 12rpx;
					height: 21rpx;
				}
			}
		}
		
	}
</style>
