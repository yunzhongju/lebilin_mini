<template>
	<view class="service-fill">
		<view class="hope-title">
			<input type="text" v-model="title" placeholder="填写心愿标题" disabled=""/>
		</view>
		
		<view class="release">
			<textarea class="content" v-model="hopeContent" placeholder="填写服务过程" placeholder-style="font-size: 28rpx;color: #a4a4a4;" />
		
			<view class="img-grid">
				<view class="img-row">
					<view class="act-img" v-for="(item,index) in actDetailImg" :key='index'>
						<image :src="item" mode="aspectFill" style="width: 142rpx;height: 142rpx;"></image>
						<view class="close-btn" @click="delImg(index)">
							<view>
								
							</view>
						</view>
					</view>
					
					<view class="add-img-box" v-if="actDetailImg.length < 9">
						<image src="/pagesB/static/imgs/release.png" @click="uploadActImg()" style="width: 142rpx; height: 142rpx;"></image>
					</view>
				</view>
			</view>
		</view>
		
		<button type="warn" class="sub-btn" @click="subService">提交</button>
	</view>
</template>

<script>
	import store from '@/store'
	import uploadFile from '@/utils/uploadAliyun2.js'
	import WishApi from '@/servies/WishApi.js'
	import { getBase64, isTel, isCard } from '@/utils'
	export default {
		data() {
			return {
				state:store.state,
				hopeTitle:'',
				actDetailImg:[],
				hopeContent:'',
				msgId:'',
				title:''
			};
		},
		
		methods:{
			subService(){  //提交表单
				let subObj = {
					msgId:this.msgId,
					processContent:this.hopeContent,
				}
				let newArr = []
				for( let i = 0; i< this.actDetailImg.length; i++ ){ //图片处理
					 newArr.push( getBase64(this.actDetailImg[i]) )
				}
				subObj.processPic = newArr.join()
				
				/* 非空验证 */
				if( !subObj.processContent.trim() || !subObj.processPic ){
					return uni.showToast({
						title:'信息不全 ~',
						icon:'none'
					})
				}
				
				WishApi.submitWishServiceProcess(subObj, res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if( res.status == 1 ){
						uni.navigateTo({
							url:'/pagesB/pages/hopeevaluation/hopeevaluation?msgId=' + this.msgId
						})
					}
				})
				
			},
			delImg(index) {
			      // 删除照片
			      this.actDetailImg.splice(index, 1);
			},
			uploadActImg(){
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
		},
		onLoad(options) {
			this.msgId = options.msgId || ''
			this.title = options.title || ''
		}
	}
</script>

<style lang="scss">
	.service-fill{
		box-sizing: border-box;
		padding: 34rpx 22rpx 0rpx 22rpx;
		.hope-title{
			border-bottom: 1rpx solid #e5e5e5;
			margin-bottom: 10rpx;
			padding-bottom: 10rpx;
			input{
				margin-left: 32rpx;
				font-size: 26rpx;
				line-height: 60rpx;
			}
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
				width: 100%;
				height: 293rpx;
				border-radius: 20rpx;
				border: solid 2rpx #dcdddd;
				font-size: 28rpx;
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
			font-size: 30rpx;
			font-weight: bold;
			line-height: 60rpx;
			margin-top: 50rpx;
		}
	}
</style>
