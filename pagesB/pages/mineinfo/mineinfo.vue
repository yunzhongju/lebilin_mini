<template>
	<view class="mine-info-box">
		<view class="top-avatar">
			<image class="avatar" :src="state.userInfo.headerUrl" mode=""></image>
			<view class="nick-name">
				<text>{{state.userInfo.nickName}}</text>
				<text>ID：{{state.userInfo.personCode}}</text>
			</view>
		</view>

		<view class="form-item-box" @click="pageToMyAddress">
			<text class="title">收货地址管理</text>
			<input name="address" v-model="addrChoose" :disabled="true" class="content" type="text" />
			<image src="/pagesB/static/imgs/arrow.png" style="width: 20rpx;height: 26rpx;padding-right: 36rpx;padding-left: 20rpx;"
			 mode=""></image>
		</view>

		<view class="form-item-box">
			<text class="title">姓名:</text>
			<input name="address" @blur="modifyName" v-model="state.userInfo.personName" class="content" type="text" placeholder="请输入真实姓名" />
		</view>
		<view class="form-item-box">
			<text class="title">手机号码:</text>
			<input name="address" v-model="state.userInfo.mobile" class="content" type="number" disabled="true" />
			<button class="get-phone" type="default" open-type="getPhoneNumber" @getphonenumber="getPhone" v-if="!state.userInfo.mobile">获取本机号码</button>
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import UserApi from '@/servies/UserApi.js'
	export default {
		data() {
			return {
				state: store.state,
				addrChoose: '',
				trueName: ''
			};
		},
		methods: {
			modifyName() { //修改姓名
				UserApi.modifyUserInfo({
					personName: this.state.userInfo.personName
				}, res => {

				})
			},
			pageToMyAddress() {
				uni.navigateTo({
					url: '/pagesC/pages/addaddress/addaddress'
				})
			},

			getPhone(e) {
				console.log(e.mp.detail)
				UserApi.getPhoneNumber({
					encryptedData: e.mp.detail.encryptedData,
					iv: e.mp.detail.iv
				}, res => {
					console.log(res)
				})
			},

		}


	}
</script>

<style lang="scss">
	.mine-info-box {
		border-top: 2rpx solid #ddd;
		box-sizing: border-box;
		padding: 0 20rpx;

		.top-avatar {
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #eee;
			padding: 30rpx 0;

			.avatar {
				width: 90rpx;
				height: 90rpx;
				border-radius: 50%;
				margin-right: 30rpx;
			}

			.nick-name {
				display: flex;
				flex-direction: column;

				text {
					font-size: 26rpx;
					line-height: 40rpx;
				}
			}
		}

		.form-item-box {
			display: flex;
			align-items: center;
			border-bottom: 2rpx solid #eee;
			box-sizing: border-box;

			.get-phone {
				font-size: 20rpx;
				background-color: #FFFFFF;
			}

			.title {
				width: 208rpx;
				font-size: 26rpx;
				line-height: 80rpx;
			}

			.content {
				flex: 1;
				font-size: 26rpx;
				height: 80rpx;
				line-height: 80rpx;

			}

		}

		.login-out {
			margin-top: 100rpx;

			.btn-out {
				background-color: #fff;
				font-size: 24rpx;
				width: 160rpx;
			}
		}
	}
</style>
