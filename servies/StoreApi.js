import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const StoreApi = {
	closeOrOpenStore(params, callback) { //更改店铺营业状态
		api.makeRequest({
			url: Url.closeOrOpenStore,
			method: "POST",
			data: params,
			loading: true,
			success(res) {
				callback(res)
			}
		})
	},

	applyForStore(params, callback) { //申请店铺
		api.makeRequest({
			url: Url.applyForStore,
			data: params,
			method: "POST",
			loading: true,
			success(res) {
				callback(res.data)
			}
		})
	},

	applyForHeadman(params, callback) { //申请成为店长
		api.makeRequest({
			url: Url.applyForHeadman,
			method: "POST",
			data: params,
			loading: true,
			success(res) {
				callback(res.data)
			}
		})
	},

	getSecondClassify(params, callback) { //获取商品二级分类
		api.makeRequest({
			url: Url.getSecondClassify,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getGoodsClassify(params, callback) { //获取商品类别
		api.makeRequest({
			url: Url.getGoodsClassify,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getMyStores(callback) { //获取团长所属店铺列表
		api.makeRequest({
			url: Url.getMyStores,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getStoreInfo(params, callback) { //获取店铺信息
		api.makeRequest({
			url: Url.getStoreInfo,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getStoreBanner(params, callback) { //获取店铺广告条图片
		api.makeRequest({
			url: Url.getStoreBanner,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getHeadmanInfo(callback) { //获取店长信息
		api.makeRequest({
			url: Url.getHeadmanInfo,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getMyStoreDetail(callback) { //获取店长未通过店铺详情
		api.makeRequest({
			url: Url.getMyStoreDetail,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getNearbyStores(params, callback) { //获取附近店铺列表
		api.makeRequest({
			url: Url.getNearbyStores,
			data: params,
			loading: true,
			success(res) {
				callback(res.data.data)
			}
		})

	},

	getSupplierList(params, callback) { //获取供应商列表
		api.makeRequest({
			url: Url.getSupplierList,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getSupplyGoods(params, callback) { //获取供应商商品列表
		api.makeRequest({
			url: Url.getSupplyGoods,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getSupplyGoodsDetail(params, callback) { //获取供应商商品详情
		api.makeRequest({
			url: Url.getSupplyGoodsDetail,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	addStoreGoods(params, callback) { //店铺上架商品
		api.makeRequest({
			url: Url.addStoreGoods,
			method: "POST",
			data: params,
			loading: true,
			success(res) {
				callback(res.data)
			}
		})
	},

	getStoreInfo(params, callback) { //获取店铺信息
		api.makeRequest({
			url: Url.getStoreInfo,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getSecondClassify(params, callback) { //获取商品二级分类
		api.makeRequest({
			url: Url.getSecondClassify,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getStoreGoods(params, callback) { //获取店铺商品列表
		api.makeRequest({
			url: Url.getStoreGoods,
			data: params,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getGoodsDetail(params, callback) { //获取店铺商品详情
		api.makeRequest({
			url: Url.getGoodsDetail,
			data: params,
			loading: true,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	getOptimizationGoods(params, callback) { //获取社区优选商品
		api.makeRequest({
			url: Url.getOptimizationGoods,
			data: params,
			loading: true,
			success(res) {
				callback(res.data.data)
			}
		})
	},

	removeStoreGoods(params, callback) { //店铺下架商品
		api.makeRequest({
			url: Url.removeStoreGoods,
			method: "POST",
			data: params,
			loading: true,
			success(res) {
				callback(res.data)
			}
		})
	},

	getStoreIncome(params,callback) { //获取店铺收益信息
		api.makeRequest({
			url: Url.getStoreIncome,
			data: params,
			loading: true,
			success(res) {
				callback(res.data.data)
			}
		})
	},
	
	getStoreOrderList(params,callback) { //获取店铺收益信息
		api.makeRequest({
			url: Url.getStoreOrderList,
			data: params,
			loading: true,
			success(res) {
				callback(res.data.data)
			}
		})
	}

}

export default StoreApi
