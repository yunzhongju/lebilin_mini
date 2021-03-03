<template>
	<view class="choose-store">
		<!-- 顶部定位 -->
		<view class="location-box">
			<view class="left-msg">
				<view class="top-title">
					<image class="now-icon" src="/pagesC/static/imgs/addr_1.png" mode=""></image>
					<text class="now-address">当前位置</text>
				</view>
				<view class="content-box">
					<text class="address-detail" v-if="state.isPassAddr">{{state.address || '请选择地址'}}</text>
					<button class="addr" v-else open-type="openSetting" @opensetting="goSetting">
						点击开启定位
					</button>
				</view>
			</view>
			<view class="right-btn">
				<view class="choose-address" v-if="state.isPassAddr" @click="selectFun">
					选择地址
				</view>
				<button class="choose-address choose-btn" v-else open-type="openSetting" @opensetting="goSetting">
					选择地址
				</button>
			</view>
		</view>

		<!-- 搜索栏 -->
		<view class="search-box">
			<text class="neerbay">附近店铺</text>
			<input class="search" type="text" placeholder="请输入店名或地址" v-model="neerStore" />
			<text class="search-btn" @click="getStore">搜索</text>
		</view>

		<!-- 店铺列表 -->
		<view class="store-list-box">
			<view style="color: #C0C0C0;font-size: 26rpx;text-align: center;line-height: 60rpx;" v-if="!storeList.length">
				暂时没有附近店铺
			</view>
			<view class="list-item" v-for="(item,index) in storeList" :key="index" @click="pageToWelfare(item.storeId)">
				<image class="left-avatar" :src="item.headerUrl" mode=""></image>
				<view class="middle-content">
					<view class="manager-box">
						<text class="manager">团长：{{ item.headmanName }}</text>
						<text class="distance">距离您：{{item.distance}}{{item.unit}}</text>
					</view>

					<text class="name">{{ item.storeName }}</text>
					<text class="add">取货地址：{{item.apartmentAddress}}{{item.detailAddress}}</text>
				</view>
				<image class="right-go" src="/static/mine_icon/arrow.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store';
	import {
		getLocatio_LBS
	} from "@/utils";
	import StoreApi from '@/servies/StoreApi.js'
	export default {
		data() {
			return {
				state: store.state,
				neerStore: '', //搜索内容
				pageNo: 1,
				allowPull: false,
				storeList: [], //店铺列表
			};
		},
		methods: {
			pageToWelfare(storeId){
				store.commit('setStoreId',storeId)
				uni.switchTab({
					url:'/pages/welfare/welfare'
				})
			},
			getStore(){ //搜索附近店铺
				if( !this.neerStore.trim() ){
					return uni.showToast({
						title:'搜索内容不能为空和空格~',
						icon:'none'
					})
				}
				this.getNearbyStores()
			},
			getNearbyStores(type = 'one') { //获取附近店铺列表
				if (this.state.lat && this.state.lng) {
					let paramsObj = {
						location: this.state.lng.toFixed(6) + ',' + this.state.lat.toFixed(6),
						pageSize: 10,
						pageNo: this.pageNo,
						communityId:this.state.communityId
					}
					if (this.neerStore) {
						paramsObj.search = this.neerStore
					}
					StoreApi.getNearbyStores(paramsObj, res => {
						console.log(res)
						if (type == 'one') { //第一页
							this.storeList = res.list
							this.allowPull = !res.lastPage
						} else { //上拉加载更多
							this.storeList = [...this.storeList, ...res.list]
							this.allowPull = !res.lastPage
						}

					})
				}else{
					return uni.showToast({
						title:'请先打开定位哦~',
						icon:'none'
					})
				}

			},
			goSetting(res) { //选择地址
				const vm = this;
				// 获取定位权限
				if (res.mp.detail.authSetting["scope.userLocation"]) {
					getLocatio_LBS(flag => {
						vm.getNearbyStores()
					});
				}
			},
			selectFun() { //选择地址
				const vm = this;

				// 切换地址
				uni.chooseLocation({
					success: function(res) {
						// 只能选择当前所在城市
						/* store.state.address = res.address;
						store.state.lat = res.latitude;
						store.state.lng = res.longitude; */
						store.commit('setAddress',res.address)
						store.commit('setLanLng',{latitude:res.latitude,longitude:res.longitude})
						uni.setStorageSync("longitude", res.longitude);
						uni.setStorageSync("latitude", res.latitude);
						vm.getNearbyStores()
					}
				});
			},
		},
		onShow(options) {
			this.getNearbyStores()
		},
		onHide() {
			this.neerStore = ''
			this.pageNo = 1
		},
		onReachBottom() { //上拉加载更多
			if( this.allowPull ){
				this.pageNo ++ 
				this.getNearbyStores('more')
			}
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getNearbyStores()
		}
	}
</script>

<style lang="scss">
	.choose-store {

		// 店铺列表
		.store-list-box {
			margin: 0 10rpx;

			.list-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1rpx solid #eee;
				padding: 10rpx;

				.left-avatar {
					width: 82rpx;
					height: 82rpx;
					border-radius: 50%;
				}

				.middle-content {
					width: 500rpx;
					display: flex;
					flex-direction: column;

					.manager-box {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.manager {
							font-size: 22rpx;
							line-height: 50rpx;
						}

						.distance {
							font-size: 22rpx;
							line-height: 50rpx;
							color: #ff2f29;
						}
					}

					.name {
						font-size: 30rpx;
						line-height: 50rpx;
					}

					.add {
						font-size: 22rpx;
						line-height: 36rpx;
						letter-spacing: 1rpx;
						color: #9fa0a0;
						text-align: justify;
					}

				}

				.right-go {
					width: 12rpx;
					height: 22rpx;
					margin-right: 10rpx;
				}
			}
		}

		// 顶部定位
		.location-box {
			height: 174rpx;
			background-color: #FF2F29;
			box-sizing: border-box;
			padding: 0 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.left-msg {
				width: 498rpx;
				display: flex;
				flex-direction: column;

				.top-title {
					display: flex;
					align-items: center;

					.now-icon {
						width: 21rpx;
						height: 27rpx;
					}

					.now-address {
						font-size: 22rpx;
						line-height: 50rpx;
						letter-spacing: 2rpx;
						color: #ffffff;
					}
				}

				.content-box {
					.address-detail {
						font-size: 29rpx;
						line-height: 50rpx;
						letter-spacing: 3rpx;
						color: #ffffff;
						display:-webkit-box;
						-webkit-line-clamp:2;
						-webkit-box-orient:vertical;
						overflow:hidden;
					}

					.addr {
						font-size: 29rpx;
						letter-spacing: 3rpx;
						color: #ffffff;
						line-height: 50rpx;
						background-color: #FF2F29;
						padding: 0;
						text-align: start;

						&:after {
							content: "";
							border: none;
						}
					}
				}
			}

			.right-btn {
				.choose-address {
					width: 123rpx;
					line-height: 45rpx;
					border-radius: 20rpx;
					border: solid 2rpx #ffffff;
					text-align: center;
					font-size: 20rpx;
					color: #fff;
				}

				.choose-btn {
					background-color: #FF2F29;
					padding: 0;

					&:after {
						border: none;
					}
				}
			}
		}

		//搜索栏
		.search-box {
			height: 90rpx;
			margin: 0 10rpx;
			padding: 0 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1rpx solid #eee;

			.neerbay {
				font-size: 20rpx;
				line-height: 50rpx;
				letter-spacing: 2rpx;
				width: 108rpx;
				text-align: end;
				position: relative;

				&:before {
					content: "";
					width: 8rpx;
					height: 30rpx;
					background-color: #ff2f29;
					position: absolute;
					left: 0;
					top: 10rpx;
					border-radius: 4rpx;
				}
			}

			.search {
				width: 475rpx;
				height: 56rpx;
				background-color: #dfdfdf;
				border-radius: 20rpx;
				padding-left: 20rpx;
				box-sizing: border-box;
			}

			.search-btn {
				width: 90rpx;
				line-height: 50rpx;
				background-color: #ff2f29;
				border-radius: 25rpx;
				font-size: 20rpx;
				letter-spacing: 2rpx;
				color: #ffffff;
				text-align: center;
			}
		}
	}
</style>
