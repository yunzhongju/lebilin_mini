import request from '@/utils/request.js'
import store from '@/store'
import Url from '@/common/lib/interUrl.js'

const api = {

	//发送请求
	makeRequest(params) {

		// 传给request的参数
		const parObj = {
			url: params.url,
			data: params.data || {},
			method: params.method || "GET"
		}

		//loading 特殊情况才有loading--点赞,评论
		if (params.loading) {
			parObj.loading = true
		}

		//处理接口 form
		if (params.header) {
			parObj.header = params.header
		}

		//fail
		if (params.fail) {
			parObj.fail = params.fail
		}

		// 调用request发送请求
		request(parObj).then(res => {
			params.success(res)
		}).catch(res => {
			params.fail(res)
		})

	},

	//获取token
	getToken() {
		uni.login({
			success: (res) => {
				if (res.code) {
					console.log('code', res.code)
					api.makeRequest({
						url: Url.doLogin,
						data: {
							code: res.code,
							communityId: store.state.communityId
						},
						success: (res) => {
							//将token数据存在本地缓存中
							// console.log('获取到token', res.data.data)
							if (res.data.data) {
								uni.setStorageSync('token', res.data.data.sessionId)
								store.commit('setToken', res.data.data.sessionId)
							}
							api.getUserInfo()
						}
					})
				} else {
					api._error({
						title: '获取code失败' + res.errMsg
					})
				}
			}
		})
	},

	// 未授权点击 立即加入  这种方式登录不需要刷新页面
	bindgetuserinfo(e, callback) {
		var params = {};
		if (e && e.detail.encryptedData) {
			params.encryptedData = e.detail.encryptedData;
			params.iv = e.detail.iv;
			// 授权接口
			api.makeRequest({
				url: Url.getWxInfo,
				data: params,
				method: 'get',
				loading: true,
				success: (res) => {
					if (res.data) {
						// console.log(store.state.userInfo)
						api.getUserInfo();
						callback && callback(res.data);
					}
				}
			})
		} else {
			// 拒绝
		}
	},

	//获取微信信息
	bindGetWxInfo(e, callback) {
		let params = {}
		if (e && e.detail.encryptedData) {
			params.encryptedData = e.detail.encryptedData
			params.iv = e.detail.iv

			//授权接口
			api.makeRequest({
				url: Url.getWxInfo,
				data: params,
				loading: true,
				success(res) {
					if (res.data) {
						api.getUserInfo()
						callback && callback(res.data)
					}
				}
			})
		}
	},

	// 获取用户信息
	getUserInfo(params) {
		// console.log( Url.getUserInfo )
		api.makeRequest({
			url: Url.getUserInfo,
			success: (res) => {
				// console.log( '用户信息',res )
				if (res.data && res.data.data) {
					store.commit('setUserInfo', res.data.data);
				}
			}
		})
	},

	//错误提示函数
	_error(param) {
		uni.showToast({
			icon: param._type || 'none',
			title: param.title,
			mask: true,
			duration: param.duration || 3500, //提示的延迟时间
			success: function() {
				param.success && param.success();
			}
		})
	},



}
export default api
