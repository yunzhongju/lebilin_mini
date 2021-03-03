<template>
	<view class="add-store">
		<view class="form-box">
			<!-- 店铺名称 -->
			<view class="name">
				<view>
					<text class="essential">*</text>
					<text class="title">店铺名称：</text>
				</view>
				<input :disabled="isSign != -1" v-model="formObj.storeName" class="content input" type="text" placeholder="请输入店铺名称" />
			</view>
			
			<!-- 定位 -->
			<view class="name">
				<view>
					<text class="essential">*</text>
					<text class="title">定&emsp;&emsp;位：</text>
				</view>
				<button class="get-location" type="default" v-if="state.isPassAddr && isSign == -1" @click="getLocation">
					<input disabled type="text" style="padding-right: 56rpx;" v-model="formObj.gisDisplayAdd" placeholder="点击定位" />
					<image class="location-icon" src="/pagesC/static/imgs/location.png" mode=""></image>
				</button>
				<button class="get-location" type="default" v-if="!state.isPassAddr && isSign == -1" @click="getLocation">
					<input disabled type="text" style="padding-right: 56rpx;"  v-model="formObj.gisDisplayAdd" placeholder="点击定位" />
					<image class="location-icon" src="/pagesC/static/imgs/location.png" mode=""></image>
				</button>
				<button class="get-location" type="default" v-if="isSign != -1">
					<input disabled type="text" style="padding-right: 56rpx;"  v-model="formObj.gisDisplayAdd" placeholder="点击定位" />
					<image class="location-icon" src="/pagesC/static/imgs/location.png" mode=""></image>
				</button>
			</view>
			
			<!-- 小区名称 -->
			<view class="name">
				<view>
					<text class="essential">*</text>
					<text class="title">小区名称：</text>
				</view>
				<input :disabled="isSign != -1" class="content input" type="text" v-model="formObj.apartmentAddress" placeholder="请输入小区名称" />
			</view>
			
			<!-- 详细地址 -->
			<view class="name">
				<view>
					<text class="essential">*</text>
					<text class="title">详细地址：</text>
				</view>
				<input :disabled="isSign != -1" class="content input" v-model="formObj.detailAddress" type="text" placeholder="精确到门牌号" />
			</view>
			
			<!-- 联系方式 -->
			<view class="name">
				<view>
					<text class="essential">*</text>
					<text class="title">联系方式：</text>
				</view>
				<input :disabled="isSign != -1" class="content input" type="number" v-model="formObj.phonenum" placeholder="请输入电话号码" />
			</view>
			
			<!-- 配送距离 -->
			<view class="short">
				<view>
					<text class="essential">*</text>
					<text class="title">配送距离：</text>
				</view>
				<input :disabled="isSign != -1" class="content input" style="width: 157rpx;" type="number" v-model="formObj.distributionRange" placeholder="km" />
			</view>
			
			<!-- 配送费用 -->
			<view class="short">
				<view>
					<text class="essential">*</text>
					<text class="title">配送费用：</text>
				</view>
				<input :disabled="isSign != -1" class="content input" style="width: 157rpx;" type="number" v-model="formObj.distributionFee" placeholder="元" />
			</view>
			
			<!-- 商品类别 -->
			<view class="business-license">
				<view>
					<text class="essential">*</text>
					<text class="title">商品类别：</text>
				</view>
				<view class="choose-type" v-if="isSign == -1">
					<view @click="changeChoose(index)" class="item" v-for="(item,index) in typeArr" :key="index">
						<image class="is-choose" v-if="!item.check" src="/pagesC/static/imgs/choose_no.png" mode=""></image>
						<image class="is-choose" v-else src="/pagesC/static/imgs/choose_now.png" mode=""></image>
						<text class="title">{{ item.classifyName }}</text>
					</view>
				</view>
				
				<view class="choose-type" v-else>
					<view class="item" v-for="(item,index) in classify" :key="index">
						<text class="title">{{ item }}</text>
					</view>	
				</view>
			</view>
			
			<!-- 审核未通过原因 -->
			<view class="not-pass-result" v-if="isSign == 2 && failureCase">
				审核未通过：{{failureCase}}
			</view>
		</view>
		
		<!-- 提交按钮 -->
		<view class="sub-btn" @click="submitFun" v-if="isSign == -1">
			确认增加
		</view>
		<!-- 审核中 -->
		<view class="sub-btn" v-if="isSign == 0">
			审核中
		</view>
		<!-- 审核未通过 -->
		<view class="sub-btn" v-if="isSign == 2" @click="changeIsSign">
			重新编辑
		</view>
	</view>
</template>

<script>
	import store from '@/store'
	import {
		getLocatio_LBS,
		isTel
	} from '@/utils'
	import StoreApi from '@/servies/StoreApi.js'
	export default {
		data() {
			return {
				state:store.state,
				classify:[],
				failureCase:'',
				formObj:{
					storeName:'',
					gisDisplayAdd:'',
					addressgis:'',
					apartmentAddress:'',
					detailAddress:'',
					phonenum:'',
					distributionRange:'',
					distributionFee:'',
					goodsClassify:''
				},
				typeArr: [],
				isSign:-1
			};
		},
		methods:{
			submitFun(){
				let _this = this
				this.formObj.communityId = this.state.communityId
				this.formObj.goodsClassify = this.typeArr.filter(item => item.check).map(item => item.classifyId).join(';')
				// 非空验证
				if(!this.formObj.storeName || !this.formObj.gisDisplayAdd || !this.formObj.addressgis || !this.formObj.apartmentAddress || 
				!this.formObj.phonenum || !this.formObj.distributionRange || !this.formObj.distributionFee || 
				!this.formObj.goodsClassify){
					return uni.showToast({
						title:'信息不全',
						icon:'none'
					})
				}
				
				console.log( this.formObj )
				
				if( !isTel(this.formObj.phonenum) ){
					return uni.showToast({
						title:'手机号码错误',
						icon:'none'
					})
				}
				
				StoreApi.applyForStore(this.formObj, res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					this.timer = setTimeout(() => {
						_this.getMyStoreDetail()
					},1500)
				})
			},
			getMyStoreDetail(){ //获取店长未通过店铺详情
				StoreApi.getMyStoreDetail(res => {
					if( !res ){
						this.isSign = -1
					}else{
						console.log( res )
						this.isSign = res.approveres
						this.formObj.storeName = res.storeName
						this.formObj.gisDisplayAdd = res.gisDisplayAdd
						this.formObj.apartmentAddress = res.apartmentAddress
						this.formObj.detailAddress = res.detailAddress
						this.formObj.phonenum = res.phonenum
						this.formObj.distributionFee = res.distributionFee
						this.formObj.distributionRange = res.distributionRange
						this.formObj.addressgis = res.addressgis
						this.failureCase = res.failureCase
						this.formObj.storeId = res.storeId
						this.classify = res.classify.split(',')
					}
				})
			},
			getGoodsClassify(){ //获取商品类别
				StoreApi.getGoodsClassify({},res => {
					this.typeArr = res.map(item => {
						item.check = false
						return item
					})
					// store.commit('setGoodsType',res)
					// console.log( this.typeArr )
				})
			},
			goSetting(res) {
				const _this = this;
				// 获取定位权限
				if (res.mp.detail.authSetting["scope.userLocation"]) {
					store.commit("setPassAddr",true)
					getLocatio_LBS(flag => {
						_this.formObj.gisDisplayAdd = flag.address
						_this.formObj.addressgis = flag.longitude.toFixed(6) + ',' + flag.latitude.toFixed(6)
					});
				}
			},
			getLocation() { //获取定位
				const _this = this
				uni.chooseLocation({
					success(res) {
						console.log(res)
						_this.formObj.gisDisplayAdd = res.address
						_this.formObj.addressgis = res.longitude.toFixed(6) + ',' + res.latitude.toFixed(6)
					}
				})
			},
			changeChoose(index) {
				this.typeArr[index].check = !this.typeArr[index].check
			},
			changeIsSign(){
				this.isSign = -1
				this.typeArr.forEach((item,index,it) => {
					this.classify.forEach( items => {
						if ( item.classifyName == items ){
							it[index].check = true
						}
					} )
				})
			}
		},
		onLoad() {
			this.getGoodsClassify()
			this.getMyStoreDetail()
		},
		onHide() {
			clearTimeout(this.timer)
		}
	}
</script>

<style lang="scss">
	.add-store{
		//表单
		.form-box {
			box-sizing: border-box;
			padding: 0 42rpx;
			
			.not-pass-result{
				font-size: 26rpx;
				color: #FF2F29;
				line-height: 50rpx;
			}
		
			.short{
				display: flex;
				align-items: center;
				.title {
					font-size: 30rpx;
					line-height: 80rpx;
				}
				.essential {
					color: #FF2F29;
					display: inline-block;
					height: 30rpx;
					box-sizing: border-box;
					padding-top: 4rpx;
				}
				.content {
					width: 157rpx;
					height: 55rpx;
					background-color: #efefef;
					line-height: 55rpx;
					font-size: 30rpx;
					border-radius: 10rpx;
					box-sizing: border-box;
						
					&.input {
						padding-left: 24rpx;
					}
				}
			}
		
			.name {
				display: flex;
				align-items: center;
				justify-content: space-between;
		
				.get-location {
					position: relative;
					width: 500rpx;
					height: 55rpx;
					border-radius: 10rpx;
					box-sizing: border-box;
					padding: 0;
					border: none;
					text-align: start;
		
					&:after {
						content: "";
						border: none;
					}
		
					&>input {
						padding-left: 24rpx;
						height: 55rpx;
						line-height: 55rpx;
						font-size: 30rpx;
						border-radius: 10rpx;
						background-color: #efefef;
					}
		
					.location-icon {
						position: absolute;
						width: 25rpx;
						height: 31rpx;
						right: 16rpx;
						bottom: 10rpx;
					}
				}
		
				.essential {
					color: #FF2F29;
					display: inline-block;
					height: 30rpx;
					box-sizing: border-box;
					padding-top: 4rpx;
				}
		
				.title {
					font-size: 30rpx;
					line-height: 80rpx;
				}
		
				.content {
					width: 500rpx;
					height: 55rpx;
					background-color: #efefef;
					line-height: 55rpx;
					font-size: 30rpx;
					border-radius: 10rpx;
					box-sizing: border-box;
		
					&.input {
						padding-left: 24rpx;
					}
				}
			}
		
			.business-license {

				display: flex;
				flex-direction: column;
		
				.choose-type {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					box-sizing: border-box;
					padding: 0 20rpx;
					.item {
						width: 195rpx;
						// margin-bottom: 20rpx;
						display: flex;
						align-items: center;
						// justify-content: center;
		
						.is-choose {
							width: 25rpx;
							height: 25rpx;
							margin-right: 8rpx;
						}
		
						.title {
							letter-spacing: 3rpx;
							font-size: 30rpx;
							color: #2a2a2a;
						}
					}
				}
		
				.title {
					font-size: 30rpx;
					line-height: 80rpx;
				}
				.essential {
					color: #FF2F29;
					display: inline-block;
					height: 30rpx;
					box-sizing: border-box;
					padding-top: 4rpx;
				}
				
			}
		
		
		}
		
		//确认按钮
		.sub-btn{
			width: 450rpx;
			background-color: #ff2f29;
			color: #fff;
			line-height: 60rpx;
			text-align: center;
			letter-spacing: 3rpx;
			font-size: 30rpx;
			margin: 100rpx auto 20rpx;
			border-radius: 20rpx;
		}
	}
</style>
