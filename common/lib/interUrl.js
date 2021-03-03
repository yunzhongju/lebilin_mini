/*
 * 2020-01-04
 *  by xmj
 */
let baseUrl = 'https://www.quweiquwei.com:5743'

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
	console.log('开发环境')
	// baseUrl = 'http://132.232.74.143:5711'
	baseUrl = 'https://www.quweiquwei.com:5743'
} else {
	console.log('生产环境')
}


let Url = {
	/* user */
	doLogin: `${baseUrl}/user/doLogin`, //换token
	getUserInfo: `${baseUrl}/user/getUserInfo`, //获取用户信息
	getWxInfo: `${baseUrl}/user/getWxInfo`, //获取用户微信信息
	getPhoneNumber: `${baseUrl}/user/getPhoneNumber`, //获取用户手机号
	getUserInfoOptions: `${baseUrl}/user/getUserInfoOptions`, //获取用户信息选项
	joinVolunteer: `${baseUrl}/user/joinVolunteer`, //加入志愿者
	getVolunteerList: `${baseUrl}/user/getVolunteerList`, //获取志愿者列表
	getPartyMemberList: `${baseUrl}/user/getPartyMemberList`, //获取党员列表
	applyForHeadman: `${baseUrl}/store/applyForHeadman`, //申请成为团长
	getHeadmanInfo: `${baseUrl}/store/getHeadmanInfo`, //获取团长信息
	getDeliveryAddress: `${baseUrl}/user/getDeliveryAddress`, //获取收货地址列表
	deleteDeliveryAddress: `${baseUrl}/user/deleteDeliveryAddress`, //删除收货地址
	saveDeliveryAddress: `${baseUrl}/user/saveDeliveryAddress`, //保存收货地址
	modifyUserInfo: `${baseUrl}/user/modifyUserInfo`, //修改用户信息
	getMyVolunteerCert: `${baseUrl}/user/getMyVolunteerCert`, // 获取志愿者证书
	getUnreadMessage: `${baseUrl}/user/getUnreadMessage`, //获取我的消息列表
	markRead: `${baseUrl}/user/markRead`, //标记消息为已读
	deleteUnreadMessage: `${baseUrl}/user/deleteUnreadMessage`, //删除消息

	/* supplier */
	applyForSupplier: `${baseUrl}/supplier/applyForSupplier`, //申请成为供应商
	getSupplierInfo: `${baseUrl}/supplier/getSupplierInfo`, //获取供应商信息
	getCommunityBusiness: `${baseUrl}/supplier/getCommunityBusiness`, //获取社区企业列表
	getBusinessLeagues: `${baseUrl}/supplier/getBusinessLeagues`, //获取居商联盟列表

	/* store */
	closeOrOpenStore: `${baseUrl}/store/closeOrOpenStore`, //更改店铺营业状态
	applyForStore: `${baseUrl}/store/applyForStore`, //申请店铺
	applyForHeadman: `${baseUrl}/store/applyForHeadman`, //申请成为店长
	getSecondClassify: `${baseUrl}/store/getSecondClassify`, //获取商品二级分类
	getGoodsClassify: `${baseUrl}/store/getGoodsClassify`, //获取商品类别
	getMyStores: `${baseUrl}/store/getMyStores`, //获取团长所属店铺列表
	getStoreInfo: `${baseUrl}/store/getStoreInfo`, //获取店铺信息
	getStoreBanner: `${baseUrl}/store/getStoreBanner`, //获取店铺广告图片
	getHeadmanInfo: `${baseUrl}/store/getHeadmanInfo`, //获取店长信息
	getMyStoreDetail: `${baseUrl}/store/getMyStoreDetail`, //获取店长未通过店铺详情
	getNearbyStores: `${baseUrl}/store/getNearbyStores`, //获取附近店铺列表
	getSupplierList: `${baseUrl}/store/getSupplierList`, //获取供应商列表
	getSupplyGoods: `${baseUrl}/store/getSupplyGoods`, //获取供应商商品列表
	getSupplyGoodsDetail: `${baseUrl}/store/getSupplyGoodsDetail`, //获取供应商商品详情
	addStoreGoods: `${baseUrl}/store/addStoreGoods`, //店铺上架商品
	getStoreGoods: `${baseUrl}/store/getStoreGoods`, //获取店铺商品列表
	getGoodsDetail: `${baseUrl}/store/getGoodsDetail`, //获取店铺商品详情
	getOptimizationGoods: `${baseUrl}/store/getOptimizationGoods`, //获取社区优选商品
	removeStoreGoods: `${baseUrl}/store/removeStoreGoods`, //店铺下架商品
	getStoreIncome: `${baseUrl}/store/getStoreIncome`, //获取店铺收益信息
	getStoreOrderList: `${baseUrl}/store/getStoreOrderList`, //获取店铺订单列表

	/* circle */
	createCircle: `${baseUrl}/circle/createCircle`, //创建或修改圈
	getCircleInfo: `${baseUrl}/circle/getCircleInfo`, //获取圈子信息
	getCircleList: `${baseUrl}/circle/getCircleList`, //获取圈子列表
	joinCircle: `${baseUrl}/circle/joinCircle`, //加入圈子
	deleteFromCircle: `${baseUrl}/circle/deleteFromCircle`, //将成员踢出圈子
	getHostCircles: `${baseUrl}/circle/getHostCircles`, //获取圈主所属圈子列表
	getCircleMember: `${baseUrl}/circle/getCircleMember`, //获取圈子成员
	getCircleTotalPeople: `${baseUrl}/circle/getCircleTotalPeople`, //获取所有圈子总人数

	/* common */
	uploadPic: `${baseUrl}/common/uploadPic`, //上传圈子及活动图片
	getDivision: `${baseUrl}/common/getDivision`, //获取行政区划
	getDataDictionary: `${baseUrl}/common/getDataDictionary`, //获取码表
	getAdvertBanner: `${baseUrl}/common/getAdvertBanner`, //获取广告

	/* activity */
	shareActivity: `${baseUrl}/activity/shareActivity`, //分享活动
	publishActivity: `${baseUrl}/activity/publishActivity`, //发布活动
	addActivityComment: `${baseUrl}/activity/addActivityComment`, //发表评论
	addCommentReply: `${baseUrl}/activity/addCommentReply`, //回复评论
	signUpActivity: `${baseUrl}/activity/signUpActivity`, //报名活动
	thumbsUp: `${baseUrl}/activity/likeActivityOrComment`, //点赞或评论
	getMyActivity: `${baseUrl}/activity/getMyActivity`, //获取我的活动列表
	getActivityTheme: `${baseUrl}/activity/getActivityTheme`, //获取活动主题
	getActivityComment: `${baseUrl}/activity/getActivityComment`, //获取活动评论列表
	getActivityDetail: `${baseUrl}/activity/getActivityDetail`, //获取活动详情
	getActivityList: `${baseUrl}/activity/getActivityList`, //获取社区活动列表
	getActivityMember: `${baseUrl}/activity/getActivityMember`, //获取活动报名成员
	activityAttendance: `${baseUrl}/activity/activityAttendance`, //活动考勤
	getArticleList: `${baseUrl}/getArticleList`, //获取社区动态列表
	getArticleDetail: `${baseUrl}/getArticleDetail`, //获取动态详情

	/* wish */
	getWishList: `${baseUrl}/wish/getWishList`, // 获取心愿列表
	publishWish: `${baseUrl}/wish/publishWish`, //发布心愿
	getWishDetail: `${baseUrl}/wish/getWishDetail`, //获取心愿详情
	claimWish: `${baseUrl}/wish/claimWish`, //心愿认领
	submitWishServiceProcess: `${baseUrl}/wish/submitWishServiceProcess`, //提交服务过程
	evaluateWishService: `${baseUrl}/wish/evaluateWishService`, //心愿评价

	/* service */
	getService: `${baseUrl}/service/getService`, //获取服务列表
	getServiceDetail: `${baseUrl}/service/getServiceDetail`, //获取服务详情

	/* integral */
	getRuanData: `${baseUrl}/integral/getRuanData`, //同步微信步数
	doCheck: `${baseUrl}/integral/doCheck`, //签到
	getTaskList: `${baseUrl}/integral/getTaskList`, //获取任务列表
	getCheckRecord: `${baseUrl}/integral/getCheckRecord`, //获取当月签到详情
	doRecheck: `${baseUrl}/integral/doRecheck`, //补签
	exchangePresent: `${baseUrl}/integral/exchangePresent`, //兑换礼品
	getExchangeRecord: `${baseUrl}/integral/getExchangeRecord`, //礼品兑换记录
	getIntegralGoodsList: `${baseUrl}/integral/getIntegralGoodsList`, //获取吉芬商品兑换列表
	getMyBillList: `${baseUrl}/integral/getMyBillList`, //获取账单列表
	getIntegralQRCode: `${baseUrl}/integral/getIntegralQRCode`,

	/* deposit */
	deleteDeposit: `${baseUrl}/deposit/deleteDeposit`, //删除店铺核销人员
	saveDeposit: `${baseUrl}/deposit/saveDeposit`, //提交核销人员信息
	getStoreDeposit: `${baseUrl}/deposit/getStoreDeposit`, //获取店铺核销人员
	searchUndeposit: `${baseUrl}/deposit/searchUndeposit`, //核销人员搜索

	/* order */
	deleteOrder: `${baseUrl}/order/deleteOrder`, //删除订单
	isDistribution: `${baseUrl}/order/isDistribution`, //判断订单是否可配送
	doCashOut: `${baseUrl}/order/doCashOut`, //发起提现
	completeOrder: `${baseUrl}/order/completeOrder`, //完成订单
	submitOrder: `${baseUrl}/order/submitOrder`, //提交订单
	cashOut: `${baseUrl}/order/cashOut`, //提现
	orderRefound: `${baseUrl}/order/orderRefound`, //订单退款
	confirmOrder: `${baseUrl}/order/confirmOrder`, //确认订单
	getOrderQRCode: `${baseUrl}/order/getOrderQRCode`, //获取订单二维码
	getOrderList: `${baseUrl}/order/getOrderList`, //获取订单列表
	getOrderDetail: `${baseUrl}/order/getOrderDetail`, //获取订单详情
	toPay: `${baseUrl}/order/toPay`, //订单支付

	/* cart */
	modifyGoodsQuantity: `${baseUrl}/cart/modifyGoodsQuantity`, //修改购物车商品数量
	removeFromCart: `${baseUrl}/cart/removeFromCart`, //删除购物车商品
	addToCart: `${baseUrl}/cart/addToCart`, //添加商品到购物车
	getShoppingCart: `${baseUrl}/cart/getShoppingCart`, //获取购物车商品列表

	/* project */
	getProjectList: `${baseUrl}/project/getProjectList`, //获取项目列表
	getFileDetail: `${baseUrl}/project/getFileDetail`, //获取项目文件详情
	getProjectDetail: `${baseUrl}/project/getProjectDetail`, //获取项目详情
}
export default Url
