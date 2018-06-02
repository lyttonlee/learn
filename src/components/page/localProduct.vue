<template>
  <div class="container">
    <!-- head -->
    <div class="head">
      <h2 class="tit">{{$route.name}}</h2>
    </div>
    <!-- body -->
    <div class="body">
      <el-row>
        <el-col :span="6" :xs="12">
          <div class="item">
            <img class="img" src="../../assets/er.png" alt="">
            <h4>title</h4>
            <p>discrp</p>
            <p>price</p>
          </div>
        </el-col>
        <el-col :span="6" :xs="12">
          <div class="item">
            <img class="img" src="../../assets/er.png" alt="">
            <h4>title</h4>
            <p>discrp</p>
            <p>price</p>
          </div>
        </el-col>
        <el-col :span="6" :xs="12">
          <div class="item">
            <img class="img" src="../../assets/er.png" alt="">
            <h4>title</h4>
            <p>discrp</p>
            <p>price</p>
          </div>
        </el-col>
        <el-col :span="6" :xs="12">
          <div class="item">
            <img class="img" src="../../assets/er.png" alt="">
            <h4>title</h4>
            <p>discrp</p>
            <p>price</p>
          </div>
        </el-col>
        <el-col :span="6" :xs="12">
          <div class="item">
            <img class="img" src="../../assets/er.png" alt="">
            <h4>title</h4>
            <p>discrp</p>
            <p>price</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/index.less';
.container {
  max-width: 1280px;
  text-align: left;
  .head {
    .tit {
    .leftborder;
    }
  }
  .body {
    // .learncontent;
    .item {
      margin: 10px;
      .img {
        width: 100%;
      }
    }
  }
}
</style>
