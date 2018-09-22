<template>
	<view class="content">
		<view class="timing_wrap">
			<view class="top">
				<view class="timing_card" :style="{'backgroundColor':color}">
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
					<view class="item" :style="{'backgroundColor':color}" @tap="addTime(1)">1 m</view>
					<view class="item" :style="{'backgroundColor':color}" @tap="addTime(5)">5 m</view>
					<view class="item" :style="{'backgroundColor':color}" @tap="addTime(10)">10 m</view>
				</view>
				<view class="add_items">
					<view class="item" :style="{'backgroundColor':color}" @tap="addTime(25)">25 m</view>
					<view class="item" :style="{'backgroundColor':color}" @tap="addTime(50)">50 m</view>
					<view class="item" :style="{'backgroundColor':color}" @tap="addTime(60)">1 h</view>
				</view>
				<view class="add_items">
					<view class="item zero" @tap="clearTime()">清零</view>
				</view>
				<view class="add_time_btn" :style="{'backgroundColor':color}" @tap="goFocus()">开始专注</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			id:"",
			total: 0,
			name: '',
			icon: '',
			color: '',
			last: 10
		},
		onLoad(option){
			this.last = 10;
			this.total = option.time;
			this.name = option.name;
			this.icon = option.icon;
			this.color = option.color;
			this.id = option.id;
		},
		computed: {
			time() {
				if (this.last >= 60) {
					return [parseInt(this.last / 60) + ' h ' + (this.last % 60 == 0 ? '' : this.last % 60 + ' m'), parseInt(this.last /
						60) + ' 小时 ' + (this.last % 60 == 0 ? '' : this.last % 60 + ' 分钟')]
				} else {
					return [this.last + ' m', this.last + ' 分钟']
				}
			}
		},
		methods: {
			addTime(t) {
				this.last += t;
			},
			clearTime() {
				this.last = 0;
			},
			goFocus() {
				uni.reLaunch({
					url: `focus?color=${this.color}&name=${this.name}&time=${this.last * 60}`
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

	.timing_wrap {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
	}

	.timing_wrap .top {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding-bottom: 20upx;
	}

	.timing_card {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		/* background-color: #a6caf1; */
		border-radius: 20upx;
		width: 210upx;
		height: 300upx;
		margin: 20upx 0 20upx 30upx;
	}

	.timing_card_icon {
		width: 80upx;
		height: 80upx;
	}

	.card_time,
	.card_name {
		margin-top: 30upx;
		margin-bottom: 30upx;
		color: #505050;
		font-weight: 700;
		font-size: 32upx;
	}

	.card_time {
		font-size: 30upx;
	}

	.add_time {
		padding-left: 20upx;
		color: #505050;
		font-size: 60upx;
		font-weight: 700;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.add_time .equal {
		font-size: 34upx;
		font-weight: 600;
	}

	.timing_wrap .add {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 36upx;
		color: #505050;
		font-weight: 700;
	}

	.timing_wrap .add .add_sub {
		font-size: 30upx;
		font-weight: 500;
		padding-bottom: 20upx;
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
		width: 120upx;
		height: 120upx;
		/* background-color: #a6caf1; */
		border-radius: 50%;
		margin: 12upx 20upx;
		font-size: 32upx;
		box-shadow: 6upx 6upx 5upx #ccc;
	}

	.add_time_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30upx;
		font-size: 36upx;
		width: 300upx;
		height: 100upx;
		/* background-color: #A6CAF1; */
		border-radius: 50upx;
		color: #505050;
		box-shadow: 6upx 6upx 5upx #ccc;
	}

	.add_items .item.zero {
		background-color: #888888;
		color: #FFFFFF;
		font-weight: 500;
	}
</style>
