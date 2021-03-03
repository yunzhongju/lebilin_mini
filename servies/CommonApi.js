import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const token = uni.getStorageSync('token')

const CommonApi = {
	
	uploadPic(params, callback) { //上传图片
		uni.uploadFile({
			url: Url.uploadPic,
			filePath: params.filePath,
			name: params.name,
			header: {
				"wxa-sessionid":token,
				'content-type': 'multipart/form-data'
			},
			success(res) {
				callback(res)
			}
		})
	},
	
	getDataDictionary(callback){ //获取码表
		api.makeRequest({
			url:Url.getDataDictionary,
			data:{parentId:'help_type'},
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getDataDictionary2(params,callback){ //获取单位性质和行业性质码表
		api.makeRequest({
			url:Url.getDataDictionary,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getAdvertBanner(params,callback){ //获取广告
		api.makeRequest({
			url:Url.getAdvertBanner,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getDivision(params,callback){ //获取区划
		api.makeRequest({
			url:Url.getDivision,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	}

}

export default CommonApi
