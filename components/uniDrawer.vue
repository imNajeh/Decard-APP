<template>
	<view class="uni-drawer" :class="{'uni-drawer-visible':visible,'uni-drawer-right':rightMode}">
		<view v-if="showMask" class="uni-drawer-mask" @tap="close"></view>
		<view class="uni-drawer-content">
			<!-- <slot></slot> -->
			<view class="drawer_wrap">
				<view class="drawer_box" v-for="item in list" :key="item" :style="{backgroundImage: 'url(' + '../../static/images/'+item.img+'.jpg' + ')'}">
					<view class="title">{{item.text}}</view>
					<view class="btn">{{item.have?'已拥有':item.cost+' DB'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			/**
			 * 显示状态
			 */
			visible: {
				type: Boolean,
				default: false
			},
			list: {
				type: Array
			},
			/**
			 * 显示模式（左、右），只在初始化生效
			 */
			mode: String,
			/**
			 * 蒙层显示状态
			 */
			mask: {
				type: [Boolean, String],
				default: true
			}
		},
		data() {
			return {
				rightMode: false
			}
		},
		computed: {
			showMask() {
				return String(this.mask) === 'true'
			}
		},
		created() {
			this.rightMode = this.mode === 'right'
		},
		methods: {
			close() {
				this.$emit('close')
			}
		}
	}
</script>

<style scoped>
	.uni-drawer {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		visibility: hidden;
		z-index: 99;
	}

	.uni-drawer>.uni-drawer-mask {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4);
	}

	.uni-drawer>.uni-drawer-content {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 550upx;
		height: 100%;
		background: #FFFFFF;
		transition: all 0.3s ease-out;
		transform: translatex(-100%);
	}

	.uni-drawer.uni-drawer-right>.uni-drawer-content {
		left: auto;
		right: 0;
		transform: translatex(100%);
	}

	.uni-drawer.uni-drawer-visible {
		visibility: visible;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-mask {
		display: block;
	}

	.uni-drawer.uni-drawer-visible>.uni-drawer-content {
		transform: translatex(0);
	}

	.drawer_wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-weight: 700;
		color: #505050;
		font-size: 36upx;
	}

	.drawer_box {
		width: 510upx;
		height: 200upx;
		border-radius: 20upx;
		margin-bottom: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-size: cover;
	}

	.box_img {
		width: 400upx;
		height: 200upx;
		border-radius: 20upx;
		opacity: 0.8;
	}

	.drawer_box .title {
		border-radius: 16upx;
		background-color: #DDDDDD;
		font-size: 34upx;
		height: 50upx;
		padding: 6upx 12upx;
		margin: 10upx 14upx;
		color: #666666;
		line-height: 50upx;
		opacity: 0.7;
	}

	.drawer_box .btn {
		border-radius: 16upx;
		background-color: #666666;
		font-size: 34upx;
		height: 50upx;
		padding: 6upx 12upx;
		margin: 10upx 14upx;
		color: #FFFFFF;
		border: 1upx solid #DDDDDD;
		line-height: 50upx;
		opacity: 0.8;
	}
</style>
