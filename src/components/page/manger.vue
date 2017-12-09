<template>
  <div class="container">
    <el-row>
      <el-col :span="6">
        <p></p>
        <div class="user">
          <img class="avatar" :src="user.avatar" alt="">
          <h3 v-text="user.name"></h3>
          <p>daili</p>
          <hr>
          <el-menu 
          :default-active="$router.path"
          router>
            <el-menu-item 
              v-for="(item, index) in $router.options.routes[4].children"
              :key="item.path"
              :index="item.path">
              {{item.name}}
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <transition name="el-zoom-in-center">
          <router-view></router-view>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  computed: {
    user () {
      return this.$store.state.user
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/index.less';
.container {
  .user {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 60px;
    background: @color;
    width: 20%;
    box-shadow:  2px 0 5px #E0E0E0;
    color: #589f38;
    z-index: 3;
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 40px;
      margin-top: 50px;  
    }
    .el-menu {
      background: @color;
      border: none;
      .el-menu-item {
        color: #fff;
        &:hover {
          color: @color;
        }
      }
    }
    .is-active {
      color: @color !important;
      font-weight: bold !important;
      background: #fff !important;
    }
  }  
}

</style>
