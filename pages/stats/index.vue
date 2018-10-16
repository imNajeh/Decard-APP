<template>
	<view class="stats">
		<view class="canvasView">
			<view class="title">
				<image class="time_icon" src="../../static/icon/pie.png" mode="aspectFill"></image>最近投入时间类别
			</view>
			<mpvue-echarts :echarts="echarts" :onInit="pieInit" canvasId="pie" />
		</view>
		<view class="canvasView">
			<view class="title">
				<image class="time_icon" src="../../static/icon/time.png" mode="aspectFill"></image>每日累积支出时间
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
		getChartData,
		getChartData_3
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
			chartdata_2: {},
			lineInit: null,
			pieInit: null

		},
		onLoad(option) {

		},
		onShow() {
			var _this = this;
			uni.getStorage({
				key: 'recorder',
				success: function(res) {
					var he = [];
					var hi = [];
					for (let x in res.data) {
						if (res.data[x].length != 0) {
							res.data[x].map((item, index) => {
								he.push(item.id)
							})
						}
					}
					console.log(JSON.stringify({
						ITEM: he
					}));
					he.map((item, index) => {
						console.log(JSON.stringify(uni.getStorageSync(item.toString())))
						if (uni.getStorageSync(item.toString())) {
							hi = [...hi, ...uni.getStorageSync(item.toString()).focus_list]
						}
					})
					console.log(JSON.stringify({
						Data: hi
					}));
					_this.total = hi.length;
					_this.chartdata = {
						animation: false,
						color: ['#505050'],
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
							data: getChartData(hi)
						}]
					}
					_this.chartdata_2 = {
						animation: false,
						tooltip: {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
						series: [{
							label: {
								normal: {
									fontSize: 14
								}
							},
							type: 'pie',
							center: ['50%', '50%'],
							radius: [0, '60%'],
							label: {
								normal: {
									show: true,
									// position: 'inside',
									formatter: '{b}{d}%', //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比 
									textStyle: {
										align: 'center',
										baseline: 'middle',
										fontFamily: '微软雅黑',
										fontSize: 12,
										fontWeight: 'bolder'
									}
								},
							},
							data: getChartData_3(hi),
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 2, 2, 0.3)'
								}
							}
						}]
					}
				},
				fail: function(err) {
					_this.chartdata = {
						animation: false,
						color: ['#505050'],
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
							data: [0, 0, 0, 0, 0, 0, 0]
						}]
					}
					_this.chartdata_2 = {
						animation: false,
						color: ['#37A2DA', '#32C5E9', '#67E0E3', '#91F2DE', '#FFDB5C', '#FF9F7F'],
						series: [{
							label: {
								normal: {
									fontSize: 14
								}
							},
							type: 'pie',
							center: ['50%', '50%'],
							radius: [0, '60%'],
							data: [{
								name: '暂无数据',
								value: 0
							}],
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 2, 2, 0.3)'
								}
							}
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

			this.pieInit = function(canvas, width, height) {
				let pieChart = echarts.init(canvas, null, {
					width: width,
					height: height
				})
				canvas.setChart(pieChart)
				pieChart.setOption(_this.chartdata_2)
				return pieChart
			}
		},
		components: {
			toHour,
			mpvueEcharts
		},
		computed: {

		},
		methods: {
			goAllData() {
				uni.navigateTo({
					url: '../me/alldata'
				});
			}
		}
	}
</script>

<style>
	.stats {
		flex: 1;
		/* justify-content: center; */
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
