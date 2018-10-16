<template>
	<text class="time">{{toMinTime}}</text>
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
			toMinTime() {
				return (this.time/60)==0?'0':(this.time/60);
			}
		}
	}
</script>

<style scoped>
.time {
	margin-right: 6upx;
}	
</style>