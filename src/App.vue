<template>
  <div id="app">
    <router-view></router-view>
    <Up></Up>
  </div>
</template>

<script>
import Up from '@/components/up'
export default {
  name: 'app',
  components: {
    Up
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  text-align: center;
  color: #2c3e50;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    font-family: sans-serif, 'Avenir', Helvetica, Arial;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
.container {
  width: 100%;
  margin: 80px auto;
}
</style>
