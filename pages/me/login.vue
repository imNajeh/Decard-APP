<template>
	<view class="content">
		<view class="login_top_wrap">
			<image class="login_top_img" src="../../static/images/drop.jpg" mode="scaleToFill"></image>
			<image class="login_logo" src="../../static/logo/192x192-logo.png" mode="scaleToFill"></image>
		</view>
		<view class="login_form">
			<input class="input_text" type="text" @input="nameInput" placeholder="用户名" />
			<input class="input_text" type="password" @input="pwdInput" placeholder="密码" />
		</view>
		<view class="login_btn" @click="login()">登录</view>
		<view class="login_bottom_text">
			<text>忘记密码？</text>
			<text class="hr">|</text>
			<text @click="goRegister">现在注册</text>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			username: '',
			password: ''
		},
		methods: {
			goRegister() {
				uni.navigateTo({
					url: './register'
				});
			},
			nameInput(e) {
				this.username = e.detail.value;
			},
			pwdInput(e) {
				this.password = e.detail.value;
			},
			login() {
				uni.showLoading({
					title: '正在登录',
					mask: false
				});
				uni.request({
					method: 'POST',
					url: 'http://119.29.39.213:3000/login',
					header: {
						'content-type': 'application/json'
					},
					data: {
						username: this.username,
						password: this.password
					},
					success: (res) => {
						uni.hideLoading();
						console.log(JSON.stringify(res.data));
						if (res.data.msg == '登录成功') {
							uni.setStorage({
								key: 'token',
								data: res.data.data.token,
								success: function() {
									console.log('success');
									uni.showToast({
										icon: 'success',
										title: '登录成功',
										mask: false,
										duration: 1500,
										success: function() {
											uni.switchTab({
												url: './index'
											});
										}
									});
								}
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: '账号或密码错误',
								mask: false,
								duration: 1500
							});
						}
						// this.text = 'request success';
					},
					fail: (err) => {
						uni.hideLoading();
						console.log(JSON.stringify(err))
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
	}

	.login_top_wrap {
		position: relative;
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
	}

	.login_top_img {
		width: 100%;
		height: 500upx;
		opacity: 0.8;
	}

	.login_logo {
		position: absolute;
		width: 180upx;
		height: 180upx;
		left: 285upx;
		bottom: -90upx;
		opacity: 0.9;
	}

	.login_form {
		margin-top: 90upx;
		padding-top: 30upx;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.login_form .input_text {
		/* background-color: #eee; */
		padding: 20upx;
		border-radius: 16upx;
		margin: 16upx 0;
		border: 2upx solid #aaa;
	}

	.login_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 20upx;
		width: 360upx;
		height: 90upx;
		border-radius: 50upx;
		background-color: rgba(0, 0, 0, 0.5);
		font-size: 40upx;
		color: #FFFFFF;
	}

	.login_bottom_text {
		display: flex;
		align-items: center;
		padding-top: 40upx;
		flex-direction: row;
		color: #505050;
		font-size: 32upx;
	}

	.login_bottom_text .hr {
		padding: 0 20upx;
	}
</style>
