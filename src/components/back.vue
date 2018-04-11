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
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
  .back {
    width: 100%;
    margin: 10px 0;
    .el-button {
      width: 100%;
      font-size: 1rem;
      @media screen and (max-width: 768px) {
        font-size: .7rem;
      }
    }
  }
</style>


