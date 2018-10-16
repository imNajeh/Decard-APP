<template>
	<view class="content">
		<view class="pop_model" v-if="show_pop">
			<view class="pop_inner">
				<input class="input_text" @input="KeyInput" type="text" placeholder="写点什么..." />
				<button type="primary" @click="saveContent()">好了</button>
			</view>
		</view>
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
			icon:"",
			name: "",
			time: null,
			timer: null,
			is_pause: false,
			is_user_pause: false,
			complete: false,
			openTurnPause: false,
			onProximity: null,
			show_pop: false,
			itemList: [{
					text: '静心',
					filename: 'none'
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
			download_list: [],
			current_audio: "Sleepy_Beach_Waves",
			current: 1,
			player: null,
			content: ''
		},
		onLoad(option) {
			this.complete = false;
			this.seconds = 0;
			this.color = option.color;
			this.name = option.name;
			this.time = option.time;
			this.classify = option.classify;
			this.id = option.id;
			this.icon = option.icon;

			this.content = '';

			this.listenBackBtn();
			this.beginTimer();

			this.createPlayer();

			this.getWhiteNoise();
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
			var _this = this;
			if (e.index == 0) {
				this.rightDrawerVisible = !this.rightDrawerVisible
			} else {
				if (this.complete == true) {
					return;
				}
				uni.showActionSheet({
					itemList: [_this.openTurnPause ? '关闭翻转暂停' : '开启翻转暂停'],
					success: function(res) {
						_this.openTurnPause = !_this.openTurnPause;
						if (_this.openTurnPause) {
							_this.onPlusReady();
						} else {
							//#ifdef APP-PLUS
							plus.proximity.clearWatch(_this.onProximity);
							//#endif
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			}

		},
		methods: {
			onPlusReady() {
				var _this = this;
				//#ifdef APP-PLUS
				this.onProximity = plus.proximity.watchProximity((e) => {
					console.log(JSON.stringify(e))
					if (e == 0) {
						if (!_this.is_pause) {
							if (_this.is_pause) {
								_this.beginTimer();
								_this.is_pause = false;
								_this.player.play();
							} else {
								clearInterval(_this.timer);
								_this.is_pause = true;
								_this.player.pause();
							}
						}
					} else {
						if (!_this.is_user_pause) {
							// _this.pauseTimer();
							if (_this.is_pause) {
								_this.beginTimer();
								_this.is_pause = false;
								_this.player.play();
							} else {
								clearInterval(_this.timer);
								_this.is_pause = true;
								_this.player.pause();
							}
						}
					}
				}, (err) => {
					uni.showModal({
						title: 'Error',
						content: JSON.stringify(err),
						showCancel: false
					});
				})
				//#endif
			},
			closeRightDrawer() {
				this.rightDrawerVisible = false;
			},
			showRightDrawer() {
				this.rightDrawerVisible = true;
			},
			getWhiteNoise() {
				//get WhiteNosie
				const _this = this;
				const down_list = [{
						text: '雨天',
						img: "rain",
						filename: 'Kicking_Horse',
						have: false,
						cost: 6
					},
					{
						text: '溪流',
						img: "rivier",
						filename: 'Kicking_Horse',
						have: false,
						cost: 6
					},
					{
						text: '海洋',
						img: "hailang",
						filename: 'Kicking_Horse',
						have: false,
						cost: 6
					}
				];
				uni.getStorage({
					key: 'whiteNoise',
					success: function(res) {
						_this.download_list = res.data.download_list;
					},
					fail: function(err) {
						uni.setStorageSync('whiteNoise', {
							download_list: down_list
						});
						_this.download_list = down_list
					}
				});
			},
			listenBackBtn() {
				//#ifdef APP-PLUS
				plus.key.addEventListener("backbutton", this.handleBack);
				//#endif
			},
			KeyInput(e) {
				this.content = e.detail.value;
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
				if (this.openTurnPause) {
					plus.proximity.clearWatch(this.onProximity);
				}
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


										//
										uni.showModal({
											title: '恭喜您',
											content: '已完成本次专注,是否记录本次专注备忘?',
											success: function(res) {
												if (res.confirm) {
													console.log('用户点击确定');
													_this.show_pop = true;
													// _this.saveContent();
												} else if (res.cancel) {
													console.log('用户点击取消');
													_this.saveContent();

												}
											}
										});

										//
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

				// 				uni.downloadFile({
				// 					url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3', //仅为示例，并非真实的资源
				// 					success: (res) => {
				// 						if (res.statusCode === 200) {
				// 							var tempFilePath = res.tempFilePath;
				// 							uni.saveFile({
				// 								tempFilePath: tempFilePath,
				// 								success: function(res2) {
				// 									var savedFilePath = res2.savedFilePath;
				// 									uni.showToast({
				// 										title: savedFilePath,
				// 										mask: false,
				// 										duration: 1500
				// 									});
				// 									console.log(savedFilePath);
				// 									_this.player.src = savedFilePath;
				// 								}
				// 							});
				// 						}
				// 					}
				// 				});

				if (this.is_pause) {
					this.beginTimer();
					this.is_pause = false;
					this.is_user_pause = false;
					this.player.play();
				} else {
					clearInterval(this.timer);
					this.is_pause = true;
					this.is_user_pause = true;
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
			saveContent() {
				var _this = this;
				var focus_item = {};
				console.log(_this.content)
				uni.getStorage({
					key: _this.id,
					success: function(res) {
						focus_item = res.data;
						focus_item.focus_list.push({
							date: new Date().getTime(),
							seconds: _this.seconds,
							content: _this.content,
							classify: _this.classify,
							name: _this.name,
							color: _this.color,
							icon: _this.icon
						})
						uni.setStorageSync(_this.id, focus_item);

					},
					fail: function(err) {
						uni.setStorageSync(_this.id, {
							focus_list: [{
								date: new Date().getTime(),
								seconds: _this.seconds,
								content: _this.content,
								classify: _this.classify,
								name: _this.name,
								color: _this.color,
								icon: _this.icon
							}]
						});
					}
				});
				this.show_pop = false;
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
				this.current_audio = this.itemList[e.detail.current].filename;
				this.player.src = `../../static/audio/${this.current_audio}.mp3`;

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

	.pop_model {
		position: fixed;
		left: 75upx;
		top: 40%;
		width: 560upx;
		height: 260upx;
		border-radius: 20upx;
		background-color: #FFFFFF;
		border: 1upx solid #DDDDDD;
		z-index: 999;
		display: flex;
	}

	.pop_inner {
		flex: 1;
		padding: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.pop_inner .input_text {
		padding: 20upx;
	}
</style>
