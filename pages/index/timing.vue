<template>
	<view class="content">
		<view class="timing_wrap">
			<view class="top">
				<view class="timing_card">
					<view class="card_time">{{total}} h</view>
					<image class="timing_card_icon" :src="'../../static/card_icon/'+icon+'.png'" mode="scaleToFill"></image>
					<view class="card_name">{{name}}</view>
				</view>
				<view class="add_time">
					<text>+ {{time[0]}}</text>
					<text class="equal">= {{time[1]}}</text>
				</view>
			</view>
			<view class="add">
				<text>添加专注时间：</text>
				<text class="add_sub">m 代表分钟，h 代表小时</text>
				<view class="add_items">
					<view class="item" @tap="addTime(1)">1 m</view>
					<view class="item" @tap="addTime(5)">5 m</view>
					<view class="item" @tap="addTime(10)">10 m</view>
				</view>
				<view class="add_items">
					<view class="item" @tap="addTime(25)">25 m</view>
					<view class="item" @tap="addTime(50)">50 m</view>
					<view class="item" @tap="addTime(60)">1 h</view>
				</view>
				<view class="add_items">
					<view class="item zero" @tap="clearTime()">清零</view>
				</view>
				<view class="add_time_btn">开始专注</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			total: 2.4,
			name: '写作',
			icon: "signature",
			last: 10
		},
		computed:{
			time(){
				if(this.last>=60){
					return [parseInt(this.last/60)+' h '+(this.last%60==0?'':this.last%60+' m'),parseInt(this.last/60)+' 小时 '+(this.last%60==0?'':this.last%60+' 分钟')]
				}else{
					return [this.last+' m',this.last+' 分钟']
				}
			}
		},
		methods:{
			addTime(t){
				this.last += t;
			},
			clearTime(){
				this.last = 0;
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		flex-direction: column;
	}

	.timing_wrap {
		display: flex;
		flex-direction: column;
		padding: 20px 30px;
	}

	.timing_wrap .top {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-bottom: 20px;
	}

	.timing_card {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background-color: #a6caf1;
		border-radius: 20px;
		width: 210px;
		height: 300px;
		margin: 20px 0 20px 30px;
	}

	.timing_card_icon {
		width: 80px;
		height: 80px;
	}

	.card_time,
	.card_name {
		margin-top: 30px;
		margin-bottom: 30px;
		color: #505050;
		font-weight: 700;
		font-size: 32px;
	}

	.card_time {
		font-size: 30px;
	}

	.add_time {
		padding-left: 20px;
		color: #505050;
		font-size: 60px;
		font-weight: 700;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.add_time .equal {
		font-size: 34px;
		font-weight: 600;
	}

	.timing_wrap .add {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 36px;
		color: #505050;
		font-weight: 700;
	}

	.timing_wrap .add .add_sub {
		font-size: 30px;
		font-weight: 500;
		padding-bottom: 20px;
	}

	.timing_wrap .add .add_items {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.add_items .item {
		display: flex;
		align-items: center;
		justify-content: center;
		color: #505050;
		width: 120px;
		height: 120px;
		background-color: #a6caf1;
		border-radius: 50%;
		margin: 12px 20px;
		font-size: 32px;
		box-shadow: 6px 6px 5px #ccc;
	}

	.add_time_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30px;
		font-size: 36px;
		width: 300px;
		height: 100px;
		background-color: #A6CAF1;
		border-radius: 50px;
		color: #505050;
		box-shadow: 6px 6px 5px #ccc;
	}

	.add_items .item.zero {
		background-color: #888888;
		color: #FFFFFF;
		font-weight: 500;
	}
</style>
