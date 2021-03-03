<template>
	<view class="hope-evaluation">
		<view class="top-msg">
			<view class="title">
				<image src="/pagesB/static/imgs/hope_need.png" mode=""></image>
				<text>{{detailObj.msgTitle}} {{detailObj.needPerson}}名</text>
			</view>
			<text class="msg">{{detailObj.msgContent}}</text>

			<text>服务时长：{{detailObj.serviceDuration}}小时</text>
			<text>需要人数：{{detailObj.needPerson}}人</text>
			<text>心愿积分：{{detailObj.integral}}分</text>
			<text>求助时间：{{detailObj.wishDatetime}}</text>
			<text>联系电话：{{detailObj.mobile}}</text>
			<text>联系人：{{detailObj.wishPerson}}</text>
			<text>地址：{{detailObj.personAdd}}</text>

			<view class="img-box">
				<image :src="pic.filePath" mode="center" v-for="(pic,index) in detailObj.wishPics" :key="index" @click="pageToPreview(index,detailObj.wishPics)"></image>
			</view>
		</view>

		<!-- 进度-->
		<uni-steps :options="[{title: '发愿'}, {title: '认领'}, {title: '服务'}, {title: '评价'}]" :active="detailObj.progress - 1"
		 active-color="#e62329"></uni-steps>

		<!-- 认领 -->
		<button v-if="detailObj.progress == 1 && !state.userInfo.isVolunteer && !detailObj.isPublisher" type="warn" class="sub-btn"
		 @click="showModal">认领</button>
		<nei-modal :show="show" @close="closeModal" title="提示" content="您还不是志愿者,是否前往申请成为志愿者？" @confirm="bindBtn">
		</nei-modal>

		<button v-if="detailObj.progress == 1 && state.userInfo.isVolunteer && !detailObj.isPublisher" type="warn" class="sub-btn"
		 @click="toLingqu">认领</button>
		<view class="spleet-line" v-if="detailObj.progress >= 2"></view>

		<!-- 认领人 -->
		<view class="claim" style="margin-bottom: 20rpx;" v-if="detailObj.claim">
			<text><text>认领人：</text>{{detailObj.claim.claimName}}</text>
			<text>联系电话：{{detailObj.claim.claimMobile}}</text>
			<text>认领时间：{{detailObj.claim.claimTime}}</text>
		</view>
		<view class="ellims" v-if="detailObj.claim"></view>

		<!-- 服务 -->
		<view class="claim" style="margin-bottom: 20rpx;margin-top: 20rpx;" v-if="detailObj.service">
			<text><text>服务详情：</text>{{detailObj.service.processRecord}}</text>
			<text><text>服务时间：</text>{{detailObj.service.recordTime}}</text>
			
			<view class="img-box">
				<image :src="pic.filePath" mode="center" v-for="(pic,index) in detailObj.service.servicePics" :key="index" @click="pageToPreview(index,detailObj.service.servicePics)"></image>
			</view>
		</view>
		<view class="ellims" v-if="detailObj.service"></view>

		<!-- 评价 -->
		<view class="claim" style="margin-top: 20rpx;" v-if="(detailObj.progress==3 && detailObj.isPublisher) || detailObj.progress==4">
			<text v-if="detailObj.progress==4"><text>评价时间：</text>{{detailObj.evaluate.evaluateDate}}</text>
			
			<view class="choose">
				<text>服务评价：</text>
				<text>是否完成了您的心愿</text>
				<view class="choose-two">	

					<view class="item" @click="changeCurrent(0,detailObj.progress)">
						<image v-if="current == 0" src="/pagesB/static/imgs/hope_yes.png" mode=""></image>
						<image v-else src="/pagesB/static/imgs/hope_no.png" mode=""></image>
						<text>是</text>
					</view>

					<view class="item" @click="changeCurrent(1,detailObj.progress)">
						<image v-if="current == 1" src="/pagesB/static/imgs/hope_yes.png" mode=""></image>
						<image v-else src="/pagesB/static/imgs/hope_no.png" mode=""></image>
						<text>否</text>
					</view>
				</view>
			</view>

			<view class="star" v-if="current == 0 && detailObj.progress == 3">
				<view class="star-item" v-for="(item,index) in [1,2,3,4,5]" :key="index">
					<image v-if="star < index + 1" @click="changeStar(index + 1)" src="/pagesB/static/imgs/star_no.png" mode=""></image>
					<image v-if="star >= index + 1" @click="changeStar(index + 1)" src="/pagesB/static/imgs/star_yes.png" mode=""></image>
				</view>
			</view>
			
			<view class="star" v-if="current == 0 && detailObj.progress == 4">
				<view class="star-item" v-for="(item,index) in [1,2,3,4,5]" :key="index">
					<image v-if="star < index + 1"  src="/pagesB/static/imgs/star_no.png" mode=""></image>
					<image v-if="star >= index + 1" src="/pagesB/static/imgs/star_yes.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="evaluation" v-if="(detailObj.progress==3 && detailObj.isPublisher) || detailObj.progress==4">
			<textarea :disabled="detailObj.progress == 4" class="eva-style" v-model="evaValue" placeholder="评价一下...."
			 placeholder-style="font-size:26rpx;color: #9fa0a0;" />
			</view>
		
		<button type="warn" class="sub-btn" v-if="detailObj.progress == 3 && detailObj.isPublisher" @click="toEvaluation">提交</button>
		
		
	</view>
</template>

<script>
	import uniSteps from '@/pagesB/components/uni-steps/uni-steps.vue'
	import WishApi from '@/servies/WishApi.js'
	import store from '@/store'
	import neiModal from '@/pagesB/components/neil-modal.vue'
	export default {
		data() {
			return {
				state:store.state,
				current:0,
				evaValue:'', //评价内容
				star:0, //评价星级
				msgId:'',
				detailObj:null,
				
				show:false
			};
		},
		components:{
			uniSteps,
			neiModal
		},
		methods:{
			pageToPreview(index,picList){ //预览图片
				uni.setStorageSync("currentImgIndex",index)
				uni.setStorageSync('imgPreviewPicList', picList)
				uni.navigateTo({
					url:'/pagesB/pages/imgPreview/imgPreview'
				})
			},
			toEvaluation(){ //评价
				let params = null
				if( this.current == 1 ){ //未完成
					params = {
						msgId:this.msgId,
						isFinish:false,
						evaluateContent:this.evaValue,
						starNum:0,
					}
				}else{ //已完成
					params = {
						msgId:this.msgId,
						evaluateContent:this.evaValue,
						starNum:this.star,
						isFinish:true
					}
				}
				console.log( params )
				
				/* 非空验证 */
				if( !params.evaluateContent ){
					return uni.showToast({
						title:'请填写评价 ~',
						icon:'none',
					})
				}
				WishApi.evaluateWishService(params, res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if( res.status == 1 && this.current == 0 ){ //完成
						uni.navigateTo({
							url:'/pagesB/pages/hopemain/hopemain?index=3'
						})
					}else if( res.status == 1 && this.current == 1 ){ //未完成
						uni.navigateTo({
							url:'/pagesB/pages/hopemain/hopemain?index=1'
						})
					}
				})
			},
			toLingqu(){ //领取心愿
				WishApi.claimWish({msgId:this.msgId},res => {
					console.log( res )
					this.getWishDetail(this.msgId)
				})
			},
			showModal(){
				this.show = true
			},
			bindBtn(){
				uni.navigateTo({
					url:"/pagesB/pages/volunteerneedknow/volunteerneedknow"
				})
			},
			getWishDetail(msgId){ //心愿详情
				WishApi.getWishDetail({
					msgId
				}, res =>{
					console.log( res )
					this.detailObj = res
					if( res.evaluate ){
						this.evaValue = res.evaluate.evaluateContent
						this.star = res.evaluate.evaluateStar
						this.current = res.evaluate.evaluateFinish ? 0 : 1
					}
				})
			},
			changeStar(num){
				// console.log( num )
				if( num == 1 && this.star == 1 ){
					this.star = 0
				}else{
					this.star = num
				}
			},
			changeCurrent( num,status ){
				if( status == 4) return
				this.current == num ? '':this.current = num
			}
		},
		onLoad(options) {
			this.msgId = options.msgId
			this.getWishDetail(this.msgId)
		}
	}
</script>

<style lang="scss">
	
	.spleet-line{
		background-color: #dcdddd;
		height: 2rpx;
		margin: 20rpx 0;
	}
	
	.ellims{
		height: 0;
		border: 1rpx dashed #ddd;
	}
	
	.hope-evaluation{
		box-sizing: border-box;
		padding: 0rpx 70rpx;
		padding-bottom: 20rpx;
		.top-msg{
			display: flex;
			flex-direction: column;
			margin-bottom: 50rpx;
			.img-box{
				display: flex;
				flex-wrap: wrap;
				image{
					width: 160rpx;
					height: 90rpx;
					margin: 20rpx 20rpx 0 20rpx;
				}
			}
			.title{
				display: flex;
				align-items: center;
				image{
					width: 49rpx;
					height: 54rpx;
				}
				text{
					font-size: 30rpx;
					font-weight: bold;
					line-height: 100rpx;
				}
			}
			.msg{
				font-size: 26rpx;
				line-height: 47rpx;
				margin-bottom: 20rpx;
			}
			& > text{
				font-size: 26rpx;
				line-height: 47rpx;
			}
		}
		
		.claim{
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0 10rpx;
			& > text{
				font-size: 26rpx;
				line-height: 47rpx;
			}
			
			.img-box{
				display: flex;
				flex-wrap: wrap;
				image{
					width: 160rpx;
					height: 90rpx;
					margin: 18rpx 18rpx 0 18rpx;
				}
			}
			
			.choose{
				width: 100%;
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				.choose-two{
					display: flex;
					.item{
						margin-left: 20rpx;
						display: flex;
						align-items: center;
						image{
							width: 32rpx;
							height: 32rpx;
							margin-right: 6rpx;
						}
						
					}
				}
			}
			
			.star{
				display: flex;
				
				image{
					width: 30rpx;
					height: 30rpx;
					margin-right: 6rpx;
					margin-top: 20rpx;
				}
			}
		}
		
		.evaluation{
			.eva-style{
				height: 158rpx;
				background-color: #eeeeee;
				border-radius: 5rpx;
				font-size: 26rpx;
				margin-top: 20rpx;
				padding: 10rpx;
			}
			
		}
		.sub-btn{
			width: 450rpx;
			height: 60rpx;
			font-size: 30rpx;
			font-weight: bold;
			line-height: 60rpx;
			margin-top: 46rpx;
			margin-bottom: 40rpx;
		}	
	}
</style>
