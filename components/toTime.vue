<template>
	<text>{{toTime}}</text>
</template>

<script>
	var dateUtils = require('../common/util.js').dateUtils;
	export default {
		props: {
			time: {
				type: Number,
				default:0
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			toTime() {
				return this.time?dateUtils.format(this.time):'暂无';
			}
		}
	}
</script>

<style scoped>
</style>