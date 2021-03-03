//工具函数
import store from '@/store'
import amapFile from '@/common/lib/amap-wx.js'
/* 比较时间先后 */
export function CompareTime(time1, time2) {
	return dealTime(time1) > dealTime(time2)
}

/* 处理时间大小 */
export function dealTime(time) {
	let time1arr = time.split(' ')
	let time2arr = time1arr.join('')
	let time3arr = time2arr.split('-')
	let time4arr = time3arr.join('')
	let time5arr = time4arr.split(':')
	// console.log( Number(time5arr.join('')) )
	return time5arr.join('')
}

/* 处理时间格式 */
// export function dealTimeFormat(time){

// }

export function getBase64(filePath) { //图片转base64
	return uni.getFileSystemManager().readFileSync(filePath, 'base64')
}

export function isTel(str) { // 判断手机号
	let reg = /^1[0-9]{10}$/;
	return reg.test(str)
}

export function isCard(str) { //判断身份证号
	let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
	return reg.test(str)
}

//将位置转换为地址
export function reverseGeocoder() {
	let QQ_MAP_key = '61bb87aa6292ed6e3535dc08a033da49';
	let myAmapFun = new amapFile.AMapWX({
		key: QQ_MAP_key
	});

	return new Promise((resolve, reject) => {
		myAmapFun.getRegeo({
			success: function(data) {
				//成功回调
				//真机上才有效果
				resolve(data);
			},
			fail: function(info) {
				//失败回调
				wx.showToast({
					icon: "none",
					title: "获取地址失败" + JSON.stringify(info),
					mask: true
				})
			}
		})
	})
}

// 获取当前时间
export function getNowTime() {
	let date = new Date();

	let year = date.getFullYear();

	let month = date.getMonth() + 1;
	month = month.toString()[1] ? month : `0${month}`
	let day = date.getDate();
	day = day.toString()[1] ? day : `0${day}`
	let hour = date.getHours();
	hour = hour.toString()[1] ? hour : `0${hour}`
	let minute = date.getMinutes();
	minute = minute.toString()[1] ? minute : `0${minute}`
	let second = date.getSeconds();
	second = second.toString()[1] ? second : `0${second}`
	return year.toString() + month + day + hour + minute + second
}

// 获取经纬度 地址
export function getLocatio_LBS(callback) {
	uni.getLocation({
		type: 'gcj02',
		success: (res) => {

			// 保存首次进入的经纬度
			uni.setStorageSync('longitude', res.longitude);
			uni.setStorageSync('latitude', res.latitude);

			store.commit('setLanLng', {
				latitude: res.latitude,
				longitude: res.longitude
			})

			// 转换地址
			reverseGeocoder().then(data => {
				// 处理城市code
				if (typeof(data[0].regeocodeData.addressComponent.adcode) == "string") {
					uni.setStorageSync('citycode', data[0].regeocodeData.addressComponent.adcode || '');
				} else {
					uni.showToast({
						title: JSON.stringify(data[0].regeocodeData.addressComponent.adcode),
						icon: 'none',
						mask: true
					})
				}

				const newAddr = data[0].regeocodeData.formatted_address;

				store.commit('setAddress', newAddr || '');
				wx.setStorageSync('address', newAddr);
				// 处理创建活动页地址
				store.state.address = newAddr;
				store.state.lng = res.longitude;
				store.state.lat = res.latitude;
				// 获取地址成功
				store.commit('setPassAddr', true);

				callback && callback({
					address: newAddr,
					lng: res.longitude,
					lat: res.latitude
				});
			})
		},
		fail: (res) => {
			if (!wx.getStorageSync('citycode')) {
				wx.showToast({
					icon: 'none',
					title: '您已拒绝授权定位',
					mask: true
				})
			}

			// 拒绝过
			store.commit('setPassAddr', false);
			// callback && callback(true)
		}
	})
}
