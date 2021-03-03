<template>
	<view class="add-personal">

		<!-- tab-title -->
		<view class="tab-title">
			<view class="item" v-for="(item,index) in tabArr" :key="index" @click="changeIndex(index)">
				<text class="title">{{ item }}</text>
				<text class="bottom-line" v-if="tabIndex == index"></text>
			</view>
		</view>
		<!-- tab-content -->
		<view class="content-box">
			<!-- 可选 -->
			<view class="allow" v-if="tabIndex == 0">
				<!-- 搜索栏 -->
				<view class="search-box">
					<input type="number" :focus="isFocus" value="" v-model="searchContent" placeholder="请输入完整电话号码" />
					<text @click="searchUndeposit">搜索</text>
					<image class="search-icon" src="/pagesC/static/imgs/search_icon.png" mode=""></image>
					<image class="close-icon" src="/pagesC/static/imgs/close.png" mode="" v-if="searchContent" @click="clearContent"></image>
				</view>
				<view style="color: #C0C0C0;font-size: 26rpx;line-height: 60rpx;text-align: center;" v-if="notDeposit == null">
					请搜索可选核销人员
				</view>
				<view class="item" v-if="notDeposit != null">
					<image class="left" :src="notDeposit.headerUrl" mode=""></image>
					<view class="middle">
						<text>{{ notDeposit.personName }}</text>
						<text>ID：{{ notDeposit.personCode }}</text>
					</view>
					<view class="right" @click="saveDeposit(notDeposit.personOpenid)">
						添加
					</view>
				</view>
			</view>
			<!-- 已选 -->
			<view class="allow" v-if="tabIndex == 1">
				<view style="color: #C0C0C0;font-size: 26rpx;line-height: 60rpx;text-align: center;" v-if="!DepositArr.length">
					暂时没有核销人员，快去添加吧~
				</view>
				<view class="item" v-for="(item,index) in DepositArr" :key="index">
					<image class="left" :src="item.headerUrl" mode=""></image>
					<view class="middle">
						<text>{{ item.personName }}</text>
						<text>ID：{{ item.personCode }}</text>
					</view>
					<view class="right already" @click="showModel(item.personOpenid,index)">
						删除
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import DepositApi from '@/servies/DepositApi.js'
	import {
		isTel
	} from '@/utils'
	export default {
		data() {
			return {
				searchContent: '',
				tabArr: ['可选人员', '本店人员'],
				tabIndex: 0,
				isFocus: false,
				notDeposit: null, //非核销人员
				storeId: '',
				DepositArr: [], //核销人员列表
			};
		},
		methods: {
			showModel(depositId, index) { //删除核销人员
				let _this = this
				uni.showModal({
					title: '提示',
					content: '是否要删除该核销人员',
					success(res) {
						if (res.confirm) { //点击确定
							DepositApi.deleteDeposit({
								depositId
							}, res => {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
								if (res.status == 1) {
									_this.DepositArr.splice(index, 1)
								}
							})
						}
					}
				})
			},
			getStoreDeposit() { //获取店铺核销人员
				DepositApi.getStoreDeposit({
					storeId: this.storeId
				}, res => {
					console.log('核销人员列表', res)
					this.DepositArr = res
				})
			},
			saveDeposit(personOpenid) { //添加核销人员
				DepositApi.saveDeposit({
					storeId: this.storeId,
					personOpenid
				}, res => {
					if (res.status == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
						this.notDeposit = null
					}
				})
			},
			searchUndeposit() { //搜索非核销人员
				if (this.searchContent.trim() == '') {
					return uni.showToast({
						title: '输入内容不能为空',
						icon: 'none'
					})
				}
				if (!isTel(this.searchContent.trim())) {
					return uni.showToast({
						title: '手机号格式错误',
						icon: 'none'
					})
				}
				DepositApi.searchUndeposit({
					phonenum: this.searchContent.trim()
				}, res => {
					this.notDeposit = res
				})
			},
			clearContent() {
				this.searchContent = ''
				this.isFocus = true
			},
			changeIndex(index) {
				if (this.tabIndex != index) {
					this.tabIndex = index
					if (this.tabIndex == 1) {
						this.getStoreDeposit()
					}
				}
			}
		},
		onLoad(options) {
			this.storeId = options.storeId || ''
		},
		onHide() {
			this.tabIndex = 0
		}
	}
</script>

<style lang="scss">
	.add-personal {

		/* 顶部搜索 */
		.search-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 20rpx 0;
			position: relative;
			padding: 0 28rpx;
			box-sizing: border-box;

			input {
				width: 613rpx;
				height: 55rpx;
				background-color: #efefef;
				border-radius: 22rpx;
				font-size: 25rpx;
				line-height: 55rpx;
				padding-left: 56rpx;
				box-sizing: border-box;
			}

			text {
				font-size: 30rpx;
				letter-spacing: 3rpx;
				color: #272636;
			}

			.search-icon {
				position: absolute;
				width: 34rpx;
				height: 34rpx;
				left: 36rpx;
				top: 11rpx;
			}

			.close-icon {
				position: absolute;
				width: 34rpx;
				height: 34rpx;
				right: 122rpx;
				top: 11rpx;
				z-index: 99;
			}
		}

		/* tab-title */
		.tab-title {
			display: flex;
			justify-content: center;
			padding: 30rpx 28rpx;
			box-sizing: border-box;

			border-bottom: 1rpx solid #eee;

			.item {
				position: relative;
				width: 190rpx;

				.title {
					display: inline-block;
					font-size: 30rpx;
					width: 100%;
					text-align: center;
				}

				.bottom-line {
					position: absolute;
					bottom: -10rpx;
					left: 25%;
					width: 50%;
					height: 4rpx;
					background-color: #FF2F29;
				}
			}

		}

		/* tab-content */
		.content-box {

			.allow {
				.item {
					padding: 22rpx 28rpx;
					box-sizing: border-box;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #eee;

					.left {
						width: 118rpx;
						height: 118rpx;
						border-radius: 50%;
						margin-right: 48rpx;
					}

					.middle {
						flex: 1;
						display: flex;
						flex-direction: column;
						font-size: 35rpx;
					}

					.right {
						width: 110rpx;
						height: 48rpx;
						background-color: #ff2f29;
						border-radius: 10rpx;
						letter-spacing: 2rpx;
						color: #ffffff;
						font-size: 20rpx;
						text-align: center;
						line-height: 48rpx;
					}

					.already {
						background-color: #aaa;
					}
				}

			}
		}
	}
</style>
