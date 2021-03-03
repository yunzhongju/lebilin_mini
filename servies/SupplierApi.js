import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const SupplierApi = {
	applyForSupplier(params,callback){ //申请成为供应商
		api.makeRequest({
			url:Url.applyForSupplier,
			data:params,
			method:"POST",
			loading:true,
			success(res){
				callback( res.data)
			},
			fail(res){
				callback(res)
			}
		})
	},
	
	getSupplierInfo(callback){ //获取供应商信息
		api.makeRequest({
			url:Url.getSupplierInfo,
			success(res){
				callback( res.data.data )
			}
		})
	},
	
	getCommunityBusiness(params,callback){ //获取社区企业列表
		api.makeRequest({
			url:Url.getCommunityBusiness,
			data:params,
			success( res ){
				callback( res.data.data )
			}
		})
	},

	getBusinessLeagues(params,callback){ //获取居商联盟列表
		api.makeRequest({
			url:Url.getBusinessLeagues,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	}
}

export default SupplierApi