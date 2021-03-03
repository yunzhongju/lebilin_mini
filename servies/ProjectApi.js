import api from '@/utils/api.js'
import Url from '@/common/lib/interUrl.js'

const ProjectApi = {
	getProjectList(params,callback){ //获取项目列表
		api.makeRequest({
			url:Url.getProjectList,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getFileDetail(params,callback){ //获取项目文件详情
		api.makeRequest({
			url:Url.getFileDetail,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	},
	
	getProjectDetail(params,callback){ //获取项目详情
		api.makeRequest({
			url:Url.getProjectDetail,
			data:params,
			success(res){
				callback(res.data.data)
			}
		})
	}
}

export default ProjectApi