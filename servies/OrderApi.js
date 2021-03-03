import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const OrderApi = {
	deleteOrder(params,callback){ //删除订单
		api.makeRequest({
			url:Url.deleteOrder,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	isDistribution(params,callback){ //判断订单是否可配送
		api.makeRequest({
			url:Url.isDistribution,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	doCashOut(params,callback){ //发起提现
		api.makeRequest({
			url:Url.doCashOut,
			method:"POST",
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	completeOrder(params,callback){ //完成订单
		api.makeRequest({
			url:Url.completeOrder,
			method:"POST",
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	submitOrder(params,callback){ //提交订单
		api.makeRequest({
			url:Url.submitOrder,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	cashOut(params,callback){ //提现
		api.makeRequest({
			url:Url.cashOut,
			method:"POST",
			data:params,
			success(res){
				callback(res.data)
			}
		})
	},
	
	orderRefound(params,callback){ //订单退款
		api.makeRequest({
			url:Url.orderRefound,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	confirmOrder(params,callback){ //确认订单
		api.makeRequest({
			url:Url.confirmOrder,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getOrderQRCode(params,callback){ //获取订单二维码
		api.makeRequest({
			url:Url.getOrderQRCode,
			data:params,
			success(res){
				callback(res)
			}
		})
	},
	
	getOrderList(params,callback){ //获取订单列表
		api.makeRequest({
			url:Url.getOrderList,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getOrderDetail(params,callback){ //获取订单详情
		api.makeRequest({
			url:Url.getOrderDetail,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	toPay(params,callback){ //订单支付
		api.makeRequest({
			url:Url.toPay,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	}

}

export default OrderApi