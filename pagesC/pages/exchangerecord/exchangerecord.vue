<template>
	<view class="exchange-record">
		<!-- 顶部信息 -->
		<view class="top-info">
			<view class="nick">
				<image class="avatar" :src="state.userInfo.headerUrl" mode=""></image>
				<text class="nick-name">{{ state.userInfo.personName }}</text>
			</view>

			<view class="intergral">
				剩余积分：<text style="color: #fff100;">{{ state.userInfo.integral }}</text>分
			</view>
		</view>
		<!-- 兑换列表 -->
		<view class="record-list">
			<view class="record-item" v-for="(item,index) in recordArr" :key="index">
				<image class="left-img" :src="state.baseUrl + item.picUrl" mode=""></image>
				<view class="middle-msg">
					<text>名称：{{ item.presentName }}</text>
					<text class="linehei">积分：<text style="color: #ff2f29;">{{ item.needIntegeral }}</text>积分</text>
					<text style="font-size: 20rpx;">{{ item.obtaintime }}</text>
				</view>
				<view class="right-qrcode">
					<image class="qr" :src="state.baseUrl + '/order/getOrderQRCode?orderId=' + item.myPresidentId" mode=""></image>
					<text class="record-status-yes" v-if="item.isReceive">已领取</text>
					<text class="record-status-no" v-else>未领取</text>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import IntergralApi from '@/servies/IntegralApi.js'
	import OrderApi from '@/servies/OrderApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				recordArr: [], //兑换列表
				qrArr: []
			};
		},
		methods: {

			getExchangeRecord() { //礼品兑换记录
				let _this = this
				IntergralApi.getExchangeRecord({
					type: 'integral'
				}, res => {
					_this.recordArr = res
				})
			},
			
		},
		onLoad(options) {
			this.getExchangeRecord()
		}
	}
</script>

<style lang="scss">
	.exchange-record {

		// 顶部信息
		.top-info {
			height: 160rpx;
			background-color: #FF2F29;
			padding: 0 42rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.nick {
				display: flex;
				align-items: center;
				width: 238rpx;

				.avatar {
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					margin-right: 26rpx;
				}

				.nick-name {
					font-size: 30rpx;
					letter-spacing: 3rpx;
					color: #ffffff;
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}

			.intergral {
				font-size: 30rpx;
				color: #ffffff;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 380rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				letter-spacing: 5rpx;
			}


		}

		//兑换列表
		.record-list {
			.record-item {
				margin: 0 34rpx;
				padding: 36rpx 12rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #eee;

				.left-img {
					width: 197rpx;
					height: 143rpx;
					border-radius: 10rpx;
				}

				.middle-msg {
					width: 260rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					text {
						font-size: 25rpx;
						width: 260rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.linehei {
						line-height: 70rpx;
					}
				}

				.right-qrcode {
					width: 110rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: flex-end;

					.qr {
						width: 110rpx;
						height: 110rpx;
					}

					.record-status-yes {
						font-size: 25rpx;
						letter-spacing: 5rpx;
						color: #717171;
					}

					.record-status-no {
						font-size: 25rpx;
						letter-spacing: 5rpx;
						color: #ea5504;
					}
				}
			}
		}
	}
</style>
