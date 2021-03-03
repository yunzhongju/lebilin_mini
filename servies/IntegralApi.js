import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const IntergralApi = {
	getRuanData(params,callback){ //同步微信步数
		api.makeRequest({
			url:Url.getRuanData,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	doCheck(callback){ //签到
		api.makeRequest({
			url:Url.doCheck,
			method:"POST",
			success(res){
				callback(res.data)
			}
		})
	},
	
	getTaskList(callback){ //获取任务列表
		api.makeRequest({
			url:Url.getTaskList,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getCheckRecord(callback){ //获取当月签到详情
		api.makeRequest({
			url:Url.getCheckRecord,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	doRecheck(params,callback){ //补签
		api.makeRequest({
			url:Url.doRecheck,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	exchangePresent(params,callback){ //兑换礼品
		api.makeRequest({
			url:Url.exchangePresent,
			data:params,
			method:"POST",
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	getExchangeRecord(params,callback){ //礼品兑换记录
		api.makeRequest({
			url:Url.getExchangeRecord,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getIntegralGoodsList(params,callback){ //获取积分兑换商品列表
		api.makeRequest({
			url:Url.getIntegralGoodsList,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getMyBillList(params,callback){ //获取账单列表
		api.makeRequest({
			url:Url.getMyBillList,
			data:params,
			success(res){
				callback(res.data.data)
			},
			fail(res){
				callback(res)
			}
		})
	},
	
	getIntegralQRCode(params,callback){ //获取积分商品二维码
		api.makeRequest({
			url:Url.getIntegralQRCode,
			data:params,
			success(res){
				callback(res.data)
			}
		})
	}
}
export default IntergralApi