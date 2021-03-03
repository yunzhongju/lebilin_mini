
let resArrImg = [];
var index = 0;   // 从第一张开始上传
import CommonApi from '@/servies/CommonApi.js'
const uploadFile = {
    _fail: function(desc) {
        uni.showToast({
            icon: "none",
            title: desc
        })
    },
    _success: function() {},
    chooseImg: function(sendData) {
        //先存储传递过来的回调函数
        this._success = sendData._success;
        var that = this;
        uni.chooseImage({
            count: sendData.count || 1,
            sizeType: ['original', 'compressed'],
            sourceType: ["album", "camera"],
            success: res => {
              uni.showLoading({
                title:'上传中...',
                mask: true
              });
              that.uploadAliYun(res.tempFilePaths);
            }
        })
    },

    uploadAliYun: function(params) {
        var that = this;

        if (params.length < 1) {
            uni.showModal({
                title: '图片错误',
                content: '请重试',
                showCancel: false,
            })
            return;
        }
		
		resArrImg.push(params[index])
		index ++
		//递归调用，上传下一张
		if(index < params.length) {
		  that.uploadAliYun(params);
		}else {
			console.log( '图片路径数组', resArrImg )
		   that._success(resArrImg);
		   index = 0 ;
		   resArrImg = [];
		}

        /* uni.uploadFile({
          url: 'http://132.232.74.143:5711/common/uploadPic',
          filePath: params[index],
          name: 'pic',
          formData: {},
            success: function (res) {

                if (res.statusCode != 200) {
                    uni.hideLoading();
                    that._fail("上传图片失败");
                    return;
                }

                const _data = JSON.parse(res.data);
				console.log( '图片临时路径', _data )
                resArrImg.push(_data.data[0]);
                index++;

                //递归调用，上传下一张
                if(index < params.length) {
                  that.uploadAliYun(params);
                }else {
					console.log( '图片路径数组', resArrImg )
                   that._success(resArrImg);
                   index = 0 ;
                   resArrImg = [];
                }
            },
            fail: function (err) {
                uni.hideLoading();
                that._fail(err.errMsg)
            },
        }) */

    },
	
	
}

export default uploadFile
