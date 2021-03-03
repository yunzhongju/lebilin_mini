<template>
	<view class="volunteer-info">
		<!-- 卡片 -->
		<view class="info-card" :class="{gold:volunteerInfo.serviceLevel == 3,silver:volunteerInfo.serviceLevel == 2,copper:volunteerInfo.serviceLevel == 1}">
			
			<view class="top">
				<view class="left-info">
					<image class="avatar" :src="volunteerInfo.headerUrl" mode=""></image>
					<text class="name">{{ volunteerInfo.personname }}</text>
					<view class="sex-box">
						<image v-if="volunteerInfo.xmid == 1" class="sex" src="/pagesC/static/imgs/sex_man.png" mode=""></image>
						<image v-if="volunteerInfo.xmid == 2" class="sex" src="/pagesC/static/imgs/sex_woman.png" mode=""></image>
					</view>
				</view>
				
				<image class="title" src="/pagesC/static/imgs/card_name.png" mode=""></image>
			</view>
			
			<view class="bottom">
				<view class="item">
					<image class="img" src="/pagesC/static/imgs/card_intergral.png" mode=""></image>
					<text class="title">积分</text>
					<text class="title">{{ volunteerInfo.integral }}</text>
				</view>
				
				<view class="item">
					<image class="img" src="/pagesC/static/imgs/card_ranking.png" mode=""></image>
					<text class="title">编号</text>
					<text class="title">{{ volunteerInfo.volunteerCode }}</text>
				</view>
				
				<view class="item">
					<image class="img" src="/pagesC/static/imgs/card_clock.png" mode=""></image>
					<text class="title">注册时间</text>
					<text class="title">{{ registDate }}</text>
				</view>
				
				<view class="item">
					<image class="img" src="/pagesC/static/imgs/card_times.png" mode=""></image>
					<text class="title">服务次数</text>
					<text class="title">{{ volunteerInfo.serviceCount ? volunteerInfo.serviceCount : 0 }}</text>
				</view>
			</view>
		
			<image class="logo" src="/pagesC/static/imgs/logo.png" mode=""></image>
		</view>
		
		<!-- 二维码 -->
		<view class="qrscore">
			<image class="qrCode" :src="volunteerInfo.qrCodeUrl" mode=""></image>
		</view>
		<!-- 注释 -->
		<view class="explain">
			扫码成为志愿者
		</view>
	</view>
</template>

<script>
	import UserApi from '@/servies/UserApi.js'
	export default {
		data() {
			return {
				volunteerInfo:null
			};
		},
		methods:{
			getMyVolunteerCert(){ //获取志愿者证书
				UserApi.getMyVolunteerCert(res => {
					console.log( res )
					this.volunteerInfo = res
				})
			}
		},
		computed:{
			registDate(){ //注册日期
				return this.volunteerInfo != null && this.volunteerInfo.registerDate ? this.volunteerInfo.registerDate.split(' ')[0].split('-').join('.').slice(2) : '' 
			}
		},
		onLoad( options ) {
			this.getMyVolunteerCert()
		}
	}
</script>

<style lang="scss">
	.volunteer-info{
		//卡片
		.info-card{
			margin: 10rpx;
			border-radius: 19rpx;
			background-size: cover;
			height: 450rpx;
			padding: 50rpx 60rpx;
			box-sizing: border-box;
			position: relative;
			&.gold{
				background: url("http://132.232.74.143:5711/images/wxa_pic/level_gold.png") no-repeat center center;
			}
			&.silver{
				background: url("http://132.232.74.143:5711/images/wxa_pic/level_silver.png") no-repeat center center;
			}
			&.copper{
				background: url("http://132.232.74.143:5711/images/wxa_pic/level_copper.png") no-repeat center center;
			}
			.top{
				display: flex;
				align-items: center;
				margin-bottom: 92rpx;
				.left-info{
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;
					margin-right: 20rpx;
					.avatar{
						width: 114rpx;
						height: 114rpx;
						border-radius: 50%;
					}
					.name{
						font-size: 30rpx;
						font-weight: bold;
						line-height: 50rpx;
						letter-spacing: 3rpx;
						position: absolute;
						width: 114rpx;
						text-align: center;
						bottom: -50rpx;
						left: 0;
					}
					.sex-box{
						position: absolute;
						width: 29rpx;
						height: 29rpx;
						border-radius: 50%;
						right: 0rpx;
						bottom: 2rpx;
						background-color: #fff;
						display: flex;
						align-items: center;
						justify-content: center;
						.sex{
							width: 21rpx;
							height: 21rpx;
						}
					}
				}
				.title{
					width: 466rpx;
					height: 40rpx;
				}
			}
			.bottom{
				box-sizing: border-box;
				padding: 0 10rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.item{
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 150rpx;
					text-align: center;
					.img{
						width: 72rpx;
						height: 72rpx;
						border-radius: 50%;
						margin-bottom: 20rpx;
					}
					.title{
						font-size: 25rpx;
						line-height: 30rpx;
						letter-spacing: 3rpx;
						color: #97323e;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
			.logo{
				width: 41rpx;
				height: 55rpx;
				right: 40rpx;
				top: 11rpx;
				position: absolute;
			}
		}
		
		// 二维码
		.qrscore{
			width: 416rpx;
			height: 416rpx;
			margin: 86rpx auto;
			background-color: #fff;
			.qrCode{
				width: 100%;
				height: 100%;
			}
		}
		
		//注释
		.explain{
			font-size: 35rpx;
			font-weight: bold;
			text-align: center;
		}
	}
</style>
