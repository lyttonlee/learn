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
        <div class="adminer">
          <el-dropdown>
            <img class="avatar" :src="adminer.avatar" alt="">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >{{adminer.name}}</el-dropdown-item>
              <el-dropdown-item @click.native="toset">设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <!-- 内容区 -->
    <el-row class="main">
      <!-- 左边导航菜单 -->
      <el-col class="menu" :span="4">
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
      <el-col class="content" :span="20">
        <transition name="el-zoom-in-center">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  data () {
    return {
      // ...
    }
  },
  computed: {
    adminer () {
      return this.$store.state.adminer
    }
  },
  methods: {
    toset () {
      console.log('to set')
    },
    // 管理员退出登录
    logout () {
      this.$confirm('退出后将返回管理员登录界面, 是否退出登录?', '真的要退出吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('adminer')
        // 在这里挂上，官方说的分发，登出的action
        // 应该这样就行了把
        this.$store.dispatch('adminlogout')
        this.$router.push('/adminer/login')
        this.$message({
          type: 'danger',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  },
  mounted () {
    this.$store.dispatch('products')
    this.$store.dispatch('sendsed')
    this.$store.dispatch('users')
    this.$store.dispatch('prods')
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/index.less';
.admin {
  .header {
    height: 60px;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 10px @color;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    .adminer {
      text-align: right;
      margin-right: 30px;
      .avatar {
        text-align: right !important;
        margin: 0 15px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
      }
    }
    .logo {
      margin: 0 5px;
      width: 60px;
      height: 60px;
    }
  }
  .main {
    .menu {
      .admin-menu {
        position: fixed;
        width: 16%;
        top: 65px;
        bottom: 0;
        background: rgb(255, 255, 255);
        .el-menu-item {
          text-align: center;
          padding: 0 !important;
          padding-left: 0 !important;
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
      margin: 65px 0 0 0;
    }
  }
}
</style>


