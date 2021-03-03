<script>
	import {
		getLocatio_LBS
	} from 'utils'
	import api from '@/utils/api.js'
	import store from '@/store'
	export default {
		data() {
			return {
				state: store.state
			}
		},
		onLaunch: function() {
			api.getToken()
			store.dispatch('setCommunityIdS')
			store.dispatch('setCommunityNameS')
		},
		onShow: function() {
			api.getToken()

			//判断生产环境和运行环境
			let baseUrl = 'https://www.quweiquwei.com:5743'
			if (process.env.NODE_ENV === 'development') { //开发环境-测试
				// baseUrl = 'http://132.232.74.143:5711'
				baseUrl = 'https://www.quweiquwei.com:5743'
			}
			store.commit('setBaseUrl', baseUrl)

			// 判断是否首次登陆
			if (!this.state.isFirst || this.state.isFirst != 2) { //首次登陆
				uni.hideTabBar()
			}

			// 查看是否授权定位权限
			uni.getSetting({
				success: function(res) {
					// 首次 || 每次退出再进入小程序 需要更新地理位置
					if (res.authSetting['scope.userLocation']) {
						uni.setStorageSync('isPassAddr', true)
						store.commit('setPassAddr', true);
					} else {
						uni.authorize({
							scope: 'scope.userLocation',
							success() {
								console.log('授权成功')
								getLocatio_LBS()
							}
						})
					}
				},
				fail: function(err) {}
			})
		
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	page {
		min-height: 100%;
		/* overflow-x: hidden; overflow-y: hidden; */
		/* font-family: "Microsoft YaHei"; */
	}

	image {
		vertical-align: middle;
	}
</style>
