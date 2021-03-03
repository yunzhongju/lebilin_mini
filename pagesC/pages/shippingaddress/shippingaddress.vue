<template>
	<view class="shipping-address">
		<button class="address" v-if="state.isPassAddr" @click="getLocation">
			<text class="title">收货地址：</text>
			<text class="content" v-if="!paramsObj.gisDisplayAdd">点击获取</text>
			<text class="content" v-else>{{ paramsObj.gisDisplayAdd }}</text>
			<image class="right" src="/pagesC/static/imgs/addr_2.png" mode=""></image>
		</button>
		<button class="address" v-else open-type="openSetting" @click="goSetting">
			<text class="title">收货地址：</text>
			<text class="content" v-if="!paramsObj.gisDisplayAdd">点击获取</text>
			<text class="content" v-else>{{ paramsObj.gisDisplayAdd }}</text>
			<image class="right" src="/pagesC/static/imgs/addr_2.png" mode=""></image>
		</button>
		<view class="door">
			<text class="title">门牌号：</text>
			<input v-model="paramsObj.detailAddress" class="content" type="text" value="" placeholder="例:xx号楼xx室" />
		</view>
		<view class="person">
			<text class="title">联系人：</text>
			<input v-model="paramsObj.consignee" class="content" type="text" value="" placeholder="请填写收货人姓名" />
		</view>
		<view class="phone">
			<text class="title">手机号码：</text>
			<input v-model="paramsObj.phonenum" class="content" type="number" value="" placeholder="请填写手机号码" />
		</view>
		<view class="default">
			<text class="title">成为默认地址</text>
			<evan-switch class="switch" size=15 inactive-color="#9FA0A0" active-color="#FF2F29" v-model="paramsObj.isdefault"
			 @change="changeChecked"></evan-switch>
		</view>
		<view class="wran">
			<text>提醒：</text>
			<view class="items">
				<text>每次下单时会使用该地址</text>
				<text>实际下单地址会根据您购物切换的地区进行</text>
				<text>智能判断，请在下单时确认哦！</text>
			</view>
		</view>
		<view class="btn">
			<button class="del" v-if="item" @click="delAddress">删除地址</button>
			<button class="save" @click="saveAddress">保存地址</button>
		</view>

	</view>
</template>

<script>
	import EvanSwitch from '@/pagesC/components/evan-switch.vue'
	import store from '@/store'
	import {
		getLocatio_LBS,
		isTel
	} from '@/utils'
	import UserApi from '@/servies/UserApi.js'
	export default {
		data() {
			return {
				state: store.state,
				paramsObj: {
					isdefault: false,
					detailAddress: '',
					consignee: '',
					phonenum: '',
					gisAddress: '',
					gisDisplayAdd: '',
					buy: false //是否是从确认订单过来
				},
				item: null
			};
		},
		components: {
			EvanSwitch
		},
		methods: {
			delAddress() { //删除收货地址
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否要删除该收货地址?',
					success(res) {
						if (res.confirm) {
							UserApi.deleteDeliveryAddress({
								oid: _this.item.oid
							}, res => {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
								if (res.status == 1) {
									_this.timer = setTimeout(() => {
										uni.redirectTo({
											url: '/pagesC/pages/addaddress/addaddress'
										})
									}, 1500)
								}
							})
						} else if (res.cancel) {
							//点击取消
						}
					}
				});

			},
			saveAddress() { //新增、修改收货地址
				let _this = this
				if (this.item) {
					this.paramsObj.oid = this.item.oid
				}
				console.log(this.paramsObj)
				// 非空验证
				if (!this.paramsObj.detailAddress || !this.paramsObj.consignee || !this.paramsObj.phonenum ||
					!this.paramsObj.gisAddress || !this.paramsObj.gisDisplayAdd) {
					return uni.showToast({
						title: '信息不全',
						icon: "none"
					})
				}

				//手机号验证
				if (!isTel(this.paramsObj.phonenum)) {
					return uni.showToast({
						title: '手机号错误',
						icon: 'none'
					})
				}

				//新增
				UserApi.saveDeliveryAddress(this.paramsObj, res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					if (res.status == 1) {
						if (_this.buy == true) { //确认订单页面过来
							console.log( _this.buy )
							_this.timer = setTimeout(() => {
								uni.redirectTo({
									url: '/pagesC/pages/chooseaddress/chooseaddress'
								})
							}, 1500)
						} else if( _this.buy == false ) {
							console.log( _this.buy )
							_this.timer = setTimeout(() => {
								uni.redirectTo({
									url: '/pagesC/pages/addaddress/addaddress'
								})
							}, 1500)
						}

					}
				})

			},
			changeChecked(e) {
				this.paramsObj.isdefault = e
			},
			getLocation() { //获取定位
				let _this = this
				uni.chooseLocation({
					success(res) {
						_this.paramsObj.gisAddress = res.longitude.toFixed(6) + ',' + res.latitude.toFixed(6)
						_this.paramsObj.gisDisplayAdd = res.address
					}
				})
			},
			goSetting(res) {
				const _this = this;
				// 获取定位权限
				console.log(res)
				if (res.mp.detail.authSetting["scope.userLocation"]) {
					store.commit("setPassAddr", true)
					getLocatio_LBS(res => {
						_this.paramsObj.gisAddress = res.longitude.toFixed(6) + ',' + res.latitude.toFixed(6)
						_this.paramsObj.gisDisplayAdd = res.address
					});
				}
			}
		},
		onLoad(options) {
			this.item = options.item ? JSON.parse(options.item) : null
			this.buy = options.buy ? true : false
			console.log( 'options',options,'buy',this.buy )
			// console.log(this.item)
			if (this.item) {
				this.paramsObj.isdefault = this.item.isdefault
				this.paramsObj.detailAddress = this.item.detailAddress
				this.paramsObj.consignee = this.item.consignee
				this.paramsObj.phonenum = this.item.phonenum
				this.paramsObj.gisAddress = this.item.gisAddress
				this.paramsObj.gisDisplayAdd = this.item.gisDisplayAdd
			}
		},
		onHide() {
			clearTimeout(this.timer)
		}
	}
</script>

<style lang="scss">
	.shipping-address {
		box-sizing: border-box;
		padding: 0 24rpx;

		.address {
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 0;
			border: none;
			border-bottom: 1rpx solid #eee;
			background-color: #fff;
			line-height: 80rpx;

			&:after {
				content: "";
				border: 0;
			}

			.title {
				width: 160rpx;
				font-size: 30rpx;
				letter-spacing: 1rpx;
			}

			.content {
				width: 440rpx;
				font-size: 30rpx;
				text-align: start;
				color: #b3b3b3;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.right {
				width: 28rpx;
				height: 36rpx;
			}
		}

		.door,
		.person {
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #eee;
			padding: 0 20rpx;

			.title {

				letter-spacing: 10rpx;
				width: 160rpx;
				font-size: 30rpx;
			}

			.content {
				flex: 1;
				line-height: 80rpx;
				font-size: 30rpx;
				text-align: start;
				height: 80rpx;
			}
		}

		.phone {
			line-height: 80rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1rpx solid #eee;
			padding: 0 20rpx;

			.title {

				letter-spacing: 1rpx;
				width: 160rpx;
				font-size: 30rpx;
			}

			.content {
				flex: 1;
				line-height: 80rpx;
				font-size: 30rpx;
				text-align: start;
				height: 80rpx;
			}
		}

		.default {
			margin-top: 60rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;

			.title {
				font-size: 30rpx;
				line-height: 80rpx;
			}
		}

		.wran {
			display: flex;
			padding: 0 20rpx;
			margin-bottom: 355rpx;

			text {
				font-size: 25rpx;
				line-height: 48rpx;
				letter-spacing: 3rpx;
				color: #ff2f29;
			}

			.items {
				display: flex;
				flex-direction: column;
			}
		}

		.btn {
			display: flex;
			padding: 0 20rpx;
			box-sizing: border-box;
			justify-content: space-around;
			align-items: center;

			.del {
				width: 250rpx;
				height: 60rpx;
				background-color: #bbb;
				font-size: 30rpx;
				font-weight: bold;
				letter-spacing: 3rpx;
				color: #ffffff;
				line-height: 60rpx;
			}

			.save {
				width: 250rpx;
				height: 60rpx;
				background-color: #ff2f29;
				font-size: 30rpx;
				font-weight: bold;
				letter-spacing: 3rpx;
				color: #ffffff;
				line-height: 60rpx;
			}
		}

	}
</style>
