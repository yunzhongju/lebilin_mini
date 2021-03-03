<template>
	<view class="my-message">
		<!-- 顶部全选 -->
		<view class="top-select-all">
			<view class="btn" v-if="showDel">
				<text class="no-choose" @click="setAll">取消</text>
				<text>全选</text>
				<image class="select-icon" v-if="showDel && isAll" @click="changeSelectAll(false)" src="/pagesC/static/imgs/choose_true.png" mode=""></image>
				<image class="select-icon" v-if="showDel && !isAll" @click="changeSelectAll(true)" src="/pagesC/static/imgs/choose_false.png" mode=""></image>
			</view>
		</view>

		<!-- 消息列表 -->
		<view class="message-item" v-for="(item,index) in msgArr" :key="index" @longpress="showDelFun(index)">
			<view class="top-time">
				{{ item.createtime }}
			</view>
			<view class="msg">
				<image class="is-select" v-if="showDel && item.check" @click="isSelect(index)" src="/pagesC/static/imgs/choose_true.png" mode=""></image>
				<image class="is-select" v-if="showDel && !item.check" @click="isSelect(index)" src="/pagesC/static/imgs/choose_false.png" mode=""></image>
				<view class="title">
					【{{ title[index] }}】
				</view>
				<view class="content">
					{{item.informTitle}}
				</view>

				<view class="to-look">
					<text class="btn" @click="pageToNew(item.informType,item.dataId,item.informId,index)">立即查看>></text>
					<text class="is-look" v-if="!item.isRead"></text>
				</view>
			</view>
		</view>


		<!-- 底部固定栏 -->
		<view class="bottom-fixed" v-if="showDel" @click="deleteUnreadMessage">
			<image src="/pagesC/static/imgs/delete.png" mode=""></image>
			<text>删除</text>
		</view>
	</view>
</template>

<script>
	import UserApi from '@/servies/UserApi.js'
	export default {
		data() {
			return {
				isShowDel:false ,//是否显示删除图标
				pageNo:1,
				allowPull:false,
				msgArr:[], // 消息列表
				showDel:false, //是否显示删除
				isAll:false, //是否全部选中
			};
		},
		computed:{
			title(){
				let titleArr = []
				if( this.msgArr != [] ){
					titleArr = this.msgArr.map(item => {
						if( item.informType == 'activity' ){
							return '活动报名'
						}else if( item.informType == 'activityReply' ){
							return '活动恢复'
						}else if( item.informType == 'articleReply' ){
							return '动态回复'
						}else if( item.informType == 'wish' ){
							return '心愿'
						}
					})
				}
				
				return titleArr
			}
		},
		methods:{
			deleteUnreadMessage(){ //删除消息
				let temArr = this.msgArr.filter(item => item.check)
				if( temArr.length == 0 ){
					return uni.showToast({
						title:'请选中要删除的消息~',
						icon:'none'
					})
				}else {
					let strArr = temArr.map(item => item.informId)
					UserApi.deleteUnreadMessage({informId:strArr.join(';')},res => {
						console.log( res )
						this.setAll()
						this.pageNo = 1
						this.getUnreadMessage()
					})
				}
			},
			setAll(){ //退出选择
				this.showDel = false
				this.msgArr.filter(item => {
					item.check = false
				})
			},
			changeSelectAll(bool){ //全选和取消全选
				this.isAll = bool
				this.msgArr.filter(item => {
					item.check = bool
				})
			},
			isSelect(index){ //选择单条消息
				this.msgArr[index].check = !this.msgArr[index].check
				this.isSelectAll()
			},
			isSelectAll(){ //判断是否已经全选
				this.isAll = this.msgArr.every(item => item.check)
			},
			showDelFun(index){
				this.showDel = !this.showDel
				if( this.showDel ){
					this.msgArr[index].check = true
					this.isSelectAll()
				}
			},
			pageToNew(informType,dataId,informId,index){ //根据消息类型跳转
				if( !this.msgArr[index].isRead ){
					this.markRead(informId,index)
				}
				
				if( informType == 'activity' ){ //活动报名
					uni.navigateTo({
						url:'/pagesB/pages/activitydetail/activitydetail?activityId=' + dataId
						
					})
				}else if( informType == 'activityReply' ){ //活动回复
					uni.navigateTo({
						url:'/pagesB/pages/activitydetail/activitydetail?activityId=' + dataId
						
					})
				}else if( informType == 'articleReply' ){ //动态回复
					uni.navigateTo({
						url:'/pagesB/pages/dynamicdetail/dynamicdetail?articleId=' + dataId
						
					})
				}else if( informType == 'wish' ){ //心愿列表
					uni.navigateTo({
						url:'/pagesB/pages/hopeevaluation/hopeevaluation?msgId=' + dataId
						
					})
				}
			},
			markRead(informId,index){ //标记消息已读
				UserApi.markRead({informId},res => {
					this.msgArr[index].isRead = true
				})
			},
			getUnreadMessage(type='one'){ //获取消息列表
				UserApi.getUnreadMessage({
					pageNo:this.pageNo,
					pageSize:8
				},res => {
					console.log( '消息列表',res )
					if( type == 'one' ){
						let newArr = res.list.map(item => {
							item.check = false
							return item
						})
						this.msgArr = newArr
						this.allowPull = !res.lastPage
					}else{
						let newArr = res.list.map(item => {
							item.check = false
							return item
						})
						this.msgArr = [...this.msgArr,...newArr]
						this.allowPull = !res.lastPage
					}
				})
			}
		},
		onLoad(options) {
			this.getUnreadMessage()
		},
		onReachBottom() {
			if( this.allowPull ){
				this.pageNo ++ 
				this.getUnreadMessage('more')
			}
		},
		onPullDownRefresh() {
			this.pageNo = 1
			this.getUnreadMessage()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #E5E5E5;
		// height: 100%;
	}
	.my-message {
		padding-bottom: 100rpx;

		// 顶部全选
		.top-select-all {
			font-size: 25rpx;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
			line-height: 60rpx;
			.btn {
				margin-right: 26rpx;
				display: flex;
				align-items: center;
				.no-choose{
					display: inline-block;
					margin-right: 30rpx;
				}
				.select-icon {
					width: 30rpx;
					height: 30rpx;
					margin-left: 8rpx;
				}
			}

		}

		//消息列表
		.message-item {
			margin: 12rpx 16rpx;
			height: 254rpx;
			display: flex;
			flex-direction: column;

			.top-time {
				font-size: 22rpx;
				color: #999;
				line-height: 40rpx;
				text-align: center;
			}

			.msg {
				height: 100%;
				position: relative;
				background-color: #fff;
				border-radius: 20rpx;
				box-sizing: border-box;
				padding: 20rpx 22rpx;

				.title {
					font-size: 25rpx;
					margin-bottom: 10rpx;
				}

				.content {
					font-size: 25rpx;
					line-height: 40rpx;
					margin-bottom: 10rpx;
					
					overflow : hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;

				}

				.to-look {
					position: absolute;
					right: 22rpx;
					bottom: 20rpx;
					display: flex;
					align-items: center;

					.btn {
						font-size: 25rpx;
						margin-right: 10rpx;
					}

					.is-look {
						display: inline-block;
						width: 10rpx;
						height: 10rpx;
						border-radius: 50%;
						background-color: #FF2F29;
					}
				}

				.is-select {
					width: 30rpx;
					height: 30rpx;
					position: absolute;
					top: 10rpx;
					right: 10rpx;
				}
			}
		}
	}

	.bottom-fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #F3F3F1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		image{
			width: 30rpx;
			height: 30rpx;
		}
		text{
			margin-top: 10rpx;
			font-size: 25rpx;
			color: #999;
		}
	}
</style>
