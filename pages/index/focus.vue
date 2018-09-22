<template>
	<view class="content">
		<view class="focus_wrap">
			<view class="focus_card" :style="{'backgroundColor':color}">
				<view class="title">{{name}}</view>
				<view class="circle dot" :style="{'backgroundColor':color}">
					<swiper @change="changeAudio" :circular="true" :current-item-id="current" class="music" :duration="800">
						<swiper-item class="music_inner" v-for="(item,index) in itemList" :key="item" :item-id="index">
							<text>{{item.text}}</text>
						</swiper-item>
					</swiper>
				</view>
				<view class="counter">
					+ {{formatSecond?formatSecond:'00:00:00'}}
				</view>
				<view class="btn_wrap">
					<view class="btn" @tap="pauseTimer()">{{is_pause?'继续':'暂停'}}</view>
					<view class="btn" @tap="stopTimer()">停止</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var util = require('../../common/util.js')
	export default {
		data: {
			seconds: 0,
			color: "",
			name: "",
			time: null,
			timer: null,
			is_pause: false,
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
				},
			],
			current_audio: "Wilderness_River",
			current: 1,
			player: null
		},
		onLoad(option) {
			this.seconds = 0;
			this.color = option.color;
			this.name = option.name;
			this.time = option.time;

			this.listenBackBtn();
			this.beginTimer();

			this.createPlayer();
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
		methods: {
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
				this.timer = setInterval(() => {
					if (this.seconds >= this.time) {
						clearTimeout(this.timer);
						this.player.destroy();
						uni.showModal({
							title: '恭喜您',
							content: '已完成该次专注',
							showCancel: false,
							confirmText: '好的',
							success: function(res) {
								if (res.confirm) {
									uni.reLaunch({
										url: 'index'
									});
								} else if (res.cancel) {
									console.log('返回键')
									uni.reLaunch({
										url: 'index'
									});
								}
							}
						});
					} else {
						this.seconds++;
					}
				}, 1000)
			},
			pauseTimer() {
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
