<template>
  <div class="section">
    <!-- 头部组件渲染 -->
    <header-ly></header-ly>
    <!-- 中间主要区域容器 -->
    <!-- 添加一个element-ui内置的过渡动画 -->
    <transition name="el-zoom-in-center">
      <!-- 通过路由渲染不同内容的页面 -->
      <router-view/>
    </transition>
    <!-- 底部 -->
    <!-- 底部组件渲染 -->
    <footer-ly></footer-ly>
  </div>
</template>
<script>
  // 导入组件
import HeaderLy from '@/components/header'
import FooterLy from '@/components/footer'
export default {
    name: 'home',
    components: {
      HeaderLy,
      FooterLy
    },
    mounted () {
      this.$store.dispatch('getsiteoption')
    }
}
</script>
