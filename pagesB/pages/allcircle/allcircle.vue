<template>
	<view class="all-circle-box">
		<!-- 选项卡标题 -->
		<view class="tab-title">
			<view class="title-item" :class="{active:activeIndex == item.type}" v-for="(item) in titleArr" :key="item.type" @click="changeIndex(item.type)">
				<text class="item-title">{{item.title}}</text>
				<text class="bottom-active" v-show="activeIndex == item.type"></text>
			</view>
		</view>
	
		<!-- 创建圈子 -->
		<image class="create-circle-icon" src="/static/activity_icon/reverse.png" mode="" @click="pageToCreateCircle"></image>
		<!-- <view class="create-circle">
			<image class="left-icon" src="/pagesB/static/activity_icon/create-circle.png" mode=""></image>
			<text class="right-create">创建圈子</text>
		</view> -->
		
		<!-- 圈子列表 -->
		<!-- 全部 -->
		<view class="circle-list" v-if="activeIndex == ''">
			<view class="no-data" v-if="allCircleArr.length == 0">
				暂时没有圈子哦 ~ ~
			</view>
			<view v-else>
				<view class="circle-item" v-for="(item,index) in allCircleArr" :key="index">
					<view class="left-info" @click="pageToCircleDetail(item.circleId,item.isCreater)">
						<image class="left-icon" :src="item.headerUrl" mode=""></image>
						<view class="left-name">
							<text>{{item.circleName}}</text>
							<text>{{item.joinNum}}人</text>
						</view>
						<image v-if="item.circleType == 1" class="is-volunteer" src="/pagesB/static/imgs/is_volunteer_circle.png" mode=""></image>
					</view>
					<text class="right-status add" v-if="!item.isJoin" @click="joinCircle(item.circleId)">加入</text>
					<text class="right-status has-add" v-else>已加入</text>
				</view>
			</view>
		</view>
		
		<!-- 我加入的 -->
		<view class="circle-list" v-if="activeIndex == 'IJoined'">
			<view class="no-data" v-if="iJoinCircleArr.length == 0">
				暂时没有圈子哦 ~ ~
			</view>
			<view v-else>
				<view class="circle-item" v-for="(item,index) in iJoinCircleArr" :key="index">
					<view class="left-info" @click="pageToCircleDetail(item.circleId,item.isCreater)">
						<image class="left-icon" :src="item.headerUrl" mode=""></image>
						<view class="left-name">
							<text>{{item.circleName}}</text>
							<text>{{item.joinNum}}人</text>
						</view>
						<image v-if="item.circleType == 1" class="is-volunteer" src="/pagesB/static/imgs/is_volunteer_circle.png" mode="widthFix"></image>
					</view>
					<text class="right-status add" v-if="!item.isJoin" @click="joinCircle(item.circleId)">加入</text>
					<text class="right-status has-add" v-else>已加入</text>
				</view>
			</view>
		</view>
		
		<!-- 我创建的 -->
		<view class="circle-list" v-if="activeIndex == 'ICreated'">
			<view class="no-data" v-if="iCreateCircleArr.length == 0">
				暂时没有圈子哦 ~ ~
			</view>
			<view v-else>
				<view class="circle-item" v-for="(item,index) in iCreateCircleArr" :key="index">
					<view class="left-info" @click="pageToCircleDetail(item.circleId,item.isCreater)">
						<image class="left-icon" :src="item.headerUrl" mode=""></image>
						<view class="left-name">
							<text>{{item.circleName}}</text>
							<text>{{item.joinNum}}人</text>
						</view>
						<image v-if="item.circleType == 1" class="is-volunteer" src="/pagesB/static/imgs/is_volunteer_circle.png" mode="widthFix"></image>
					</view>
					<text class="right-status add" v-if="item.signatureres == 0">审核中</text>
					<text class="right-status add" v-if="item.signatureres == 1">审核通过</text>
					<text class="right-status add" v-if="item.signatureres == 2">未通过</text>
				</view>
			</view>
		</view>
		
		<!-- 未加入的 -->
		<view class="circle-list" v-if="activeIndex == 'notJoined'">
			<view class="no-data" v-if="notJoinCircleArr.length == 0">
				暂时没有圈子哦 ~ ~
			</view>
			<view v-else>
				<view class="circle-item" v-for="(item,index) in notJoinCircleArr" :key="index">
					<view class="left-info" @click="pageToCircleDetail(item.circleId,item.isCreater)">
						<image class="left-icon" :src="item.headerUrl" mode=""></image>
						<view class="left-name">
							<text>{{item.circleName}}</text>
							<text>{{item.joinNum}}人</text>
						</view>
						<image v-if="item.circleType == 1" class="is-volunteer" src="/pagesB/static/imgs/is_volunteer_circle.png" mode="widthFix"></image>
					</view>
					<text class="right-status add" v-if="!item.isJoin" @click="joinCircle(item.circleId)">加入</text>
					<text class="right-status has-add" v-else>已加入</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import store from '@/store'
	import CircleApi from '@/servies/CircleApi.js'
	import api from '@/utils/api.js'
	export default {
		data() {
			return {
				state:store.state,
				titleArr: [{title:'全部',type:''}, {title:'我加入的',type:'IJoined'}, {title:'我创建的',type:'ICreated'}, {title:'未加入的',type:'notJoined'}],
				activeIndex: "",
				allCircleArr:[], //所有圈子
				iJoinCircleArr:[], // 我加入的
				iCreateCircleArr:[], // 我创建的
				notJoinCircleArr:[], // 未加入的
				pageNo:1,
				stopPull:true //阻止下拉刷新
			};
		},
		methods: {
			joinCircle(circleId){ //加入圈子
				let _that = this
				CircleApi.joinCircle({circleId},res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					_that.pageNo = 1
					_that.getCircleListFun(_that.activeIndex)
					
					
				})
			},
			
			getCircleListFun(_type=''){ //获取圈子列表
				CircleApi.getCircleList({
					communityId:this.state.communityId,
					type:_type,
					pageSize:8,
					pageNo:this.pageNo
				},res => {
					// console.log( '圈子列表',res )
					this.stopPull = !res.lastPage
					if( _type == '' ){
						this.allCircleArr = res.list
					}else if( _type == 'IJoined' ) {
						this.iJoinCircleArr = res.list
					}else if( _type == 'ICreated' ){
						this.iCreateCircleArr = res.list
					}else{
						this.notJoinCircleArr = res.list
					}
				})
			},
			
			changeIndex(type) {
				if (this.activeIndex != type) {
					this.activeIndex = type
					this.pageNo = 1 // 当前页码变为1
					this.stopPull = true
					this.getCircleListFun(type)
				}
			},
			pageToCircleDetail(id,creater){
				uni.navigateTo({
					url: '/pagesB/pages/circledetail/circledetail?circleId=' + id + '&isCreater=' + creater,
				});
			},
			pageToCreateCircle(){
				uni.navigateTo({
					url:"/pagesB/pages/createcircle/createcircle"
				})
			}
		},
		onLoad(options){
			let _type = options.type || ''
			this.activeIndex = _type
			this.getCircleListFun(_type)
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getCircleListFun(this.activeIndex)
		},
		onReachBottom(){ //上拉加载更多
			let _this = this
	
			if( _this.stopPull ){
				_this.pageNo ++
				CircleApi.getCircleList({
					communityId:_this.state.communityId,
					type:_this.activeIndex,
					pageSize:8,
					pageNo:_this.pageNo
				},res => {
					// console.log( '圈子列表',res )
					_this.stopPull = !res.lastPage
					if( _this.activeIndex == '' ){
						_this.allCircleArr = [..._this.allCircleArr,...res.list]
					}else if( _this.activeIndex == 'IJoined' ) {
						_this.iJoinCircleArr = [..._this.iJoinCircleArr,...res.list]
					}else if( _this.activeIndex == 'ICreated' ){
						_this.iCreateCircleArr = [..._this.iCreateCircleArr,...res.list]
					}else{
						_this.notJoinCircleArr = [..._this.notJoinCircleArr,...res.list]
					}
				})
			}
		}
	}
</script>

<style lang="scss">

	.all-circle-box {
		//选项卡标题
		.tab-title {
			// border-top: solid 2rpx #eeeeee;
			border-bottom: solid 2rpx #eeeeee;
			padding: 16rpx 0 20rpx 0;
			display: flex;
			justify-content: space-around;

			.title-item {
				text-align: center;
				width: 100rpx;
				flex: 1;
				font-size: 30rpx;
				// font-weight: bold;
				position: relative;
				&.active{
					font-size: 34rpx;
					font-weight: bold;
				}
				// &:not(:last-child) {
				// 	border-right: 2rpx solid #efefef;
				// }

				.bottom-active {
					width: 40%;
					height: 0;
					border: 3rpx solid #e62329;
					position: absolute;
					bottom: -22rpx;
					left: 30%;
					background-color: #e62329;
				}
			}
		}
	
		//创建圈子
		.create-circle-icon{
			width: 105rpx;
			height: 105rpx;
			position: fixed;
			bottom: 105rpx;
			right: 45rpx;
		}
		.create-circle{
			border-bottom: solid 2rpx #eeeeee;
			box-sizing: border-box;
			padding: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left-icon{
				width: 106rpx;
				height: 106rpx;
			}
			.right-create{
				width: 130rpx;
				height: 46rpx;
				color: #fff;
				background-color: #33b1ad;
				line-height: 46rpx;
				font-size: 26rpx;
				text-align: center;
				border-radius: 23rpx;
			}
		}
	
		//圈子列表
		.circle-list{
			.no-data{
				display: block;
				text-align: center;
				line-height: 100rpx;
			}
			.circle-item{
				display: flex;
				box-sizing: border-box;
				padding: 20rpx;
				justify-content: space-between;
				align-items: center;
				
				.left-info{
					display: flex;
					align-items: center;
					flex: 1;
					.left-icon{
						width: 106rpx;
						height: 106rpx;
						margin-right: 20rpx;
						border-radius: 18rpx;
					}
					.left-name{
						display: flex;
						flex-direction: column;
						text{
							font-size: 30rpx;
							color: #000;
							line-height: 50rpx;
						}
						
					}
					.is-volunteer{
						width: 41rpx;
						height: 32rpx;
						margin-left: 10rpx;
						margin-top: -46rpx;
					}
				}
				
				.right-status{
					width: 120rpx;
					height: 40rpx;
					font-size: 26rpx;
					line-height: 40rpx;
					text-align: center;
					border-radius: 20rpx;
					margin-right: 10rpx;
				}
				.add{
					background-color: #e62329;
					color: #fff;
				}
				.has-add{
					background-color: #dcdddd;
					color: #000;
				}
			}
		}
	}
</style>
