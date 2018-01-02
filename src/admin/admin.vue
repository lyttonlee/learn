<template>
	<section class="admin">
		<!-- 头部 -->
		<el-row class="header">
			<!-- logo -->
			<el-col :span="8">
				<img class="logo" src="../assets/logo.png" alt="">
			</el-col>
			<!-- 管理员 -->
			<el-col :span="16">
				<img class="avatar" src="../assets/avatar.jpg" alt="">
				<p class="adminname">李小霞</p>
			</el-col>
		</el-row>
		<!-- 内容区 -->
		<el-row class="main">
			<!-- 左边导航菜单 -->
			<el-col class="menu" :span="8">
				<p></p>
				<el-menu 
					class="admin-menu"
          :default-active="$router.path"
          router>
            <el-menu-item 
              v-for="item in $router.options.routes[1].children"
              :key="item.path"
              :index="item.path">
              {{item.name}}
            </el-menu-item>
          </el-menu>
			</el-col>
			<!-- 右边操作区域 -->
			<el-col class="content" :span="16">
				<transition name="el-zoom-in-center">
					<router-view></router-view>
				</transition>
			</el-col>
		</el-row>
	</section>
</template>
<script>
</script>
<style lang="less" scoped>
@import '../common/less/index.less';
.admin {
	.header {
		height: 60px;
		box-shadow: 0 0 10px @color;
		.logo {
			margin: 0 5px;
			width: 60px;
			height: 60px;
		}
		.avatar {
			margin: 0 15px;
			width: 60px;
			height: 60px;
			border-radius: 30px;
			float: right;
		}
		.adminname {
			float: right;
			font-size: 20px;
			margin-top: 20px;
			color: @color;
		}
	}
	.main {
		.menu {
			.admin-menu {
				position: fixed;
				width: 25%;
				top: 65px;
				bottom: 0;
				background: rgb(199, 193, 193);
				.el-menu-item {
        	color: rgb(134, 165, 9);
        	&:hover {
						background: @color;
						color: #eee;
        	}
				}
				.is-active {
					color: #eee !important;
					font-weight: bold !important;
					background: @color !important;
				}
    	}
    }
		.content {

		}
	}
}
</style>


