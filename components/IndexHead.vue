<template name="index-head">
	<view class="index_title">
		<image class="logo_img" src="../../static/logo/logo_default.png" mode="aspectFit"></image>
		<image class="logo_text" src="../../static/logo/logo_text.png" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		name: "index-head"
	}
</script>

<style>
	.index_title {
		display: flex;
		justify-content: center;
		font-size: 40px;
		padding-top: var(--status-bar-height);
		/* padding-top: 20px; */
		border-top: 20px solid #FFFFFF;
		font-weight: 700;
		color: #505050;
		position: fixed;
		width: 100%;
		height: 99px;
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