<template>
	<view class="store-manager">
		<!-- 审核状态 -->
		<view class="audit-status">
			<text class="title">欢迎您的入驻</text>
		</view>
		<form @submit="sbmitFun">

			<!-- 姓名 -->
			<view class="box">
				<text class="title">姓&emsp;&emsp;名：</text>
				<input :disabled="isSign != -1" class="content" type="text" v-model="headmanName" name="headmanName" placeholder="请填写您的姓名" />
			</view>

			<!-- 定位 -->
			<button class="box open-type-btn" v-if="state.isPassAddr && isSign == -1" @click="getLocation">
				<text class="title">定&emsp;&emsp;位：</text>
				<input disabled class="content" type="text" v-model="gisDisplayAdd" name="gisDisplayAdd" placeholder="请选择地区" />
			</button>
			
			<button class="box open-type-btn" v-if="!state.isPassAddr && isSign == -1" open-type="openSetting" @opensetting="goSetting">
				<text class="title">定&emsp;&emsp;位：</text>
				<input disabled class="content" type="text" v-model="gisDisplayAdd" name="gisDisplayAdd" placeholder="请选择地区" />
			</button>
			
			<button class="box open-type-btn"  v-if="isSign != -1">
				<text class="title">定&emsp;&emsp;位：</text>
				<input disabled class="content" type="text" v-model="gisDisplayAdd" name="gisDisplayAdd" placeholder="请选择地区" />
			</button>

			<!-- 小区名称 -->
			<view class="box">
				<text class="title">小区名称：</text>
				<input :disabled="isSign != -1" class="content" type="text" v-model="apartmentAddress" name="apartmentAddress" placeholder="请填写小区名称" />
			</view>

			<!-- 详细地址 -->
			<view class="box">
				<text class="title">详细地址：</text>
				<input :disabled="isSign != -1" class="content" type="text" v-model="detailAddress" name="detailAddress" placeholder="请填写详细地址(精确到门牌号)" />
			</view>

			<!-- 联系方式 -->
			<view class="box">
				<text class="title">联系方式：</text>
				<input :disabled="isSign != -1" class="content" type="number" v-model="phonenum" name="phonenum" placeholder="请填写您的电话号码" />
			</view>
			<text style="font-size: 24rpx;color: #FF2F29;line-height: 40rpx;" v-if="isSign == 2">审核失败:{{ failureCase }}</text>

			<!-- 供应商协议 -->
			<view class="supplier-protocol" v-if="isSign == -1">
				<image @click="changeChoose" v-if="!sure" class="choose" src="/pagesC/static/imgs/choose_no.png" mode=""></image>
				<image @click="changeChoose" v-else class="choose" src="/pagesC/static/imgs/choose_now.png" mode=""></image>
				<text class="title" @click="showModal">同意社区供应商协议</text>
			</view>
			<button class="submit-btn" form-type="submit" v-if="isSign == -1">确认入驻</button>
			<button class="submit-btn" v-if="isSign == 0" style="margin-top: 100rpx;">审核中</button>
			<button class="submit-btn" v-if="isSign == 1" style="margin-top: 100rpx;">审核通过</button>
			<button class="submit-btn" v-if="isSign == 2" @click="changeIsSign" style="margin-top: 100rpx;">重新申请</button>
		</form>

		<!-- 社区供应商协议内容 -->
		<neil-modal :show-cancel="false" @close="closeModal" :show="show" title="社区供应商协议">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view>1、积分获取。通过参加积极参加平台组织的活动、发布转评文章、签到等方式获取积分。</view>
				<view>2、礼品兑换。在积分商城用积分购买商品，并抵扣积分账户的相应分值。</view>
				<view>3、商品领取。根据订单说明中获取收货信息。</view>
			</view>
		</neil-modal>
	</view>
</template>

<script>
	import NeilModal from '@/pagesC/components/neil-modal.vue'
	import {
		getLocatio_LBS,
		isTel
	} from '@/utils'
	import UserApi from '@/servies/UserApi.js'
	import store from '@/store'
	export default {
		components: {
			NeilModal
		},
		data() {
			return {
				state: store.state,
				sure: false, //同意供应商协议
				show: false, //显示供应商协议
				headmanName:'', //姓名
				apartmentAddress:'', //小区名称
				gisDisplayAdd: "", //定位地址
				detailAddress:'', //详细地址
				phonenum:'', //手机号码
				lat: "", //纬度
				lng: "", //经度
				HeadmanInfoObj:null ,// 店长信息
				isSign:-1, //审核状态 -1没有申请
				failureCase:'', //审核失败原因
			};
		},
		methods: {
			sbmitFun(e) {
				let paramsObj = e.detail.value
				paramsObj.communityId = this.state.communityId
				if(this.lat && this.lng && this.gisDisplayAdd){
					paramsObj.addressgis = this.lng.toFixed(6) + ',' + this.lat.toFixed(6)	
				}
				console.log(paramsObj)
				
				if( !this.sure ){
					return uni.showToast({
						title:'请先同意社区供应商协议',
						icon:'none'
					})
				}
				
				if( !paramsObj.headmanName || !paramsObj.phonenum || !paramsObj.detailAddress || !paramsObj.gisDisplayAdd || !paramsObj.apartmentAddress || !paramsObj.addressgis){
					return uni.showToast({
						title:'信息不全',
						icon:'none'
					})
				}
				
				if( !isTel(paramsObj.phonenum) ){
					return uni.showToast({
						title:'手机号错误',
						icon:'none'
					})
				}
				
				UserApi.applyForHeadman( paramsObj, res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					
					this.timer = setTimeout(() => {
						this.getHeadmanInfo()
					},1000)
					
				} )
			},
			goSetting(res) {
				const _this = this;
				// 获取定位权限
				if (res.mp.detail.authSetting["scope.userLocation"]) {
					store.commit("setPassAddr",true)
					getLocatio_LBS(flag => {
						_this.gisDisplayAdd = flag.address
						_this.lat = flag.latitude
						_this.lng = flag.longitude
					});
				}
			},
			getLocation() { //获取定位
				const _this = this
				uni.chooseLocation({
					success(res) {
						console.log(res)
						store.commit('setLanLng', {
							latitude: res.latitude,
							longitude: res.longitude
						})
						store.commit('setAddress', res.address);
						_this.gisDisplayAdd = res.address
						_this.lat = res.latitude
						_this.lng = res.longitude
					}
				})
			},
			changeChoose() { //是否同意协议
				this.sure = !this.sure
			},
			showModal() {
				this.show = true
			},
			closeModal() {
				this.show = false
			},
			getHeadmanInfo(){ //获取店长信息
				UserApi.getHeadmanInfo(res => {
					if( !res ){ //没有申请
						this.isSign = -1
					}else{ 
						this.isSign = res.approveres
						this.headmanName = res.headmanName
						this.apartmentAddress = res.apartmentAddress
						this.detailAddress = res.detailAddress
						this.phonenum = res.phonenum
						this.failureCase = res.failureCase
						this.gisDisplayAdd = res.gisDisplayAdd
					}
				})
			},
			changeIsSign(){
				this.isSign = -1
			}
			
		},
		onLoad(options) {
			this.getHeadmanInfo()
		},
		onHide() {
			if( this.timer ) clearTimeout(this.timer)
		}
	}
</script>

<style lang="scss">
	.store-manager {
		box-sizing: border-box;
		padding: 0 42rpx;
		padding-top: 126rpx;
		position: relative;
		//审核状态
		.audit-status {
			height: 126rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #E62329;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			.title {
				font-size: 30rpx;
				letter-spacing: 3rpx;
				color: #ffffff;
			}
		}
		
		.box {
			&.open-type-btn {
				padding: 0;
				width: 100%;
				border: 0;
				background-color: #fff;
				text-align: start;

				&:after {
					content: "";
					border: none;
				}
			}

			display: flex;
			align-items: center;
			justify-content: space-between;

			.title {
				font-size: 30rpx;
				letter-spacing: 3rpx;
				line-height: 100rpx;
			}

			.content {
				width: 482rpx;
				height: 55rpx;
				background-color: #efefef;
				font-size: 30rpx;
				line-height: 55rpx;
				border-radius: 10rpx;
				padding-left: 24rpx;
			}
		}

		.supplier-protocol {
			margin-top: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.choose {
				width: 25rpx;
				height: 25rpx;
				margin-right: 12rpx;
			}

			.title {

				font-size: 25rpx;
				line-height: 80rpx;
				letter-spacing: 3rpx;
			}
		}

		.submit-btn {
			width: 450rpx;
			height: 60rpx;
			background-color: #ff2f29;
			line-height: 60rpx;
			color: #fff;
			text-align: center;
			letter-spacing: 3rpx;
			font-size: 30rpx;
			font-weight: bold;

			&:after {
				content: "";
				border: none;
			}
		}
	}
</style>
