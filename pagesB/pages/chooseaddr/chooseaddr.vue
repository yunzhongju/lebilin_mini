<template>
	<view class="city-choose-box">
		<view class="title">
			<text>选择</text>
		</view>

		<view class="addr-choose">
			<form @submit="formSubmit">
				
				<view class="provinence">
					<text>省份</text>
					<picker 
						name="provinces" 
						@change="provincesChange" 
						:value="provincesArray[provincesIndex]" 
						:range="provincesArray">
						<view class="uni-input">{{provincesArray[provincesIndex]}}</view>
					</picker>
					<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>
				</view>
				
				<view class="cities">
					<text>城市</text>
					<picker 
						name="cities" 
						@change="citiesChange" 
						:value="citiesArray[citiesIndex]" 
						range-key="areaName"
						:range="citiesArray">
						<view 
							class="uni-input">
							{{citiesArray.length!==0?citiesArray[citiesIndex].areaName:msg}}
						</view>
					</picker>
					<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>
				</view>
				
				<view class="areas">
					<text>县区</text>
					<picker 
						name="areas" 
						@change="areasChange" 
						:value="areasArray[areasIndex]" 
						range-key="areaName"
						:range="areasArray">
							<view class="uni-input">
								{{areasArray.length!==0?areasArray[areasIndex].areaName:msg}}
							</view>
					</picker>
					<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>
				</view>
				
				<view class="streets">
					<text>街道/镇</text>
					<picker 
						name="streets" 
						@change="streetsChange" 
						:value="streetsArray[streetsIndex]" 
						range-key="areaName"
						:range="streetsArray">
							<view class="uni-input">
								{{streetsArray.length!==0?streetsArray[streetsIndex].areaName:msg}}
							</view>
					</picker>
					<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>
				</view>
				
				<view class="communities">
					<text>社区/村</text>
					<picker 
						name="communities" 
						@change="communitiesChange" 
						:value="communitiesArray[communitiesIndex]" 
						range-key="areaName"
						:range="communitiesArray">
							<view class="uni-input">
								{{communitiesArray.length!==0?communitiesArray[communitiesIndex].areaName:msg}}
							</view>
					</picker>
					<image src="/pagesB/static/imgs/arrow.png" mode="widthFix"></image>
				</view>

				<button class="choose-btn" form-type="submit">选择</button>
			</form>
		</view>
	</view>
</template>

<script>
	import CommonApi from '@/servies/CommonApi.js'
	import store from '@/store'
	export default {
		data() {
			return {
				msg:'暂无数据',
				formdata: {}, //表单数据
				provincesArray:['四川省'],
				provincesIndex:0,
				citiesArray:[],
				citiesIndex:0,
				areasArray:[],
				areasIndex:3,
				streetsArray:[],
				streetsIndex:0,
				communitiesArray:[],
				communitiesIndex:0,
				provinceCode:510000000000,
				cityCode:510100000000,
				areaCode:510107000000,
				streetCode:510107010000
			};
		},
		methods: {
			saveData(key,data){
				uni.setStorage({
					key:key,
					data:data
				})
			},
			formSubmit(e) {
				this.formdata = e.detail.value
				console.log({...this.formdata})
				if(this.formdata.communities){
					if(!isNaN(this.formdata.communities)){
						let community=this.communitiesArray.filter((item,index)=>{return index===Number(this.formdata.communities)})[0]
						let ccode=community.areaCode
						let cname=community.areaName
						store.commit('setCommunityId',ccode)
						store.commit('setCommunityName',cname)
						this.saveData('communityId',ccode)
						this.saveData('communityName',cname)
					}else{
						store.commit('setCommunityId',this.formdata.communities.areaCode)
						store.commit('setCommunityName',this.formdata.communities.areaName)
						this.saveData('communityId',this.formdata.communities.areaCode)
						this.saveData('communityName',this.formdata.communities.areaName)
					}
				}else{
					if(!isNaN(this.formdata.communities)){
						let street=this.streetsArray.filter((item,index)=>{return index===Number(this.formdata.communities)})[0]
						let scode=street.areaCode
						let sname=street.areaName
						store.commit('setCommunityId',scode)
						store.commit('setCommunityName',sname)
						this.saveData('communityId',scode)
						this.saveData('communityName',sname)
					}else{
						store.commit('setCommunityId',this.formdata.streets.areaCode)
						store.commit('setCommunityName',this.formdata.streets.areaName)
						this.saveData('communityId',this.formdata.communities.areaCode)
						this.saveData('communityName',this.formdata.communities.areaName)
					}
				}
				uni.switchTab({
					url:"/pages/index/index",
					success: () => {
						let pages = getCurrentPages();//当前页
						pages[0].onLoad({})
					}
				})
			},
			provincesChange(e){
				this.provincesIndex = Number(e.target.value)
			},
			citiesChange(e){
				this.citiesIndex = Number(e.target.value)
				this.cityCode = this.citiesArray.filter((item,index)=>{return index===this.citiesIndex})[0].areaCode
				this.getDivision({code:this.cityCode},'area')
			},
			areasChange(e){
				this.areasIndex = Number(e.target.value)
				this.areaCode = this.areasArray.filter((item,index)=>{return index===this.areasIndex})[0].areaCode
				this.getDivision({code:this.areaCode},'street')
				this.communitiesArray=[]
			},
			streetsChange(e){
				this.streetsIndex = Number(e.target.value)
				this.streetCode = this.streetsArray.filter((item,index)=>{return index===this.streetsIndex})[0].areaCode
				this.getDivision({code:this.streetCode},'community')
			},
			communitiesChange(e){
				this.communitiesIndex = Number(e.target.value)
				
			},
			getDivision(params,type=''){
				CommonApi.getDivision(params,(res)=>{
					if(type==='city'){
						this.citiesArray=res.city?res.city:[]
					}else if(type==='area'){
						this.areasArray=res.district?res.district:[]
					}
					else if(type==='street'){
						this.streetsArray=res.street?res.street:[]
					}
					else if(type==='community'){
						this.communitiesArray=res.community?res.community:[]
					}
				})
			}
		},
		onLoad(options) {
			this.getDivision({code:this.provinceCode},'city')
			this.getDivision({code:this.cityCode},'area')
			this.getDivision({code:this.areaCode},'street')
			this.getDivision({code:this.streetCode},'community')
		}
	}
</script>

<style lang="scss">
	.city-choose-box {
		.title {
			border-bottom: 2rpx solid #eee;
			box-sizing: border-box;
			padding-left: 24rpx;

			text {
				color: #A6A6A6;
				font-size: 20rpx;
				line-height: 60rpx;
			}
		}
		
		.addr-choose{
			margin-left:24rpx;
			.provinence,.cities,.areas,.streets,.communities{
				display: flex;
				align-items: center;
				border-bottom: 2rpx solid #eee;
				text{
					width: 180rpx;
					font-size: 30rpx;
					line-height: 80rpx;
				}
				picker{
					flex: 1;
					font-size: 30rpx;
					line-height: 80rpx;
				}
				image{
					width: 12rpx;
					margin-right: 24rpx;
				}
			}
		}
	
		.choose-btn{
			color: #fff;
			width: 300rpx;
			line-height: 60rpx;
			height: 60rpx;
			font-size: 24rpx;
			text-align: center;
			background-color: #FF2F29;
			border-radius: 30rpx;
			margin-top: 40rpx;
		}
	}
</style>
