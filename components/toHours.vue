<template>
	<text class="time">{{toHourTime}}</text>
</template>

<script>
	export default {
		props: {
			time: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			toHourTime() {
				return (this.time/3600).toFixed(1)==0.0?'0':(this.time/3600).toFixed(1);
			}
		}
	}
</script>

<style scoped>
.time {
	margin-right: 6upx;
}	
</style>