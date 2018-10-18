<template>
	<view class="me">
		<view class="me_index">
			<view class="top_intro">
				<image class="avatar" :src="objList[objValue].url" mode="scaleToFill"></image>
				<picker class="picker-item" mode="selector" :range="objList" range-key="text" @change="objChange">
					<text class="username">更改头像</text>
				</picker>
			</view>
			<view class="info_list">
				<view class="info_item">
					<text>昵称：</text>
					<input placeholder="请输入昵称" @input="nicknameInput" :value="nickname" />
				</view>
				<view class="info_item">
					<text>性别：</text>
					<radio-group class="radio-group" @change="radioChange">
						<label class="radio" v-for="item in items" :key="item">
							<radio :value="item.name" :checked="item.checked" />{{item.value}}
						</label>
					</radio-group>
				</view>
				<view class="btn">
					<button @click="saveInfo" type="primary">保存修改</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			token: '',
			username: '',
			nickname: '',
			coin: 0,
			avatar: '',
			gender: '男',
			items: [{
					name: '男',
					value: '男',
					checked: 'true'
				},
				{
					name: '女',
					value: '女'
				}
			],
			objList: [{
				text: '小猫',
				url: '../../static/images/avatar.jpg'
			}, {
				text: '小狗',
				url: '../../static/images/dog.jpg'
			}, {
				text: '小猪',
				url: '../../static/images/pig.jpg'
			}],
			objValue: 0,
		},
		onShow() {
			console.log(this.isLogin)
			var _this = this;
			uni.getStorage({
				key: 'token',
				success: function(res) {
					console.log(res.data);
					if (res.data) {
						_this.isLogin = true;
						_this.token = res.data;
						uni.request({
							method: 'GET',
							url: 'http://119.29.39.213:3000/showUserInfo',
							header: {
								authorization: _this.token
							},
							data: {
								pageNo: 1,
								pageSize: 1,
								findOne: true
							},
							success: (res) => {
								console.log(JSON.stringify(res.data));
								_this.username = res.data.data.resData[0].username;
								_this.nickname = res.data.data.resData[0].nickname;
								_this.avatar = res.data.data.resData[0].avatar;
								_this.coin = res.data.data.resData[0].coin;
								_this.gender = res.data.data.resData[0].gender;
								if (_this.gender == '女') {
									_this.items = [{
											name: '男',
											value: '男'
										},
										{
											name: '女',
											value: '女',
											checked: 'true'
										}
									]
								}else{
									_this.items = [{
											name: '男',
											value: '男',
											checked: 'true'
										},
										{
											name: '女',
											value: '女'
										}
									]
								}
								if (_this.avatar == '../../static/images/avatar.jpg') {
									_this.objValue = 0
								}
								if (_this.avatar == '../../static/images/dog.jpg') {
									_this.objValue = 1
								}
								if (_this.avatar == '../../static/images/pig.jpg') {
									_this.objValue = 2
								}
							},
							fail: (err) => {
								console.log(JSON.stringify(err))
							}
						});
					} else {}
				},
				fail: function() {}
			});
		},
		methods: {
			nicknameInput(e) {
				this.nickname = e.detail.value;
			},
			radioChange: function(e) {
				this.gender = e.detail.value
			},

			objChange(evt) {
				this.objValue = evt.detail.value;
			},
			saveInfo() {
				var _this = this;
				uni.request({
					method: 'POST',
					url: 'http://119.29.39.213:3000/updateUserMsg',
					header: {
						authorization: _this.token
					},
					data: {
						nickname: _this.nickname,
						avatar: _this.objList[_this.objValue].url,
						gender: _this.gender
					},
					success: (res) => {
						console.log(JSON.stringify(res.data));
						if (res.data.msg == '修改数据成功') {
							uni.showToast({
								title: '保存成功',
								mask: false,
								duration: 1500,
								success: function() {
									uni.switchTab({
										url:'./index'
									})
								}
							});
						}
					},
					fail: (err) => {
						console.log(JSON.stringify(err))
					}
				});
			}
		}

	}
</script>

<style>
	.me {
		flex: 1;
		justify-content: center;
		/* align-items: center; */
		flex-direction: column;
		color: #505050;
	}

	.tologin_wrap {
		flex: 1;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.me .to_login_text {
		font-size: 36upx;
		color: #505050;
	}

	.top_intro {
		display: flex;
		justify-content: center;
		align-items: center;
		/* background-color: #87CEFA; */
		/* border-bottom: 2upx solid #DDDDDD; */
		width: 100%;
		height: 340upx;
		flex-direction: column;
	}

	.top_intro .username {
		font-weight: 600;
	}

	.me .logo {
		margin: 30upx 0;
		opacity: 0.6;
		width: 200upx;
		height: 200upx;
	}

	.me_index {
		flex: 1;
		/* justify-content: center; */
		align-items: center;
		flex-direction: column;
	}

	.avatar {
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
		margin-bottom: 20upx;
	}

	.info_list {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.info_item {
		display: flex;
		flex-direction: row;
		margin: 20upx 0;
	}

	.btn {
		margin-top: 200upx;
	}
</style>
