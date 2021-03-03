<template>
	<view class="goods-detail">
		<!-- 商品图片 -->
		<view class="goods-img">
			<swiper class="swiper-box" indicator-active-color="#f39800" :indicator-dots="true" :interval="5000" :duration="1000"
			 :circular="true">
				<swiper-item class="swiper-item" v-for="(item,index) in detailPic" :key="index">
					<image class="swiper-img" :src="state.baseUrl + item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 商品信息 -->
		<view class="top-msg">
			<view class="price">
				<view class="pri-detail">
					<text style="color: #438f11;">3000</text>
					<text>分</text>
				</view>
				<text class="sell">售出2份 剩余10份</text>
			</view>
			<text class="name">凉山核桃</text>
			<text class="detail">野生核桃，9.9包邮</text>
		</view>

		<!-- 商品详情 -->
		<view class="goods-detail">
			<view class="title">
				商品详情
			</view>
			<view class="img-list">
				<image class="detail-img" src="/pagesC/static/imgs/dsh_icon.png"></image>
			</view>
		</view>

		<!-- 立即兑换 -->
		<view class="bottom-fixed">
			<text class="exchange-btn">立即兑换</text>
		</view>

	</view>
</template>

<script>
	import store from '@/store'
	export default {
		data() {
			return {
				state:store.state,
				detailPic: [
					"/images/detail_pic/179eac7e-cfae-404e-aed4-c5842f3bec4d.jpg",
					"/images/detail_pic/78a08e15-6a29-4d27-bbd4-914a36597ac5.jpg"
				]
			};
		},
		methods:{

		}
	}
</script>

<style lang="scss">
	.goods-detail {
		
		//积分兑换
		.integral-exchange {
			background-color: #fff;
			position: fixed;
			bottom: 0;
			left: 0;
			height: 220rpx;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.exchange-btn {
				width: 450rpx;
				height: 60rpx;
				background-color: #ff2f29;
				border-radius: 20rpx;
				line-height: 60rpx;
				text-align: center;
				letter-spacing: 3rpx;
				font-size: 30rpx;
				font-weight: bold;
				color: #fff;
			}
		}

		//弹出框
		.specifications-box {
			box-sizing: border-box;
			padding: 44rpx 60rpx;
			position: relative;

			//规格
			.choose-specifications {
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #eee;

				.item {
					display: flex;
					flex-direction: column;

					.title {
						line-height: 55rpx;
						letter-spacing: 3rpx;
						font-size: 30rpx;
					}

					.specifications-detail {
						display: flex;
						flex-wrap: wrap;

						.items {
							background-color: #efefef;
							height: 40rpx;
							font-size: 25rpx;
							line-height: 40rpx;
							text-align: center;
							border-radius: 20rpx;
							padding: 0 12rpx;
							margin-right: 40rpx;
							margin-bottom: 20rpx;

							&.active {
								background-color: #e62329;
								color: #fff;
							}
						}
					}
				}
			}

			// 选择数量
			.choose-count {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 0 250rpx 0;

				.title {
					font-size: 25rpx;
					line-height: 55rpx;
					letter-spacing: 3rpx;
				}

				.num {
					display: flex;
					align-items: center;

					button {
						padding: 0;
						margin: 0;
						height: 40rpx;
						width: 40rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						text-align: center;
						border-radius: 0;
						background-color: #DCDCDC;

						&:after {
							content: "";
							border: none;
						}
					}

					.reduce {
						border-radius: 20rpx 0 0 20rpx;
					}

					.count {
						width: 58rpx;
						height: 40rpx;
						font-size: 26rpx;
						line-height: 40rpx;
						text-align: center;
						background-color: #eeeeee;
						padding: 0;
						min-height: 0;
					}

					.add {
						border-radius: 0 20rpx 20rpx 0;
					}
				}
			}

			.close {
				position: absolute;
				height: 20rpx;
				width: 16rpx;
				top: 24rpx;
				right: 24rpx;
				padding: 4rpx;
			}

			.sure-btn {
				width: 450rpx;
				height: 60rpx;
				background-color: #ff2f29;
				font-size: 30rpx;
				font-weight: bold;
				letter-spacing: 3rpx;
				color: #ffffff;
				line-height: 60rpx;
				text-align: center;
				position: absolute;
				bottom: 98rpx;
				left: 50%;
				margin-left: -225rpx;
				border-radius: 20rpx;
			}
		}

		//商品图片
		.goods-img {
			width: 100%;
			height: 506rpx;
			display: block;
			margin: 10rpx 0;

			.swiper-box {
				width: 100%;
				height: 100%;
				background-color: #fff;

				.swiper-item {
					width: 506rpx;
					height: 506rpx;
					margin: 0 auto;

					.swiper-img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		// 商品信息
		.top-msg {
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0 44rpx;

			.price {
				display: flex;
				justify-content: space-between;

				.pri-detail {
					text {
						font-size: 30rpx;
						line-height: 50rpx;
					}
				}

				.sell {
					font-size: 22rpx;
					line-height: 50rpx;
					letter-spacing: 2rpx;
					color: #b5b5b6;
				}
			}

			.old-price {
				line-height: 50rpx;
				letter-spacing: 3rpx;
				color: #b5b5b6;
				font-weight: bold;
				font-size: 25rpx;
				text-decoration: line-through;
			}

			.name {
				font-size: 30rpx;
				letter-spacing: 3rpx;
				line-height: 50rpx;
			}

			.detail {
				font-size: 25rpx;
				letter-spacing: 3rpx;
				line-height: 50rpx;
				color: #9fa0a0;
			}
		}

		// 商品详情
		.goods-detail {
			margin-bottom: 180rpx;

			.title {
				height: 65rpx;
				background-color: #efefef;
				font-size: 35rpx;
				font-weight: bold;
				letter-spacing: 4rpx;
				line-height: 65rpx;
				text-align: center;
			}

			.img-list {
				.detail-img {
					width: 100%;
					display: block;
				}
			}
		}

		// 底部固定栏
		.bottom-fixed {
			background-color: #fff;
			position: fixed;
			width: 100%;
			bottom: 0;
			left: 0;
			height: 160rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			.exchange-btn{
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
