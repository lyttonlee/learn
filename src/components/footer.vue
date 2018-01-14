<template>
<el-row  class="footer">
  <el-col :span="8">
    <img class="logo" src="../assets/logo.png" alt="">
  </el-col>
  <el-col :span="16">
    <p class="copy">Copyright © 2015-2018.会理县未济网络科技有限公司.All Rights Reserved.</p>
    <p class="beian">ICP备案号：蜀ICP备17008055号</p>
  </el-col>
</el-row>

</template>
<style lang="less" scoped>
@import '../common/less/index.less';
.footer {
  width: 100%;
  box-shadow: 0 -1px 1px @color;
  background: #fff;
  z-index: 10;
  .logo {
    width: 80px;
    height: 80px;
  }
}
</style>

