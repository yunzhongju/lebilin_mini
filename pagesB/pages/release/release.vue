<template>
	<view class="release">
		<view class="top-release">
			<button class="release-btn" type="warn" size="mini" @click="postMsgFun">发表</button>
		</view>

		<textarea v-model="content" class="content" value="" placeholder="说说你对活动的感想" placeholder-style="font-size: 28rpx;color: #a4a4a4;" />

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
</template>

<script>
	import store from '@/store'
	import ActivityApi from '@/servies/ActivityApi.js'
	import uploadFile from '@/utils/uploadAliyun.js'
	export default {
		data() {
			return {
				state:store.state,
				content:'', //评论内容
				actDetailImg:[],  // 发表图片
				id:'', //活动或动态标识
			};
		},
		methods:{
			postMsgFun() {
			      //
			      if (!this.content) {
			        return  wx.showToast({icon: "none",title: '请输入评论内容～'})
			      }
			
			      if (this.actDetailImg && this.actDetailImg.length > 9) {
			        return wx.showToast({icon: "none",title: '最多上传9张图片哦～'})
			      }
				  console.log( {
					  activityId:this.id,
					  commentContent:this.content,
					  commentPic:this.actDetailImg && this.actDetailImg.length > 0 ? JSON.stringify(this.actDetailImg) : ''
				  } )
				  
				  ActivityApi.addActivityComment({
					  activityId:this.id,
					  commentContent:this.content,
					  commentPic:this.actDetailImg && this.actDetailImg.length > 0 ? JSON.stringify(this.actDetailImg) : ''
				  },res => {
					  if (res) {
					    wx.showToast({icon: "none",title: '评论成功～'})
					    setTimeout(function(){
					      uni.navigateBack({
					          delta: 1
					      });
					    },500)
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
		onLoad( options ) {
			this.id = options.id
		}
	}
</script>

<style lang="scss">
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
</style>
