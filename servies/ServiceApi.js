import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const ServiceApi = {
	getService(params,callback){ //获取服务列表
		api.makeRequest({
			url:Url.getService,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getServiceDetail(params,callback){ //获取服务详情
		api.makeRequest({
			url:Url.getServiceDetail,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
}

export default ServiceApi