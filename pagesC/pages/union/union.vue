<template>
	<view class="union">
		<!-- tab-title -->
		<view class="tab-title">
			<view class="item-box" @click="changeActiveIndex(index)" v-for="(item,index) in titleArr" :key="index">
				<text class="item" :class="{active:index == activeIndex}">{{item}}</text>
				<text class="bottom-line" v-if="index == activeIndex"></text>
			</view>
		</view>
		<!-- tab-content -->
		<view class="tab-content">
			
			<view class="content-item" v-for="(item,index) in merchanArr" @click="pageToMerchanInfo(item)" :key="index">
				<view class="left-pic">
					<image class="img" lazy-load="true" :src="item.thumbnail" mode=""></image>
				</view>
				
				<view class="right-msg">
					<view class="top-connect">
						<view class="union-name">
							<image class="danghui" src="/pagesC/static/imgs/danghui.png" mode=""></image>
							<text class="name">{{ item.supplierName }}</text>
						</view>
						<image @click.stop="makePhone(item.phonenum)" class="call-union" src="/pagesC/static/imgs/call_union.png" mode=""></image>
					</view>
					
					<view class="score-box">
						<view class="left-scre" @click="pageToMerchanInfo(item)">
							<image v-for="(q,w) in item.score" :key="w" src="/static/service_icon/star_icon.png" mode=""></image>
							<image v-for="(q,w) in 5 - item.score" :key="w" src="/static/service_icon/star_icon_false.png" mode=""></image>
						</view>
						<text class="right-distance">{{ item.distance }}</text>
					</view>
					
					<view class="address-box">
						<image class="icon" src="/pagesC/static/imgs/address_green.png" mode=""></image>
						<text class="address">{{ item.detailAddress }}</text>
					</view>
					
					<view class="service-box">
						<view class="service-item" v-for="(i,v) in serviceList" :key="v">
							<image v-if="item.serviceTag.includes(i.name)" class="icon-item" :src="i.iconpath[0]" mode=""></image>
							<image v-else class="icon-item" :src="i.iconpath[1]" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SupplierApi from '@/servies/SupplierApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				titleArr: ['贡献排名', '离我最近'],
				activeIndex: 0,
				pageNo: 1,
				allowPull: false,
				merchanArr: [], // 居商联盟列表
				serviceList:[
					{name:'雨伞',choose:false,iconpath:['/static/service_icon/yusan_icon.png','/static/service_icon/yusan_hui.png']},
					{name:'歇脚',choose:false,iconpath:['/static/service_icon/xiejiao_icon.png','/static/service_icon/xiejiao_hui.png']},
					{name:'开水',choose:false,iconpath:['/static/service_icon/kaishui_icon.png','/static/service_icon/kaishui_hui.png']},
					{name:'兼职',choose:false,iconpath:['/static/service_icon/jianzhi_icon.png','/static/service_icon/jianzhi_hui.png']},
					{name:'微波炉',choose:false,iconpath:['/static/service_icon/weibolu_icon.png','/static/service_icon/weibolu_hui.png']},
					{name:'停车',choose:false,iconpath:['/static/service_icon/tingche_icon.png','/static/service_icon/tingche_hui.png']}
				]
			};
		},
		methods: {
			pageToMerchanInfo(item){
				uni.navigateTo({
					url:'/pagesB/pages/merchantinfo/merchantinfo?item=' + JSON.stringify(item)
				})
			},
			makePhone(num){ //拨打电话
				uni.makePhoneCall({
					phoneNumber:num
				})
			},
			getBusinessLeagues(type = 'one') { //获取居商联盟列表
				SupplierApi.getBusinessLeagues({
					communityId: this.state.communityId,
					location: this.state.lng + ',' + this.state.lat,
					order: this.activeIndex == 0 ? 'contribution' : 'distance',
					pageSize: 6,
					pageNo: this.pageNo
				}, res => {
					if (type == 'one') {
						this.merchanArr = res.list
						this.allowPull = !res.lastPage
					} else {
						this.merchanArr = [...this.merchanArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			changeActiveIndex(index) {
				if (this.activeIndex != index) {
					this.activeIndex = index
					this.pageNo = 1
					this.getBusinessLeagues()
				}
			}
		},
		onLoad(options) {
			this.getBusinessLeagues()
		},
		computed: {
			serviceTag() { //居商联盟服务标签
				let TagArr = []
				if (this.merchanArr != []) {
					let temArr = this.merchanArr.map(item => item.serviceTag)

					TagArr = temArr.map(item => {
						let arr = []
						for (let i = 0; i < item.length; i++) {
							if (item[i] == '雨伞') {
								arr.push({
									pic: '/static/service_icon/yusan_icon.png',
									name: '雨伞'
								})
							}
							if (item[i] == '歇脚') {
								arr.push({
									pic: '/static/service_icon/xiejiao_icon.png',
									name: '歇脚'
								})
							}
							if (item[i] == '开水') {
								arr.push({
									pic: '/static/service_icon/kaishui_icon.png',
									name: '开水'
								})

							}
							if (item[i] == '兼职') {
								arr.push({
									pic: '/static/service_icon/jianzhi_icon.png',
									name: '兼职'
								})

							}
							if (item[i] == '微波炉') {
								arr.push({
									pic: '/static/service_icon/weibolu_icon.png',
									name: '微波炉'
								})

							}

						}
						if (arr.length > 4) {
							return arr.slice(0, 4)
						}
						return arr
					})

				}
				return TagArr


			}
		},
		onReachBottom() { //上拉加载更多
			this.getBusinessLeagues('more')
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			this.getBusinessLeagues()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EFEFEF;
	}

	.union {

		// tab-title
		.tab-title {
			display: flex;
			align-items: center;
			justify-content: space-around;

			.item-box {
				position: relative;

				.item {
					font-size: 30rpx;
					line-height: 118rpx;
					letter-spacing: 3rpx;
				}
				.active{
					font-size: 34rpx;
					font-weight: bold;
				}

				.bottom-line {
					position: absolute;
					width: 50%;
					left: 22%;
					bottom: 30rpx;
					height: 4rpx;
					background-color: #e62329;
				}
			}
		}

		// tab-content
		.tab-content {
			margin: 0 20rpx 20rpx 20rpx;
			
			.content-item{
				display: flex;
				// align-items: center;
				justify-content: space-between;
				background-color: #fff;
				border-radius: 20rpx;
				margin-bottom: 16rpx;
				padding: 26rpx;
				.left-pic{
					width: 200rpx;
					height: 200rpx;
					border-radius: 10rpx;
					margin-right: 24rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
				.right-msg{
					width: 434rpx;
					height: 100%;
					display: flex;
					flex-direction: column;
					.top-connect{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.union-name{
							display: flex;
							align-items: center;
							.danghui{
								width: 31rpx;
								height: 31rpx;
								margin-right: 10rpx;
							}
							.name{
								font-size: 30rpx;
								letter-spacing: 3rpx;
								line-height: 48rpx;
							}
						}
						.call-union{
							width: 34rpx;
							height: 34rpx;
						}
					}
					
					.score-box{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.left-scre{
							display: flex;
							align-items: center;
							image{
								width: 21rpx;
								height: 21rpx;
								margin-right: 8rpx;
							}
						}
						.right-distance{
							font-size: 22rpx;
							letter-spacing: 4rpx;
							line-height: 60rpx;
						}
					}
					
					.address-box{
						display: flex;
						align-items: center;
						.icon{
							width: 24rpx;
							height: 31rpx;
							margin-right: 16rpx;
						}
						.address{
							width: 380rpx;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							line-height: 44rpx;
							font-size: 22rpx;
						}
					}
					
					.service-box{
						display: flex;
						align-items: center;
						justify-content: space-between;
						.service-item{
							width: 36rpx;
							height: 36rpx;
							.icon-item{
								width: 100%;
								height: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>
