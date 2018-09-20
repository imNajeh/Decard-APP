<template>
	<view class="content">
		<view class="focus_wrap">
			<view class="focus_card">
				<view class="title">
					健身
				</view>
				<view class="circle dot">
					海洋
				</view>
				<view class="counter">
					+ {{seconds}}
				</view>
				<view class="btn_wrap">
					<view class="btn">暂停</view>
					<view class="btn">停止</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			seconds: 0,
			timer: null
		},
		onLoad: function() {
			this.seconds = 0;
			this.listenBackBtn();
			this.timer = setInterval(() => {
				this.seconds++
			}, 1000)
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
				//#endif
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
		background-color: #A6CAF1;
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
		background-color: #A6CAF1;
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
		font-size: 40upx;
		padding: 20upx;
		width: 140upx;
		height: 50upx;
		background-color: #FFFFFF;
		box-shadow: 6upx 6upx 5upx #ddd;
		border-radius: 40upx;
	}
</style>
