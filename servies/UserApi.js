import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const UserApi = {
	getuserInfo(callback) { //获取用户信息
		api.makeRequest({
			url: Url.getUserInfo,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getPhoneNumber(params, callback) { //获取用户手机号
		api.makeRequest({
			url: Url.getPhoneNumber,
			data: params,
			method: "POST",
			success(res) {
				callback && callback(res.data)
			}
		})
	},

	getUserInfoOptions(callback) { //获取用户信息选项
		api.makeRequest({
			url: Url.getUserInfoOptions,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	joinVolunteer(params, callback) { //加入志愿者
		api.makeRequest({
			url: Url.joinVolunteer,
			loading: true,
			data: params,
			method: "POST",
			success(res) {
				callback(res.data)
			}
		})
	},

	getVolunteerList(params, callback) { //获取志愿者列表
		api.makeRequest({
			url: Url.getVolunteerList,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getPartyMemberList(params, callback) { //获取党员列表
		api.makeRequest({
			url: Url.getPartyMemberList,
			data: params,
			loading: true,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	applyForHeadman(params, callback) { //申请成为团长
		api.makeRequest({
			url: Url.applyForHeadman,
			data: params,
			loading: true,
			method: "POST",
			success(res) {
				callback(res.data)
			}
		})
	},

	getHeadmanInfo(callback) { //获取团长信息
		api.makeRequest({
			url: Url.getHeadmanInfo,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getDeliveryAddress(callback) { //获取收获地址列表
		api.makeRequest({
			url: Url.getDeliveryAddress,
			success(res) {
				callback(res.data.data)
			}
		})

	},

	deleteDeliveryAddress(params, callback) { //删除收货地址
		api.makeRequest({
			url: Url.deleteDeliveryAddress,
			data: params,
			method: "POST",
			loading: true,
			success(res) {
				callback(res.data)
			}
		})
	},

	saveDeliveryAddress(params, callback) { //保存收货地址
		api.makeRequest({
			url: Url.saveDeliveryAddress,
			method: "POST",
			data: params,
			loadgin: true,
			success(res) {
				callback(res.data)
			}
		})
	},

	modifyUserInfo(params, callback) { //修改用户信息
		api.makeRequest({
			url: Url.modifyUserInfo,
			method: "POST",
			data: params,
			loading: true,
			success(res) {
				callback(res.data)
			}
		})
	},

	getMyVolunteerCert(callback) { //获取志愿者证书
		api.makeRequest({
			url: Url.getMyVolunteerCert,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getUnreadMessage(params, callback) { //获取我的消息列表
		api.makeRequest({
			url: Url.getUnreadMessage,
			data: params,
			loading: true,
			success(res) {
				callback(res.data.data)
			}
		})
	},
	
	markRead(params,callback){ //标记消息为已读
		api.makeRequest({
			url:Url.markRead,
			method:"POST",
			data:params,
			success(res){
				callback(res.data)
			}
		})
	},
	
	deleteUnreadMessage(params,callback){ //删除消息
		api.makeRequest({
			url:Url.deleteUnreadMessage,
			method:"POST",
			data:params,
			success(res){
				callback(res.data)
			}
		})
	}
}

export default UserApi
