require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesC/components/neil-modal"],{2931:function(t,n,e){"use strict";e.r(n);var i=e("8248"),o=e.n(i);for(var c in i)"default"!==c&&function(t){e.d(n,t,(function(){return i[t]}))}(c);n["default"]=o.a},"3ed5":function(t,n,e){},"4d67":function(t,n,e){"use strict";e.r(n);var i=e("b2d9"),o=e("2931");for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);e("6dec");var a,u=e("f0c5"),l=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);n["default"]=l.exports},"6dec":function(t,n,e){"use strict";var i=e("3ed5"),o=e.n(i);o.a},8248:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={name:"neil-modal",props:{title:{type:String,default:""},content:String,align:{type:String,default:"left"},cancelText:{type:String,default:"取消"},cancelColor:{type:String,default:"#333333"},confirmText:{type:String,default:"确定"},confirmColor:{type:String,default:"#007aff"},showCancel:{type:[Boolean,String],default:!0},show:{type:[Boolean,String],default:!1},autoClose:{type:[Boolean,String],default:!0}},data:function(){return{isOpen:!1}},watch:{show:function(t){this.isOpen=t}},created:function(){this.isOpen=this.show},methods:{bindTouchmove:function(){},clickLeft:function(){var t=this;setTimeout((function(){t.$emit("cancel")}),200),this.closeModal()},clickRight:function(){var t=this;setTimeout((function(){t.$emit("confirm")}),200),this.closeModal()},clickMask:function(){this.autoClose&&this.closeModal()},closeModal:function(){this.showAnimation=!1,this.isOpen=!1,this.$emit("close")}}};n.default=i},b2d9:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return i}));var o=function(){var t=this,n=t.$createElement;t._self._c},c=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesC/components/neil-modal-create-component',
    {
        'pagesC/components/neil-modal-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("4d67"))
        })
    },
    [['pagesC/components/neil-modal-create-component']]
]);
