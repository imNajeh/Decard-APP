<template>
	<view class="addExchange">
		<textarea placeholder="说点什么..." placeholder-style="color:#ddd;" @input="addInput" style="height: 200upx;" />
		<button type="primary" @click="updateAdd">确认发布</button>
	</view>
</template>

<script>
	export default {
		data: {
			token: '',
			content: ''
		},
		onLoad:function(option){
			
		},
		onShow() {
			var _this = this;
			uni.getStorage({
				key: 'token',
				success: function(res) {
					console.log(res.data);
					if (res.data) {
						_this.token = res.data;
					}
				},
				fail: function() {
					
				}
			});
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: './login'
				});
			},
			addInput(e){
				this.content = e.detail.value
			},
			updateAdd(){
				var _this = this;
				var token = uni.getStorageSync('token');
				console.log(token)
				uni.request({
					method:'POST',
					url: 'http://119.29.39.213:3000/exchangeArea',
					header:{
						authorization:token
					},
					data: {
						content: _this.content
					},
					success: (data) => {
						if (data.statusCode == 200) {
							console.log(JSON.stringify(data.data))
							uni.navigateBack({
								delta: 1
							})
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			}
		}

	}
</script>

<style>
	.addExchange {
		flex: 1;
		/* justify-content: center; */
		/* align-items: center; */
		flex-direction: column;
		padding: 30upx;
		color: #505050;
	}
	.buy_item {
		display: flex;
		flex-direction: column;
		margin: 20upx;
		border-radius: 20upx;
		padding: 20upx;
		background-color: #DDDDDD;
	}
	.buy_item .title {
		font-size: 34upx;
		font-weight: 600;
		color: #505050;
	}
	.buy_item .summary {
		font-size: 30upx;
		color: #666666;
	}
	.buy_item .cost {
		font-size: 32upx;
		font-weight: 600;
		color: #505050;
	}
	.buy_item .buy_btn_wrap {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.buy_item .buy_btn {
		padding: 16upx;
		font-size: 32upx;
		border-radius: 20upx;
		color: #FFFFFF;
		background-color: #8A6DE9;
		width: 140upx;
		display: flex;
		align-content: center;
		justify-content: center;
	}
	.no_buy {
		font-size: 34upx;
		color: #777777;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.no_buy .eye {
		margin-bottom: 20upx;
		width: 80upx;
		height: 80upx;
	}
</style>
