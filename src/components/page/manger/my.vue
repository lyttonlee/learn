<template>
  <div>
    <h1>my.data</h1>
    <h5>我的登录状态: {{user ? '已登录' : '未登录'}}</h5>
    <h5>我的昵称:<span v-text="user.name"></span></h5>
    <h5>我的照片:<img :src="user.avatar" :alt="user.name"></h5>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // .
      // username: ''
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  }
  // mounted () {
  //   // 从内存取出数据
  //   let user = sessionStorage.getItem('user')
  //   // 判断数据是否存在
  //   if (user) {
  //     user = JSON.parse(user)
  //     this.username = user.name
  //     console.log(user)
  //   }
  // }
}
</script>
