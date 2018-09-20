<template>
	<view class="content">
		<view class="project_new_wrap">
			<view class="new_title">请输入项目名称：</view>
			<input class="new_title_input" @input="KeyInput" placeholder="项目名称" maxlength="10" />
			<view class="new_title">归入项目组：</view>
			<view class="project_new_classify">
				<view @tap="selectClassify(item)" class="new_classify_item" v-for="(item,index) in classify_list" :key="index"
				 :style="{ backgroundColor: item.name==classify?'#ccc':'#eee' }">{{item.text}}</view>
			</view>
			<view class="new_title">选择习惯图标：</view>
			<view class="project_new_classify">
				<view @tap="selectIcon(item)" class="project_new_icon" v-for="(item,index) in icon_list" :key="index" :style="{ backgroundColor: item==icon?'#ccc':'#eee' }">
					<image class="icon" :src="'../../static/card_icon/'+item+'.png'" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="new_title">选择卡片颜色：</view>
			<view class="project_new_classify">
				<view @tap="selectColor(item)" class="project_new_color" v-for="(item,index) in card_color" :key="index" :style="{ backgroundColor: item , borderColor: item==color?'#888':'#eee'}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			classify_list: [{
				text: '工作',
				name: 'work'
			}, {
				text: '学习',
				name: 'study'
			}, {
				text: '运动',
				name: 'sport'
			}, {
				text: '健康',
				name: 'health'
			}, {
				text: '娱乐',
				name: 'entertainment'
			}],
			icon_list: ['baloon', 'bear', 'beer', 'board', 'briefcase', 'businessman', 'cake', 'camera', 'car', 'chat', 'cloud',
				'coffe', 'controller', 'desktop', 'devil', 'diamond', 'front', 'globe', 'headphones', 'home', 'image', 'keyboard',
				'money', 'moon', 'moto', 'mouse', 'music', 'pizza', 'plane', 'player', 'robot', 'shopping', 'signature', 'sushi',
				'wallet'
			],
			card_color: ['#51cac1', '#cf7777', '#b2e743', '#999999', '#8c67e2', '#49948f', '#f8d86e', '#f14c4c', '#0b6962',
				'#f1684b'
			],
			name: "",
			classify: "work",
			icon: "baloon",
			color: "#51cac1"
		},
		onLoad(){
			this.name = "";
			this.classify = "work";
			this.icon = "baloon";
			this.color = "#51cac1"
		},
		onNavigationBarButtonTap() {
			const _this = this;
			if (this.name && this.color && this.classify && this.icon) {
				uni.showLoading({
					title: '新建中'
				});
				uni.getStorage({
					key: 'recorder',
					success: function(res) {
						// console.log(JSON.stringify(res.data));
						const data = res.data;
						data[_this.classify].push({
							id: new Date().getTime(),
							name: _this.name,
							icon: _this.icon,
							color: _this.color,
							classify:_this.classify,
							time: 0,
							data: null
						})
						uni.setStorage({
							key: 'recorder',
							data: data,
							success: function() {
								uni.hideLoading();
								uni.showToast({
									title: '新建成功',
									duration: 2000,
									success: function() {
										uni.switchTab({
											url: 'index'
										});
									}
								});
							}
						});
					}
				});
			} else {
				uni.showToast({
					title: '请填写完整',
					icon: 'none',
					duration: 2000
				});
			}
		},
		methods: {
			KeyInput(e) {
				this.name = e.detail.value;
			},
			selectClassify(item) {
				this.classify = item.name;
			},
			selectIcon(item) {
				this.icon = item
			},
			selectColor(item) {
				this.color = item
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		flex-direction: column;
		/* justify-content: center;
		align-items: center; */
	}

	.project_new_wrap {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
	}

	.new_title {
		font-weight: 36upx;
		color: #505050;
		font-weight: 700;
		margin: 16upx 0;
	}

	.new_title_input {
		background-color: #eee;
		padding: 20upx;
		border-radius: 16upx;
		margin: 16upx 0;
	}

	.project_new_classify {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.new_classify_item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20upx;
		background-color: #eee;
		width: 80upx;
		margin: 16upx 20upx 16upx 0;
		border-radius: 16upx;
		font-size: 34upx;
		color: #666;
		font-weight: 700;
	}

	.project_new_icon {
		width: 80upx;
		height: 80upx;
		padding: 20upx;
		background-color: #eee;
		margin: 16upx 20upx 16upx 0;
		border-radius: 16upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.project_new_icon .icon {
		width: 60upx;
		height: 60upx;
	}

	.project_new_color {
		width: 70upx;
		height: 70upx;
		border: 5upx solid #888;
		margin: 36upx 40upx 36upx 20upx;
		border-radius: 50%;
	}
</style>
