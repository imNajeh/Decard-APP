<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
			//#ifdef APP-PLUS
			plus.runtime.quit = function() {
				// main.moveTaskToBack(false);
			};
			plus.nativeUI.toast = (function(str) {
				if (str == '再按一次退出应用') {
					// main.moveTaskToBack(false); 
					return false;
				} else {
					uni.showToast({
						title: str,
						icon: 'none',
					})
				}
			});
			//#endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */

	page,
	view {
		display: flex;
		/* uni-app默认使用flex布局。因为flex布局有利于跨更多平台，尤其是采用原生渲染的平台。如不了解flex布局，请参考http://www.w3.org/TR/css3-flexbox/。若不需要flex布局可删除本行*/
	}

	page {
		min-height: 100%;
	}
</style>
