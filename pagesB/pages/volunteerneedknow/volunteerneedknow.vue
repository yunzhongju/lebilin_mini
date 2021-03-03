<template>
	<view class="volunteer-box">
		<view class="title">
			<text class="title-sty">志愿者服务需知</text>
		</view>

		<view class="abstract">
			<text class="abstract-content">
				为深入贯彻落实成都市委市政府建设“志愿者之城”的战略规划，推广志愿服务理念，提高志愿服务水平，社区党委联合有关单位以志愿服务信息管理平台为载体，为志愿者（义工）及志愿服务组织等用户提供基于互联网以及移动网的信息化服务。为明确双方的权利和义务，规范双方业务行为，志愿服务信息管理平台注册用户（以下简称用户）与社区党委本着平等互利的原则，就网上办理业务相关事宜达成如下协议：
			</text>
		</view>
		<view class="item-one">
			<text class="one-title">第一条 网上办理业务的前提</text>
			<text class="one-content">
				用户必须完全同意本协议条款及相关网上办理业务的服务条款，才可以办理本网站的各类业务。本网站所提供的服务应按照服务条款和操作规则严格执行。用户进入注册程序并点击“同意”按钮，即表示用户已与社区党委达成本协议，用户同意并自愿接受本协议的全部条款和条件。
			</text>
		</view>
		<view class="item-two">
			<text class="two-title">第二条 用户的账号、密码和安全</text>
			<text class="two-content">
				 网站用户账号和密码是用户重要的个人资料，用户务必注意账号和密码的保密；用户应按照机密的原则设置和保管自设密码，避免使用与本人明显相关的信息作为密码，不应将本人自设密码提供给法律规定必须提供之外的任何人；用户应采取合理措施，防止本人密码被窃取，由于密码泄露造成的后果由用户自行承担。凡使用网站账号和密码办理的一切业务，均视为用户亲自办理的业务，由用户承担由此所导致的相关后果和责任，包括但不限于业务费用的支付等。本网站有相应的安全措施来保障用户的信息安全，但社区党委不保证本网站绝对安全。
			</text>
		</view>
		
		<view style="height: 70rpx;"></view>
		
		<view class="bottom-btn">
			<text class="sure" @click="pageToApply">同意</text>
			<text class="reject" @click="pageToPrevies">拒绝</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			pageToPrevies(){
				uni.navigateBack()
			},
			pageToApply() {
				uni.redirectTo({
					url:"/pagesB/pages/applyvolunteer/applyvolunteer"
				})
			}
		},
	}
</script>

<style lang="scss">
	.volunteer-box {
		box-sizing: border-box;
		padding: 0 50rpx;
		.title {
			.title-sty {
				display: block;
				font-size: 30rpx;
				color: #342afa;
				font-weight: bold;
				text-align: center;
				line-height: 80rpx;
			}
		}
		.abstract{
			.abstract-content{
				text-indent: 48rpx;
				font-size: 24rpx;
				display: block;
				line-height: 50rpx;
			}
		}
		.item-one,.item-two{
			.one-title,.two-title{
				color: #e62329;
				font-size: 24rpx;
				line-height: 60rpx;
			}
			.one-content,.two-content{
				text-indent: 48rpx;
				font-size: 24rpx;
				display: block;
				line-height: 50rpx; 
			}
		}
		
		//底部按钮
		.bottom-btn{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			display: flex;
			height: 70rpx;
			justify-content: space-between;
			.sure{
				flex: 1;
				font-size: 24rpx;
				line-height: 70rpx;
				text-align: center;
				color: #fff;
				background-color: #e62329;
				box-sizing: border-box;
			}
			.reject{
				flex: 1;
				font-size: 24rpx;
				line-height: 70rpx;
				text-align: center;
				background-color: #fff;
				box-sizing: border-box;
				border-top: solid 2rpx #d2d2d2 ;
			}
		}
		
	
	}
</style>
