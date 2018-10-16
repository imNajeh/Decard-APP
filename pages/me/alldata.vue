<template>
	<view class="alldata">
		<view class="focus_data_wrap">
			<view class="data_item" v-for="(item,index) in lists" :key="index">
				<view class="card_item" :style="{ backgroundColor: item.color }">
					<image class="card_icon" :src="'../../static/card_icon/'+item.icon+'.png'" mode="scaleToFill"></image>
				</view>
				<view v-if="item.content" class="beiwang">
					<text>备忘：{{item.content}}</text>
					<text class="time_info">
						<to-time :time="item.date"></to-time><text>专注于{{item.name}}</text>
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import toTime from '../../components/toTime.vue';
	export default {
		data: {
			lists: []
		},
		components: {
			toTime
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
					he.map((item, index) => {
						if (uni.getStorageSync(item.toString())) {
							hi = [...hi, ...uni.getStorageSync(item.toString()).focus_list]
						}
					})
					_this.lists = hi
				},
				fail: function(err) {

				}
			});
		},
		methods: {

		}

	}
</script>

<style>
	.alldata {
		flex: 1;
		/* justify-content: center; */
		/* align-items: center; */
		flex-direction: column;
		color: #505050;
	}

	.focus_data_wrap {
		display: flex;
		flex-direction: column;
		padding: 0 20upx;
	}

	.focus_data_wrap .data_item {
		width: 710upx;
		padding: 20upx;
		display: flex;
		flex-direction: row;
	}

	.card_item {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		border-radius: 20upx;
		width: 180upx;
		height: 180upx;
		margin: 20upx 20upx 20upx 30upx;
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

	.data_item .time_info {
		display: flex;
		flex-direction: row;
		font-size: 28upx;
		color: #007AFF;
	}

	.beiwang {
		color: #505050;
		display: flex;
		flex-direction: column;
	}
</style>
