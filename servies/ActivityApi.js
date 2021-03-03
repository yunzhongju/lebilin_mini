import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const ActivityApi = {
	shareActivity(params,callback){ //分享活动
		api.makeRequest({
			url:Url.shareActivity,
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	publishActivity(params,callback){ //发布活动
		api.makeRequest({
			url:Url.publishActivity,
			data:params,
			method:"POST",
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	addActivityComment(params,callback){ //发表评论
		api.makeRequest({
			url:Url.addActivityComment,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	addCommentReply(params,callback){ //回复评论
		api.makeRequest({
			url:Url.addCommentReply,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	signUpActivity(params,callback){ //报名活动
		api.makeRequest({
			url:Url.signUpActivity,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	thumbsUp(params,callback){ //点赞活动或评论
		api.makeRequest({
			url:Url.thumbsUp,
			method:"POST",
			data:params,
			success(res){
				callback(res.data)
			}
		})
	},
	
	getMyActivity(params,callback){ //获取我的活动列表
		api.makeRequest({
			url:Url.getMyActivity,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getActivityTheme(callback){ //获取活动主题
		api.makeRequest({
			url:Url.getActivityTheme,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getActivityComment(params,callback){ //获取活动评论列表
		api.makeRequest({
			url:Url.getActivityComment,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getActivityDetail(params,callback){ //获取活动详情
		api.makeRequest({
			url:Url.getActivityDetail,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getActivityList(params,callback){ //获取社区活动列表
		api.makeRequest({
			url:Url.getActivityList,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getActivityMember(params,callback){ //获取活动报名成员
		api.makeRequest({
			url:Url.getActivityMember,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	activityAttendance(params,callback){ //活动考勤
		api.makeRequest({
			url:Url.activityAttendance,
			method:"POST",
			data:params,
			loading:true,
			success(res){
				callback(res.data)
			}
		})
	},
	
	getArticleList(params,callback){ //获取社区动态列表
		api.makeRequest({
			url:Url.getArticleList,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getArticleDetail(params,callback){ //获取动态详情
		api.makeRequest({
			url:Url.getArticleDetail,
			data:params,
			loading:true,
			success(res){
				callback(res.data.data)
			}
		})
	}
}

export default ActivityApi