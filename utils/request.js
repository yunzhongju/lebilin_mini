import api from '@/utils/api.js'

const commonHost = 'https://mini.coddon.com/mini_sport'
// const commonHost = 'https://www.quweiquwei.com:5743/mini_sport'

// 自动登录失败的次数
let loginNum = 0

// 对发送的请求统一加上验证
// 一般请求api
export default function request(params) {
	
	// 获取本地token,设置请求头
	const token = uni.getStorageSync('token')
	
	if( !uni.getStorageSync('token') ){
		//登陆失败2次不再自动登录
		if (loginNum == 2 && !token) {
			api._error({
				title: '登陆失败'
			});
		}
		
		if (loginNum < 2) {
			api.getToken()
			loginNum++
		}
	}
	
	const _header = {
		"wxa-sessionid":token,
		"content-type": 'application/x-www-form-urlencoded'
	}

	return new Promise((resolve, reject) => {

		if (params.loading) {
			uni.showLoading();
		}

		uni.request({
			url: /http/.test(params.url) ? params.url : commonHost + params.url,
			data: params.data || {},
			header: params.header ? Object.assign(_header,params.header) : _header,
			method: params.method ? params.method : "GET",
			dataType: params.dataType ? params.dataType : 'json',
			responseType: params.responseType ? params.dataType : 'text',
			success: (res) => {
				// console.log('基本请求:', params.data, res)

				if (res && res.statusCode == 401) { //没权限,token失效

					//登陆失败2次不再自动登录
					if (loginNum == 2 && !token) {
						api._error({
							title: '登陆失败'
						});
					}

					if (loginNum < 2) {
						api.getToken()
						loginNum++
					}
					return;
				}
			
				if( res.statusCode == 404 ){ //路径错误
					api._error({
						title:'接口404'
					})
				}
			
				if( res.statusCode == 200 && res.data && res.data.status && res.data.status == 1 ){ //成功,执行成功回调
					resolve(res)
				}else{
					if( params.fail ){
						resolve( res.data )
					}else{
						setTimeout(function(){
							api._error({
								title:res.data.msg || '接口错误'
							})
						},200)
					}
				}
			},
			fail: ( err ) => {
				if(params.fail){
					resolve(err)
				}else{
					setTimeout(function () {
						api._error({
							title:JSON.stringify(err)
						})
					},200)
				}
			},
			complete:params.complete || function (res) {
				if( params.loading ){
					uni.hideLoading()
				}
				uni.stopPullDownRefresh() // 停止下拉刷新
				uni.hideNavigationBarLoading() //隐藏导航条加载动画
			}
		})

	})

}
