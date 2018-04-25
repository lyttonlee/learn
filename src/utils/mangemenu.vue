<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <!-- 子菜单路由 -->
    <div class="menu">
      <el-menu
        mode="horizontal"
        :default-active="$route.path"
        router>
          <el-menu-item 
            v-for="item in route"
            :key="item.path"
            :index="item.path">
            {{item.name}}
          </el-menu-item>
        </el-menu>
    </div>
    <!-- 渲染路由 -->
    <transition name="el-zoom-in-center">
      <router-view></router-view>
    </transition>
  </section>
</template>
<script>
export default {
  // ..
  props: ['pathName'],
  computed: {
    route () {
      let pathName = this.pathName
      const route = this.$store.state.addRoutes[0].children
      const culRoute = route.filter(r => {
        return r.name === pathName
      })
      return culRoute[0].children
    }
  }
}
</script>
<style lang="less" scoped>
@import '../common/less/index.less';
.box {
  .head {
    .leftborder
  }
  .menu {
    margin: 0 15px;
  }
}
</style>


