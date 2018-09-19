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
			lists: [{
				classify_name: "学习",
				total: "17.2",
				list_item: [{
						name: "编程",
						date: "前天",
						time: 2.2,
						icon: 'keyboard',
						color: "#77dda0"
					},
					{
						name: "写作",
						date: "昨天",
						time: 3.5,
						icon: 'signature',
						color: "#ddd"
					}
				]
			}]
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
		padding: 20px 40px;
		height: 100px;
		color: #505050;
	}

	.project_item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 30px;
	}

	.project_item .card {
		width: 120px;
		height: 120px;
		border-radius: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.project_item .card .icon {
		width: 60px;
		height: 60px;
	}

	.project_item .title {
		display: flex;
		flex-direction: column;
		color: #505050;
		font-size: 38px;
		margin-left: 20px;
		flex: 1;
	}

	.project_item .title .second {
		font-size: 32px;
		color: #aaa;
	}

	.project_item .time {
		font-size: 34px;
		color: #666;
		font-weight: 700;
	}

	.project_classify_item_top .title {
		font-size: 40px;
		font-weight: 700;
		display: flex;
		flex-direction: column;
	}

	.project_classify_item_top .title .num {
		color: #505050;
		opacity: 0.6;
		font-size: 36px;
	}

	.project_classify_item_top .total {
		font-weight: 700;
		font-size: 38px;
		display: flex;
		align-items: center;
	}

	.project_classify_item_top .total .timer {
		width: 38px;
		margin-right: 10px;
		height: 38px;
	}
</style>
