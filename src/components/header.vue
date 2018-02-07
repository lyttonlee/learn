<template>
  <div>
    <el-row class="header">
      <!-- 左边logo -->
      <el-col :span="4" class="logo">
        <img @click="tohome" :src="siteoption.logo" alt="">
      </el-col>
      <!-- 中间导航区域 -->
      <el-col class="main" :span="16">
        <el-menu :default-active="$route.path" class="menu" router mode="horizontal" @select="handleSelect" active-text-color="#000">
          <!-- 循环写的前端路由，其中路由中有  hidden：true 的就不加入循环 -->
          <template v-for="route in $router.options.routes[0].children" v-if="!route.hidden">

            <!-- 循环没有children的路由 -->
            <el-menu-item v-if="!route.hasChild" :key="route.path" :index="route.path">
              <i :class="route.class"></i>
              {{ route.name }}
            </el-menu-item>

            <!-- 循环有children的路由 -->
            <el-submenu v-else :index="route.path" :key="route.path">
              <template slot="title">{{ route.name }}</template>
              <el-menu-item v-for="child in route.children" :index="child.path" :key="child.path">
                {{ child.name }}
              </el-menu-item>
            </el-submenu>

          </template>
        </el-menu>
      </el-col>
      <!-- 右边用户信息以及登陆注册 -->
      <el-col :span="4" class="user">
        <!-- 根据logined值的真假来判断是显示登录按钮还是用户信息
      以后根据登录状态来改变 -->
        <el-button-group v-if="!user">
          <el-button class="button" @click.native="tologin" type="danger" size="small" round>登录</el-button>
          <el-button class="button" @click.native="toregin" type="success" size="small" round>注册</el-button>
        </el-button-group>
        <div v-else>
          <el-dropdown>
            <img class="avatar" :src="user.avatar" alt="">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="tomy" v-text="user.name"></el-dropdown-item>
              <el-dropdown-item @click.native="tosend">我的工作台</el-dropdown-item>
              <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <!-- 移动端头部 -->
    <el-row class="header-phone">
      <!-- 左边menu -->
      
      <el-col class="main" :span="4">
        
        <el-dropdown trigger="click">
          <div class="topmenu">
            <i class="iconfont icon-ego-caidan"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-menu :default-active="$route.path" class="menu" router  @select="handleSelect" active-text-color="#000">
                <!-- 循环写的前段路由，其中路由中有  hidden：true 的就不加入循环 -->
                <template v-for="route in $router.options.routes[0].children" v-if="!route.hidden">

                  <!-- 循环没有children的路由 -->
                  <el-menu-item v-if="!route.hasChild" :key="route.path" :index="route.path">
                    <i :class="route.class"></i>
                    {{ route.name }}
                  </el-menu-item>

                  <!-- 循环有children的路由 -->
                  <el-submenu v-else :index="route.path" :key="route.path">
                    <template slot="title">{{ route.name }}</template>
                    <el-menu-item v-for="child in route.children" :index="child.path" :key="child.path">
                      {{ child.name }}
                    </el-menu-item>
                  </el-submenu>

                </template>
              </el-menu>
            </el-dropdown-item>
            
          </el-dropdown-menu>
        </el-dropdown>
        
      </el-col>
      <!-- 中间logo -->
      <el-col :span="12" class="logo">
        <img @click="tohome" :src="siteoption.logo" alt="">
      </el-col>
      <!-- 右边用户信息以及登陆注册 -->
      <el-col :span="8" class="user">
        <!-- 根据logined值的真假来判断是显示登录按钮还是用户信息
      以后根据登录状态来改变 -->
        <el-button-group v-if="!user">
          <el-button class="button" @click.native="tologin" type="danger" size="small" round>登录</el-button>
          <el-button class="button" @click.native="toregin" type="success" size="small" round>注册</el-button>
        </el-button-group>
        <div v-else>
          <el-dropdown>
            <img class="avatar" :src="user.avatar" alt="">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="tomy" v-text="user.name"></el-dropdown-item>
              <el-dropdown-item @click.native="tosend">我的工作台</el-dropdown-item>
              <el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script>
  export default {
    methods: {
      // 给用户一点提示
      handleSelect (key) {
        if (!this.user && (key === '/manger/my' || key === '/manger/send' || key === '/manger/history')) {
          this.$notify({
            title: '很抱歉',
            message: '请您登录后在访问此页面！',
            type: 'warning',
            offset: 200
          })
        }
      },
      tohome () {
        this.$router.push('/')
        // console.log('home')
      },
      tologin () {
        this.$router.push('/login')
      },
      toregin () {
        this.$router.push('/regin')
      },
      tomy () {
        this.$router.push('/manger/my')
      },
      tosend () {
        this.$router.push('/manger/send')
      },
      logout () {
        this.$confirm('退出后将返回登录界面, 是否退出登录?', '真的要退出吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user')
          // 在这里挂上，官方说的分发，登出的action
          // 应该这样就行了把
          this.$store.dispatch('logout')
          this.$router.push('/login')
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
    // 获取store的User数据
    computed: {
      user () {
        return this.$store.state.user
      },
      siteoption () {
        return this.$store.state.siteoption
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../common/css/icon.css';
@import '../common/less/index.less';
@import '../common/css/init.css';
  .header {
    width: 100%;
    height: 60px;
    margin: 0;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    box-shadow: 0 0 25px #666;
    @media screen and (max-width: 768px) {
      display: none;
    }
    .logo {
      img {
        width: 100%;
        height: 60px;
        cursor: pointer;
      }
    }
    .main {
      .menu {
        border: none;
      }
    }
    .user {
      .button {
        margin: 15px 0;
        width: 50%;
      }
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 0;
        cursor: pointer;
      }
    }
  }
  .header-phone {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      background: #fff;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      box-shadow: 0 0 25px #666;
      z-index: 999;
      .main {
        .topmenu {
          height: 60px;
          line-height: 60px;
          .iconfont {
            font-size: 36px;
            padding: 0 10px;
            // border: 1px solid #999;
          }
          &:hover {
            color: @color;
          }
          .el-menu {
            border-right: none !important;
          }
        }
        
      }
      .logo {
        img {
          width: 100%;
          height: 60px;
          cursor: pointer;
        }
      }
      .user {
        .button {
          margin: 15px 0;
          width: 50%;
        }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0;
          cursor: pointer;
        }
      }
    }
  }

</style>
