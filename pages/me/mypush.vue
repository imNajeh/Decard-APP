<template>
	<view class="page">
		<view class="news">
			<view class="weibo_item" v-for="(item,index) in weibo_list" :key="index">
				<view class="weibo_content">
					{{item.content}}
				</view>
				<view class="date">
					<text>{{item.createdAt}}</text>
					<text>赞({{item.good}})</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var dateUtils = require('../../common/util.js').dateUtils;
	export default {
		data() {
			return {
				weibo_list: []
			}
		},
		onLoad:function(option){
			this.id = option.id
		},
		onShow(){
			this.getExchange();
		},
		methods: {
			getExchange(){
				var _this = this;
				var token = uni.getStorageSync('token');
				uni.request({
					url: 'http://119.29.39.213:3000/getUserExchangeMsg',
					header:{
						authorization:token
					},
					success: (data) => {
						if (data.statusCode == 200) {
							console.log(JSON.stringify(data.data))
							_this.weibo_list = data.data.data.resData
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			}
		},
	}
</script>

<style>
	@import "../../common/uni.css";
		
	.page {
		flex: 1;
		flex-direction: column;
		background: #efeff4;
		height: 100%;
		font-size: 32upx;
		line-height: 1.6;
	}
	.news {
		flex: 1;
		flex-direction: column;
		background-color: #FFFFFF;
		height: 100%;
	}
	.weibo_item {
		display: flex;
		flex-direction: column;
		padding: 10upx 30upx;
		border-bottom: 2upx solid #DDDDDD;
		
	}
	.weibo_item .weibo_top {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.weibo_item .weibo_top .avatar {
		width: 60upx;
		height: 60upx;
		border-radius: 50%;
	}
	.weibo_item .weibo_top .username {
		font-size: 34upx;
		font-weight: 600;
		color: #505050;
		margin-left: 20upx;
	}
	.weibo_item .weibo_content {
		font-size: 32upx;
		color: #505050;
	}
	.weibo_item .date {
		font-size: 30upx;
		color: #8F8F94;
		display: flex;
		justify-content: space-between;
	}
</style>