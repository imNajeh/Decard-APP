<template>
	<view class="page">
		<view class="top_tab">
			<view :class="'tab_item '+(curTab == 'news'?'active':'')" @click="changeTab('news')">资讯</view>
			<view :class="'tab_item '+(curTab == 'buy'?'active':'')" @click="changeTab('buy')">专栏</view>
			<view :class="'tab_item '+(curTab == 'weibo'?'active':'')" @click="changeTab('weibo')">社区</view>
		</view>
		<view class="news" v-if="curTab == 'news'">
			<view class="banner" @click="goDetail(banner)">
				<image class="banner-img" :src="banner.cover"></image>
				<view class="banner-title">{{banner.title}}</view>
			</view>
			<view class="uni-list">
				<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(value,key) in listData" :key="key" @click="goDetail(value)">
					<view class="uni-media-list">
						<image class="uni-media-list-logo" :src="value.cover"></image>
						<view class="uni-media-list-body">
							<view class="uni-media-list-text-top">{{value.title}}</view>
							<view class="uni-media-list-text-bottom">
								<text>{{value.author_name}}</text>
								<text>{{value.published_at}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="news" v-if="curTab == 'buy'">
			<view class="buy_item" v-for="(item,index) in buyList" :key="index" @click="goGoods(item.id)">
				<text class="title">{{item.title}}</text>
				<text class="summary">{{item.summary}}</text>
				<view class="buy_btn_wrap">
					<text class="cost">{{item.price}} DB</text>
					<view class="buy_btn">查看详情</view>
				</view>
			</view>
		</view>
		<view class="news" v-if="curTab == 'weibo'">
			<view class="add_btn" @click="addExchange">+</view>
			<view class="weibo_item" v-for="(item,index) in weibo_list" :key="index">
				<view class="weibo_top">
					<image class="avatar" :src="item.userInfo.avatar?item.userInfo.avatar:'../../static/images/avatar.jpg'" mode="scaleToFill"></image>
					<text class="username">{{item.userInfo.nickname?item.userInfo.nickname:item.userInfo.username}}</text>
				</view>
				<view class="weibo_content">
					{{item.content}}
				</view>
				<view class="date">
					<text>{{item.createdAt}}</text>
					<text @click="addGood(item.id,index)">赞({{item.good}})</text>
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
				banner: {},
				listData: [],
				last_id: "",
				reload: false,
				curTab: 'news',
				
				buyList:[],
				weibo_list: []
			}
		},
		onShow(){
			this.getExchange();
		},
		onLoad() {
			this.getBanner();
			this.getList();
			this.getBuyList();
		},
		onPullDownRefresh() {
			this.reload = true;
			this.last_id = "";
			this.getBanner();
			this.getList();
		},
		onReachBottom() {
			this.getList();
		},
		methods: {
			getBanner() {
				let data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				};
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/banner/36kr',
					data: data,
					success: (data) => {
						uni.stopPullDownRefresh();
						if (data.statusCode == 200) {
							this.banner = data.data;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			getList() {
				var data = {
					column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
				};
				if (this.last_id) { //说明已有数据，目前处于上拉加载
					data.minId = this.last_id;
					data.time = new Date().getTime() + "";
					data.pageSize = 10;
				}
				uni.request({
					url: 'https://unidemo.dcloud.net.cn/api/news',
					data: data,
					success: (data) => {
						if (data.statusCode == 200) {
							let list = this.setTime(data.data);
							this.listData = this.reload ? list : this.listData.concat(list);
							this.last_id = list[list.length - 1].id;
							this.reload = false;
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			goDetail: function (e) {
// 				if (!/前|刚刚/.test(e.published_at)) {
// 					e.published_at = dateUtils.format(e.published_at);
// 				}
				let detail = {
					author_name: e.author_name,
					cover: e.cover,
					id: e.id,
					post_id: e.post_id,
					published_at: e.published_at,
					title: e.title
				}
				uni.navigateTo({
					url: "./detail?detailDate=" + JSON.stringify(detail)
				})
			},
			setTime: function (items) {
				var newItems = [];
				items.forEach((e) => {
					newItems.push({
						author_name: e.author_name,
						cover: e.cover,
						id: e.id,
						post_id: e.post_id,
						published_at: dateUtils.format_2(e.published_at),
						title: e.title
					});
				});
				return newItems;
			},
			changeTab(e){
				this.curTab = e;
			},
			getBuyList(){
				uni.request({
					url: 'http://119.29.39.213:3000/getArticle',
					data: {
						pageNo:1,
						pageSize:10
					},
					success: (data) => {
						if (data.statusCode == 200) {
							console.log(JSON.stringify(data.data))
							this.buyList = data.data.data.resData
						}
					},
					fail: (data, code) => {
						console.log('fail' + JSON.stringify(data));
					}
				})
			},
			goGoods(id){
				uni.getStorage({
					key:'token',
					success:function(){
						uni.navigateTo({
							url: './goods?id='+id
						});
					},
					fail:function(){
						uni.navigateTo({
							url: '../me/login'
						});
					}
				})
			},
			addExchange(){
				uni.getStorage({
					key:'token',
					success:function(){
						uni.navigateTo({
							url: './add'
						});
					},
					fail:function(){
						uni.navigateTo({
							url: '../me/login'
						});
					}
				})
			},
			getExchange(){
				var _this = this;
				var token = uni.getStorageSync('token');
				uni.request({
					url: 'http://119.29.39.213:3000/exchangeArea',
					data: {
						pageNo:1,
						pageSize:20
					},
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
			},
			addGood(id,index){
				var _this = this;
				var token = uni.getStorageSync('token');
				uni.showLoading({
					title: '点赞中',
					mask: true
				});
				uni.getStorage({
					key:'token',
					success:function(){
						uni.request({
							method:'POST',
							url: 'http://119.29.39.213:3000/addGood',
							data: {
								exchangeId: id
							},
							header:{
								authorization:token
							},
							success: (data) => {
								if (data.statusCode == 200) {
									console.log(JSON.stringify(data.data))
									if(data.data.msg == '点赞成功'){
										_this.weibo_list[index].good = _this.weibo_list[index].good+1;
										uni.hideLoading();
										uni.showToast({
											icon: 'none',
											title: '+1',
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
					},
					fail:function(){
						uni.navigateTo({
							url: '../me/login'
						});
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
	.uni-list {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.banner {
		height: 360upx;
		overflow: hidden;
		position: relative;
		background-color: #ccc;
	}
	.banner-img {
		width: 100%;
	}
	.banner-title {
		max-height: 84upx;
		overflow: hidden;
		position: absolute;
		left: 30upx;
		bottom: 30upx;
		width: 90%;
		font-size: 32upx;
		font-weight: 400;
		line-height: 42upx;
		color: white;
		z-index: 11;
	}
	.uni-media-list-logo {
		width: 180upx;
		height: 140upx;
	}
	.uni-media-list-body {
		height: auto;
		justify-content: space-around;
	}
	.uni-media-list-text-top {
		height: 74upx;
		font-size: 28upx;
		overflow: hidden;
	}
	.uni-media-list-text-bottom {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.top_tab {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 80upx;
		background-color: #FFFFFF;
	}
	.top_tab .tab_item {
		font-size: 36upx;
		color: #505050;
		margin: 0 20upx;
		font-weight: 600;
	}
	.top_tab .tab_item.active {
		border-bottom: 4upx solid #DDDDDD;
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
	.add_btn {
		opacity: 0.8;
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		font-size: 80upx;
		color: #FFFFFF;
		background-color: #007AFF;
		position: fixed;
		bottom: 20upx;
		left: 325upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
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