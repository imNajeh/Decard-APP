<template>
	<view class="me">
		<view class="tologin_wrap" v-if="!isLogin">
			<text class="to_login_text">期待与你完美邂逅～</text>
			<image class="logo" src="../../static/logo/192x192-logo.png" mode="scaleToFill"></image>
			<button type="default" :plain="true" @click="goLogin">去登录</button>
		</view>
		<view class="me_index" v-else>
			<view class="top_intro">
				<image class="avatar" src="../../static/images/avatar.jpg" mode="scaleToFill"></image>
				<text class="username">LOST濠</text>
			</view>
			<view class="me_list">
				<view class="list_item">我的逗币</view>
				<view class="list_item" @click="toMyFocus">我的专注</view>
				<view class="list_item">我的发布</view>
				<view class="list_item" @click="loginOut">退出登录</view>
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
			console.log(this.isLogin)
			var _this = this;
			uni.getStorage({
				key: 'token',
				success: function(res) {
					console.log(res.data);
					if (res.data) {
						_this.isLogin = true;
					}else{
						_this.isLogin = false;
					}
				},
				fail:function(){
					_this.isLogin = false;
				}
			});
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: './login'
				});
			},
			toMyFocus(){
				uni.navigateTo({
					url: './alldata'
				});
			},
			loginOut() {
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							uni.removeStorage({
								key: 'token',
								success: function(res) {
									_this.isLogin = false;
									uni.showToast({
										title: '退出成功',
										mask: false,
										duration: 1500
									});
								}
							});
						}
					}
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
		/* background-color: #87CEFA; */
		border-bottom: 2upx solid #DDDDDD;
		width: 100%;
		height: 340upx;
		flex-direction: column;
	}
	.top_intro .username {
		font-weight: 600;
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
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.me_list .list_item {
		font-size: 36upx;
		width: 680upx;
		padding: 30upx 30upx 30upx 40upx;
		border-bottom: 2upx solid #DDDDDD;
		background-position: 95% 50%;
		background-size: 30upx 30upx;
		background-repeat: no-repeat;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAC+ElEQVR4nO3bPY5cVRSF0S0xhpY6cPCmRNaRsx4bLTEecOCAgGkgQ4CMLLn22/4pG6haSzr5PcGnE93ktv2Y5CXJD//2Q+C/5inJH0n+TPJzRAL/eEryLn/H8X5EArkch0gg53GIhLv2KXGIhLv0Op8eh0i4K18Sh0i4C18Th0i4adeIQyTcpGvGIRJuynOuH4dIuBm/5NvE8X5evt8qcH0PSd7k20bikvC/JhIYRAKDSGAQCQwigUEkMIgEBpHAIBIYRAKDSGAQCQwigUEkMIgEBpHAIBIYRAKDSGB4SPI2IoHqMSKBUyKBQSQwiAQGkcAgEhhEAoNIYBAJDCKBQSQwiAQGkcAgEhhEAoNIYBAJDCKBQSQwiAQGkcAgEhhEAoNIYBAJDCKBQSQwiASGxyS/RSRQvYpI4JRIYBAJDCKBQSQwiAQGkcAgEhhEAoNIYBAJDCKBQSQwiAQGkcAgEhhEAoNIYBAJDCKBQSQwiAQGkcAgEhhEAoNIYBAJDCKB4VWS3yMSqI6IBE4dEQmcOiISOHVEJHDqiEjg1BGRwKkjIoFTR0QC1RGBwEVHxAEXHREHXHREHHDREXHARUfEARcdEQdc5E8IFH4VQiEOKMQBhTigEAcU4oBCHFCIAwpxQCEOKMQBhTigEAcU4oBCHFCIAwpxQCEOKMQBhTigEAcU4oBCHFCIAwpxQCEOKMQBhTigeIw44KLHJG8jDviIOKAQBxTigEIcUIgDCnFAIQ4oxAGFOKAQBxTigEIcUIgDCnFAIQ4oxAGFOKAQBxTigEIcUIgDCnFAIQ4oxAGFOKAQBxQPEQdc9JDkTcQBHxEHFOKAQhxQiAMKcUAhDijEAYU4oBAHFOKAQhxQiAMKcUAhDijEAYU4oBAHFOKAQhxQiAMKccCJX/Nt4/jp+60C1/cclwNOPSd5F3FA9TrXi0Qc3KRrRCIObtrXRCIO7sKXRCIO7srnRCIO7tJTdiTi4K6dRSIOyOVIxAEf+DASccAFT0leIg6+0F/IogESCrgliAAAAABJRU5ErkJggg==)
	}
</style>
