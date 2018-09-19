<template>
	<view class="content">
		<view class="project_new_wrap">
			<view class="new_title" @input="KeyInput">请输入项目名称：</view>
			<input class="new_title_input" placeholder="项目名称" maxlength="10" />
			<view class="new_title">归入项目组：</view>
			<view class="project_new_classify">
				<view @tap="selectClassify(item)" class="new_classify_item" v-for="(item,index) in classify_list" :key="index" :style="{ backgroundColor: item==classify?'#ccc':'#eee' }">{{item}}</view>
			</view>
			<view class="new_title">选择习惯图标：</view>
			<view class="project_new_classify">
				<view @tap="selectIcon(item)" class="project_new_icon" v-for="(item,index) in icon_list" :key="index" :style="{ backgroundColor: item==icon?'#ccc':'#eee' }">
					<image class="icon" :src="'../../static/card_icon/'+item+'.png'" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="new_title">选择卡片颜色：</view>
			<view class="project_new_classify">
				<view @tap="selectColor(item)" class="project_new_color" v-for="(item,index) in card_color" :key="index" :style="{ backgroundColor: item , borderColor: item==color?'#888':'#eee'}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			classify_list: ['工作','学习','运动','健康','娱乐'],
			icon_list: ['baloon','bear','beer','board','briefcase','businessman','cake','camera','car','chat','cloud','coffe','controller','desktop','devil','diamond','front','globe','headphones','home','image','keyboard','money','moon','moto','mouse','music','pizza','plane','player','robot','shopping','signature','sushi','wallet'],
			card_color: ['#51cac1','#cf7777','#b2e743','#999999','#8c67e2','#49948f','#f8d86e','#f14c4c','#0b6962','#f1684b'],
			name: "",
			classify: "工作",
			icon: "baloon",
			color: "#51cac1"
		},
		onNavigationBarButtonTap(){
			console.log(1)
		},
		methods:{
			KeyInput(e){
				this.name = e.detail.value;
			},
			selectClassify(item){
				this.classify = item
			},
			selectIcon(item){
				this.icon = item
			},
			selectColor(item){
				this.color = item
			}
		}
	}
</script>

<style>
	.content {
		flex: 1;
		flex-direction: column;
		/* justify-content: center;
		align-items: center; */
	}

	.project_new_wrap {
		display: flex;
		flex-direction: column;
		padding: 20px 30px;
	}
	.new_title {
		font-weight: 36px;
		color: #505050;
		font-weight: 700;
		margin: 16px 0;
	}
	
	.new_title_input {
		background-color: #eee;
		padding: 20px;
		border-radius: 16px;
		margin: 16px 0;
	}
	.project_new_classify {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.new_classify_item {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px;
		background-color: #eee;
		width: 80px;
		margin: 16px 20px 16px 0;
		border-radius: 16px;
		font-size: 34px;
		color: #666;
		font-weight: 700;
	}
	
	.project_new_icon {
		width: 80px;
		height: 80px;
		padding: 20px;
		background-color: #eee;
		margin: 16px 20px 16px 0;
		border-radius: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.project_new_icon .icon {
		width: 60px;
		height: 60px;
	}
	
	.project_new_color {
		width: 70px;
		height: 70px;
		border: 5px solid #888;
		margin: 36px 40px 36px 20px;
		border-radius: 50%;
	}
</style>
