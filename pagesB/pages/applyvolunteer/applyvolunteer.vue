<template>
	<view class="apply-volunteer-box">
		
		<!-- 表单 -->
		<form @submit="formSubmit">
			<!-- 姓名-性别-头像 -->
			<view class="name-sex-avatar">
				<view class="left">
					<view class="left-name">
						<view class="name" style="display: flex;align-items: center;">
							<text>姓名</text>
							<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 6rpx;">*</text>
						</view>
						<input type="text" name="personName" value="" placeholder="请输入姓名" />
					</view>
					<view class="left-sex">
						<view class="sex" style="display: flex;align-items: center;">
							<text>性别</text>
							<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 6rpx;">*</text>
						</view>
						<picker style="flex: 1;" name="sex" :range="sexArr" range-key="name" :value="sexIndex" @change="sexChange">
							<view>{{sexArr[sexIndex]['name']}}</view>
						</picker>
						<!-- <input type="text" name="sex" value="男" /> -->
						<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>
					</view>
				</view>

				<view class="right">
						<avatar inner=true selWidth="400upx" stretch="longSel" selHeight="400upx" @upload="myUpload" :avatarSrc="avatarUrl" avatarStyle="width: 158rpx; height: 158rpx;">
						</avatar>
				</view>

			</view>

			<view class="card-type">
				<view class="left" style="display: flex;align-items: center;">
					<text>证件类型</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 6rpx;">*</text>
				</view>
				<picker style="flex: 1;" name="idType" :range="typeArr" range-key="name" :value="typeIndex" @change="typeChange">
					<view>{{typeArr[typeIndex]['name']}}</view>
				</picker>
				<!-- <input type="text" value="" placeholder="选择证件类型" /> -->
				<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>

			</view>

			<view class="card-num">
				<view class="num" style="display: flex;align-items: center;">
					<text>证件号码</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 6rpx;">*</text>
				</view>
				<input type="number" value="" name="idNo" placeholder="请输入证件号" />
				
			</view>

			<view class="card-num">
				<view class="num" style="display: flex;align-items: center;">
					<text>手机号</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 6rpx;">*</text>
				</view>
				<input type="number" v-model="phoneNum" name="mobile" placeholder="请输入手机号" />
				<button class="get-phonenum" type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumFun" v-if="!phoneNum">获取本机号码</button>
			</view>

			<view class="face">
				<view class="left" style="display: flex;align-items: center;">
					<text>政治面貌</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 6rpx;">*</text>
				</view>
				<picker style="flex: 1;" name="politics" :range="faceArr" range-key="name" :value="faceIndex" @change="faceChange">
					<view>{{faceArr[faceIndex]['name']}}</view>
				</picker>
				<!-- <input type="text" name="face" value="" placeholder="选择政治面貌" /> -->
				<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>
			</view>

			<view class="face">
				<view class="left" style="display: flex;align-items: center;">
					<text>学历</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 6rpx;">*</text>
				</view>
				<picker style="flex: 1;" name="education" :range="eduArr"  range-key="name" :value="eduIndex" @change="eduChange">
					<view>{{eduArr[eduIndex]['name']}}</view>
				</picker>
				<!-- <input type="text" name="education" value="" placeholder="选择学历" /> -->
				<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>
			</view>

			<view class="card-num">
				<text class="num">毕业院校</text>
				<input type="text" value="" name="graduateAcademy" placeholder="请输入毕业院校" />
			</view>

			<view class="card-num">
				<text class="num">专业</text>
				<input type="text" value="" name="major" placeholder="请输入专业" />
			</view>

			<view class="card-num">
				<text class="num">职业</text>
				<input type="text" value="" name="occupation" placeholder="请输入现职业" />
			</view>

			<view class="card-num">
				<text class="num">住址</text>
				<input type="text" value="" name="addr" placeholder="请输入现住址" />
			</view>

			<view class="my-skill">
				<view class="top" style="display: flex;align-items: center;">
					<text>我的技能</text>
					<text style="color: #FF2F29;padding-left: 6rpx;height: 79rpx;box-sizing: border-box;padding-top: 6rpx;">*</text>
				</view>
				<view class="skill-box">
					<text v-for="(item,index) in skillArr" :key="index" class="skill-item" :class="{ active:activeArr.includes(item.id)}" @click="changeStatus(item.id)">{{item.name}}</text>
				</view>
			</view>

			<view class="my-skill marginbottom">
				<text class="top">个人说明</text>
				<textarea class="intruduce-me" name="personIntro" maxlength=200 value="" placeholder="请介绍下自己" />
				</view>
			
			<button class="btn-addr" form-type="submit">完成</button>
		</form>
		
		

	</view>
</template>

<script>
	import avatar from '@/pagesB/components/yq-avatar.vue'
	import { getBase64, isTel, isCard } from '@/utils'
	import UserApi from '@/servies/UserApi.js'
	import store from '@/store'
	export default {
		components: {
			avatar
		},
		data() {
			return {
			state:store.state,
			sexArr:[], //性别
			sexIndex:0,
			typeArr:[], //证件类型
			typeIndex:0,
			faceArr:[], //政治面貌
			faceIndex:0,
			eduArr:[],//学历
			eduIndex:0,
			//技能
			/* active0:false,
			active1:false,
			active2:false,
			active3:false, */
			skillArr:[],
			activeArr:[],
			avatarUrl:'', //头像临时地址
			avatarUrlBase64:'',//头像base64
			phoneNum:'', //用户手机号
			preventSub:true //阻止多次提交
			};
		},
		methods: {
			formSubmit(e) { //表单提交
				if( !this.preventSub ) return
				this.preventSub = false
			
				let formObj = e.detail.value
				formObj.header = this.avatarUrlBase64
				formObj.skills = [...this.activeArr].join()
				formObj.sex = this.sexArr[this.sexIndex].id
				formObj.idType = this.typeArr[this.typeIndex].id
				formObj.politics = this.faceArr[this.faceIndex].id
				formObj.communityId = this.state.communityId
				this.education = this.eduArr[this.eduIndex].id
				// console.log( formObj )
				// 非空验证
				if( !formObj.personName || !formObj.header || !formObj.idNo || !formObj.mobile || !formObj.skills ){
					return uni.showToast({
						title:'带*和头像为必填哦 ~',
						icon:'none'
					})
				}
				
				// 手机号验证
				if( !isTel(formObj.mobile) ) return uni.showToast({
					title:'手机号错误',
					icon:'none'
				})
				
				// 身份证验证
				if( this.typeIndex == 0 ){
					if( !isCard(formObj.idNo) ) return uni.showToast({
						title:'身份证格式错误',
						icon:'none'
					})
				}
				
				console.log( '参数',formObj )
				
				
				/* 验证通过,发请求 */
				UserApi.joinVolunteer(formObj,res => {
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					if( res.status == 1 ){ //成功
					this.preventSub = true
						uni.redirectTo({
							url:'/pagesB/pages/volunteerteam/volunteerteam'
						})
					}
				})

				
			},
			sexChange(e){ 
				this.sexIndex = e.target.value
			},
			typeChange(e){
				this.typeIndex = e.target.value
			},
			faceChange(e){
				this.faceIndex = e.target.value
			},
			eduChange(e){
				this.eduIndex = e.target.value
			},
			
			changeStatus(id){
				this.activeArr.includes(id) ? this.activeArr=this.activeArr.filter( item => item != id ) : this.activeArr.push(id)
			},
			myUpload(rsp) {
				uni.showToast({
					title:'正在上传',
					icon:'loading',
					mask:true,
					duration:1000
				})
				this.avatarUrl = rsp.path;
				// console.log(rsp)
				// console.log('base64', getBase64(this.avatarUrl))
				this.avatarUrlBase64 = getBase64(this.avatarUrl)
			},
			getPhoneNumFun(e){
				let params = {}
				params.iv = e.detail.iv
				params.encryptedData = e.detail.encryptedData
				UserApi.getPhoneNumber(params, res =>{
					console.log( res )
					this.phoneNum = res.data
				})
			}
		},
		
		onLoad(options){
			UserApi.getUserInfoOptions(data =>{
				console.log( '信息',data )
				this.sexArr = data.sex
				this.typeArr = data.cardType
				this.faceArr = data.politics
				this.eduArr =data.education
				this.skillArr = data.skills
			})
			
			if( store.state.userInfo.mobile ){
				this.phoneNum = store.state.userInfo.mobile
			}
		}
	
	}
</script>

<style lang="scss">
	.apply-volunteer-box {
		border-top: 2rpx solid #eee;
		box-sizing: border-box;
		padding: 0 20rpx;
		
		
		
		.my-skill{
			border-bottom: 2rpx solid #eee;
			padding-bottom: 16rpx;
			.top{
				font-size: 24rpx;
				line-height: 50rpx;
			}
			.skill-box{
				display: flex;
				flex-wrap: wrap;
				.skill-item{
					font-size: 24rpx;
					width: 160rpx;
					margin-right: 10rpx;
					margin-bottom: 10rpx;
					border: solid 2rpx #d2d2d2;
					border-radius: 8rpx;
					text-align: center;
					line-height: 40rpx;
					&.active{
						background-color: #ff979a;
						border: 2rpx solid transparent;
					}
				}
			}
			.intruduce-me{
				font-size: 24rpx;
				background-color: #eee;
				width: 100%;
				box-sizing: border-box;
				border-radius: 10rpx;
				padding: 20rpx;
			}
		}

		// 姓名-性别-头像
		.name-sex-avatar {
			display: flex;

			.left {
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: 24rpx;

				.left-name {
					display: flex;
					border-bottom: 2rpx solid #eee;
					line-height: 79rpx;

					input {
						line-height: 79rpx;
						height: 79rpx;
						flex: 1;
					}

					.name {
						width: 160rpx;
					}
				}

				.left-sex {
					display: flex;
					border-bottom: 2rpx solid #eee;
					line-height: 79rpx;
					align-items: center;
					position: relative;
					background-size:  12rpx 16rpx;
					input {
						line-height: 79rpx;
						height: 79rpx;
					}

					.sex {
						width: 160rpx;
					}
					image {
						width: 12rpx;
						position: absolute;
						bottom: 26rpx;
						right: 110rpx;
					}
					
				}
			}

			.right {
				height: 158rpx;
				width: 158rpx;
				background: #dbdbdb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAyCAYAAAD1CDOyAAABlUlEQVRoge3avWoUURiH8d/sDmw2IR8QEAIBi2BhJeksgleRwitIa+ON2HgFexOSVDGNla1go41CKsmHyWYNazEHEiQj6r4TT8J5YKr/8L7zHJgznJepRqORYDbxAg9xhApTLOEzXuF9ZMM6slhiFU/wCGNXEgOspDyULiQGWMZCuq6znPJQetEFcYlJSzZJeShdSNw6RSIXikQuFIlcKBK5UCRyoUjkQpHIha7OE9OWbKqD80SNIeZ/0/hv+KE5S/db8n7Kl8SdKsc1trGDkxmLVTjGOtZa7lnDSzzHotkXboi9Go+xNWOxP2UBT4NrnvRwEVz0tjkru1Mu3BuJuf/9EDOyWOMtHuAsoOBYM77c0owsf+UbDvBRzCRwgHc1drEv5mM3xTNsuFniK16nflVAvwqTWrPFRm6zl9rftV7KTwP7dfJi97SvctVFz3uzO915ikQuFIlcKBK5UCRyoUjkQpHIhSLRQl8zmbuJofYR5z/TxV82R/iAc81s9nqvTykPpQuJL3ijGT58d/W/0zwOUx7KT2rsPGjqoKbgAAAAAElFTkSuQmCC) no-repeat;
				background-size: 50rpx 50rpx;
				background-position: center;
				margin: 2rpx 0 0 6rpx;
			}
		}

		.card-type {
			display: flex;
			height: 79rpx;
			line-height: 79rpx;
			font-size: 24rpx;
			border-bottom: 2rpx solid #eee;
			position: relative;
			.left {
				width: 160rpx;
			}

			image {
				width: 12rpx;
				position: absolute;
				bottom: 26rpx;
				right: 274rpx;
			}

			input {
				height: 79rpx;
				flex: 1;
			}
		}
	
		.card-num{
			display: flex;
			line-height: 79rpx;
			font-size: 24rpx;
			border-bottom: 2rpx solid #eee;
			.num{
				width: 160rpx;
			}
			input{
				height: 79rpx;
				flex: 1;
			}
			.get-phonenum{
				height: 50rpx;
				font-size: 20rpx;
				line-height: 50rpx;
				margin-top: 15rpx;
			}
		}
	
		.face{
			display: flex;
			line-height: 79rpx;
			font-size: 24rpx;
			border-bottom: 2rpx solid #eee;
			position: relative;
			.left{
				width: 160rpx;
			}
			input{
				flex: 1;
				height: 79rpx;
			}
			image{
				width: 12rpx;
				position: absolute;
				bottom: 26rpx;
				right: 0;
			}
		}
	
		.btn-addr{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			border-radius: 0;
			color: #fff;
			background-color: #e62329;
			z-index: 10000;
			font-size: 24rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
		.marginbottom{
			margin-bottom: 70rpx;
		}
	}
</style>
