<template>
	<view class="choose-referance">
		<!-- 顶部地址 -->
		<view class="top-addr">
			<view class="addr-choose">
				<view class="local">
					<image src="/pagesC/static/imgs/addr_1.png" mode=""></image>
					<text>当前位置</text>
				</view>
				<view class="choose-btn">
					选择地址
				</view>
			</view>
			
			<view class="recently-addr">
				<text class="recently">最近地址：</text>
				<text class="shop-addr">四川省成都市双流区大件路白家段空港国际7栋4单元501</text>
			</view>
		</view>
		<!-- 附近店铺搜索 -->
		<view class="nearby-shop">
			<view class="left">
				附近店铺
			</view>
			<input class="search" type="text" value="" />
			<view class="search-btn">
				搜索
			</view>
		</view>
		<view class="split-line"></view>
		<!-- 店铺列表 -->
		<view class="shop-list">
			
			<view class="list-item">
				<image class="left-avatar" src="/pagesC/static/imgs/close.png" mode=""></image>
				<view class="middle-msg">
					<view class="name-distance">
						<text class="name">团长：钟建波</text>
						<text class="distance">距离您10.6km</text>
					</view>
					<view class="shop-name">
						紫东梵谷
					</view>
					<view class="pick-address">
						取货地址：锦江区合欢树街328号花香苑三区(牛牛凉卤店)
					</view>
				</view>
				<image class="right-go" src="/pagesC/static/imgs/right.png" mode=""></image>
			</view>
			
			<view class="list-item">
				<image class="left-avatar" src="/pagesC/static/imgs/close.png" mode=""></image>
				<view class="middle-msg">
					<view class="name-distance">
						<text class="name">团长：钟建波</text>
						<text class="distance">距离您10.6km</text>
					</view>
					<view class="shop-name">
						紫东梵谷
					</view>
					<view class="pick-address">
						取货地址：锦江区合欢树街328号花香苑三区(牛牛凉卤店)
					</view>
				</view>
				<image class="right-go" src="/pagesC/static/imgs/right.png" mode=""></image>
			</view>
			
			<view class="list-item">
				<image class="left-avatar" src="/pagesC/static/imgs/close.png" mode=""></image>
				<view class="middle-msg">
					<view class="name-distance">
						<text class="name">团长：钟建波</text>
						<text class="distance">距离您10.6km</text>
					</view>
					<view class="shop-name">
						紫东梵谷
					</view>
					<view class="pick-address">
						取货地址：锦江区合欢树街328号花香苑三区(牛牛凉卤店)
					</view>
				</view>
				<image class="right-go" src="/pagesC/static/imgs/right.png" mode=""></image>
			</view>
			
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
	.choose-referance{
		// 顶部地址
		.top-addr{
			background-color: #FF2F29;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 20rpx 60rpx;
			.addr-choose{
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.local{
					image{
						width: 22rpx;
						height: 30rpx;
						margin-right: 8rpx;
					}
					text{
						font-size: 25rpx;
						line-height: 60rpx;
						letter-spacing: 3rpx;
						color: #fff;
					}
				}
				.choose-btn{
					width: 130rpx;
					height: 48rpx;
					line-height: 48rpx;
					text-align: center;
					color: #fff;
					border: solid 2rpx #ffffff;
					font-size: 25rpx;
					// padding: 0 22rpx;
					border-radius: 10rpx;
					letter-spacing: 3rpx;
				}
			}
			.recently-addr{
				margin-top: 10rpx;
				display: flex;
				.recently{
					color: #ffffff;
					font-size: 25rpx;
					letter-spacing: 3rpx;
				}
				.shop-addr{
					flex: 1;
					color: #ffffff;
					font-size: 25rpx;
					letter-spacing: 3rpx;
				}
			}
		}
		// 附近店铺搜索
		.nearby-shop{
			box-sizing: border-box;
			padding: 20rpx 14rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left{
				letter-spacing: 3rpx;
				color: #000000;
				line-height: 56rpx;
				font-size: 25rpx;
				padding-left: 20rpx;
				position: relative;
				font-weight: bold;
				&:before{
					content: "";
					width: 9rpx;
					height: 52%;
					background-color: #ff2f29;
					border-radius: 8rpx;
					position: absolute;
					left: 0rpx;
					top: 24%;
				}
			}
			.search{
				width: 432rpx;
				height: 56rpx;
				background-color: #dfdfdf;
				border-radius: 20rpx;
				padding: 0 10rpx;
				line-height: 56rpx;
				font-size: 25rpx;
			}
			.search-btn{
				width: 99rpx;
				height: 56rpx;
				background-color: #ff2f29;
				line-height: 56rpx;
				border-radius: 28rpx;
				letter-spacing: 2rpx;
				color: #ffffff;
				font-size: 20rpx;
				text-align: center;
			}
		}
		//店铺列表
		.shop-list{
			box-sizing: border-box;
			padding: 0 14rpx;
			.list-item{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
				border-bottom: 1rpx solid #eee;
				.left-avatar{
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin: 0 28rpx 0 16rpx;
				}
				.middle-msg{
					flex: 1;
					display: flex;
					flex-direction: column;
					.name-distance{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.name{
							font-size: 25rpx;
						}
						.distance{
							font-size: 25rpx;
							color: #B86954;
							
						}
					}
					.shop-name{
						font-size: 30rpx;
						line-height: 60rpx;
					}
					.pick-address{
						color: #AEAEAE;
						font-size: 25rpx;

					}
				}
				.right-go{
					width: 25rpx;
					height: 25rpx;
					margin: 0 28rpx 0 40rpx;
				}
			}
		}
		
		// 分割线
		.split-line{
			width: 722rpx;
			margin: 0 auto;
			height: 1rpx;
			background-color: #eee;
		}
	}
</style>
