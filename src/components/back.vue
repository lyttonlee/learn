<template>
  <!-- 返回浏览 -->
  <div class="back">
    <el-button icon="el-icon-arrow-left" @click="back">返回浏览</el-button>
  </div>
</template>
<script>
export default {
  // ..
  methods: {
    back () {
      this.$router.back(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  .back {
    width: 100%;
    .el-button {
      width: 100%;
    }
  }
</style>


