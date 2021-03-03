import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const WishApi = {
	publishWish(params,callback){ // 发布心愿
		api.makeRequest({
			url:Url.publishWish,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	getWishList(params,callback){ //获取心愿列表
		api.makeRequest({
			url:Url.getWishList,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getWishDetail(params,callback){ //获取心愿详情
		api.makeRequest({
			url:Url.getWishDetail,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},

	claimWish(params,callback){ //心愿认领
		api.makeRequest({
			url:Url.claimWish,
			method:"POST",
			loading:true,
			data:params,
			success(res){
				callback(res.data)
			}
		})
	},
	
	submitWishServiceProcess(params,callback){ //提交服务过程
		api.makeRequest({
			url:Url.submitWishServiceProcess,
			method:"POST",
			loading:true,
			data:params,
			success(res){
				callback(res.data)
			}
		})
	},
	
	evaluateWishService(params,callback){ //心愿评价
		api.makeRequest({
			url:Url.evaluateWishService,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	}
}

export default WishApi