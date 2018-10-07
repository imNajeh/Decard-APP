<template>
	<view class="content">
		<view class="project_wrap">
			<view class="null" v-if="lists.length==0">
				<image class="null_img" src="../../static/icon/plus.png" mode="scaleToFill"></image>
				<text>点击右上角 + 新建</text>
			</view>
			<view class="project_classify_item" v-for="(list,index) in lists" :key="index">
				<view class="project_classify_item_top">
					<view class="title">
						<text>{{list.classify_name}}</text>
						<text class="num">共 {{list.item_list.length}} 个项目</text>
					</view>
					<view class="total">
						<image class="timer" src="../../static/icon/time.png" mode="aspectFill"></image> <to-hour :time="list.total"></to-hour> h
					</view>
				</view>
				<view class="project_item" v-for="(item,itemIndex) in list.item_list" :key="itemIndex" @click="goDetail(item)">
					<view class="card" :style="{ backgroundColor: item.color }">
						<image class="icon" :src="'../../static/card_icon/'+item.icon+'.png'" mode="scaleToFill"></image>
					</view>
					<view class="title">
						<text>{{item.name}}</text>
						<text class="second"><text>最近更新：</text><to-time :time="item.date"></to-time></text>
					</view>
					<view class="time"><to-hour :time="item.time"></to-hour> h</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import toHour from '../../components/toHours.vue';
	import toTime from '../../components/toTime.vue';
	export default {
		data: {
			lists: []
		},
		components:{
			toHour,
			toTime
		},
		onShow() {
			const _this = this;
			const new_list = [];
			uni.getStorage({
				key: 'recorder',
				success: function(res) {
					for (let x in res.data) {
						if (res.data[x].length != 0) {
							let total = 0;
							res.data[x].map((item)=>{
								total += item.time
							})
							new_list.push({
								name: _this.classifyText(x),
								classify_name: _this.classifyText(x),
								item_list: res.data[x],
								total: total
							})
						}
					}
					_this.lists = new_list;
				}
			});
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: 'new'
			});
		},
		methods:{
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
			goDetail(item){
				console.log(JSON.stringify(item))
				uni.navigateTo({
					url: `./detail?name=${item.name}&icon=${item.icon}&time=${item.time}&color=${item.color}&id=${item.id}`
				});
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

	.project_wrap {
		display: flex;
		flex-direction: column;
	}

	.project_classify_item {
		display: flex;
		flex-direction: column;
	}

	.project_classify_item_top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #e5e5e5;
		padding: 20upx 40upx;
		height: 100upx;
		color: #505050;
	}

	.project_item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 30upx;
	}

	.project_item .card {
		width: 120upx;
		height: 120upx;
		border-radius: 16upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.project_item .card .icon {
		width: 60upx;
		height: 60upx;
	}

	.project_item .title {
		display: flex;
		flex-direction: column;
		color: #505050;
		font-size: 38upx;
		margin-left: 20upx;
		flex: 1;
	}

	.project_item .title .second {
		font-size: 32upx;
		color: #aaa;
		display: flex;
		align-items: flex-start;
		flex-direction: row;
	}

	.project_item .time {
		font-size: 34upx;
		color: #666;
		font-weight: 700;
	}

	.project_classify_item_top .title {
		font-size: 40upx;
		font-weight: 700;
		display: flex;
		flex-direction: column;
	}

	.project_classify_item_top .title .num {
		color: #505050;
		opacity: 0.6;
		font-size: 36upx;
	}

	.project_classify_item_top .total {
		font-weight: 700;
		font-size: 38upx;
		display: flex;
		align-items: center;
	}

	.project_classify_item_top .total .timer {
		width: 38upx;
		margin-right: 10upx;
		height: 38upx;
	}

	.null {
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #888888;
		font-size: 36upx;
		height: 800upx;
	}

	.null_img {
		opacity: 0.6;
		width: 120upx;
		padding: 30upx;
		height: 120upx;
	}
</style>
