<template>
  <div class="container">
    <h2>新闻动态</h2>
    <div class="main">
      <el-row>
        <template v-for="item in news">
          <el-col class="item" :span="8" :xs="24" :key="item._id">
            <h4>{{item.title}}</h4>
            <p class="sub">{{item.date}}</p>
            <router-link :to="'/news/' + item._id" :key="item._id">
              <img class="img hvr-float" :src="item.img" alt="">
            </router-link>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>
<script>
import {GetNews} from '../../api/adminApi'
export default {
  data () {
    return {
      news: []
    }
  },
  methods: {
    getnews () {
      let par = {
        limit: 12
      }
      GetNews(par).then(res => {
        // console.log(res)
        this.news = res.data
      })
    }
  },
  mounted () {
    this.getnews()
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/index.less';
@import '../../common/css/hover.css';
.container {
  max-width: 1280px;
  .main {
    background: rgb(245, 245, 245);
    .item {
      text-align: left;
      padding: 20px 10px;
      .sub {
        font-size: 12px;
        color: rgb(107, 104, 104);
      }
      .img {
        width: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>


