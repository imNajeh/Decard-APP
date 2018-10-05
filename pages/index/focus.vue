<template>
	<view class="content">
		<view class="focus_wrap">
			<uni-drawer :visible="rightDrawerVisible" :list="download_list" mode="right" @close="closeRightDrawer"></uni-drawer>
			<view class="focus_card" :style="{'backgroundColor':color}">
				<view class="title">{{name}}</view>
				<view class="circle dot" :style="{'backgroundColor':color}" v-if="!complete">
					<swiper @change="changeAudio" :circular="true" :current-item-id="current" class="music" :duration="800">
						<swiper-item class="music_inner" v-for="(item,index) in itemList" :key="item" :item-id="index">
							<text>{{item.text}}</text>
						</swiper-item>
					</swiper>
				</view>
				<view class="circle dot" :style="{'backgroundColor':color}" v-else>
					已完成专注
				</view>
				<view class="counter" v-if="!complete">
					+ {{formatSecond?formatSecond:'00:00:00'}}
				</view>
				<view class="counter" v-else>
					奖励币已存入您账户
				</view>
				<view class="btn_wrap">
					<view class="btn" v-if="!complete" @tap="pauseTimer()">{{is_pause?'继续':'暂停'}}</view>
					<view class="btn" v-if="!complete" @tap="stopTimer()">停止</view>
					<view class="btn" v-if="complete" @tap="goBackHome()">返回首页</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniDrawer from '../../components/uniDrawer.vue';
	var util = require('../../common/util.js')
	export default {
		data: {
			rightDrawerVisible: false,
			classify: '',
			id: null,
			seconds: 0,
			color: "",
			name: "",
			time: null,
			timer: null,
			is_pause: false,
			complete: false,
			itemList: [{
					text: '静心',
					filename: 'Wilderness_River'
				},
				{
					text: '海洋',
					filename: 'Sleepy_Beach_Waves'
				},
				{
					text: '雨天',
					filename: 'Kicking_Horse'
				},
				{
					text: '初春',
					filename: 'Spring_Nocturne'
				},
				{
					text: '溪流',
					filename: 'Wilderness_River'
				},
				{
					text: '森林',
					filename: 'Dream_Forest'
				}
			],
			download_list: [{
					text: '雨天',
					img: "rain",
					have: true
				},
				{
					text: '溪流',
					img: "rivier",
					have: true
				},
				{
					text: '海洋',
					img: "hailang",
					have: false,
					cost: 6
				}
			],
			current_audio: "Wilderness_River",
			current: 1,
			player: null
		},
		onLoad(option) {
			this.complete = false;
			this.seconds = 0;
			this.color = option.color;
			this.name = option.name;
			this.time = option.time;
			this.classify = option.classify;
			this.id = option.id;

			this.listenBackBtn();
			this.beginTimer();

			this.createPlayer();
		},
		components: {
			uniDrawer
		},
		computed: {
			formatSecond() {
				if (this.seconds >= 3600) {
					return (parseInt(this.seconds / 3600) < 10 ? '0' + parseInt(this.seconds / 3600) : parseInt(this.seconds / 3600)) +
						':' + (parseInt((this.seconds % 3600) / 60) < 10 ? '0' + parseInt((this.seconds %
							3600) / 60) : parseInt((this.seconds % 3600) / 60)) + ':' + ((this.seconds % 3600) % 60 < 10 ? '0' + (this.seconds %
							3600) % 60 : (this.seconds % 3600) % 60)
				} else {
					return '00:' + (parseInt(this.seconds / 60) < 10 ? '0' + parseInt(this.seconds / 60) : parseInt(this.seconds / 60)) +
						':' + (this.seconds % 60 < 10 ? '0' + this.seconds % 60 : this.seconds % 60)
				}
			}
		},
		onNavigationBarButtonTap(e) {
			this.rightDrawerVisible = !this.rightDrawerVisible
		},
		methods: {
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},
			listenBackBtn() {
				//#ifdef APP-PLUS
				plus.key.addEventListener("backbutton", this.handleBack);
				//#endif
			},
			handleBack() {
				const _this = this;
				console.log("BackButton Key pressed!");
				uni.showModal({
					title: '提示',
					content: '确定要退出这次专注吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							_this.removeBack()
							uni.reLaunch({
								url: 'index'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			removeBack() {
				//#ifdef APP-PLUS
				plus.key.removeEventListener("backbutton", this.handleBack);
				clearTimeout(this.timer);
				this.player.destroy();
				//#endif
			},
			beginTimer() {
				const _this = this;
				this.timer = setInterval(() => {
					if (this.seconds >= this.time) {
						uni.getStorage({
							key: 'recorder',
							success: function(res) {
								res.data[_this.classify].map((i, index) => {
									if (i.id == _this.id) {
										res.data[_this.classify][index].time += _this.seconds;
										res.data[_this.classify][index].date = new Date().getTime();
									}
								})
								res.data[_this.classify] = res.data[_this.classify].filter(d => d);
								let data = res.data;
								uni.setStorage({
									key: 'recorder',
									data: data,
									success: function() {
										clearTimeout(_this.timer);
										_this.player.destroy();
										_this.complete = true;
										uni.showModal({
											title: '恭喜您',
											content: '已完成本次专注',
											showCancel: false,
											confirmText: '好的'
										});
										return;
									}
								});
							}
						});
					} else {
						this.seconds++;
					}
				}, 1000)
			},
			pauseTimer() {
				var _this = this;

				uni.downloadFile({
					url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3', //仅为示例，并非真实的资源
					success: (res) => {
						if (res.statusCode === 200) {
							var tempFilePath = res.tempFilePath;
							uni.saveFile({
								tempFilePath: tempFilePath,
								success: function(res2) {
									var savedFilePath = res2.savedFilePath;
									uni.showToast({
										title: savedFilePath,
										mask: false,
										duration: 1500
									});
									console.log(savedFilePath);
									_this.player.src = savedFilePath;
								}
							});
						}
					}
				});

				// 				uni.getSavedFileList({
				// 					success: function(res) {
				// 						// console.log(res.fileList[0].filePath);
				// 						_this.player.src = res.fileList[0].filePath;
				// 						// console.log(typeof res.fileList[0].filePath)
				// 					}
				// 				});
				if (this.is_pause) {
					this.beginTimer();
					this.is_pause = false;
					this.player.play();
				} else {
					clearInterval(this.timer);
					this.is_pause = true;
					this.player.pause();
				}
			},
			stopTimer() {
				this.handleBack()
			},
			goBackHome() {
				this.removeBack()
				uni.reLaunch({
					url: 'index'
				});
			},
			createPlayer() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.loop = true;
				innerAudioContext.src = `../../static/audio/${this.current_audio}.mp3`;
				innerAudioContext.onPlay(() => {
					console.log('开始播放');
				});
				innerAudioContext.onError((res) => {
					console.log(res.errMsg);
					console.log(res.errCode);
				});
				this.player = innerAudioContext;
			},
			changeAudio(e) {
				if (e.detail.current == 0) {
					this.player.pause()
				} else {
					this.current_audio = this.itemList[e.detail.current].filename;
					this.player.src = `../../static/audio/${this.current_audio}.mp3`;
				}
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		flex-direction: column;
	}

	.focus_wrap {
		display: flex;
		flex-direction: column;
		padding: 20upx 40upx;
	}

	.focus_card {
		width: 670upx;
		height: 1100upx;
		border-radius: 40upx;
		/* background-color: #A6CAF1; */
		display: flex;
		justify-content: space-between;
		flex-direction: column;
		align-items: center;
	}

	.focus_card .title {
		font-size: 68upx;
		padding-top: 40upx;
		font-weight: 700;
		color: #FFFFFF;
	}

	.circle {
		/* flex: 1; */
		width: 470upx;
		height: 470upx;
		border-radius: 50%;
		border: 5upx solid #FFFFFF;
		/* background-color: #A6CAF1; */
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 68upx;
		font-weight: 700;
	}

	.dot {
		animation: sploosh 1.5s infinite;
	}

	@keyframes sploosh {
		0% {
			box-shadow: 0 0 0 0upx rgba(255, 255, 255, 0.7);
		}

		100% {
			box-shadow: 0 0 0 40upx rgba(255, 255, 255, 0);
		}
	}

	.focus_card .counter {
		font-size: 50upx;
		font-weight: 700;
		color: #FFFFFF;
	}

	.focus_card .btn_wrap {
		padding-bottom: 40upx;
		display: flex;
		color: #777777;
		justify-content: center;
		align-items: center;
		flex-direction: row;
	}

	.focus_card .btn_wrap .btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20upx;
		border: 1upx solid #FFFFFF;
		font-size: 30upx;
		padding: 20upx;
		width: 140upx;
		height: 50upx;
		background-color: #FFFFFF;
		font-weight: 700;
		box-shadow: 6upx 6upx 5upx #ddd;
		border-radius: 40upx;
	}

	.focus_card .btn_wrap .btn:active {
		box-shadow: 6upx 6upx 0.4upx #ddd;
		transform: translateY(4px);
	}

	.music {
		width: 460upx;
		height: 460upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.music_inner {
		width: 460upx;
		height: 460upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
