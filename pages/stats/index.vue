<template>
	<view class="stats">
		{{title}}
	</view>
</template>

<script>
	export default {
		data: {
			title: '统计'
		},
		onShow() {
			uni.getStorage({
				key: 'recorder',
				success: function(res) {
					var he = [];
					var hi = [];
					for (let x in res.data) {
						if (res.data[x].length != 0) {
							res.data[x].map((item,index)=>{
								he.push(item.id)
							})
						}
					}
					console.log(JSON.stringify({ITEM:he}));
					he.map((item,index)=>{
						console.log(JSON.stringify(uni.getStorageSync(item.toString())))
						if(uni.getStorageSync(item.toString())){
							hi = [...hi,...uni.getStorageSync(item.toString()).focus_list]
						}
					})
					console.log(JSON.stringify({Data:hi}));
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
	.stats {
		flex: 1;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>
