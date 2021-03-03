import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const CartApi = {
	modifyGoodsQuantity(params,callback){ //修改购物车商品数量
		api.makeRequest({
			url:Url.modifyGoodsQuantity,
			method:"POST",
			data:params,
			success(res){
				callback(res.data)
			}
		})
	},
	
	removeFromCart(params,callback){ //删除购物车商品
		api.makeRequest({
			url:Url.removeFromCart,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	addToCart(params,callback){ //添加商品到购物车
		api.makeRequest({
			url:Url.addToCart,
			method:"POST",
			data:params,
			success(res){
				callback(res.data)
			}
		})
	},
	
	getShoppingCart(params,callback){ //获取购物车商品列表
		api.makeRequest({
			url:Url.getShoppingCart,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	}
}

export default CartApi