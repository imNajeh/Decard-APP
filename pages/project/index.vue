<template>
	<view class="content">
		<view class="project_wrap">
			<view class="project_classify_item" v-for="(list,index) in lists" :key="index">
				<view class="project_classify_item_top">
					<view class="title">
						<text>{{list.classify_name}}</text>
						<text class="num">共 {{list.list_item.length}} 个项目</text>
					</view>
					<view class="total">
						<image class="timer" src="../../static/icon/time.png" mode="aspectFill"></image> {{list.total}} h
					</view>
				</view>
				<view class="project_item" v-for="(item,itemIndex) in list.list_item" :key="itemIndex">
					<view class="card" :style="{ backgroundColor: item.color }">
						<image class="icon" :src="'../../static/card_icon/'+item.icon+'.png'" mode="scaleToFill"></image>
					</view>
					<view class="title">
						<text>{{item.name}}</text>
						<text class="second">最近更新：{{item.date}}</text>
					</view>
					<view class="time">{{item.time}} h</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			lists:[]
// 			lists: [{
// 				classify_name: "学习",
// 				total: "17.2",
// 				list_item: [{
// 						name: "编程",
// 						date: "前天",
// 						time: 2.2,
// 						icon: 'keyboard',
// 						color: "#77dda0"
// 					},
// 					{
// 						name: "写作",
// 						date: "昨天",
// 						time: 3.5,
// 						icon: 'signature',
// 						color: "#ddd"
// 					}
// 				]
// 			}]
		},
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: 'new'
			});
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
</style>
