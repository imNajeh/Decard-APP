<template>
	<view class="detail">
		<view class="top_wrap">
			<view class="card_item" :style="{ backgroundColor: color }">
				<view class="card_time">
					<to-hour :time="time"></to-hour> h
				</view>
				<image class="card_icon" :src="'../../static/card_icon/'+icon+'.png'" mode="scaleToFill"></image>
				<view class="project_name">{{name}}</view>
			</view>
			<view class="card_detail">
				<text class="name">{{name}}</text>
				<view class="count">
					<view class="count_item">
						<text><to-hour :time="time"></to-hour> h</text>
						<text>累积时间</text>
					</view>
					<view class="count_item">
						<text>{{total}}</text>
						<text>记录条目</text>
					</view>
				</view>
			</view>
		</view>
		<view class="canvasView">
			<view class="title">
				<image class="time_icon" src="../../static/icon/time.png" mode="aspectFill"></image>最近投入时间 (min)
			</view>
			<mpvue-echarts :echarts="echarts" :onInit="lineInit" canvasId="line" />
		</view>
	</view>
</template>

<script>
	import * as echarts from '../../common/echarts.js';
	import mpvueEcharts from '../../components/echarts.vue';
	import {
		getChartDate,
		getChartData
	} from '../../common/sevenday.js';
	import toHour from '../../components/toHours.vue';
	export default {
		data: {

			color: "",
			time: "",
			icon: "",
			name: "",
			id: "",
			total: 0,
			echarts,
			chartdata: {},
			lineInit: null

		},
		onLoad(option) {
			this.name = option.name;
			this.icon = option.icon;
			this.color = option.color;
			this.time = option.time;
			this.id = option.id;
		},
		onShow() {
			var _this = this;
			
			uni.getStorage({
				key: this.id,
				success: function(res) {
					_this.total = res.data.focus_list.length;
					_this.chartdata = {
						animation: false,
						color: [_this.color],
						legend: {
							data: ['focus']
						},
						grid: {
							x: 30,
							x2: 10,
							y: 30,
							y2: 25
						},
						calculable: false,
						xAxis: [{
							type: 'category',
							data: getChartDate()
						}],
						yAxis: [{
							type: 'value',
							splitArea: {
								show: true
							}
						}],
						series: [{
							name: 'focus',
							type: 'line',
							data: getChartData(res.data.focus_list)
						}]
					}
				},
				fail: function(err) {
					_this.chartdata = {
						animation: false,
						color: [_this.color],
						legend: {
							data: ['focus']
						},
						grid: {
							x: 30,
							x2: 10,
							y: 30,
							y2: 25
						},
						calculable: false,
						xAxis: [{
							type: 'category',
							data: getChartDate()
						}],
						yAxis: [{
							type: 'value',
							splitArea: {
								show: true
							}
						}],
						series: [{
							name: 'focus',
							type: 'line',
							data: [0,0,0,0,0,0,0]
						}]
					}
				}
			});
			this.lineInit = function(canvas, width, height) {
				let lineChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(lineChart)
				lineChart.setOption(_this.chartdata)
				return lineChart
			}
		},
		components: {
			toHour,
			mpvueEcharts
		},
		computed: {

		},
		methods: {

		}
	}
</script>

<style>
	.detail {
		flex: 1;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
	}

	.top_wrap {
		display: flex;
		flex-direction: row;
		justify-content: center;
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

	.card_detail {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #505050;
	}

	.card_detail .name {
		margin: 20upx 0;
		font-size: 42upx;
		color: #505050;
	}

	.card_detail .count {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin: 0 20upx;
		border-top: 2upx solid #E5E5E5;
		border-bottom: 2upx solid #E5E5E5;
		padding: 20upx 0;
		width: 400upx;
	}

	.card_detail .count .count_item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.canvasView {
		width: 600upx;
		margin: 50upx 0;
		flex: 1;
		flex-direction: column;
		align-items: center;
	}

	.canvasView .time_icon {
		width: 42upx;
		height: 42upx;
		margin-right: 10upx;
	}
</style>
