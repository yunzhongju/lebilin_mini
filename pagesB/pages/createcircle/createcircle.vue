<template>
	<view class="create-circle-box">
		<!-- 创建圈子 -->
		<form @submit="formSubmit" v-if="code == 0">
			<view class="circle-name">
				<text>名称</text>
				<input type="text" value="" name="circleName" placeholder="请输入圈子名称" />
			</view>

			<view class="circle-name" style="margin-top: 30rpx;">
				<text>上传圈子图片logo</text>
				<avatar inner=true selWidth="400upx" stretch="longSel" selHeight="400upx" @upload="myUpload" :avatarSrc="avatarUrl || 'https://www.quweiquwei.com:5743/images/pic/avatars.png'"
				 avatarStyle="width: 200rpx; height: 200rpx;border-radius:10rpx;margin-left:20rpx">
				</avatar>
			</view>

			<view class="circle-intruduce" style="margin-top: 30rpx;">
				<text>圈子介绍({{count1}}/200)</text>
				<textarea @input="changeCount1" value="" maxlength="200" name="circleIntroduce" placeholder="编辑文本" />
				
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
			<view class="circle-master" style="margin-top: 30rpx;">
				<text>圈主介绍({{count2}}/200)</text>
				<textarea @input="changeCount2" value="" maxlength="200" name="selfIntroduce" placeholder="编辑文本" />
				
				<view class="img-grid">
					<view class="img-row">
						<view class="act-img" v-for="(item,index) in personImg" :key='index'>
							<image :src="item" mode="aspectFill" style="width: 160rpx;height: 160rpx;"></image>
							<view class="close-btn" @click="delImg2(index)">
								<view>
									
								</view>
							</view>
						</view>
						
						<view class="add-img-box" v-if="personImg.length < 9">
							<image src="/pagesB/static/imgs/release.png" @click="uploadActImg2()" style="width: 160rpx; height: 160rpx;"></image>
						</view>
					</view>
				</view>
			</view>

			
			<button class="sub-btn" form-type="submit">提交审核</button>
		</form>
		<!-- 修改圈子 -->
		<form @submit="formSubmit2" v-else>
			<view class="circle-name">
				<text>名称</text>
				<input :disabled="circleInfo.signatureres == 0" type="text" :value="circleInfo.circleName" name="circleName" placeholder="请输入圈子名称" />
			</view>
			
			<view class="circle-name" style="margin-top: 30rpx;">
				<text>上传圈子图片logo</text>
				<avatar inner=true selWidth="400upx" stretch="longSel" selHeight="400upx" @upload="myUpload" :avatarSrc="avatarUrl" avatarStyle="width: 200rpx; height: 200rpx;border-radius:10rpx;margin-left:20rpx">
				</avatar>
			</view>
			
			<view class="circle-intruduce" style="margin-top: 30rpx;">
				<text>圈子介绍({{count1}}/200)</text>
				<textarea :disabled="circleInfo.signatureres == 0" @input="changeCount1" :value="circleInfo.circleIntroduce" maxlength="200" name="circleIntroduce" placeholder="编辑文本" />
				
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
			<view class="circle-master" style="margin-top: 30rpx;">
				<text>圈主介绍({{count2}}/200)</text>
				<textarea :disabled="circleInfo.signatureres == 0" @input="changeCount2" :value="circleInfo.selfIntroduce" maxlength="200" name="selfIntroduce" placeholder="编辑文本" />
				
				<view class="img-grid">
					<view class="img-row">
						<view class="act-img" v-for="(item,index) in personImg" :key='index'>
							<image :src="item" mode="aspectFill" style="width: 160rpx;height: 160rpx;"></image>
							<view class="close-btn" @click="delImg2(index)">
								<view>
									
								</view>
							</view>
						</view>
						
						<view class="add-img-box" v-if="personImg.length < 9">
							<image src="/pagesB/static/imgs/release.png" @click="uploadActImg2()" style="width: 160rpx; height: 160rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		
			<button class="sub-btn" form-type="submit" :disabled="circleInfo.signatureres == 0">确认修改</button>
		</form>
	</view>
</template>

<script>
	import api from '@/utils/api.js'
	import CircleApi from '@/servies/CircleApi.js'
	import CommonApi from '@/servies/CommonApi.js'
	import store from '@/store'
	import avatar from '@/pagesB/components/yq-avatar.vue'
	import uploadFile from '@/utils/uploadAliyun2.js'
	import { getBase64 } from '@/utils'
	export default {
		components: {
			avatar
		},
		data() {
			return {
				state:store.state,
				count1:0,
				count2:0,
				circleId:'',
				code:0, //圈子详情进入，修改圈子 1
				circleInfo:null,
				avatarUrl:'' ,//头像地址
				actDetailImg:[], //圈子介绍图片
				personImg:[], //圈主介绍图片
				clickStatus:true
			};
		},
		methods: { 
			_success2: function(imgUrl){
			    for(var i=0;i<imgUrl.length;i++) {
			      this.personImg.push(imgUrl[i]);
			    }
			    uni.hideLoading();
			},
			uploadActImg2(){ //上传圈子介绍图片
				let vm =this
				
				if(vm.personImg.length >= 9){
					uni.showToast({
						title:'最多上传9张图哦~',
						icon:'none',
						mask:true
					})
					return
				}
				
				const params = {
				        _success: this._success2,
				        count: 9 - this.personImg.length
				      }
				uploadFile.chooseImg(params);
			},
			delImg2(index) {
			      // 删除照片
			      this.personImg.splice(index, 1);
			},
			delImg(index) {
			      // 删除照片
			      this.actDetailImg.splice(index, 1);
			},
			uploadActImg(){ //上传圈子介绍图片
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
			formSubmit(e){ //创建圈子
				var formdata = e.detail.value
				if( !this.clickStatus ) return
				this.clickStatus = false
				if( !formdata.circleName || !formdata.circleIntroduce ){
					api._error({
						title:"圈子名称和圈子介绍为必填哦~"
					})
				}else{
					formdata.communityId = this.state.communityId
					formdata.headerUrl = this.avatarUrl
					
					// 圈子介绍图片
					let newArr = []
					for( let i = 0; i< this.actDetailImg.length; i++ ){ //图片处理
						 newArr.push( getBase64(this.actDetailImg[i]) )
					}
					formdata.introducePics = newArr.join(';')
					
					// 圈主介绍图片
					let personArr = []
					for( let i = 0; i< this.personImg.length; i++ ){ //图片处理
						 personArr.push( getBase64(this.personImg[i]) )
					}
					formdata.selfIntroducePics = personArr.join(';')
					
					console.log( formdata )
					CircleApi.createCircle(formdata,res => {
						if(res.status == 1){
							this.clickStatus = true
							uni.navigateTo({
								url:'/pagesB/pages/allcircle/allcircle?type=' + 'ICreated'
							})
						}
					})
				}
				
			},
			
			formSubmit2(e){ //修改圈子
				var formdata = e.detail.value
				if( !this.clickStatus ) return
				this.clickStatus = false
				if( !formdata.circleName || !formdata.circleIntroduce ){
					api._error({
						title:"圈子名称和圈子介绍为必填哦~"
					})
				}else{
					formdata.communityId = this.state.communityId
					formdata.circleId = this.circleId
					formdata.headerUrl = this.avatarUrl
					
					// 圈子介绍图片
					let newArr = []
					for( let i = 0; i< this.actDetailImg.length; i++ ){ //图片处理
						 newArr.push( getBase64(this.actDetailImg[i]) )
					}
					formdata.introducePics = newArr.join(';')
					
					// 圈主介绍图片
					let personArr = []
					for( let i = 0; i< this.personImg.length; i++ ){ //图片处理
						 personArr.push( getBase64(this.personImg[i]) )
					}
					formdata.selfIntroducePics = personArr.join(';')
					
					console.log( formdata )
					CircleApi.createCircle(formdata,res => {
						if(res.status == 1){
							this.clickStatus = true
							uni.showToast({
								title:'圈子修改成功',
								icon:'none'
							})
							setTimeout(() => {
								uni.navigateTo({
									url:'/pagesB/pages/allcircle/allcircle?type=' + 'ICreated'
								})
							},500)
						}
					})
				}
				
			},
			changeCount1(e){
				this.count1 = e.detail.value.length
				
			},
			changeCount2(e){
				this.count2 = e.detail.value.length
			},
			getCircleDetail(params){ //获取圈子信息
				CircleApi.getCircleInfo(params, res => {
					console.log( '圈子信息',res )
					this.circleInfo = res
					this.avatarUrl = res.headerUrl
					this.count1 = res.circleIntroduce.length
					this.count2 = res.selfIntroduce.length
					this.actDetailImg = res.introducePics.map(item => item.filePath)
					this.personImg = res.selfIntroducePics.map(item => item.filePath)
					console.log( '头像地址',this.avatarUrl )
				})
			},
			myUpload(rsp) { //上传头像
				uni.showToast({
					title:'正在上传',
					icon:'loading',
					mask:true,
					duration:1000
				})
				this.avatarUrl = rsp.path
				CommonApi.uploadPic({filePath:rsp.path,name:'circle'}, res => {
					// this.avatarUrl = res; //更新头像方式一
					console.log('res.data',res)
					if( JSON.parse(res.data).status == 1 ){
						console.log( 123, JSON.parse(res.data).data[0])
						this.avatarUrl = JSON.parse(res.data).data[0]
					}else{
						uni.showToast({
							title:'图片上传失败',
							icon:'loading',
							mask:true,
							duration:1000
						})
					}
					
				})
			}
		},
		onLoad(options) {
			console.log( options )
			this.circleId = options.circleId || ''
			this.code = options.code || 0
			if( options.circleId ){
				this.getCircleDetail({circleId:options.circleId})
			}
		}
	}
</script>

<style lang="scss">
	.create-circle-box {
		box-sizing: border-box;
		padding: 10rpx 20rpx;
		.circle-name{
			text{
				font-size: 24rpx;
				line-height: 50rpx;
			}
			input{
				font-size: 24rpx;
				line-height: 40rpx;
				height: 40rpx;
				background-color: #efefef;
				box-sizing: border-box;
				padding-left: 10rpx;
				border-radius: 8rpx;
			}
		}
		.circle-intruduce,.circle-master{
			text{
				font-size: 24rpx;
				line-height: 50rpx;
			}
			textarea{
				border-radius: 8rpx;
				font-size: 24rpx;
				width: 100%;
				background-color: #efefef;
				box-sizing: border-box;
				padding: 10rpx;
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
						margin:0rpx 7rpx 6rpx 0rpx;
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
			line-height: 60rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #fff;
			margin-top: 80rpx;
			margin-bottom: 30rpx;
		}
	}
</style>
