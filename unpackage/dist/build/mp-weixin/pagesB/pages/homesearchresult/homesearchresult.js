require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/pages/homesearchresult/homesearchresult"],{"48fa":function(t,e,i){"use strict";var n=i("c621"),a=i.n(n);a.a},"800c":function(t,e,i){"use strict";i.r(e);var n=i("ec4c"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},"98dc":function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return n}));var a=function(){var t=this,e=t.$createElement,i=(t._self._c,0==t.currentIndex&&0!=t.activityArr.length?t.__map(t.activityArr,(function(e,i){var n=t.__get_orig(e),a=e.acStartTime.slice(0,-3),r=e.acEndTime.slice(0,-3);return{$orig:n,g0:a,g1:r}})):null);t.$mp.data=Object.assign({},{$root:{l0:i}})},r=[]},c621:function(t,e,i){},e2ac:function(t,e,i){"use strict";i.r(e);var n=i("98dc"),a=i("800c");for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("48fa");var c,o=i("f0c5"),l=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=l.exports},e61b:function(t,e,i){"use strict";(function(t){i("56cc");n(i("66fd"));var e=n(i("e2ac"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},ec4c:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=c(i("2540")),a=c(i("ad4c")),r=c(i("ea0a"));function c(t){return t&&t.__esModule?t:{default:t}}function o(t){return h(t)||u(t)||s(t)||l()}function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t,e){if(t){if("string"===typeof t)return d(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?d(t,e):void 0}}function u(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function h(t){if(Array.isArray(t))return d(t)}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var f={data:function(){return{state:n.default.state,searchResult:"",titleArr:["活动","社区动态","圈子"],currentIndex:0,allowPull:!1,pageNo:1,activityArr:[],articleArr:[],allCircleArr:[]}},methods:{toAdmire:function(t,e){this.activityArr[e].isAdmire=!0,this.activityArr[e].admireCount++,a.default.thumbsUp({likeContent:t,likeType:"activity"},(function(t){console.log(t)}))},toAdmireArticle:function(t,e){this.articleArr[e].isAdmire=!0,this.articleArr[e].admireCount++,a.default.thumbsUp({likeContent:t,likeType:"dynamic"},(function(t){console.log(t)}))},searchContent:function(){0==this.currentIndex?this.getActivityList({communityId:this.state.communityId,searchContent:this.searchResult,pageSize:4,pageNo:this.pageNo}):1==this.currentIndex?this.getArticleList({companyId:this.state.communityId,channelId:this.state.channelId,searchContent:this.searchResult,pageSize:4,pageNo:this.pageNo}):this.getCircleListFun()},getActivityList:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"one";a.default.getActivityList(t,(function(t){"one"==i?(e.activityArr=t.list,e.allowPull=!t.lastPage):(e.activityArr=[].concat(o(e.activityArr),o(t.list)),e.allowPull=!t.lastPage)}))},getArticleList:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"one";a.default.getArticleList(t,(function(t){console.log("社区动态列表",t.list),"one"==i?(e.articleArr=t.list,e.allowPull=!t.lastPage):(e.articleArr=[].concat(o(e.articleArr),o(t.list)),e.allowPull=!t.lastPage)}))},getCircleListFun:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"one",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";r.default.getCircleList({communityId:this.state.communityId,searchContent:this.searchResult,type:i,pageSize:8,pageNo:this.pageNo},(function(i){"one"==e?(t.allowPull=!i.lastPage,t.allCircleArr=i.list):(t.allowPull=!i.lastPage,t.allCircleArr=[].concat(o(t.allCircleArr),o(i.list)))}))},joinCircle:function(e){var i=this,n=this;r.default.joinCircle({circleId:e},(function(e){t.showToast({title:e.msg,icon:"none"}),n.pageNo=1,i.getCircleListFun()}))},changeIndex:function(t){this.currentIndex!=t&&(this.currentIndex=t),this.pageNo=1,this.searchContent()},pageToDetail:function(e){t.navigateTo({url:"/pagesB/pages/activitydetail/activitydetail?activityId="+e})},pageToDynamicDetail:function(e){t.navigateTo({url:"/pagesB/pages/dynamicdetail/dynamicdetail?articleId="+e})},pageToCircleDetail:function(e,i){t.navigateTo({url:"/pagesB/pages/circledetail/circledetail?circleId="+e+"&isCreater="+i})},clearContent:function(){this.searchResult&&(this.searchResult="",this.searchContent())},subSearchResult:function(t){console.log(this.searchResult),this.searchContent()}},onShareAppMessage:function(t){if("button"===t.from){var e=t.target.dataset.activityid,i=t.target.dataset.title,n=t.target.dataset.imgurl;return a.default.shareActivity({activityId:e},(function(t){console.log(t)})),{title:i,path:"/pagesB/pages/activitydetail/activitydetail?activityId="+e,imageUrl:n}}},onLoad:function(t){this.searchContent()},onPullDownRefresh:function(){this.pageNo=1,this.searchContent()},onReachBottom:function(){0==this.currentIndex&&this.allowPull?(this.pageNo++,this.getActivityList({communityId:this.state.communityId,searchContent:this.searchResult,pageSize:4,pageNo:this.pageNo},"more")):1==this.currentIndex&&this.allowPull?(this.pageNo++,this.getArticleList({companyId:this.state.communityId,channelId:this.state.channelId,searchContent:this.searchResult,pageSize:4,pageNo:this.pageNo},"more")):2==this.currentIndex&&this.allowPull&&(this.pageNo++,this.getCircleListFun("more"))}};e.default=f}).call(this,i("543d")["default"])}},[["e61b","common/runtime","common/vendor"]]]);