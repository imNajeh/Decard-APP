<template>
	<view class="me">
		<text class="to_login_text">期待与你完美邂逅～</text>
		<image class="logo" src="../../static/logo/192x192-logo.png" mode="scaleToFill"></image>
		<button type="default" :plain="true" @click="goLogin">去登录</button>
	</view>
</template>

<script>
	export default {
		data: {
			title: '我'
		},
		onShow(){
			
		},
		methods:{
			goLogin(){
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
		align-items: center;
		flex-direction: column;
	}
	
	.me .to_login_text {
		font-size: 36upx;
		color: #505050;
	}

	.me .logo {
		margin: 30upx 0;
		opacity: 0.6;
		width: 200upx;
		height: 200upx;
	}
</style>
