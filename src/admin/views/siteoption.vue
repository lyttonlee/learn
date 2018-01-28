<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <!-- 网站设置路由 -->
    <div class="sitemenu">
      <el-menu
        mode="horizontal"
        :default-active="$router.path"
        router>
          <el-menu-item 
            v-for="item in $router.options.routes[1].children[5].children"
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
  .sitemenu {
    margin: 0 15px;
  }
}
</style>