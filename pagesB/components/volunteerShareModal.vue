<template>
	<view class="content" v-if="isShow" @click.stop="isShow=false" @catchtouchmove="preventTouchMove">
		<canvas @click.stop="" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" canvas-id="my-canvas"></canvas>
		<view class="save-btn" @click.stop="saveImage">保存图片</view>
	</view>
</template>

<script>
	import store from '@/store'
	export default {
		props: {
			headerImg: {
				type: String,
				default: 'https://oss.zhangyubk.com/%E8%8D%89%E8%8E%93%E5%8D%83%E5%B1%82.png'
			},
			title: {
				type: String,
				default: '草莓千层蛋糕'
			},
			qrcode: {
				type: String,
				default: 'https://oss.zhangyubk.com/cmqrcode.jpg'
			}
		},
		data() {
			return {
				state: store.state,
				canvasW: 0,
				canvasH: 0,
				ctx: null,
				isShow: false
			}
		},
		methods: {
			preventTouchMove() {},
			//显示
			showCanvas() {
				this.isShow = true
				this.__init()
			},
			//初始化画布
			async __init() {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				this.ctx = uni.createCanvasContext('my-canvas', this)
				this.canvasW = uni.upx2px(591); //画布宽
				this.canvasH = uni.upx2px(989); //画布高

				//设置画布背景透明
				this.ctx.setFillStyle('rgba(255, 255, 255, 0)')
				//设置画布大小
				this.ctx.fillRect(0, 0, this.canvasW, this.canvasH)
				//绘制圆角背景
				this.ctx.save()
				// this.drawRoundRect(this.ctx, 0, 0, this.canvasW, this.canvasH, uni.upx2px(20), '#FFFFFF')
				this.ctx.setFillStyle("#fff")
				this.roundRect(this.ctx, 0, 0, this.canvasW, this.canvasH, uni.upx2px(20))

				//获取头像图片
				this.ctx.restore()
				let headerUrl = await this.getImageInfo(this.state.userInfo.headerUrl)
				let headBgH = uni.upx2px(120)
				//绘制头像
				this.circleImg(this.ctx, headerUrl.path, uni.upx2px(54), ((headBgH - uni.upx2px(88)) / 2), uni.upx2px(44))

				//昵称、ID、cdkey
				const nickName =
					this.state.userInfo.personName.length > 10 ?
					this.state.userInfo.personName.substring(0, 8) + "..." :
					this.state.userInfo.personName;
				// const ID = "ID:" + this.state.userInfo.personCode;
				const ID = '招募志愿者';
				//绘制
				this.ctx.setFontSize(uni.upx2px(26))
				this.ctx.setFillStyle('#000')
				this.ctx.setTextAlign('left')
				this.ctx.fillText(nickName, uni.upx2px(170), uni.upx2px(70))

				this.ctx.save()
				//获取背景图片
				let headerImg = await this.getImageInfo(this.headerImg)
				let hW = uni.upx2px(591);
				let hH = uni.upx2px(654);
				//绘制背景图
				// this.drawRoundImg(this.ctx, headerImg.path, ((this.canvasW - hW) / 2), headBgH, hW, hH, 0)
				this.ctx.drawImage(headerImg.path, ((this.canvasW - hW) / 2), headBgH, hW, hH)

				//绘制背景框 + 小程序码
				this.ctx.fillStyle = '#ffffff'
				// 阴影的x偏移
				this.ctx.shadowOffsetX = uni.upx2px(8);
				// 阴影的y偏移
				this.ctx.shadowOffsetY = uni.upx2px(4);
				// 阴影颜色
				this.ctx.shadowColor = 'rgba(0,0,0,0.4)';
				//阴影模糊尺寸
				this.ctx.shadowBlur = uni.upx2px(10)

				//绘制背景框
				this.ctx.beginPath()
				this.ctx.arc((this.canvasW / 2), uni.upx2px(756), uni.upx2px(100), 0, 2 * Math.PI)
				this.ctx.fill()
				this.ctx.restore()
				this.ctx.closePath()

				//绘制小程序码
				let qrCodeImg = await this.getImageInfo(this.qrcode)
				this.ctx.drawImage(qrCodeImg.path, ((this.canvasW - uni.upx2px(170)) / 2), uni.upx2px(671), uni.upx2px(170), uni.upx2px(
					170))

				//绘制底部文本
				/* this.canvasTextAutoLine(this.title, this.ctx, uni.upx2px(34), uni.upx2px(906), "#000", uni.upx2px(24), uni.upx2px(
					40), uni.upx2px(512), 2) */
				let titleArr = this.title.split('。')
				titleArr[0] = titleArr[0] + '。'
				this.ctx.setFontSize(uni.upx2px(24))
				this.ctx.setFillStyle("#000")
				this.ctx.setTextAlign('center')
				titleArr.forEach((item, index) => {
					this.ctx.fillText(item, (this.canvasW / 2), (uni.upx2px(906) + index * uni.upx2px(40)))
				})

				//延迟渲染
				setTimeout(() => {
					this.ctx.draw(true, () => {
						uni.hideLoading()
					})
				}, 500)
			},
			//绘制多行文本，超出显示省略号
			canvasTextAutoLine(str, ctx, initX, initY, style, font, lineHeight, maxWidth, row) {

				var lineWidth = 0;

				var lastSubStrIndex = 0;

				ctx.setFontSize(font);

				// ctx.font = `normal bold ${font} sans-serif`;

				ctx.setFillStyle(style);

				ctx.setTextAlign("left");

				var currentRow = 1;

				maxWidth = Math.ceil(maxWidth);

				for (let i = 0; i < str.length; i++) {

					lineWidth += ctx.measureText(str[i]).width;

					// console.log(lineWidth)

					if (lineWidth > maxWidth) {

						// console.log(maxWidth, "最大宽度")

						currentRow++;

						let newStr = str.substring(lastSubStrIndex, i + 1)

						if (currentRow > row && str.length > i) {

							newStr = str.substring(lastSubStrIndex, i - 2) + '...'

						}

						ctx.fillText(newStr, initX, initY);

						initY += lineHeight;

						lineWidth = 0;

						lastSubStrIndex = i + 1;



						if (currentRow > row) {

							break;

						}

					}

					if (i == str.length - 1) {

						ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);

					}

				}

			},
			//绘制实心圆
			drawEmptyRound(ctx, x, y, radius) {
				ctx.save()
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
				ctx.setFillStyle('rgba(0, 0, 0, .4)')
				ctx.fill();
				ctx.restore()
				ctx.closePath()
			},
			//绘制虚线
			drawDashLine(ctx, x1, y1, x2, y2, dashLength) {
				ctx.setStrokeStyle("#cccccc") //设置线条的颜色
				ctx.setLineWidth(1) //设置线条宽度
				var dashLen = dashLength,
					xpos = x2 - x1, //得到横向的宽度;
					ypos = y2 - y1, //得到纵向的高度;
					numDashes = Math.floor(Math.sqrt(xpos * xpos + ypos * ypos) / dashLen);
				//利用正切获取斜边的长度除以虚线长度，得到要分为多少段;
				for (var i = 0; i < numDashes; i++) {
					if (i % 2 === 0) {
						ctx.moveTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
						//有了横向宽度和多少段，得出每一段是多长，起点 + 每段长度 * i = 要绘制的起点；
					} else {
						ctx.lineTo(x1 + (xpos / numDashes) * i, y1 + (ypos / numDashes) * i);
					}
				}
				ctx.stroke();
			},
			//带圆角图片
			drawRoundImg(ctx, img, x, y, width, height, radius) {
				ctx.beginPath()
				ctx.save()
				// 左上角
				ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5)
				// 右上角
				ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2)
				// 右下角
				ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5)
				// 左下角
				ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI)
				ctx.stroke()
				ctx.clip()
				ctx.drawImage(img, x, y, width, height);
				ctx.restore()
				ctx.closePath()
			},
			//圆形图片
			circleImg(ctx, img, x, y, r) {
				ctx.save();
				var d = 2 * r;
				var cx = x + r;
				var cy = y + r;
				ctx.arc(cx, cy, r, 0, 2 * Math.PI);
				ctx.clip();
				ctx.drawImage(img, x, y, d, d);
				ctx.restore();
			},
			//圆角矩形
			drawRoundRect(ctx, x, y, width, height, radius, color) {
				ctx.save();
				ctx.beginPath();
				ctx.setFillStyle(color);
				ctx.setStrokeStyle(color)
				ctx.setLineJoin('round'); //交点设置成圆角
				ctx.setLineWidth(radius);
				ctx.strokeRect(x + radius / 2, y + radius / 2, width - radius, height - radius);
				ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
				ctx.stroke();
				ctx.closePath();
				ctx.restore()
			},
			roundRect(ctx, x, y, w, h, r) {
				ctx.save();
				if (w < 2 * r) {
					r = w / 2;
				}
				if (h < 2 * r) {
					r = h / 2;
				}
				ctx.beginPath();
				ctx.setFillStyle('white')
				ctx.moveTo(x + r, y);
				ctx.arcTo(x + w, y, x + w, y + h, r);
				ctx.arcTo(x + w, y + h, x, y + h, r);
				ctx.arcTo(x, y + h, x, y, r);
				ctx.arcTo(x, y, x + w, y, r);
				ctx.fill();
				ctx.closePath();
				ctx.draw(true);
			},
			//获取图片
			getImageInfo(imgSrc) {
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: imgSrc,
						success: (image) => {
							resolve(image);
							console.log('获取图片成功', image)
						},
						fail: (err) => {
							reject(err);
							console.log('获取图片失败', err)
						}
					});
				});
			},
			//保存图片到相册
			saveImage() {
				//判断用户授权
				uni.getSetting({
					success(res) {
						console.log('获取用户权限', res.authSetting)
						if (Object.keys(res.authSetting).length > 0) {
							//判断是否有相册权限
							if (res.authSetting['scope.writePhotosAlbum'] == undefined) {
								//打开设置权限
								uni.openSetting({
									success(res) {
										console.log('设置权限', res.authSetting)
									}
								})
							} else {
								if (!res.authSetting['scope.writePhotosAlbum']) {
									//打开设置权限
									uni.openSetting({
										success(res) {
											console.log('设置权限', res.authSetting)
										}
									})
								}
							}
						} else {
							return
						}
					}
				})
				var that = this
				uni.canvasToTempFilePath({
					canvasId: 'my-canvas',
					quality: 1,
					complete: (res) => {
						console.log('保存到相册', res);
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								uni.showToast({
									title: '已保存到相册',
									icon: 'success',
									duration: 2000
								})
								setTimeout(() => {
									that.isShow = false
								}, 2000)
							}
						})
					}
				}, this);
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, .4);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		.save-btn {
			width: 591rpx;
			margin-top: 20rpx;
			border-radius: 20rpx;
			font-size: 35rpx;
			color: #fff;
			background: #ff2f29;
			height: 85rpx;
			line-height: 85rpx;
			text-align: center;
		}
	}
</style>
