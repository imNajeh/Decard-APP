<template>
	<view class="content">
		<index-head></index-head>
		<view class="classify_wrap">
			<view class="null" v-if="lists.length==0">
				<image class="null_img" src="../../static/icon/planet.png" mode="scaleToFill"></image>
				<text>您还没有新建项目卡片哦~</text>
			</view>
			<view class="classify" v-for="(list,index) in lists" :key="index">
				<view class="classify_name">{{list.name}}</view>
				<view class="card_wrap">
					<view class="card_item" @tap="goNewTiming(item)" @longpress="showDelCard(item)" v-for="(item, itemIndex) in list.item_list"
					 :key="itemIndex" :style="{ backgroundColor: item.color }">
						<view class="card_time">{{item.time}} h</view>
						<image class="card_icon" :src="'../../static/card_icon/'+item.icon+'.png'" mode="scaleToFill"></image>
						<view class="project_name">{{item.name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import indexHead from '../../components/IndexHead.vue'

	export default {
		data: {
			lists: []
			// 			lists:[
			// 				{
			// 					name:'学习',
			// 					item_list:[
			// 						{
			// 							name:'编程',
			// 							time: 2.2,
			// 							icon: 'keyboard',
			// 							color:"#77dda0"
			// 						},
			// 						{
			// 							name:'写作',
			// 							time: 1.2,
			// 							icon: 'signature',
			// 							color:"#ddd"
			// 						}
			// 					]
			// 				},
			// 				{
			// 					name:'运动',
			// 					item_list:[
			// 						{
			// 							name:'健身',
			// 							time: 10.4,
			// 							icon: 'devil',
			// 							color:"#a6caf1"
			// 						},
			// 						{
			// 							name:'骑车',
			// 							time: 0.7,
			// 							icon: 'front',
			// 							color:"#fa8b73"
			// 						}
			// 					]
			// 				},
			// 				{
			// 					name:'工作',
			// 					item_list:[
			// 						{
			// 							name:'会议',
			// 							time: 6.3,
			// 							icon: 'briefcase',
			// 							color:"#ffd95f"
			// 						}
			// 					]
			// 				}
			// 			]
		},
		components: {
			indexHead
		},
		onShow() {
			// uni.clearStorageSync();
			const _this = this;
			const new_list = [];
			uni.getStorage({
				key: 'recorder',
				success: function(res) {
					// console.log(JSON.stringify(res.data));
					for (let x in res.data) {
						if (res.data[x].length != 0) {
							new_list.push({
								name: _this.classifyText(x),
								item_list: res.data[x]
							})
						}
					}
					_this.lists = new_list;
				},
				fail: function(err) {
					uni.setStorageSync('recorder', {
						work: [],
						study: [],
						sport: [],
						health: [],
						entertainment: []
					});
				}
			});
		},
		methods: {
			goNewTiming(item) {
				uni.navigateTo({
					url: `timing?id=${item.id}&name=${item.name}&icon=${item.icon}&color=${item.color}&time=${item.time}`
				});
			},
			classifyText(name) {
				switch (name) {
					case 'work':
						return '工作';
						break;
					case 'study':
						return '学习';
						break;
					case 'sport':
						return '运动';
						break;
					case 'health':
						return '健康';
						break;
					case 'entertainment':
						return '娱乐';
						break;
				}
			},
			showDelCard(item) {
				const _this = this
				uni.showModal({
					title: '提示',
					content: '确定要删除这个卡片吗？',
					success: function(res) {
						if (res.confirm) {
							_this.delCard(item)
						} else if (res.cancel) {
						}
					}
				});
			},
			delCard(item) {
				const _this = this;
				uni.showLoading({
					title: '删除中',
					mask: false
				});
				uni.getStorage({
					key: 'recorder',
					success: function(res) {
						// console.log(JSON.stringify(res.data));
						res.data[item.classify].map((i, index) => {
							if (i.id == item.id) {
								delete res.data[item.classify][index];
							}
						})
						res.data[item.classify] = res.data[item.classify].filter(d => d);
						let data = res.data;
						uni.setStorage({
							key: 'recorder',
							data: data,
							success: function() {
								uni.hideLoading();
								uni.showToast({
									title: '删除成功',
									duration: 2000
								});
								let new_list = [];
								for (let x in data) {
									if (data[x].length != 0) {
										new_list.push({
											name: _this.classifyText(x),
											item_list: data[x]
										})
									}
								}
								_this.lists = new_list;
							}
						});
					}
				});
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		flex-direction: column;
	}

	.classify_wrap {
		display: flex;
		flex-direction: column;
		margin-top: var(--status-bar-height);
		padding-top: 120upx;
	}

	.classify {
		display: flex;
		flex-direction: column;
	}

	.classify_name {
		color: #505050;
		font-weight: 700;
		font-size: 40upx;
		margin: 20upx 0 0 30upx;
	}

	.card_wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		align-content: flex-start;
	}

	.card_item {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		border-radius: 20upx;
		width: 210upx;
		height: 300upx;
		margin: 20upx 0 20upx 30upx;
	}

	.card_icon {
		width: 80upx;
		height: 80upx;
	}

	.project_name,
	.card_time {
		margin-top: 30upx;
		margin-bottom: 30upx;
		color: #505050;
		font-weight: 700;
		font-size: 32upx;
	}

	.card_time {
		font-size: 30upx;
	}

	.null {
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #505050;
		font-size: 36upx;
		height: 800upx;
	}

	.null_img {
		opacity: 0.6;
		width: 400upx;
		height: 400upx;
	}
</style>
