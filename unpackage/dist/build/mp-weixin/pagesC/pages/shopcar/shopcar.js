require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesC/pages/shopcar/shopcar"],{"0800":function(o,t,n){"use strict";n.r(t);var s=n("4e9a"),e=n.n(s);for(var i in s)"default"!==i&&function(o){n.d(t,o,(function(){return s[o]}))}(i);t["default"]=e.a},"21ef":function(o,t,n){"use strict";(function(o){n("56cc");s(n("66fd"));var t=s(n("5381"));function s(o){return o&&o.__esModule?o:{default:o}}o(t.default)}).call(this,n("543d")["createPage"])},"27bd":function(o,t,n){"use strict";var s=n("edb5"),e=n.n(s);e.a},"4e9a":function(o,t,n){"use strict";(function(o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=c(n("b3a3")),e=c(n("77c2")),i=c(n("2540"));function c(o){return o&&o.__esModule?o:{default:o}}var r=function(){n.e("pagesC/components/uni-swipe-action/uni-swipe-action").then(function(){return resolve(n("ec1b"))}.bind(null,n)).catch(n.oe)},a=function(){Promise.all([n.e("pagesC/common/vendor"),n.e("pagesC/components/uni-swipe-action-item/uni-swipe-action-item")]).then(function(){return resolve(n("4509"))}.bind(null,n)).catch(n.oe)},u={components:{uniSwipeAction:r,uniSwipeActionItem:a},data:function(){return{state:i.default.state,options:[{text:"删除",style:{backgroundColor:"#dd524d"}}],isRequest:!1,storeId:"",goodsList:[],allcheck:!0}},methods:{sureOrder:function(){if(this.goodsList==[]||!this.goodsList.cartGoods.length||this.goodsList.cartGoods.every((function(o){return!o.check})))return o.showToast({title:"暂时没有选中商品~",icon:"none"});var t={storeId:this.storeId},n=this.goodsList.cartGoods.filter((function(o){return o.check}));t.shopId=n.map((function(o){return o.shopId})).join(";"),console.log(t),e.default.confirmOrder(t,(function(t){t&&(i.default.commit("setStoreIdtwo",t.storeId),o.navigateTo({url:"/pagesC/pages/sureorder/sureorder?shopcar=true&confirmOrderInfo="+encodeURIComponent(JSON.stringify(t))}))}))},changeState:function(o){var t=this;if("all"==o)this.allcheck=!this.allcheck,this.goodsList.cartGoods.forEach((function(o){o.check=!!t.allcheck}));else{var n=this.goodsList.cartGoods[o];n.check=!n.check,this.goodsList.cartGoods.splice(o,1,n),this.allcheck=this.goodsList.cartGoods.every((function(o){return o.check})),console.log("商品状态",this.goodsList.cartGoods)}},getShoppingCart:function(){var o=this;s.default.getShoppingCart({storeId:this.storeId},(function(t){i.default.commit("setCartGoods",t.cartGoods),0==t.cartGoods.length?i.default.commit("setHasGoods",!1):i.default.commit("setHasGoods",!0),t.cartGoods.forEach((function(o){o.check=!0})),o.goodsList=t,o.isRequest=!0,console.log("商品列表",t)}))},onClick:function(o,t){var n=this;s.default.removeFromCart({shopId:o},(function(o){console.log(o.msg),n.goodsList.cartGoods.splice(t,1)}))},changeNum:function(t,n,e,i,c){var r=this;return c<=this.goodsList.cartGoods[i].countNum&&1==t?o.showToast({title:"库存不足~",icon:"none"}):1==this.goodsList.cartGoods[i].countNum&&-1==t?o.showToast({title:"最小数量为1哦~",icon:"none"}):void s.default.modifyGoodsQuantity({shopId:n,quantity:e+t},(function(o){console.log(o.msg),r.goodsList.cartGoods[i].countNum+=t}))}},computed:{calculationPrice:function(){if(this.goodsList==[]||void 0==this.goodsList.cartGoods||void 0!=!this.goodsList.cartGoods&&this.goodsList.cartGoods==[])return"0.00";var o=0,t=this.goodsList.cartGoods.filter((function(o){return o.check}));return t.forEach((function(t){o+=t.countNum*t.sellPrice})),o.toFixed(2)},calculationIntegral:function(){if(this.goodsList==[]||void 0==this.goodsList.cartGoods||void 0!=!this.goodsList.cartGoods&&this.goodsList.cartGoods==[])return 0;var o=0,t=this.goodsList.cartGoods.filter((function(o){return o.check}));return t.forEach((function(t){o+=t.countNum*t.integral})),o}},onLoad:function(o){this.storeId=o.storeId||"",this.getShoppingCart()},onUnload:function(){this.isRequest=!1,this.goodsList=[]},onShow:function(){this.getShoppingCart()}};t.default=u}).call(this,n("543d")["default"])},5381:function(o,t,n){"use strict";n.r(t);var s=n("e761"),e=n("0800");for(var i in e)"default"!==i&&function(o){n.d(t,o,(function(){return e[o]}))}(i);n("27bd");var c,r=n("f0c5"),a=Object(r["a"])(e["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],c);t["default"]=a.exports},e761:function(o,t,n){"use strict";var s;n.d(t,"b",(function(){return e})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return s}));var e=function(){var o=this,t=o.$createElement;o._self._c},i=[]},edb5:function(o,t,n){}},[["21ef","common/runtime","common/vendor","pagesC/common/vendor"]]]);