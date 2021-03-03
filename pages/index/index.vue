<template>
	<!-- 首页 -->
	<view class="index-home">
		<!-- 导航 -->
		<!-- <view class="nav-bar-top"></view> -->
		<uni-nav-bar fixed status-bar :shadow="false">
			<view style="position: relative;" @click="pageToSearch">
				<image class="search-icon" src="/static/home_icon/search_icon.png"></image>
				<input confirm-type="search" disabled="" @confirm="consoleValue" class="search-color" type="text" v-model="shequName"
				 placeholder="双丰社区" placeholder-style="color: #bababa;" />
			</view>
			<view @click="pageToChooseAddr" class="text-white" slot="left">
				<text class="conmunity">{{state.communityName}}</text>
				<text style="font-size: 16rpx;margin-left: 4rpx;">▼</text>
			</view>
		</uni-nav-bar>

		<!-- 顶部轮播 -->
		<view class="swiper-box">
			<activity-swiper indicatoractivecolor="#0DBA09" :jumpMsg="jumpMsg" autoplay=true indicatorDots=true previousMargin="30rpx"
			 nextMargin="30rpx" :imgs='imgs' height="280"></activity-swiper>
		</view>

		<!-- 社区轮播 -->
		<view class="card2 mt480">
			<swiper class="shequ-swiper" circular indicator-active-color="#FFC500" :indicator-dots="true" :interval="3000"
			 :duration="500">
				<swiper-item class="item-style">
					<view class="swiper-item" @click="pageToMoreActivity">
						<image src="/static/home_icon/active_icon.png" mode="widthFix"></image>
						<text>我的活动</text>
					</view>
					
					<view class="swiper-item" @click="pageToAllCircle">
						<image src="/static/home_icon/my_circle.png" mode="widthFix"></image>
						<text>我的圈子</text>
					</view>
					<view class="swiper-item" @click="pageToVolunteerTeam">
						<image src="/static/home_icon/volunteer_activity.png" mode="widthFix"></image>
						<text>志愿者</text>
					</view>
					<view class="swiper-item" @click="pageToInformationDisclosure">
						<image src="/static/home_icon/ylzl_icon.png" mode="widthFix"></image>
						<text>院落治理</text>
					</view>

				</swiper-item>
				<swiper-item class="item-style">
					<view class="swiper-item">
						<image src="/static/home_icon/dynimic_icon.png" mode="widthFix"></image>
						<text>社区动态</text>
					</view>
					<view class="swiper-item">
						<image src="/static/home_icon/exchange_icon.png" mode="widthFix"></image>
						<text>积分兑换</text>
					</view>
					<view class="swiper-item">
						<image src="/static/home_icon/remin_icon.png" mode="widthFix"></image>
						<text>便民</text>
					</view>
				</swiper-item>

			</swiper>
		</view>

		<!-- 图片 -->
		<view class="show-img">
			<image class="show-img-style" lazy-load src="https://www.quweiquwei.com:5743/images/wxa_pic/show_img.png" mode="widthFix"></image>
		</view>

		<!-- 社区活动和动态 -->
		<view class="card">
			<!-- tab-标题 -->
			<scroll-view class="tab-title" scroll-x='true' scroll-left="16" scroll-with-animation='true'>
				<view class="title-box">
					<view class="title-item" :class="{active:index == currentIndex}" @click="changeIndex(index)" v-for="(item,index) in title"
					 :key="index">
						{{item}}
						<text class="after" v-if="index == currentIndex"></text>
					</view>
				</view>
			</scroll-view>
			<view class="split-line" style="width: 670rpx;margin: 0 auto;"></view>

			<!-- tab-内容 -->
			<view class="tab-content">

				<!-- 疫情动态 -->
				<view class="dynamic" v-show="currentIndex == 0">
					<view style="font-size: 30rpx;text-align: center;line-height: 100rpx;" v-if="epidemicArr.length == 0">
						暂时没有相关疫情动态哦 ~
					</view>
					<view class="item-box" v-for="(item,index) in epidemicArr" :key="index">
						<view class="dynamic-item">
							<image @click="pageToDynamicDetail(item.articleId)" class="dynamic-item-img" lazy-load :src="item.thumbnail"
							 mode=""></image>
							<text class="title">{{item.title}}</text>
							<view class="bottom-share">
								<view class="redu">
									<image style="width: 38rpx;" src="/static/home_icon/guanzhu.png" mode="widthFix" @click="pageToDynamicDetail(item.articleId)"></image>
									<text> {{item.hintcount}}</text>
								</view>
								<view class="share" @click="pageToDynamicDetail(item.articleId)">
									<image style="width: 38rpx;" src="/static/home_icon/pinglun.png" mode="widthFix"></image>
									<text>{{item.commentCount}}</text>
								</view>
								<view class="dianzan">
									<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
									</button>
									<view>
										<image @click="toAdmireArticle(item.articleId,index,'yiqing')" style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png"
										 mode="" v-if="!item.isAdmire"></image>
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan_success.png" mode="" v-else></image>
									</view>
									<text>{{item.admireCount}}</text>
								</view>
							</view>
						</view>
						<view class="split-line"></view>
					</view>
				</view>

				<!-- 社区活动 -->
				<view class="activity" v-show="currentIndex == 1">
					<view style="font-size: 30rpx;text-align: center;line-height: 100rpx;" v-if="activityArr.length == 0">
						暂时没有相关活动哦 ~
					</view>
					<view v-else>
						<view class="item-box" v-for="(item,index) in activityArr" :key="index">
							<view class="acive-item">
								<view class="img-box" @click="pageToDetail(item.activityId)">
									<image class="active-item-img" lazy-load :src="item.acpicUrl" mode=""></image>
									<view class="sign-box">
										<text v-for="(items,i) in item.theme" :key="i">{{items}}</text>
									</view>
								</view>
								<view class="active-detail">
									<view class="detail-left">
										<text class="title">{{item.activityName}}</text>
										<text class="time">活动日期:{{item.acStartTime.slice(2,-3)}}--{{item.acEndTime.slice(2,-3)}}</text>
										<text class="address">{{item.addr}}</text>
									</view>
									<view class="detail-right">
										<view class="baoming-status">
											<image src="/static/home_icon/baoming_icon.png" mode="widthFix"></image>
											<text>{{item.integral}}</text>
										</view>
										<view class="is-baoming">
											{{item.status}}
										</view>
									</view>
								</view>
								<view class="bottom-share">
									<view class="redu">
										<image style="width: 38rpx;" src="/static/home_icon/redu.png" mode="widthFix"></image>
										<text> {{item.viewCount}}</text>
									</view>
									<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
										<image style="width: 38rpx;" src="/static/home_icon/fenxiang.png" mode="widthFix"></image>
										<text> 分享 {{item.shareCount}}</text>
									</button>
									<button class="share-btn" v-if="state.userInfo.headerUrl" open-type="share" :data-title="item.activityName"
									 :data-activityId='item.activityId' :data-imgUrl="item.acpicUrl">
										<image style="width: 38rpx;" src="/static/home_icon/fenxiang.png" mode="widthFix"></image>
										<text> 分享 {{item.shareCount}}</text>
									</button>
									<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
										<text>{{item.admireCount}}</text>
									</button>
									<view class="dianzan" v-if="state.userInfo.headerUrl">
										<view class="dianzan" v-if="!item.isAdmire" @click="toAdmire(item.activityId,index)">
											<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
											<text>{{item.admireCount}}</text>
										</view>
										<view class="dianzan" v-else>
											<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan_success.png" mode=""></image>
											<text>{{item.admireCount}}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="split-line"></view>
						</view>
					</view>

				</view>

				<!-- 社区动态 -->
				<view class="dynamic" v-show="currentIndex == 2">
					<view style="font-size: 30rpx;text-align: center;line-height: 100rpx;" v-if="articleArr.length == 0">
						暂时没有相关动态哦 ~
					</view>
					<view class="item-box" v-for="(item,index) in articleArr" :key="index">
						<view class="dynamic-item">
							<image @click="pageToDynamicDetail(item.articleId)" class="dynamic-item-img" lazy-load :src="item.thumbnail"
							 mode=""></image>
							<text class="title">{{item.title}}</text>
							<view class="bottom-share">
								<view class="redu">
									<image style="width: 38rpx;" src="/static/home_icon/guanzhu.png" mode="widthFix" @click="pageToDynamicDetail(item.articleId)"></image>
									<text> {{item.hintcount}}</text>
								</view>
								<view class="share" @click="pageToDynamicDetail(item.articleId)">
									<image style="width: 38rpx;" src="/static/home_icon/pinglun.png" mode="widthFix"></image>
									<text>{{item.commentCount}}</text>
								</view>
								<view class="dianzan">
									<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
									</button>
									<view v-if="state.userInfo.headerUrl">
										<image @click="toAdmireArticle(item.articleId,index,'shequ')" style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png"
										 mode="" v-if="!item.isAdmire"></image>
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan_success.png" mode="" v-else></image>
									</view>
									<text>{{item.admireCount}}</text>
								</view>
							</view>
						</view>
						<view class="split-line"></view>
					</view>
				</view>

				<!-- 非遗文创 -->
				<view class="dynamic" v-show="currentIndex == 3">
					<view style="font-size: 30rpx;text-align: center;line-height: 100rpx;" v-if="heritageArr.length == 0">
						暂时没有相关动态哦 ~
					</view>
					<view class="item-box" v-for="(item,index) in heritageArr" :key="index">
						<view class="dynamic-item">
							<image @click="pageToDynamicDetail(item.articleId)" class="dynamic-item-img" lazy-load :src="item.thumbnail"
							 mode=""></image>
							<text class="title">{{item.title}}</text>
							<view class="bottom-share">
								<view class="redu">
									<image style="width: 38rpx;" src="/static/home_icon/guanzhu.png" mode="widthFix" @click="pageToDynamicDetail(item.articleId)"></image>
									<text> {{item.hintcount}}</text>
								</view>
								<view class="share" @click="pageToDynamicDetail(item.articleId)">
									<image style="width: 38rpx;" src="/static/home_icon/pinglun.png" mode="widthFix"></image>
									<text>{{item.commentCount}}</text>
								</view>
								<view class="dianzan">
									<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
									</button>
									<view v-if="state.userInfo.headerUrl">
										<image @click="toAdmireArticle(item.articleId,index,'shequ')" style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png"
										 mode="" v-if="!item.isAdmire"></image>
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan_success.png" mode="" v-else></image>
									</view>
									<text>{{item.admireCount}}</text>
								</view>
							</view>
						</view>
						<view class="split-line"></view>
					</view>
				</view>

				<!-- 社情公告 -->
				<view class="dynamic" v-show="currentIndex == 4">
					<view style="font-size: 30rpx;text-align: center;line-height: 100rpx;" v-if="sheqingArr.length == 0">
						暂时没有相关动态哦 ~
					</view>
					<view class="item-box" v-for="(item,index) in sheqingArr" :key="index">
						<view class="dynamic-item">
							<image @click="pageToDynamicDetail(item.articleId)" class="dynamic-item-img" lazy-load :src="item.thumbnail"
							 mode=""></image>
							<text class="title">{{item.title}}</text>
							<view class="bottom-share">
								<view class="redu">
									<image style="width: 38rpx;" src="/static/home_icon/guanzhu.png" mode="widthFix" @click="pageToDynamicDetail(item.articleId)"></image>
									<text> {{item.hintcount}}</text>
								</view>
								<view class="share" @click="pageToDynamicDetail(item.articleId)">
									<image style="width: 38rpx;" src="/static/home_icon/pinglun.png" mode="widthFix"></image>
									<text>{{item.commentCount}}</text>
								</view>
								<view class="dianzan">
									<button class="share-btn" v-if="!state.userInfo.headerUrl" open-type="getUserInfo" @getuserinfo="getInfo">
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png" mode=""></image>
									</button>
									<view v-if="state.userInfo.headerUrl">
										<image @click="toAdmireArticle(item.articleId,index,'shequ')" style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan.png"
										 mode="" v-if="!item.isAdmire"></image>
										<image style="width: 38rpx;height: 38rpx;" src="/static/home_icon/dianzan_success.png" mode="" v-else></image>
									</view>
									<text>{{item.admireCount}}</text>
								</view>
							</view>
						</view>
						<view class="split-line"></view>
					</view>
				</view>
			</view>
		</view>


		<!-- 引导页 -->
		<view class="first-login" v-if="!state.isFirst || state.isFirst != 2">
			<image src="/static/home_icon/first_page.png" mode="widthFix" style="width: 100%;"></image>
			<button type="warn" open-type="getUserInfo" v-if="!state.userInfo.headerUrl" @getuserinfo="getInfo2">立即体验</button>
			<button type="warn" v-if="state.userInfo.headerUrl" @click="setFirstlogin">立即体验</button>
		</view>
		
		
	</view>
</template>

<script>

	import {
		uniNavBar,
		uniCard
	} from '@dcloudio/uni-ui'
	import mySwiper from '../../components/mySwiper.vue'
	import CommonApi from '@/servies/CommonApi.js'
	import activitySwiper from '@/components/activitySwiper.vue'
	import lbPicker from '@/components/lb-picker/index.vue'
	import store from '@/store'
	import ActivityApi from '@/servies/ActivityApi.js'
	import api from '@/utils/api.js'
	import {
		getLocatio_LBS
	} from "@/utils/index";
	export default {
		components: {
			uniNavBar,
			uniCard,
			mySwiper,
			activitySwiper,
			lbPicker
		},
		data() {
			return {
				state: store.state,
				shequName: '',
				imgs: [], //轮播图片地址
				jumpMsg: [], //跳转信息
				title: ["疫情动态", "社区活动", "社区动态", "非遗文创", "社情公告"],
				currentIndex: 0,
				activitySign: ['公益服务', '文化体育', '免费'],
				pageNo: 1, //活动当前页
				allowActivityPull: true, //允许活动下拉刷新
				activityArr: [], //社区活动列表
				articleArr: [], //社区动态列表
				epidemicArr: [], //疫情动态列表
				heritageArr: [], // 非遗文创列表
				sheqingArr: [], //社情公告列表
			}
		},
		methods: {
			pageToInformationDisclosure(){
				uni.navigateTo({
					url:'/pagesC/pages/Informationdisclosure/Informationdisclosure'
				})
			},
			getAdvertBanner() { //获取广告
				CommonApi.getAdvertBanner({
					communityId: this.state.communityId,
					displayPosition: 'ggwz_sy'
				}, res => {
					console.log('轮播图片地址', res)
					this.imgs = res.map(item => this.state.baseUrl + item.picUrl)
					this.jumpMsg = res.map(item => {
						let temObj = {}
						temObj.jump = item.jump
						temObj.jumpUrl = item.jumpUrl
						return temObj
					})
				})
			},
			setFirstlogin() {
				uni.setStorageSync('isFirst', 2)
				store.state.isFirst = uni.getStorageSync("isFirst")
				uni.showTabBar()

				this.getArticleList({ //获取疫情第一页
					companyId: this.state.communityId,
					channelId: '7b6fc0e1-01c3-4f4e-80a3-7246a9a2da15',
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'one', true)
			},
			getInfo2(e) {
				api.bindGetWxInfo(e)
				uni.setStorageSync('isFirst', 2)
				store.state.isFirst = uni.getStorageSync("isFirst")
				uni.showTabBar()
			},
			getInfo(e) {
				api.bindgetuserinfo(e)
			},
			toAdmire(activityId, index) { //点赞活动

				ActivityApi.thumbsUp({
					likeContent: activityId,
					likeType: 'activity'
				}, res => {
					if (res.status == 1) {
						this.activityArr[index].isAdmire = true
						this.activityArr[index].admireCount++
					}
				})
			},
			toAdmireArticle(articleId, index, str) { //点赞动态
				if (str == 'shequ') {
					ActivityApi.thumbsUp({
						likeContent: articleId,
						likeType: 'dynamic'
					}, res => {
						if (res.status == 1) {
							this.articleArr[index].isAdmire = true
							this.articleArr[index].admireCount++
						}
					})
				} else if (str == 'yiqing') {

					ActivityApi.thumbsUp({
						likeContent: articleId,
						likeType: 'dynamic'
					}, res => {
						if (res.status == 1) {
							this.epidemicArr[index].isAdmire = true
							this.epidemicArr[index].admireCount++
						}
					})
				}
			},
			getActivityList(params, type = 'one') { //获取活动列表
				ActivityApi.getActivityList(params, res => {
					if (type == 'one') { //第一页
						this.activityArr = res.list
						this.allowActivityPull = !res.lastPage
					} else { //上拉加载更多
						this.activityArr = [...this.activityArr, ...res.list]
						this.allowActivityPull = !res.lastPage
					}

				})
			},
			getArticleList(params, type = 'one', epidemic) { //获取动态

				if (epidemic == 'yiqing') { //疫情
					ActivityApi.getArticleList(params, res => {
						console.log('疫情动态列表', res.list)
						if (type == 'one') { //第一页
							this.epidemicArr = res.list
							this.allowActivityPull = !res.lastPage
						} else { //上拉加载更多
							this.epidemicArr = [...this.epidemicArr, ...res.list]
							this.allowActivityPull = !res.lastPage
						}
					})
				} else if (epidemic == 'shequ') { //社区动态
					ActivityApi.getArticleList(params, res => {
						console.log('社区动态列表', res.list)
						if (type == 'one') { //第一页
							this.articleArr = res.list
							this.allowActivityPull = !res.lastPage
						} else { //上拉加载更多
							this.articleArr = [...this.articleArr, ...res.list]
							this.allowActivityPull = !res.lastPage
						}
					})
				} else if (epidemic == 'feiyi') { //非遗文创
					ActivityApi.getArticleList(params, res => {
						console.log('非遗文创列表', res.list)
						if (type == 'one') { //第一页
							this.heritageArr = res.list
							this.allowActivityPull = !res.lastPage
						} else { //上拉加载更多
							this.heritageArr = [...this.heritageArr, ...res.list]
							this.allowActivityPull = !res.lastPage
						}
					})
				} else if (epidemic == 'sheqing') { //社情公告
					ActivityApi.getArticleList(params, res => {
						console.log('社情公告', res.list)
						if (type == 'one') { //第一页
							this.sheqingArr = res.list
							this.allowActivityPull = !res.lastPage
						} else { //上拉加载更多
							this.sheqingArr = [...this.sheqingArr, ...res.list]
							this.allowActivityPull = !res.lastPage
						}
					})
				}



			},
			changeIndex(index) {
				if (this.currentIndex != index) {
					this.currentIndex = index
					this.pageNo = 1
					this.allowActivityPull == true
					if (this.currentIndex == 1) {
						this.getActivityList({ //获取社区活动列表第一页
							communityId: this.state.communityId,
							pageSize: 4,
							pageNo: this.pageNo,
						})
					} else if (this.currentIndex == 2) { //获取社区动态第一页
						this.getArticleList({
							companyId: this.state.communityId,
							channelId: this.state.channelId,
							// searchContent:'',
							pageSize: 4,
							pageNo: this.pageNo
						}, 'one', 'shequ')
					} else if (this.currentIndex == 0) { //获取疫情动态第一页
						this.getArticleList({
							companyId: this.state.communityId,
							channelId: '7b6fc0e1-01c3-4f4e-80a3-7246a9a2da15',
							// searchContent:'',
							pageSize: 4,
							pageNo: this.pageNo
						}, 'one', 'yiqing')
					} else if (this.currentIndex == 3) { //获取非遗动态第一页
						this.getArticleList({
							companyId: this.state.communityId,
							channelId: '72a3e965-c241-4adb-a6aa-799f52b32d65',
							// searchContent:'',
							pageSize: 4,
							pageNo: this.pageNo
						}, 'one', 'feiyi')
					} else if (this.currentIndex == 4) { //获取社情公告第一页
						this.getArticleList({
							companyId: this.state.communityId,
							channelId: '4ab2f1af-cc91-42cc-b397-3b8b2e846828',
							// searchContent:'',
							pageSize: 4,
							pageNo: this.pageNo
						}, 'one', 'sheqing')
					}
				}
			},
			pageToDetail(activityId) {
				uni.navigateTo({
					url: '/pagesB/pages/activitydetail/activitydetail?activityId=' + activityId
				})
			},
			pageToDynamicDetail(articleId) {
				uni.navigateTo({
					url: '/pagesB/pages/dynamicdetail/dynamicdetail?articleId=' + articleId
				})
			},
			pageToMoreActivity() {
				uni.navigateTo({
					url: '/pagesB/pages/moreactivity/moreactivity?',

				});
			},
			pageToAllCircle() {
				uni.navigateTo({
					url: '/pagesB/pages/allcircle/allcircle'
				})
			},
			pageToVolunteerTeam() {
				uni.navigateTo({
					url: "/pagesB/pages/volunteerteam/volunteerteam"
				})
			},
			pageToChooseAddr() {
				uni.navigateTo({
					url:"/pagesB/pages/chooseaddr/chooseaddr"
				})
			},
			consoleValue() {
				console.log(this.shequName)
				this.shequName = ""
			},
			pageToSearch() {
				uni.navigateTo({
					url: "/pagesB/pages/homesearchresult/homesearchresult"
				})
			},

		},
		onLoad(options) {
			let scene = (options.scene && decodeURIComponent(options.scene)) || "";
			let sceneArr = (scene && scene.split("=")) || null;
			if (sceneArr && sceneArr[0] == 'activityId') { //小程序码进入---活动考勤
				ActivityApi.activityAttendance({
					activityId: sceneArr[1]
				}, res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					})
					if (res.status == 1) {
						this.timer = setTimeout(() => {
							uni.navigateTo({
								url: '/pagesB/pages/activitydetail/activitydetail?activityId=' + sceneArr[1] + '&activeIndex=1'
							})
						}, 1000)
					}
				})
			}

			if (sceneArr && sceneArr[0] == 'volunteer') { //小程序码进入---申请志愿者
				if (this.state.userInfo != null && this.state.userInfo.isVolunteer) {
					uni.navigateTo({
						url: '/pagesB/pages/volunteerneedknow/volunteerneedknow'
					})
				} else {
					uni.navigateTo({
						url: '/pagesC/pages/volunteerinfo/volunteerinfo'
					})
				}
			}

			this.getAdvertBanner() //获取广告

			if (this.state.isFirst == 2) {
				this.getArticleList({ //获取疫情第一页
					companyId: this.state.communityId,
					channelId: '7b6fc0e1-01c3-4f4e-80a3-7246a9a2da15',
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'one', 'yiqing')
			}

		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				let activityId = res.target.dataset.activityid
				let title = res.target.dataset.title
				let imgUrl = res.target.dataset.imgurl
				console.log(res.target)
				ActivityApi.shareActivity({
					activityId
				}, res => {
					console.log(res)
				})
				return {
					title: title,
					path: '/pagesB/pages/activitydetail/activitydetail?activityId=' + activityId,
					imageUrl: imgUrl
				}
			}

		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.allowActivityPull == true
			if (this.currentIndex == 1) { //刷新活动
				this.getActivityList({ //获取活动列表第一页
					communityId: this.state.communityId,
					pageSize: 4,
					pageNo: this.pageNo
				})
			} else if (this.currentIndex == 2) { //刷新动态
				this.getArticleList({ //获取社区动态第一页
					companyId: this.state.communityId,
					channelId: this.state.channelId,
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'one', 'shequ')
			} else if (this.currentIndex == 0) { //刷新疫情
				this.getArticleList({ //获取疫情动态第一页
					companyId: this.state.communityId,
					channelId: '7b6fc0e1-01c3-4f4e-80a3-7246a9a2da15',
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'one', 'yiqing')
			} else if (this.currentIndex == 3) { //刷新非遗
				this.getArticleList({ //获取非遗栏目第一页
					companyId: this.state.communityId,
					channelId: '7b6fc0e1-01c3-4f4e-80a3-7246a9a2da15',
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'one', 'feiyi')
			} else if (this.currentIndex == 4) { //刷新社情
				this.getArticleList({ //获取社情公告第一页
					companyId: this.state.communityId,
					channelId: '4ab2f1af-cc91-42cc-b397-3b8b2e846828',
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'one', 'sheqing')
			}
		},
		onReachBottom() { //上拉加载更多
			if (this.currentIndex == 1 && this.allowActivityPull) { //加载活动
				this.pageNo++
				this.getActivityList({
					communityId: this.state.communityId,
					pageSize: 4,
					pageNo: this.pageNo
				}, 'more')
			} else if (this.currentIndex == 2 && this.allowActivityPull) { //加载社区动态
				this.pageNo++
				this.getArticleList({
					companyId: this.state.communityId,
					channelId: this.state.channelId,
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'more', 'shequ')
			} else if (this.currentIndex == 0 && this.allowActivityPull) { //加载疫情
				this.pageNo++
				this.getArticleList({
					companyId: this.state.communityId,
					channelId: '7b6fc0e1-01c3-4f4e-80a3-7246a9a2da15',
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'more', 'yiqing')
			} else if (this.currentIndex == 3 && this.allowActivityPull) { //加载非遗
				this.pageNo++
				this.getArticleList({
					companyId: this.state.communityId,
					channelId: '72a3e965-c241-4adb-a6aa-799f52b32d65',
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'more', 'feiyi')
			} else if (this.currentIndex == 4 && this.allowActivityPull) { //加载社情
				this.pageNo++
				this.getArticleList({
					companyId: this.state.communityId,
					channelId: '4ab2f1af-cc91-42cc-b397-3b8b2e846828',
					// searchContent:'',
					pageSize: 4,
					pageNo: this.pageNo
				}, 'more', 'sheqing')
			}
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.first-login {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		z-index: 10000;

		button {
			width: 460rpx;
			height: 65rpx;
			line-height: 65rpx;
		}
	}

	.no-login {
		background-color: #fff;
		// text-decoration: underline;
		color: #fff;
		font-size: 30rpx;
		border: none;
		padding: 0;
		display: inline-block;

		&::after {
			border: none;

		}
	}

	.split-line {
		height: 2rpx;
		background-color: #eee;
	}

	.index-home {
		position: relative;

		//顶部轮播
		.swiper-box {
			/* position: absolute;
			width: 100%;
			top: 130rpx;
			left: 0; */
			padding-top: 20rpx;
		}

		//社区轮播
		.shequ-swiper {
			height: 180rpx;

			.item-style {
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				padding-top: 10rpx;

				.swiper-item {
					width: 140rpx;
					margin: 0rpx 23rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 80rpx;
						height: 80rpx;
					}

					text {
						font-size: 26rpx;
						line-height: 50rpx;
					}
				}
			}
		}

		//选项卡
		.tab-title {
			width: 710rpx;
			margin: 0 auto;

			::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
			}

			.title-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.title-item {
				width: 138rpx;
				flex-shrink: 0;
				font-size: 30rpx;
				position: relative;
				color: #000000;
				padding: 0rpx 20rpx;
				margin: 10rpx 0;
				line-height: 60rpx;

				&.active {
					font-size: 34rpx;
					font-weight: bold;
				}

				.after {
					width: 30%;
					height: 0;
					border: 2rpx solid #e62329;
					position: absolute;
					bottom: -10rpx;
					left: 35%;
					background-color: #e62329;
				}
			}
		}

		.tab-content {
			margin-top: 10rpx;

			.activity {
				.item-box {
					// margin-bottom: 20rpx;
					padding: 20rpx 20rpx 0rpx 20rpx;

					.acive-item {
						display: flex;
						flex-direction: column;

						.img-box {
							position: relative;

							.active-item-img {
								width: 100%;
								height: 296rpx;
								vertical-align: middle;
								border-radius: 10rpx;
							}

							.sign-box {
								display: flex;
								position: absolute;
								flex-wrap: wrap;
								top: 0;
								left: 0;

								text {
									color: #fff;
									background-color: #FF2F29;
									font-size: 22rpx;
									line-height: 36rpx;
									padding: 0 30rpx;
									text-align: center;
									border-radius: 10rpx;
									margin-right: 10rpx;
									letter-spacing: 6rpx;
								}
							}
						}

						.active-detail {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin: 0 10rpx;

							.detail-left {
								display: flex;
								flex-direction: column;
								width: 80%;

								.title {
									font-size: 30rpx;
									line-height: 60rpx;
									color: #333333;
								}

								.time,
								.address {
									font-size: 24rpx;
									line-height: 40rpx;
									color: #9fa0a0;
								}

							}

							.detail-right {
								display: flex;
								flex-direction: column;
								align-items: center;
								width: 20%;
								height: 100%;
								justify-content: space-between;

								.is-baoming {
									margin-top: 20rpx;
									width: 110rpx;
									height: 30rpx;
									border: solid 2rpx #e62329;
									color: #e62329;
									font-size: 24rpx;
									line-height: 30rpx;
									text-align: center;
									border-radius: 6px;
								}

								.baoming-status {
									display: flex;
									align-items: center;

									image {
										width: 42rpx;
										margin-right: 10rpx;
									}

									text {
										color: #e62329;
										font-size: 24rpx;
									}
								}
							}
						}

						.bottom-share {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin: 10rpx;

							.redu,
							.share-btn {
								background-color: #fff;
								border: none;
								outline: none;
								display: flex;
								align-items: center;
								font-size: 26rpx;
								color: #a0a1a1;

								&:after {
									border: none;
								}
							}

							,
							.dianzan {
								display: flex;
								align-items: center;
								line-height: 60rpx;
								font-size: 26rpx;
								color: #a0a1a1;

								image {
									margin-right: 10rpx;
								}
							}
						}
					}
				}

			}

			.dynamic {
				.item-box {
					// margin-bottom: 20rpx;
					padding: 20rpx 20rpx 0 20rpx;

					.dynamic-item {
						display: flex;
						flex-direction: column;

						.dynamic-item-img {
							width: 100%;
							height: 296rpx;
							border-radius: 10rpx;
						}

						.title {
							font-size: 30rpx;
							line-height: 60rpx;
							color: #333333;
							margin: 0 10rpx;
						}

						.bottom-share {
							display: flex;
							justify-content: space-between;
							align-items: center;
							margin: 0 10rpx 20rpx 10rpx;

							.redu,
							.share,
							.dianzan {
								display: flex;
								align-items: center;
								line-height: 60rpx;
								font-size: 26rpx;
								color: #a0a1a1;

								image {
									margin-right: 10rpx;
								}
							}
						}
					}
				}
			}
		}

		.text-white {
			color: #000;
			display: flex;
			justify-content: center;
			font-size: 32rpx;
			// width: 150rpx;

			.conmunity {
				display: inline-block;
				width: 130rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				font-size: 32rpx;
			}
		}

		.search-icon {
			width: 38rpx;
			height: 38rpx;
			position: absolute;
			left: 20rpx;
			top: 6rpx;
		}

		.search-color {
			width: 260rpx;
			height: 50rpx;
			background-color: #f4f4f4;
			// background-color: #000;
			border-radius: 50rpx;
			padding-left: 80rpx;
			font-size: 26rpx;
		}

		.card {
			background-color: #fff;
			border-radius: 10rpx;
			margin: 20rpx;
			// box-shadow: 0rpx 6rpx 10rpx #ddd;
			
		}
		
		.card2{
			background-color: #fff;
			margin: 20rpx 0;
		}

		.show-img {
			margin: 0 20rpx;
			// height: 250rpx;
			background-color: #ffffff;
			// box-shadow: 0rpx 12rpx 27rpx 2rpx rgba(85, 94, 98, 0.15);

			.show-img-style {
				width: 100%;
				height: 100%;
				vertical-align: middle;
			}
		}
	}

	.index-home .uni-navbar--border .data-v-43bbfcce {
		border-bottom: 0 !important;
	}

	.mt480 {
		// margin-top: 160rpx !important;
		padding-top: 20rpx;
	}
</style>
