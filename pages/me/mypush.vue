<template>
	<view class="page">
		<view class="news">
			<view class="weibo_item" v-for="(item,index) in weibo_list" :key="index">
				<view class="weibo_content">
					{{item.content}}
				</view>
				<view class="date">
					<text>{{item.createdAt}}</text>
					<view class="rightbottom"><text>赞({{item.good}})</text> <view class="delbtn" @click="delPost(item.id)">删除</view></view>
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
			setTime_2: function (items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						id: e.id,
						content: e.content,
						good: e.good,
						createdAt:dateUtils.format_2(e.createdAt)
					});
				});
				return newItems;
			},
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
							_this.weibo_list = _this.setTime_2(data.data.data.resData)
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			delPost(id){
				var _this = this;
				var token = uni.getStorageSync('token');
				uni.request({
					method: 'POST',
					url: 'http://119.29.39.213:3000/delExchangeData',
					header:{
						authorization:token
					},
					data:{
						exchangeId: id
					},
					success: (data) => {
						if (data.statusCode == 200) {
							uni.showToast({
								title: '删除成功',
								mask: false,
								duration: 1500,
								success:function(){
									_this.getExchange();
								}
							});
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
	.rightbottom {
		display: flex;
		flex-direction: row;
	}
	.delbtn {
		margin-left: 10upx;
	}
</style>