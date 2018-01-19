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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  width: 100%;
  margin: 80px auto;
}
</style>
