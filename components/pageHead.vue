<template name="page-head">
	<view class="index_title">
		{{title}}
	</view>
</template>

<script>
	export default {
		name: "page-head",
		props: {
			title: {
				type: String,
				default: ""
			}
		}
	}
</script>

<style>
	.index_title {
		display: flex;
		justify-content: center;
		font-size: 40px;
		/* padding-top: 20px; */
		padding-top: var(--status-bar-height);
		border-top: 20px solid #FFFFFF;
		font-weight: 700;
		color: #505050;
		position: fixed;
		width: 100%;
		height: 99px;
		line-height: 99px;
		background-color: #fff;
		border-bottom: 1px solid #ddd;
	}
	
	.logo_img {
		width: 60px;
		height: 60px;
	}
	
	.logo_text {
		height: 60px;
		width: 210px;
	}
</style>