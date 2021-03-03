<template>
	<view class="create-activity-box">
		<form @submit="submitForm">
			<!-- 活动标题 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动标题:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="activityName" class="content" type="text" value="" placeholder="填写活动标题" />
			</view>
			<!-- 活动圈子 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动圈子:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<view class="content">
					<xfl-select @change="setChoose" :list="list" :clearable="false" :showItemNum="5" :style_Container="'height: 78rpx; font-size: 26rpx;border:none;'"
					 :placeholder="'placeholder'" :initValue="'请选择圈子'" :selectHideType="'hideAll'">
					</xfl-select>
				</view>
			</view>
			<!-- 居民人数限制 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>居民人数限制:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="limitNum" class="content" type="number" value="" placeholder="例如200" />
			</view>
			<!-- 志愿者人数限制 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>志愿者人数限制:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="volunteerLimitNum" class="content" type="number" value="" placeholder="例如200" />
			</view>
			<!-- 报名截止 -->
			<view class="form-item-box-time">
				<view class="title" style="display: flex;align-items: center;">
					<text>报名时间:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<view class="right-choose">
					<view class="time-item">
						<view class="content">
							<yu-datetime-picker @confirm="getStopTimer3" ref="dateTime3" startYear="2020">
							</yu-datetime-picker>
							<view v-if="startTime=='报名开始时间'" style="color: #C0C0C0;" class="time-box" @click="showTime3">{{startTime}}</view>
							<view v-else class="time-box" @click="showTime3">{{startTime}}</view>
						</view>
						<image @click="showTime3" src="/pagesB/static/imgs/select_time.png" style="width: 19rpx;height: 13rpx;" mode=""></image>
						<text style="padding-left: 10rpx;">至</text>
					</view>
					
					<view class="time-item">
						<view class="content">
							<yu-datetime-picker @confirm="getStopTimer4" ref="dateTime4" startYear="2020">
							</yu-datetime-picker>
							<view v-if="endTime=='报名截止时间'" style="color: #C0C0C0;" class="time-box" @click="showTime4">{{endTime}}</view>
							<view v-else class="time-box" @click="showTime4">{{endTime}}</view>
						</view>
						<image @click="showTime4" src="/pagesB/static/imgs/select_time.png" style="width: 19rpx;height: 13rpx;margin-right: 36rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 活动地点 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动地点:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="addr" v-model="addrChoose" class="content" type="text" placeholder="选择或输入活动地点" />
				<image @click="chooseLocation" src="/pagesB/static/imgs/choose_addr_icon.png" style="width: 20rpx;height: 26rpx;padding-right: 36rpx;padding-left: 20rpx;" mode=""></image>
			</view>
			<!-- 活动时间 -->
			<view class="form-item-box-time">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动时间:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<view class="right-choose">
					<view class="time-item">
						<view class="content">
							<yu-datetime-picker @confirm="getStopTimer1" ref="dateTime1" startYear="2020">
							</yu-datetime-picker>
							<view v-if="acStarTime=='活动开始时间'" style="color: #C0C0C0;" class="time-box" @click="showTime1">{{acStarTime}}</view>
							<view v-else class="time-box" @click="showTime1">{{acStarTime}}</view>
						</view>
						<image @click="showTime1" src="/pagesB/static/imgs/select_time.png" style="width: 19rpx;height: 13rpx;" mode=""></image>
						<text style="padding-left: 10rpx;">至</text>
					</view>
					
					<view class="time-item">
						<view class="content">
							<yu-datetime-picker @confirm="getStopTimer2" ref="dateTime2" startYear="2020">
							</yu-datetime-picker>
							<view v-if="acEndTime=='活动结束时间'" style="color: #C0C0C0;" class="time-box" @click="showTime2">{{acEndTime}}</view>
							<view v-else class="time-box" @click="showTime2">{{acEndTime}}</view>
						</view>
						<image @click="showTime2" src="/pagesB/static/imgs/select_time.png" style="width: 19rpx;height: 13rpx;margin-right: 36rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<!-- 活动主办单位 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动主办单位:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="sponsor" class="content" type="text" value=""/>
			</view>
			<!-- 活动承办单位 -->
			<view class="form-item-box">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动承办单位:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<input name="organizer" class="content" type="text" value=""/>
			</view>
			<!-- 活动协办单位 -->
			<view class="form-item-box">
				<text class="title">协办单位:</text>
				<input name="coOrganizer" class="content" type="text" value=""/>
			</view>
			<!-- 活动主题 -->
			<view class="form-item-box-time" style="padding-top: 20rpx;">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动主题:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 4rpx;">*</text>
				</view>
				<view class="right-choose">
						<view class="content">
							<text class="theme-item" @click="changeIndex(index)" :class="{active:item.check == true}" v-for="(item,index) in themeArr" :key="index">{{ item.themeName }}</text>
						</view>
				</view>
			</view>
			<!-- 奖励积分 -->
			<view class="form-item-box">
				<text class="title">奖励积分:</text>
				<input disabled="" name="integral" class="content" type="text" value="30" placeholder="" />
			</view>
			<!-- 收费类型  -->
			<view class="form-item-box">
				<text class="title">收费类型:</text>
				<input disabled="" name="charge" class="content" type="text" value="免费"  />
			</view>
			<!-- 活动宣传图 -->
			<view class="up-mainimg">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动宣传图:</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 14rpx;">*</text>
				</view>
				<view class="up-box">
					<avatar selWidth="680upx" selHeight="260upx" inner=true stretch="longSel" @upload="myUpload" :avatarSrc="activityPic" avatarStyle="width: 680rpx; height: 260rpx;">
					</avatar>
				</view>
				<text class="explain">图片规范：上传前请修改图片宽高为<text style="color: #ff2f29;">680*260</text></text>
				<text class="explain">
					温馨提示：该图片多用于站内、站外宣传请上传一张高品质图片
				</text>
			</view>
			
			<!-- 活动简介  -->
			<view class="activity-intrudution">
				<view class="title" style="display: flex;align-items: center;">
					<text>活动简介:({{intrudutionNum}}/500)</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 16rpx;">*</text>
				</view>
				<textarea maxlength="500" @input="countNum" class="intrudution-box" value="" name="activityIntroduce"/>
			</view>

			<button class="sub-btn" form-type="submit" :disabled="!canCreate">提交</button>
		</form>
	</view>
</template>

<script>
	import xflSelect from '@/pagesB/components/xfl-select.vue'
	import yuDatetimePicker from '@/pagesB/components/yu-datetime-picker.vue'
	import avatar from '@/pagesB/components/yq-avatar.vue'
	import store from '@/store'
	import ActivityApi from '@/servies/ActivityApi.js'
	import CircleApi from '@/servies/CircleApi.js'
	import CommonApi from '@/servies/CommonApi.js'
	import {CompareTime} from '@/utils'
	export default {
		components: {
			xflSelect,
			yuDatetimePicker,
			avatar
		},
		data() {
			return {
				state:store.state,
				formdata: null,
				list: [],
				circleArr:[],
				circleId:'',
				canCreate:true,
				chooseCircle: '',
				startTime: '报名开始时间',
				endTime: '报名截止时间',
				acStarTime: '活动开始时间',
				acEndTime: '活动结束时间',
				themeArr:[],
				intrudutionNum:0, //活动简介字数
				activityPic:'', //临时头像地址
				addrChoose:''//活动地址
			};
		},
		methods: {
			chooseLocation(){ //选择活动地址
				uni.chooseLocation({
				    success:(res) => {
				        // console.log('位置名称：' + res.name);
				        // console.log('详细地址：' + res.address);
				        // console.log('纬度：' + res.latitude);
				        // console.log('经度：' + res.longitude);
						this.addrChoose = res.name
				    }
				});
			},
			submitForm(e) { //提交表单--发布活动
				this.formdata = e.detail.value
				let newFormdata = { ...this.formdata
				}
				//获取活动主题
				let activityThemeArr = this.themeArr.filter(item => {
					return item.check
				})
				let themeArr = activityThemeArr.map(item => {
					return item.themeId
				})
				
				newFormdata.charge = false //不收费
				newFormdata.themeId = themeArr.join(',')
				newFormdata.circleId = this.circleId
				newFormdata.activityPic = this.activityPic
				newFormdata.startTime = this.startTime
				newFormdata.endTime = this.endTime
				newFormdata.acStarTime = this.acStarTime
				newFormdata.acEndTime = this.acEndTime
				
				
				/* 表单验证 */
				//非空验证
				if( !newFormdata.circleId || !newFormdata.activityName || !newFormdata.limitNum || !newFormdata.volunteerLimitNum || !newFormdata.volunteerLimitNum || newFormdata.startTime=='报名开始时间' || newFormdata.endTime=='报名截止时间' || !newFormdata.addr ||newFormdata.acStarTime=='活动开始时间' || newFormdata.acEndTime=='活动结束时间' || !newFormdata.sponsor || !newFormdata.organizer || !newFormdata.themeId || !newFormdata.activityPic || !newFormdata.activityIntroduce ){
					uni.showToast({
						title:'带 * 为必填项哦 ~',
						icon:'none',
						duration:1500
					})
					return
				}
				
				//时间选择验证
				if( CompareTime(newFormdata.startTime,newFormdata.endTime) ){
					uni.showToast({
						title:'报名截止时间必须大于报名开始时间',
						icon:'none',
						duration:2000
					})
					
					return
				}
				
				if( CompareTime(newFormdata.acStarTime,newFormdata.acEndTime) ){
					uni.showToast({
						title:'活动结束时间必须大于活动开始时间',
						icon:'none',
						duration:2000
					})
					
					return
				}
				
				if( CompareTime(newFormdata.endTime,newFormdata.acStarTime) ){
					uni.showToast({
						title:'活动开始时间必须大于报名截止时间',
						icon:'none',
						duration:2000
					})
					
					return
				}
				console.log( newFormdata )
				this.publushActivity(newFormdata)
				
			},
			getHostCircles(){ //获取圈主所属圈子
				CircleApi.getHostCircles( res => {
					console.log( res )
					if( res.length == 0 ){
						this.canCreate = false
						uni.showToast({
							title:'您还没有所属圈子，请先创建圈子',
							icon:'none'
						})
						
					}else{
						this.circleArr = res
						let list = res.map(item => {
							return item.circleName
						})
						this.list = [...list]
					}
					
				})
			},
			getActivityTheme(){  //获取活动主题
				ActivityApi.getActivityTheme(res => {
					let newRes = []
					for (const value of res){
						newRes.push( Object.assign(value,{check:false})  )
					}
					this.themeArr = newRes
				})
			},
			setChoose(e) {  //选择圈子
				this.chooseCircle = e.newVal
				let result = this.circleArr.filter(item => {
					return item.circleName == e.newVal
				})
				this.circleId =  result[0].circleId
			},
			showTime3() {
				this.$refs.dateTime3.show();
			},
			showTime4() {
				this.$refs.dateTime4.show();
			},
			showTime1() {
				this.$refs.dateTime1.show();
			},
			getStopTimer1(e) {
				this.acStarTime = e.selectRes

			},
			showTime2() {
				this.$refs.dateTime2.show();
			},
			getStopTimer2(e) {
				this.acEndTime = e.selectRes

			},
			getStopTimer3(e) {
				this.startTime = e.selectRes
			
			},
			getStopTimer4(e) {
				this.endTime = e.selectRes
			
			},
			changeIndex(index){
				this.themeArr[index].check = !this.themeArr[index].check
			},
			countNum(e){
				this.intrudutionNum = e.detail.value.length
			},
			myUpload(rsp) {  //上传活动图片
				uni.showToast({
					title:'正在上传',
					icon:'loading',
					mask:true,
					duration:1000
				})
				this.activityPic = rsp.path; //更新头像方式一
				CommonApi.uploadPic({filePath:rsp.path,name:'activity'}, res => {
					if( JSON.parse(res.data).data[0] ){
						this.activityPic = JSON.parse(res.data).data[0]
					}else{
						uni.showToast({
							title:'图片上传失败',
							icon:'loading',
							mask:true,
							duration:1000
						})
					}
				})
			},
			publushActivity(params){ //发布活动
			let _that = this
				ActivityApi.publishActivity(params, res => {
					uni.showToast({
						title:res.msg,
						icon:'none',
					})
					_that.time2 = setTimeout( () => {
						uni.switchTab({
							url:'/pages/activity/activity'
						})
					},500 )
					
				})
			}
		
		},
		onLoad(options) {
			this.getHostCircles() //获取圈主所属圈子
			this.getActivityTheme() //获取活动主题
		},
		onHide() {
			this.time2 = ''
		}
	}
</script>

<style lang="scss">
	.create-activity-box {
		border-top: 2rpx solid #eee;
		
		.activity-intrudution{
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0 50rpx;
			.title{
				font-size: 26rpx;
				line-height: 60rpx;
			}
			.intrudution-box{
				width: 640rpx;
				height: 400rpx;
				margin: 0 auto;
				border: 1rpx solid #eee;
				border-radius: 10rpx;
				font-size: 24rpx;
				box-sizing: border-box;
				padding: 10rpx;
			}
		}
		
		.up-mainimg{
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0 50rpx;
			border-bottom: 1rpx solid #eee;
			.title{
				font-size: 26rpx;
				line-height: 60rpx;
			}
			.explain{
				box-sizing: border-box;
				padding: 0 26rpx;
				font-size: 26rpx;
				line-height: 50rpx;
			}
			.up-box{
				width: 680rpx;
				height: 260rpx;
				margin: 0 auto;
				border: 1rpx solid #eee;
				background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMEAAADOCAMAAACwypZ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1OTcxYWI3MS00MWUwLTQ5OGQtYjZjMS01MWQ0MjdiNGM2NjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkM1NEZDMjkzNUU0MTFFQThFMTY4MEZCNUQzMjlFNTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkM1NEZDMjgzNUU0MTFFQThFMTY4MEZCNUQzMjlFNTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCN0Y5RUFEMzREMzNFQTExQTkyQkNCNjNDMzM5NDYxQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1OTcxYWI3MS00MWUwLTQ5OGQtYjZjMS01MWQ0MjdiNGM2NjgiLz4gPC9yZGY6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) no-repeat;
				background-size: 220rpx 220rpx;
				background-position: center;
			}
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
	
		.sub-btn{
			margin-top: 60rpx;
			margin-bottom: 30rpx;
			width: 450rpx;
			height: 60rpx;
			color: #fff;
			background-color: #FF2F29;
			font-weight: bold;
			font-size: 30rpx;
			line-height: 60rpx;
			
		}
	}
</style>
