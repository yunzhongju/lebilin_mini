<template>
	<view class="add-address">
		<view class="no-data" v-if="!addressArr.length">
			暂无地址
		</view>
		<view class="list-box" v-else>
			<view class="item" v-for="(item,index) in addressArr" :key="index" @click="pageToSureOrder(item)">
				<view class="left">
					<view class="top">
						<text class="name">{{ item.consignee }}</text>
						<text class="phone">{{ item.phonenum }}</text>
						<text class="is-default" v-if="item.isdefault">默认</text>
					</view>
					<text class="bottom">{{ item.gisDisplayAdd + item.detailAddress }}</text>
				</view>
			</view>
		</view>

		<view class="add-new-address">
			<text class="add-btn" @click="pageToShippingAddress()">新增地址</text>
		</view>
	</view>
</template>

<script>
	import UserApi from '@/servies/UserApi.js'
	import OrderApi from '@/servies/OrderApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				addressArr: []
			};
		},
		methods: {
			getDeliveryAddress() { //获取收货地址列表
				UserApi.getDeliveryAddress(res => {
					this.addressArr = res
				})
			},
			pageToShippingAddress() {
				uni.redirectTo({
					url: '/pagesC/pages/shippingaddress/shippingaddress?buy=' + true
				})
			},
			pageToSureOrder(item) {
				OrderApi.isDistribution({
					addressId: item.oid,
					storeId: this.state.storeIdtwo
				}, res => {
					if (res && res.isDistribution) {
						store.state.orderAddress = item;
						uni.navigateBack({
							delta:1
						})
					} else {
						return wx.showToast({
							icon: "none",
							title: '该地址不在配送范围内～',
							mask: true,
						})
					}
				})

			}
		},
		onLoad(options) {
			this.getDeliveryAddress()
		}
	}
</script>

<style lang="scss">
	.add-address {
		box-sizing: border-box;
		padding: 0 58rpx;

		.no-data {
			text-align: center;
			color: #999;
			line-height: 120rpx;
			font-size: 28rpx;
		}

		.list-box {
			margin-bottom: 240rpx;

			.item {
				padding: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					flex: 1;
					display: flex;
					flex-direction: column;

					.top {
						display: flex;

						.name {
							width: 140rpx;
							font-size: 30rpx;
							line-height: 60rpx;
						}

						.phone {
							font-size: 30rpx;
							line-height: 60rpx;
							width: 330rpx;
						}

						.is-default {
							color: #FF2F29;
							font-size: 30rpx;
							line-height: 60rpx;
							flex: 1;
							text-align: end;
						}
					}

					.bottom {
						font-size: 22rpx;
						letter-spacing: 2rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				}
			}
		}

		.add-new-address {
			position: fixed;
			height: 240rpx;
			width: 100%;
			bottom: 0;
			left: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #fff;

			.add-btn {
				width: 450rpx;
				background-color: #ff2f29;
				color: #fff;
				line-height: 60rpx;
				text-align: center;
				letter-spacing: 3rpx;
				font-size: 30rpx;
				border-radius: 20rpx;
			}
		}
	}
</style>
