import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const DepositApi = {
	deleteDeposit(params,callback){ //删除店铺核销人员
		api.makeRequest({
			url:Url.deleteDeposit,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	saveDeposit(params,callback){ //提交核销人员信息
		api.makeRequest({
			url:Url.saveDeposit,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	getStoreDeposit(params,callback){ //获取店铺核销人员
		api.makeRequest({
			url:Url.getStoreDeposit,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	searchUndeposit(params,callback){ //非核销人员搜索
		api.makeRequest({
			url:Url.searchUndeposit,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	}
	
}

export default DepositApi