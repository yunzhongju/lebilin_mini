<template>
	<view class="supplier-regist">

		<!-- 审核状态 -->
		<view class="audit-status" v-if="isSign != -1">
			<text class="title" v-if="isSign == 0">信息正在审核中</text>
			<text class="title" v-if="isSign == 1">恭喜老板 成功入驻社区商圈</text>
			<text class="title" v-if="isSign == 2">审核未通过</text>
		</view>

		<!-- 表单项 -->
		<view class="form-box">
			<!-- 企业名称 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">企业名称：</text>
				</view>
				<input :disabled="isSign != -1" v-model="formObj.supplierName" class="content input" type="text" placeholder="请输入企业名称" />
			</view>

			<!-- 单位性质 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">单位性质：</text>
				</view>
				<view class="content" v-if="isSign == -1">
					<xfl-select @change="setChoose" :list="list" :clearable="false" :showItemNum="5" :style_Container="'color:#9fa0a0;height: 55rpx; font-size: 30rpx;border:none;background-color: #efefef;'"
					  :initValue="list[0]['value']" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
				<view class="content" v-else>
					<xfl-select @change="setChoose" :disabled="isSign != -1" :list="list" :clearable="false" :showItemNum="5" :style_Container="'color:#9fa0a0;height: 55rpx; font-size: 30rpx;border:none;background-color: #efefef;'"
					  :initValue="supplierInfoObj.orgPropertyName" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
			</view>

			<!-- 行业性质 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">行业性质：</text>
				</view>
				<view class="content" v-if="isSign == -1">
					<xfl-select @change="setChoose2" :list="list2" :clearable="false" :showItemNum="5" :style_Container="'color:#9fa0a0;height: 55rpx; font-size: 30rpx;border:none;background-color: #efefef;'"
					:initValue="list2[0]['value']" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
				<view class="content" v-else>
					<xfl-select :disabled="'true'" @change="setChoose2" :list="list2" :clearable="false" :showItemNum="5" :style_Container="'color:#9fa0a0;height: 55rpx; font-size: 30rpx;border:none;background-color: #efefef;'"
					:initValue="supplierInfoObj.tradeTypeName" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
			</view>

			<!-- 供应商类型 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">供应商类型：</text>
				</view>
				<view class="content" v-if="isSign == -1">
					<xfl-select @change="setChoose3" :list="list3" :clearable="false" :showItemNum="5" :style_Container="'color:#9fa0a0;height: 55rpx; font-size: 30rpx;border:none;background-color: #efefef;'"
					:initValue="list3[0]['value']" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
				<view class="content" v-else>
					<xfl-select :disabled="'true'" @change="setChoose3" :list="list3" :clearable="false" :showItemNum="5" :style_Container="'color:#9fa0a0;height: 55rpx; font-size: 30rpx;border:none;background-color: #efefef;'"
					:initValue="supplierInfoObj.supplierTypeName" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
			</view>

			<!-- 获取定位 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">获取定位：</text>
				</view>
				<button class="get-location" type="default" v-if="state.isPassAddr && isSign == -1" @click="getLocation">
					<input type="text" v-model="gisDisplayAdd" disabled placeholder="点击获取定位" />
					<image class="location-icon" v-if="!gisDisplayAdd" src="/pagesC/static/imgs/location.png" mode=""></image>
				</button>
				<button class="get-location" type="default"  v-if="!state.isPassAddr && isSign == -1" open-type="openSetting" @opensetting="goSetting">
					<input type="text" v-model="gisDisplayAdd" disabled placeholder="点击获取定位" />
					<image class="location-icon" v-if="!gisDisplayAdd" src="/pagesC/static/imgs/location.png" mode=""></image>
				</button>
				<button class="get-location" type="default"  v-if="isSign != -1">
					<input type="text" v-model="gisDisplayAdd" disabled placeholder="点击获取定位" />
					<image class="location-icon" v-if="!gisDisplayAdd" src="/pagesC/static/imgs/location.png" mode=""></image>
				</button>
			</view>

			<!-- 详细地址 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">详细地址：</text>
				</view>
				<input :disabled="isSign != -1" v-model="formObj.detailAddress" class="content input" type="text" placeholder="请输入详细地址" />
			</view>

			<!-- 配送范围 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">配送范围：</text>
				</view>
				<input :disabled="isSign != -1" v-model="formObj.supplyRange" class="content input" type="number" placeholder="请输入配送范围(km)" />
			</view>

			<!-- 负责人 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">负&nbsp;责&nbsp;人&nbsp;：</text>
				</view>
				<input :disabled="isSign != -1" v-model="formObj.orgContactor" class="content input" type="text" placeholder="请输入负责人" />
			</view>

			<!-- 联系电话 -->
			<view class="name">
				<view class="title-box">
					<text class="essential">*</text>
					<text class="title">联系电话：</text>
				</view>
				<input :disabled="isSign != -1" v-model="formObj.phonenum" class="content input" type="number" placeholder="请输入联系电话" />
			</view>

			<!-- 营业执照扫描件 -->
			<view class="business-license">
				<text class="title">营业执照扫描件：</text>
				<view class="img-box" v-if="isSign == -1">
					<avatar selWidth="350upx" selHeight="200upx" inner=true stretch="longSel" @upload="myUpload" :avatarSrc="activityPic" avatarStyle="width: 350rpx; height: 200rpx;">
					</avatar>
				</view>
				<view class="img-box" v-if="isSign != -1">
					<image :src="supplierInfoObj.licensePic" style="width: 350rpx;height: 200rpx;border-radius: 10rpx;" mode=""></image>
				</view>
			</view>

			<!-- 商品类别 -->
			<view class="business-license" v-if="isSign == -1">
				<text class="title">商品类别：</text>
				<view class="choose-type">
					<view @click="changeChoose(index)" class="item" v-for="(item,index) in typeArr" :key="index">
						<image class="is-choose" v-if="!item.check" src="/pagesC/static/imgs/choose_no.png" mode=""></image>
						<image class="is-choose" v-else src="/pagesC/static/imgs/choose_now.png" mode=""></image>
						<text class="title">{{ item.classifyName }}</text>
					</view>
				</view>
			</view>
			
			<view class="business-license" v-if="isSign != -1">
				<text class="title">商品类别：</text>
				<view class="choose-type">
					<view class="item" v-for="(item,index) in goodsClassify" :key="index">
						<text class="title">{{ item }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 审核未通过原因 -->
		<text class="pass-no" v-if="isSign == 2">审核未通过：{{ failureCase }}</text>
		
		<!-- 提交申请 -->
		<view class="apply-supplier" v-if="isSign == -1">
			<view class="agree-protocol">
				<image @click="changeRead" v-if="!read" class="choose-icon" src="/pagesC/static/imgs/choose_no.png" mode=""></image>
				<image @click="changeRead" v-else class="choose-icon" src="/pagesC/static/imgs/choose_now.png" mode=""></image>
				<text class="is-agree" @click="showModal">同意社区供应商协议内容</text>
			</view>
			<text class="sub-btn" @click="submitFun">提交</text>
		</view>
		
		<!-- 审核未通过按钮 -->
		<view class="sure-btn" v-if="isSign == 2" @click="changeIsSign">
			重新提交
		</view>
		<!-- 申请成功账号密码 -->
		<view class="apply-success" v-if="isSign == 1">
			<view class="box">
				<text>您的后台网址：http://106.12.145.154:5789</text>
				<text>您的后台账号：{{formObj.phonenum}}</text>
				<text>您的初始密码：123456</text>
			</view>
		</view>

		<!-- 社区供应商协议内容 -->
		<neil-modal :show-cancel="false" @close="closeModal" :show="show" title="社区供应商协议">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view>1、积分获取。通过参加积极参加平台组织的活动、发布转评文章、签到等方式获取积分。</view>
				<view>2、礼品兑换。在积分商城用积分购买商品，并抵扣积分账户的相应分值。</view>
				<view>3、商品领取。根据订单说明中获取收货信息。</view>
			</view>
		</neil-modal>
		
		<!-- 入驻社区商圈 -->
		<view class="settle-community" v-if="showTest">
			<view class="box">
				<text class="title">社区商圈招募公告</text>
				<text class="start">尊敬的社区企业同仁：</text>
				<text class="content">人工智能的发展给人们的生活带来了翻天覆地的变化，清洁等一些简单化、重复性的工作被机器设备逐渐取代，未来的社区服务，家政保洁、快递寄取可能不再是重要领域，人文关怀、精神服务的地位会变得越来越高，社区服务企业应重视精神文化的力量，开拓新的服务领域、服务方式。</text>
			</view>
			
			<view class="bottom-fixed">
				<text class="to" @click="closeTest">入驻社区商圈</text>
			</view>
		</view>
	</view>
</template>

<script>
	import xflSelect from '@/pagesC/components/xfl-select.vue'
	import NeilModal from '@/pagesC/components/neil-modal.vue'
	import SupplierApi from '@/servies/SupplierApi.js'
	import CommonApi from '@/servies/CommonApi.js'
	import {
		getLocatio_LBS,
		isTel,
		getBase64
	} from '@/utils'
	import store from '@/store'
	import StoreApi from '@/servies/StoreApi.js'
	import avatar from '@/pagesC/components/yq-avatar.vue'
	export default {
		components: {
			xflSelect,
			NeilModal,
			avatar
		},
		data() {
			return {
				state:store.state,
				list: [],
				list2: [],
				list3:[],
				typeArr: [],
				read: false, //是否同意供应商协议
				show: false, //显示供应商协议
				showTest:false ,//第一次进页面，显示招募公告
				isSign:-1, //申请状态   -1表示未申请
				lat: "", //经度
				lng: "", //纬度
				gisDisplayAdd: "", //定位地址
				activityPic:'', //临时图片地址
				failureCase:'', //审核未通过原因
				goodsClassify:'', // 商品类别
				supplierInfoObj:null,
				formObj:{
					supplierName:'',
					orgProperty:'',
					tradeType:'',
					addressgis: '',
					gisDisplayAdd:'',
					detailAddress:'',
					supplyRange:'',
					orgContactor:'',
					phonenum:'',
					licensePic:'',
					goodsClassify:'',
					supplierType:''
				}
			};
		},
		methods: {
			submitFun(){
				let _this = this
				if( !this.read ){
					return uni.showToast({
						title:'请先同意社区供应商协议~',
						icon:'none'
					})
				}
				
				if( this.lat ){
					this.formObj.addressgis = this.lat.toFixed(6) + ',' + this.lng.toFixed(6)
					this.formObj.gisDisplayAdd = this.gisDisplayAdd
				}
				let newType = this.typeArr.filter(item => {
					return item.check
				})
				this.formObj.goodsClassify = newType.map(item => {
					return item.classifyId
				}).join(';')
				if( this.formObj.orgProperty == '' ){
					this.formObj.orgProperty = this.list[0].id
				}
				if( this.formObj.tradeType == '' ){
					this.formObj.tradeType = this.list2[0].id
				}
				if( this.formObj.supplierType == '' ){
					this.formObj.supplierType = this.list3[0].id
				}
				this.formObj.communityId = this.state.communityId
				
				console.log( this.formObj )
				// 非空验证
				if( !this.formObj.supplierName || !this.formObj.orgProperty || !this.formObj.tradeType || !this.formObj.addressgis
				|| !this.formObj.gisDisplayAdd || !this.formObj.detailAddress || !this.formObj.supplyRange || !this.formObj.orgContactor || 
				!this.formObj.phonenum || !this.formObj.licensePic || !this.formObj.goodsClassify || !this.formObj.supplierType){
					return uni.showToast({
						title:'信息不全~',
						icon:'none'
					})
				}
				// console.log( this.formObj )
				//手机号验证
				if( !isTel(this.formObj.phonenum) ){
					return uni.showToast({
						title:'手机号错误~',
						icon:'none'
					})
				}
				
				SupplierApi.applyForSupplier(this.formObj, res => {

					if( res.status == 1 ){
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
						this.timer1 = setTimeout(()=>{
							_this.getSupplierInfo()
						},1500)
					}else{
						console.log( res )
					}
				})
			},
			getLocation() { //获取定位
				const _this = this
				uni.chooseLocation({
					success(res) {
						// console.log(res)
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
			getDataDictionary(type){ //获取单位性质和行业性质,供应商类型
				CommonApi.getDataDictionary2({parentId:type}, res => {
					if( type === 'org_property' ){ //单位性质
						this.list = res.map( item => {
							item.value = item.name
							return item
						} )
						
					}else if( type === 'trade_type' ){ //行业性质
						this.list2 = res.map( item => {
							item.value = item.name
							return item
						} )
					}else if( type === 'supplier_type' ){
						this.list3 = res.map( item => {
							item.value = item.name
							return item
						} )
						// console.log( this.list3 )
					}
				})
			},
			getSupplierInfo(){ //获取供应商信息
				SupplierApi.getSupplierInfo(res => {
					if( !res ){
						this.isSign = -1
						this.showTest = true
					}else{
						this.isSign = res.approveres
						this.formObj.supplierName = res.supplierName
						this.formObj.orgContactor = res.orgContactor
						this.formObj.phonenum = res.phonenum
						// this.formObj.apartmentAddress = res.apartmentAddress
						this.formObj.detailAddress = res.detailAddress
						this.formObj.supplyRange = res.supplyRange
						this.failureCase = res.failureCase
						this.gisDisplayAdd = res.gisDisplayAdd
						this.supplierInfoObj = res
						this.lat = parseFloat(res.gisaddress.split(',')[0])
						this.lng = parseFloat(res.gisaddress.split(',')[1])
						this.goodsClassify = res.classify.split(';')
						/* this.goodsClassify = res.goodsClassify.split(',').map(item => {
							return this.state.goodsType.find( items => {
								return items.classifyId == item
							} )
						}) */

						
					}
				})
			},
			getGoodsClassify(){ //获取商品类别
				StoreApi.getGoodsClassify({},res => {
					this.typeArr = res.map(item => {
						item.check = false
						return item
					})
					store.commit('setGoodsType',res)
					// console.log( this.typeArr )
				})
			},
			setChoose(e) { //选择单位性质
				this.formObj.orgProperty = this.list[e.index].id
			},
			setChoose2(e) { //选择行业性质
				this.formObj.tradeType = this.list2[e.index].id
			},
			setChoose3(e) { //选择供应商类型
				this.formObj.tradeType = this.list3[e.index]
			},
			changeChoose(index) { //选择商品类型
				this.typeArr[index].check = !this.typeArr[index].check
			},
			changeRead() {
				this.read = !this.read
			},
			showModal() {
				this.show = true
			},
			closeModal() {
				this.show = false
			},
			closeTest(){
				this.showTest = false
			},
			changeIsSign(){
				this.isSign = -1
			},
			myUpload(rsp) {  //上传营业执照
				uni.showToast({
					title:'正在上传',
					icon:'loading',
					mask:true,
					duration:1000
				})
				this.activityPic = rsp.path; //更新头像方式一
				this.formObj.licensePic = getBase64(rsp.path)
			},
		},
		onLoad(options) {
			this.getSupplierInfo()
			this.getDataDictionary('org_property')
			this.getDataDictionary('trade_type')
			this.getDataDictionary('supplier_type')
			this.getGoodsClassify()
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
	.supplier-regist {
		
		//审核未通过信息
		.pass-no{
			font-size: 26rpx;
			line-height: 50rpx;
			color: #FF2F29;
			display: block;
			padding: 0 50rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
		}
		
		//审核未通过确认按钮
		.sure-btn{
			width: 450rpx;
			height: 60rpx;
			background-color: #ff2f29;
			border-radius: 20rpx;
			font-size: 30rpx;
			font-weight: bold;
			letter-spacing: 3rpx;
			color: #ffffff;
			text-align: center;
			line-height: 60rpx;
			margin-bottom: 100rpx;
			margin: 20rpx auto 79rpx;
		}
		
		//审核状态
		.audit-status {
			height: 126rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #E62329;

			.title {
				font-size: 30rpx;
				letter-spacing: 3rpx;
				color: #ffffff;
			}
		}

		//表单
		.form-box {
			box-sizing: border-box;
			padding: 0 42rpx;

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
						bottom: 12rpx;
					}
				}

				.title-box{
					display: flex;
					align-items: center;
					.essential {
						color: #FF2F29;
						display: inline-block;
						height: 30rpx;
						box-sizing: border-box;
					}
					
					.title {
						font-size: 30rpx;
						line-height: 80rpx;
						width: 180rpx;
					}
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
				box-sizing: border-box;
				padding: 0 20rpx;
				display: flex;
				flex-direction: column;
				.img-box{
					width: 350rpx;
					height: 200rpx;
					border-radius: 10rpx;
					margin: 0 auto;
					background: url(../../static/imgs/upload_img.png) no-repeat center center;
					background-size: 50%;
				}
				.choose-type {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					box-sizing: border-box;
					padding: 0 20rpx;
					.item {
						min-width: 195rpx;
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
			}
		}

		//申请
		.apply-supplier {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.agree-protocol {
				display: flex;
				align-items: center;
				justify-content: center;

				.choose-icon {
					width: 25rpx;
					height: 25rpx;
					margin-right: 12rpx;
				}

				.is-agree {
					letter-spacing: 3rpx;
					font-size: 25rpx;
					line-height: 70rpx;
					text-decoration: underline;
				}
			}

			.sub-btn {
				width: 450rpx;
				height: 60rpx;
				background-color: #ff2f29;
				border-radius: 20rpx;
				font-size: 30rpx;
				font-weight: bold;
				letter-spacing: 3rpx;
				color: #ffffff;
				text-align: center;
				line-height: 60rpx;
				margin-bottom: 100rpx;
			}
		}

		//申请成功
		.apply-success {
			margin-top: 40rpx;
			padding: 20rpx 0;
			border-top: 10rpx dashed #eee;
			display: flex;
			justify-content: center;
			// align-items: flex-start;
			// justify-content: center;
			.box {
				display: flex;
				flex-direction: column;
				// display: inline-block;
				// margin: 0 auto;
				text {
					font-size: 25rpx;
					color: #2a2a2a;
					letter-spacing: 3rpx;
					line-height: 40rpx;
				}
			}
		}

		//入驻社区商圈
		.settle-community {
			box-sizing: border-box;
			padding: 0 54rpx;
			position: fixed;
			z-index: 1000;
			background-color: #fff;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			.box {
				display: flex;
				flex-direction: column;
				margin-bottom: 240rpx;
		
				.title {
					text-align: center;
					line-height: 120rpx;
					letter-spacing: 3rpx;
					font-size: 30rpx;
				}
		
				.start,
				.content {
					font-size: 25rpx;
					line-height: 48rpx;
					letter-spacing: 3rpx;
				}
			}
		
			.bottom-fixed{
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: #fff;
				position: absolute;
				width: 100%;
				height: 240rpx;
				left: 0;
				bottom: 0;
				.to{
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
		
		.show-box .input.data-v-585c49d8{
			overflow: hidden;
			white-space: nowrap;
			width: 392rpx;
		}
	}
</style>
