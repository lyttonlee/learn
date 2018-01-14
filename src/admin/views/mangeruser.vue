<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <div class="main">
      <h4>用户列表</h4>
    </div>
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
    .leftborder;
  }
  .main {
    .learncontent;
  }
}
</style>



