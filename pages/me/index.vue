<template>
	<view class="me">
		<view class="tologin_wrap" v-if="isLogin">
			<text class="to_login_text">期待与你完美邂逅～</text>
			<image class="logo" src="../../static/logo/192x192-logo.png" mode="scaleToFill"></image>
			<button type="default" :plain="true" @click="goLogin">去登录</button>
		</view>
		<view class="me_index" v-else>
			<view class="top_intro">
				<image class="avatar" src="../../static/images/avatar.jpg" mode="scaleToFill"></image>
				<text>LOST</text>
			</view>
			<view class="me_list">
				<view class="list_item" v-for="item in 5" :key="item">
					1
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			isLogin: false
		},
		onShow() {
			var _this = this;
			uni.getStorage({
				key: 'token',
				success: function(res) {
					console.log(res.data);
					if (res.data) { 
						_this.isLogin = true;
					}
				}
			});
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: './login'
				});
			}
		}

	}
</script>

<style>
	.me {
		flex: 1;
		justify-content: center;
		/* align-items: center; */
		flex-direction: column;
		color: #505050;
	}

	.tologin_wrap {
		flex: 1;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.me .to_login_text {
		font-size: 36upx;
		color: #505050;
	}

	.top_intro {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #87CEFA;
		width: 100%;
		height: 340upx;
		flex-direction: column;
	}

	.me .logo {
		margin: 30upx 0;
		opacity: 0.6;
		width: 200upx;
		height: 200upx;
	}

	.me_index {
		flex: 1;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
	}

	.avatar {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		margin-bottom: 20upx;
	}
	.me_list {
		display: flex;
		flex-direction: column;
	}
	.me_list .list_item {
		width: ;
		margin: 10upx 20upx;
		border-bottom: 1upx solid #DDDDDD;
	}
</style>
