import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	// 状态
	state:{
		token:'', //token 
		userInfo :null, //用户信息
		communityId:'510107010006', //社区标识
		communityName:'双丰社区', //社区名称
		channelId:'72a3e965-c241-4adb-a6aa-799f52b32d65', //栏目标识
		isFirst:uni.getStorageSync('isFirst'), //是否首次登陆
		isPassAddr:false,  //是否授权定位权限
		isRunData:false, //是否微信步数授权
		lat:0, //纬度
		lng:0, //经度
		address:'' ,//详细位置
		goodsType:'', //商品类别
		statusBarHeight:0, //状态栏高度
		goodsHei:0, //商品box高度
		baseUrl:'',
		storeId:'', //店铺Id  
		goodsId:'', //商品Id  
		confirmOrderInfo:null , // 下单后返回的数据 - 提交订单页需要用到 支付完后需要清空
		orderAddress:null, // 下单后的地址 - 可配送的地址 支付完后需要清空
		orderSnInfo:null, //提交订单后的支付信息
		storeIdtwo:'' ,//下订单后得到的storeId
		userScopeWerun: false,// 是否步数授权
		cartGoods:[], //购物车商品列表
		hasGoods:false, //购物车是否有商品
		secret:'',
	},
	//同步
	mutations:{
		setCommunityId(state,payload){ //设置社区标识
			state.communityId = payload
		},
		setCommunityName(state,payload){ //设置社区名称
			state.communityName = payload
		},
		setSecretToken(state,payload){ //设置secret
			state.secret = payload
		},
		setHasGoods(state,payload){ //购物车是否有商品
			state.hasGoods = payload
		},
		setCartGoods(state,payload){ //购物车商品
			state.cartGoods = payload
		},
		setStoreIdtwo(state,payload){
			state.storeIdtwo = payload
		},
		setConfirmOrderInfo(state,payload){
			state.confirmOrderInfo = payload
		},
		setGoodsId(state,payload){
			state.goodsId = payload
		},
		setStoreId(state,payload){
			state.storeId = payload
		},
		setBaseUrl(state,payload){
			state.baseUrl = payload
		},
		setstatusBarHeight(state,payload){
			state.statusBarHeight = payload
		},
		setGoodsType(state,payload){
			state.goodsType = payload
		},
		setToken(state,payload){ //设置token
			state.token = payload
		},
		setUserInfo(state,payload){//设置用户信息
			state.userInfo = payload
		},
		clearUserInfo(state){
			state.userInfo = null
		},
		setPassAddr(state,payload){
			state.isPassAddr = payload
		},
		// 设置经纬度
		setLanLng: (state, payload) => {
		  state.lat = payload.latitude;
		  state.lng = payload.longitude;
		},
		setAddress: (state, payload) => {
		  state.address = payload;
		},
		setGoodsHei(state,payload){
			state.goodsHei = payload
		}
	},
	//异步
	actions:{
		setCommunityIdS:(context, payload)=>{
			uni.getStorage({
				key : 'communityId',
				success:(res)=>{
					context.commit('setCommunityId',res.data)
				},
				fail: () => {
					context.commit('setCommunityId','510107010006')
				}
			})
			
		},
		setCommunityNameS:(context, payload)=>{
			uni.getStorage({
				key : 'communityName',
				success:(res)=>{
					context.commit('setCommunityName',res.data)
				},
				fail: () => {
					context.commit('setCommunityName','双丰社区')
				}
			})
		},
	},
	//计算属性
	getters:{
		showCommId:(state, payload)=>{
			return state.communityId
		},
		showCommName:(state, payload)=>{
			return state.communityName
		}
	}
})
export default store