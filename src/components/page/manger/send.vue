<template>
  <div class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <div class="add">
      <h4 class="title">新增发货</h4>
      <div class="form">
        <!-- <el-form ref="sendform" :model="sendform">
          <el-form-item prop="sendname">
            <el-input></el-input>
          </el-form-item>
        </el-form> -->
      </div>
    </div>
    <div class="presend">

    </div>
  </div>
</template>
<script>
export default {
  // ..
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.box {
  .head {
    .leftborder
  }
  .add {
    box-shadow: 0 1px 4px @color;
    margin: 20px 15px;
    .title {
      text-align: left;
      border-bottom: 1px solid #999;
      padding: 10px 0 5px 20px;
      background: @color;
      color: #eee;
    }
  }
}
</style>

