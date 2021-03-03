import IntergralApi from '@/servies/IntegralApi.js'
import store from '@/store'

export function getWeRunData(callback) {
	// #ifdef MP-WEIXIN
	uni.authorize({
		scope: 'scope.werun',
		success() {
			store.state.userScopeWerun = true
			runData(callback)
		},
		fail(err) {
			if (err.errMsg === 'authorize:fail auth deny') {
				callback && callback('用户拒绝授权微信运动')
				store.state.userScopeWerun = false
			} else {
				callback && callback(err.errMsg)
			}
		}
	})
	// #endif

}

function runData ( callback ){
	// #ifdef MP-WEIXIN
	wx.getWeRunData({
		success(res) {
			if( res.errMsg == 'getWeRunData:ok' ){
				IntergralApi.getRuanData({
					encryptedData: res.encryptedData,
					iv: res.iv
				},res => {
					callback && callback(res)
				})
			}else{
				callback && callback(res.errMsg)
			}
		},
		fail() {
			callback && callback('微信步数获取失败')
		}
	})
	// #endif
}
