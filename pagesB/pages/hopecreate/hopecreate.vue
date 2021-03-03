<template>
	<view class="hope-create">
		<form @submit="formSubmit">
			
			<!-- 姓名 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>姓名:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="wishPerson" class="content" type="text" value="" placeholder="填写你的姓名" />
			</view>
			
			<!-- 电话 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>电话:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="mobile" class="content" type="number" value="" placeholder="填写你的电话号码" />
			</view>
			
			<!-- 期望时间 -->
			<view class="form-item-box-time">
				<view class="title" style="display: flex;align-items: center;">
					<text>期望时间:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<view class="right-choose">
					<view class="time-item">
						<view class="content">
							<yu-datetime-picker @confirm="getStopTimer" ref="dateTime" startYear="2020">
							</yu-datetime-picker>
							<view v-if="startTime=='报名开始时间'" style="color: #C0C0C0;" class="time-box" @click="showTime">{{startTime}}</view>
							<view v-else class="time-box" @click="showTime">{{startTime}}</view>
						</view>
						<image @click="showTime3" src="/pagesB/static/imgs/select.png" style="width: 24rpx;height: 28rpx;margin-right: 16rpx;" mode=""></image>
					</view>
				</view>
			</view>
			
			<!-- 服务时长 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>服务时长:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="serviceDuration" class="content" type="number" value="" placeholder="填写服务时长" />
				<text style="font-size: 26rpx;">小时</text>
			</view>
			
			<!-- 求助类型 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>求助类型:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<view class="content">
					<xfl-select @change="setChoose" :list="list" :clearable="false" :showItemNum="5" :style_Container="'height: 78rpx; font-size: 26rpx;border:none;'"
					 :placeholder="'placeholder'" :initValue="'请选择类型'" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
			</view>

			<!-- 求助人数 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>求助人数:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="needPerson" class="content" type="number" value="" placeholder="填写人数" />
			</view>
			
			<!-- 联系地址 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>联系地址:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="personAdd" class="content" type="text" value="" placeholder="填写联系地址" />
			</view>
			
			<!-- 心愿名称 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>心愿名称:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="wishTitle" class="content" type="text" value="" placeholder="填写心愿名称" />
			</view>
			
			<!-- 心愿内容 -->
			<view class="form-item-box" style="border-bottom: 0;">
				<view class="title" style="display: flex;align-items: center;">
					<text>心愿内容:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
			</view>
			
			<view class="release">
				<textarea class="content" name="wishContent" placeholder="输入心愿内容" placeholder-style="font-size: 28rpx;color: #a4a4a4;" />
			
				<view class="img-grid">
					<view class="img-row">
						<view class="act-img" v-for="(item,index) in actDetailImg" :key='index'>
							<image :src="item" mode="aspectFill" style="width: 160rpx;height: 160rpx;"></image>
							<view class="close-btn" @click="delImg(index)">
								<view>
									
								</view>
							</view>
						</view>
						
						<view class="add-img-box" v-if="actDetailImg.length < 9">
							<image src="/pagesB/static/imgs/release.png" @click="uploadActImg()" style="width: 160rpx; height: 160rpx;"></image>
						</view>
					</view>
				</view>
			</view>

			<button form-type="submit" class="sub-btn">提交</button>
		</form>
	</view>
</template>

<script>
	import store from '@/store'
	import xflSelect from '@/pagesB/components/xfl-select.vue'
	import yuDatetimePicker from '@/pagesB/components/yu-datetime-picker.vue'
	import uploadFile from '@/utils/uploadAliyun2.js'
	import { getBase64, isTel } from '@/utils'
	import CommonApi from '@/servies/CommonApi.js'
	import WishApi from '@/servies/WishApi.js'
	export default {
		data() {
			return {
				state:store.state,
				startTime: '报名开始时间',
				actDetailImg:[],
				hopetypeArr:[],
				list:[],
				chooseType:'',
				typeId:'',
			};
		},
		components:{
			xflSelect,
			yuDatetimePicker
		},
		methods: {
			delImg(index) {
			      // 删除照片
			      this.actDetailImg.splice(index, 1);
			},
			uploadActImg(){ //上传图片
				let vm =this
				
				if(vm.actDetailImg.length >= 9){
					uni.showToast({
						title:'最多上传9张图哦~',
						icon:'none',
						mask:true
					})
					return
				}
				
				const params = {
				        _success: this._success,
				        count: 9 - this.actDetailImg.length
				      }
				uploadFile.chooseImg(params);
			},
			_success: function(imgUrl){
			      for(var i=0;i<imgUrl.length;i++) {
			        this.actDetailImg.push(imgUrl[i]);
			      }
			      uni.hideLoading();
			    },
			formSubmit(e) { //提交表单
			
				/* 数据处理 */
				let params = e.detail.value
				params.wishDatetime = this.startTime
				params.communityId = this.state.communityId
				params.helpType = this.typeId
				let newArr = []
				for( let i = 0; i< this.actDetailImg.length; i++ ){ //图片处理
					 newArr.push( getBase64(this.actDetailImg[i]) )
				}
				params.pics = newArr.join()
				console.log( params )
				
				/* 表单验证 */
				if( !params.helpType || !params.mobile.trim() || !params.wishPerson.trim() || !params.personAdd.trim() || !params.pics || !params.serviceDuration.trim() || !params.wishContent.trim() || !params.wishTitle.trim()){
					return uni.showToast({
						title:'信息不全 ~',
						icon:'none'
					})
				}
				// 手机号验证
				if( !isTel(params.mobile) ) return uni.showToast({
					title:'手机号错误',
					icon:'none'
				})
				// 人数限制
				if( params.needPerson < 0 ) return uni.showToast({
					title:'求助人数必须大于0哦 ~',
					icon:'none'
				})
				if( params.serviceDuration < 0 ) return uni.showToast({
					title:'服务时长必须大于0哦 ~',
					icon:'none'
				})
				
				WishApi.publishWish(params, res => {
					console.log( res )
					uni.redirectTo({
						url:"/pagesB/pages/hopemain/hopemain"
					})
				})
				
				
			},
			setChoose(e) {  //选择类型
				this.chooseType = e.newVal
				let result = this.hopetypeArr.filter(item => {
					return item.name == e.newVal
				})
				this.typeId =  result[0].id
				console.log( this.typeId )
			},
			getStopTimer(e) {
				this.startTime = e.selectRes
				console.log( this.startTime )
			},
			showTime() {
				this.$refs.dateTime.show();
			},
		},
		onLoad(options) {
			CommonApi.getDataDictionary( res => {
				console.log( res )
				this.hopetypeArr = res
				let list = res.map(item => {
					return item.name
				})
				this.list = [...list]
				console.log( this.list )
			} )
		}
	}
</script>

<style lang="scss">
	.hope-create {
		
		.show-box.data-v-cafe6b5a{
			padding: 0;
		}
		
		.release{
			width: 100%;
			height: 100%;
			background-color: #fff;
			padding: 0 20rpx;
			box-sizing: border-box;
			.top-release{
				padding: 30rpx 0;
				display: flex;
				justify-content: flex-end;
				.release-btn{
					margin: 0;
					width: 110rpx;
					height: 48rpx;
					line-height: 48rpx;
					background-color: #e60012;
					border-radius: 10rpx;
					padding: 0;
				}
			}
			.content{
				width: 710rpx;
				height: 293rpx;
				border-radius: 20rpx;
				border: solid 2rpx #dcdddd;
				font-size: 26rpx;
				box-sizing: border-box;padding: 10rpx;
			}
			.img-grid{
			    padding: 10rpx 20rpx;
			    .img-row{
			      display: flex;
			      justify-content: flex-start;
			      align-items: center;
			      margin: 10rpx 0;
			      flex-wrap:wrap;
			      img {
		
			        overflow: hidden;
			        display: inline-block;
			      }
			      .act-img{
			        position: relative;
			        margin:0rpx 6rpx 6rpx 0rpx;
			        .close-btn {
			          position: absolute;
			          right: 6rpx;
			          top:6rpx;
			          width: 100rpx;
			          height: 100rpx;
			          view {
			            position: absolute;
			            right: 0;
			            top:0;
			            display: block;
			            width: 32rpx;
			            height: 32rpx;
			            background: url('https://webapp.codoon.com/mini_sports_app/upload/act_ic-close.png') no-repeat top right;
			            background-size: cover;
			          }
			        }
			      }
			      .add-img-box {
			        display: inline-block;
			        margin:0rpx 6rpx 6rpx 0rpx;
			      }
			    }
			  }
		}
		
		.sub-btn{
			width: 450rpx;
			height: 60rpx;
			background-color: #ff2f29;
			font-size: 30rpx;
			font-weight: bold;
			color: #ffffff;
			line-height: 60rpx;
			margin-bottom: 100rpx;
			margintop: 20rpx
		}
		
		.form-item-box-time {
			display: flex;
			border-bottom: 1rpx solid #eee;
			box-sizing: border-box;
			padding: 0 50rpx;
			.title{
				width: 208rpx;
				font-size: 26rpx;
				line-height: 80rpx;
				
			}
			.right-choose{
				flex: 1;
				.time-item {
					display: flex;
					font-size: 26rpx;
					align-items: center;
					height: 80rpx;
					line-height: 80rpx;
				}
				.content {
					flex: 1;
					display: flex;
					flex-wrap: wrap;
					.time-box{
						flex: 1;
					}
					.theme-item{
						width: 136rpx;
						height: 40rpx;
						font-size: 24rpx;
						line-height: 40rpx;
						background-color: #e6e6e6;
						border-radius: 8rpx;
						margin: 0rpx 10rpx 10rpx 0rpx;
						text-align: center;
						&.active{
							background-color: #f4adaf;
						}
					}
				}
			}
			
		}
		
		.form-item-box {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #eee;
			box-sizing: border-box;
			padding: 0 50rpx;
		
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
	}
</style>
