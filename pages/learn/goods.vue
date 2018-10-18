<template>
	<view class="goods">
		<view class="buy_item">
			<text class="title">{{title}}</text>
			<text class="summary">{{summary}}</text>
			<view class="buy_btn_wrap">
				<text class="cost">{{price}} DB</text>
				<view class="have_buy_btn" v-if="buy_type">已购</view>
				<view class="buy_btn" @click="goBuy" v-else>购买</view>
			</view>
		</view>
		<view class="no_buy" v-if="!buy_type">
			<image class="eye" src="../../static/icon/eye.png" mode="scaleToFill"></image>
			<text>购买后才能查看内容</text>
		</view>
		<view class="have_buy" v-else>
			<rich-text v-if="beginShow" :nodes="nodes"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			token: '',
			id: null,
			title: '',
			summary: '',
			price: 0,
			content: '',
			date: null,
			buy_type: null,
			nodes: "",
			beginShow: false
		},
		onLoad:function(option){
			this.id = option.id
		},
		onShow() {
			this.getDetail();
		},
		methods: {
			goLogin() {
				uni.navigateTo({
					url: './login'
				});
			},
			beginCreated(){
				this.beginShow = true
			},
			getDetail(){
				var _this = this;
				uni.getStorage({
					key: 'token',
					success: function(res) {
						console.log(res.data);
						if (res.data) {
							_this.isLogin = true;
							_this.token = res.data;
							uni.request({
								url: 'http://119.29.39.213:3000/getArticle',
								data: {
									pageNo:1,
									pageSize:1,
									articleId:_this.id
								},
								header:{
									authorization:_this.token
								},
								success: (data) => {
									if (data.statusCode == 200) {
										console.log(JSON.stringify(data.data))
										_this.title = data.data.data.resData[0].title;
										_this.summary = data.data.data.resData[0].summary;
										_this.price = data.data.data.resData[0].price;
										_this.content = data.data.data.resData[0].content;
										_this.nodes = data.data.data.resData[0].content;
										_this.date = data.data.data.resData[0].date;
										_this.buy_type = data.data.data.buy_type;
										uni.setNavigationBarTitle({
											title: _this.title
										})
										_this.beginCreated()
									}
								},
								fail: (data, code) => {
									console.log('fail' + JSON.stringify(data));
								}
							})
						}
					},
					fail: function() {
						
					}
				});
			},
			goBuy(){
				var _this = this;
				uni.request({
					method:'POST',
					url: 'http://119.29.39.213:3000/buyBook',
					header:{
						authorization:_this.token
					},
					data: {
						bookId: _this.id
					},
					success: (data) => {
						if (data.statusCode == 200) {
							console.log(JSON.stringify(data.data))
							if(data.data.msg == '购买成功'){
								uni.showToast({
									title: '购买成功',
									mask: false,
									duration: 1500
								});
								_this.getDetail()
							}
							if(data.data.msg == '余额不足'){
								uni.showToast({
									icon: 'none',
									title: '余额不足',
									mask: false,
									duration: 1500
								});
							}
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
	.goods {
		flex: 1;
		/* justify-content: center; */
		/* align-items: center; */
		flex-direction: column;
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
	.buy_item .have_buy_btn {
		padding: 16upx;
		font-size: 32upx;
		border-radius: 20upx;
		color: #FFFFFF;
		background-color: #777;
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
	.have_buy {
		margin:  20upx;
	}
</style>
