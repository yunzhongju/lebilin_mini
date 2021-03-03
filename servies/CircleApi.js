import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const CircleApi = {
	
	createCircle(params,callback){ //创建或修改圈子
		api.makeRequest({
			url:Url.createCircle,
			data:params,
			method:"POST",
			success(res){
				callback(res.data)
			}
		})
	},
	
	getCircleList(params,callback){  //获取圈子列表
		api.makeRequest({
			url:Url.getCircleList,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	joinCircle(params,callback){ //加入圈子
		api.makeRequest({
			url:Url.joinCircle,
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	getCircleInfo(params,callback){ //获取圈子信息
		api.makeRequest({
			url:Url.getCircleInfo,
			loading:true,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getCircleMember(params,callback){ //获取圈子成员
		api.makeRequest({
			url:Url.getCircleMember,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	deleteFromCircle(params,callback){ //将成员踢出圈子
		api.makeRequest({
			url:Url.deleteFromCircle,
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	getHostCircles(callback){//获取圈主所属圈子列表-发布动态
		api.makeRequest({
			url:Url.getHostCircles,
			success(res){
				callback(res.data.data)
			}
		})
	},

	getCircleTotalPeople(callback){
		api.makeRequest({
			url:Url.getCircleTotalPeople,
			success(res){
				callback(res.data.data)
			}
		})
	},
}

export default CircleApi