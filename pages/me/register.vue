<template>
	<view class="content">
		<view class="login_top_wrap">
			<image class="login_top_img" src="../../static/images/drop.jpg" mode="scaleToFill"></image>
			<image class="login_logo" src="../../static/logo/192x192-logo.png" mode="scaleToFill"></image>
		</view>
		<view class="login_form">
			<input class="input_text" type="text" @input="nameInput" placeholder="用户名" />
			<input class="input_text" type="password" @input="pwdInput" placeholder="密码" />
			<input class="input_text" type="password" @input="repwdInput" placeholder="确认密码" />
		</view>
		<view class="login_btn" @click="register()">注册</view>
		<view class="login_bottom_text">
			<text>注册代表您同意</text>
			<text class="rules">《Decard用户协议》</text>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			username: '',
			passowrd: '',
			re_password: ''
		},
		methods:{
			nameInput(e) {
				this.username = e.detail.value;
			},
			pwdInput(e) {
				this.password = e.detail.value;
			},
			repwdInput(e) {
				this.re_password = e.detail.value;
			},
			register() {
				if(this.password != this.re_password){
					uni.showToast({
						icon: 'none',
						title: '两次密码不一致',
						mask: false,
						duration: 1500
					});
					return ;
				}
				uni.request({
					method: 'POST',
					url: 'http://119.29.39.213:3000/register', 
					header: {
						'content-type': 'application/json'
					},
					data: {
						username: this.username,
						password: this.password,
						gender: '男'
					},
					success: (res) => {
						console.log(JSON.stringify(res.data));
						if(res.data.msg == '新增数据成功'){
							uni.showToast({
								icon:'success',
								title: '注册成功',
								mask: false,
								duration: 1500
							});
						}else{
							uni.showToast({
								icon: 'none',
								title: '注册失败',
								mask: false,
								duration: 1500
							});
						}
						// this.text = 'request success';
					},
					fail: (err)=>{
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
		height: 360upx;
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
		background-color: rgba(0,0,0,0.5);
		font-size: 40upx;
		color: #FFFFFF;
	}
	.login_bottom_text {
		display: flex;
		align-items: center;
		padding-top: 40upx;
		flex-direction: row;
		color: #505050;
		font-size: 28upx;
	}
	.rules {
		color: #DC143C;
	}
</style>
