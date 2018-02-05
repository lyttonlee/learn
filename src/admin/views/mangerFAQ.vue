<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <!-- 菜单 -->
    <div class="menu">
      <el-menu
        mode="horizontal"
        :default-active="$router.path"
        router>
          <el-menu-item 
            v-for="item in $router.options.routes[1].children[6].children"
            :key="item.path"
            :index="item.path">
            {{item.name}}
          </el-menu-item>
        </el-menu>
    </div>
    <!-- 渲染路由 -->
    <router-view></router-view>
  </section>
</template>
<script>
export default {
  // ..
}
</script>
<style lang="less" scoped>
@import '../../common/less/index.less';
.box {
  .head {
    .leftborder
  }
  .menu {
    margin: 0 15px;
  }
}
</style>