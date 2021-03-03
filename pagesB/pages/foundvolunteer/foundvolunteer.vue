<template>
	<view class="found-volunteer">
		<!-- 顶部筛选 -->
		<view class="top-type">
			<text :class="{active:item.check}" v-for="(item,index) in typeArr" :key="index" @click="changeCheck(index)">{{ item.name }}</text>
		</view>

		<!-- 志愿者列表 -->
		<view class="volunteer-list">

			<view class="no-volunteer" v-if="personArr.length == 0">
				暂时没有相关人员哦~
			</view>

			<view class="volunteers">
				<view v-for="(item,index) in personArr" :key="index">
					<view class="volunteer-item">
						<image class="left" :src="item.headerUrl" mode=""></image>
						<view class="right">
							<view class="right-top">
								<text>{{item.personname}}</text>
								<image src="/pagesB/static/imgs/member.png" mode="" v-if="item.isPartyMember"></image>
							</view>
							<view class="right-bottom">
								<text class="type-item" v-for="(s,i) in item.skills" :key="i">{{s}}</text>
							</view>
							<text class="intruduce">{{item.personalExplanation || '无'}}</text>
						</view>
						<image @click="makePhoneCall(item.personpho)" src="/pagesB/static/imgs/phone.png" style="width: 40rpx;height: 40rpx;margin:0 20rpx 0 10rpx;align-self: flex-start;"
						 mode=""></image>
					</view>
					<view class="split-line"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UserApi from '@/servies/UserApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state,
				typeArr: [],
				type: '',
				pageNo: 1,
				allowPull: false, //允许上拉加载更多
				personArr: [], //人员列表
				filterSkills: ''

			};
		},
		methods: {
			getPartyMemberList(type = 'one') { //获取党员列表
				UserApi.getPartyMemberList({
					skills: this.filterSkills || '',
					pageSize: 10,
					pageNo: this.pageNo,
					communityId:this.state.communityId
				}, res => {
					console.log('人员列表', res.list)
					if (type == 'one') { //第一页
						this.personArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.personArr = [...this.personArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			getVolunteerList(type = 'one') { //获取志愿者列表
				UserApi.getVolunteerList({
					skills: this.filterSkills || '',
					pageSize: 10,
					pageNo: this.pageNo,
					communityId:this.state.communityId,
					type:'find'
				}, res => {
					console.log('人员列表', res.list)
					if (type == 'one') { //第一页
						this.personArr = res.list
						this.allowPull = !res.lastPage
					} else { //上拉加载更多
						this.personArr = [...this.personArr, ...res.list]
						this.allowPull = !res.lastPage
					}
				})
			},
			changeCheck(index) { //改变筛选条件
				this.typeArr[index].check = !this.typeArr[index].check

				let newArr = this.typeArr.filter(item => {
					return item.check
				})
				let idArr = newArr.map(item => item.id)
				this.filterSkills = idArr.join()
				this.pageNo = 1
				if (this.type == 'dangyuan') { //获取党员第一页
					this.getPartyMemberList()
				} else { //获取志愿者第一页
					this.getVolunteerList()
				}
			},
			makePhoneCall(Num) {
				uni.makePhoneCall({
					phoneNumber: Num,
					success() {
						// console.log( '拨打成功' )
					}
				})
			},
		},
		onLoad(options) {
			this.type = options.type
			let title = options.type == 'dangyuan' ? '找党员' : '找志愿者'
			uni.setNavigationBarTitle({ //动态设置标题
				title
			});

			UserApi.getUserInfoOptions(res => {
				let newArr = res.skills.map(item => {
					item.check = false
					return item
				})
				this.typeArr = newArr
			})

			if (options.type == 'dangyuan') { //获取党员第一页
				this.getPartyMemberList()
			} else { //获取志愿者第一页
				this.getVolunteerList()
			}
		},
		onHide() {
			this.pageNo = 1
			this.personArr = []
		},
		onPullDownRefresh() { //下拉刷新
			this.pageNo = 1
			if (options.type == 'dangyuan') { //获取党员第一页
				this.getPartyMemberList()
			} else { //获取志愿者第一页
				this.getVolunteerList()
			}
		},
		onReachBottom() { //上拉加载更多
			if (this.allowPull) {
				this.pageNo ++
				if (this.type == 'dangyuan') { //获取党员第一页
					this.getPartyMemberList('more')
				} else { //获取志愿者第一页
					this.getVolunteerList('more')
				}
			}
		}
	}
</script>

<style lang="scss">
	.split-line {
		height: 2rpx;
		background-color: #eef;
	}

	.found-volunteer {
		box-sizing: border-box;
		padding: 34rpx 22rpx 0rpx 22rpx;

		/* 顶部筛选 */
		.top-type {
			display: flex;
			flex-wrap: wrap;
			
			text {
				font-size: 26rpx;
				padding: 0 20rpx;
				// letter-spacing: 6rpx;
				margin: 9rpx;
				height: 50rpx;
				background-color: #dcdddd;
				border-radius: 10rpx;
				line-height: 50rpx;
				text-align: center;

				&.active {
					background-color: #f4adaf;
				}
			}
		}

		/* 志愿者列表 */
		.volunteer-list {
			box-sizing: border-box;
			padding: 20rpx;

			.no-volunteer {
				font-size: 30rpx;
				text-align: center;
				line-height: 60rpx;
			}

			.volunteers {
				.volunteer-item {
					margin: 30rpx 0;
					display: flex;
					align-items: flex-start;
					justify-content: flex-start;

					.left {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
						margin-right: 50rpx;
					}

					.right {
						flex: 1;
						display: flex;
						flex-direction: column;

						.right-top {
							display: flex;
							align-items: center;
							margin-bottom: 8rpx;

							text {
								font-size: 26rpx;
								margin-right: 20rpx;
							}

							image {
								width: 26rpx;
								height: 29rpx;
							}
						}

						.right-bottom {
							display: flex;
							justify-content: flex-start;
							flex-wrap: wrap;

							text {
								font-size: 22rpx;
								line-height: 30rpx;
								background-color: #e62329;
								color: #fff;
								padding: 0 10rpx;
								border-radius: 8rpx;
								margin: 4rpx 0;
								margin-right: 20rpx;
							}
						}

						.intruduce {
							font-size: 26rpx;
							line-height: 40rpx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
						}
					}
				}

			}
		}
	}
</style>
