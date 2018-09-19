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
					<view class="card_item" @tap="goNewTiming(item)" v-for="(item, itemIndex) in list.item_list" :key="itemIndex" :style="{ backgroundColor: item.color }">
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
			lists:[
				{
					name:'学习',
					item_list:[
						{
							name:'编程',
							time: 2.2,
							icon: 'keyboard',
							color:"#77dda0"
						},
						{
							name:'写作',
							time: 1.2,
							icon: 'signature',
							color:"#ddd"
						}
					]
				},
				{
					name:'运动',
					item_list:[
						{
							name:'健身',
							time: 10.4,
							icon: 'devil',
							color:"#a6caf1"
						},
						{
							name:'骑车',
							time: 0.7,
							icon: 'front',
							color:"#fa8b73"
						}
					]
				},
				{
					name:'工作',
					item_list:[
						{
							name:'会议',
							time: 6.3,
							icon: 'briefcase',
							color:"#ffd95f"
						}
					]
				}
			]
		},
		components:{
			indexHead
		},
		methods:{
			goNewTiming(item){
				uni.navigateTo({
					url: 'timing'
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
		padding-top: 120px;
	}
	
	.classify {
		display: flex;
		flex-direction: column;
	}
	
	.classify_name {
		color: #505050;
		font-weight: 700;
		font-size: 40px;
		margin: 20px 0 0 30px;
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
		border-radius: 20px;
		width: 210px;
		height: 300px;
		margin: 20px 0 20px 30px;
	}

	.card_icon {
		width: 80px;
		height: 80px;
	}

	.project_name,
	.card_time {
		margin-top: 30px;
		margin-bottom: 30px;
		color: #505050;
		font-weight: 700;
		font-size: 32px;
	}

	.card_time {
		font-size: 30px;
	}
	
	.null {
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #505050;
		font-size: 36px;
		height: 800px;
	}
	.null_img {
		opacity: 0.6;
		width: 400px;
		height: 400px;
	}
</style>
