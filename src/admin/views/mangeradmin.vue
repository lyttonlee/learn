<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <!-- 管理员管理路由 -->
    <div class="adminermenu">
      <el-menu
        mode="horizontal"
        :default-active="$router.path"
        router>
          <el-menu-item 
            v-for="item in $router.options.routes[1].children[4].children"
            :key="item.path"
            :index="item.path">
            {{item.name}}
          </el-menu-item>
        </el-menu>
    </div>
    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
    
  </section>
</template>
<style lang="less" scoped>
@import '../../common/less/index.less';
.box {
  .head {
    .leftborder;
  }
}
</style>




