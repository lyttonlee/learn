<template>
  <div class="container">
    <div class="banner">
      <img :src="siteoption.banner" alt="">
    </div>
    <div class="about">
      <h2>关于我们</h2>
      <el-row>
        <template v-for="item in abouts">
          <el-col :key="item._id" :span="12" :xs="24">
            <el-row class="item">
              <el-col :span="8" :xs="24">
                <img class="icon-img" :src="item.img" alt="">
              </el-col>
              <el-col :span="16"  :xs="24">
                <h3 class="sub-title">{{item.title}}</h3>
                <p class="desc">{{item.subtext}}</p>
              </el-col>
            </el-row>
          </el-col>
        </template>
      </el-row>
    </div>
    <div class="join">
      <h2>使用微信扫一扫立刻成为代理商，开始赚钱</h2>
      <p class="desc">四川大凉山一品源已累计发货 <span class="hot"> {{sendsed}} </span> 余件</p>
      <p class="desc">合作代理商 <span class="hot">{{users}}</span> 余位,期待您的加入！</p>
      <img class="er" :src="siteoption.erweima" alt="">
    </div>
    <div class="news">
      <h2>最新动态</h2>
      <el-row class="items">
        <el-col class="item" :span="6" :xs="24">
          <img class="img" src="../common/img/1.jpg" alt="">
          <p class="date">2018-1-25</p>
          <p class="title">七牛云获工信部CDN牌照 融合CDN优势凸显 助力中国企业无缝出</p>
        </el-col>
        <el-col class="item" :span="6" :xs="24">
          <img class="img" src="../common/img/1.jpg" alt="">
          <p class="date">2018-1-25</p>
          <p class="title">七牛云获工信部CDN牌照 融合CDN优势凸显 助力中国企业无缝出</p>
        </el-col>
        <el-col class="item" :span="6" :xs="24">
          <img class="img" src="../common/img/1.jpg" alt="">
          <p class="date">2018-1-25</p>
          <p class="title">七牛云获工信部CDN牌照 融合CDN优势凸显 助力中国企业无缝出</p>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {GetAbout} from '../api/adminApi'
export default {
  // ..
  data () {
    return {
      abouts: [],
      news: []
    }
  },
  computed: {
    sendsed () {
      return this.$store.state.sendsed.length
    },
    users () {
      return this.$store.state.users.length
    },
    siteoption () {
      return this.$store.state.siteoption
    }
  },
  methods: {
    // 获取内容
    getabouts () {
      GetAbout().then(res => {
        console.log(res)
        this.abouts = res.data
      })
    }
  },
  mounted () {
    this.getabouts()
    this.$store.dispatch('sendsed')
    this.$store.dispatch('users')
  }
}
</script>
<style lang="less" scoped>
@import '../common/less/index.less';
.container {
  .banner {
    img {
      width: 100%;
    }
  }
  .about {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    .item {
      padding: 5px;
      margin: 10px;
      &:hover {
        box-shadow: 0 0 1px @color;
      }
      .icon-img {
        width: 100%;
        @media screen and (max-width: 768px) {
          width: 35%;
        }
      }
      .sub-title {
        text-align: left;
        @media screen and (max-width: 768px) {
          text-align: center;
        }
      }
      .desc {
        text-align: left;
        color: @p-color;
        line-height: 2.0;
        @media screen and (max-width: 768px) {
          padding: 0 10px;
        }
      }
    }
  }
  .join {
    width: 100%;
    background: rgba(19, 135, 230, .8);
    padding: 30px 0;
    margin: 20px 0;
    color: #eee;
    .desc {
      color: #171425;
      .hot {
        font-size: 28px;
        color: #eee;
      }
    }
    .er {
      width: 150px;
    }
  }
  .news {
    width: 100%;
    max-width: 1280px;
    margin: 30px auto;
    .item {
      margin: 0 30px;
      text-align: left;
      @media screen and (max-width: 768px) {
        margin: 0;
        padding: 10px;
      }
      .img {
        width: 100%;
      }
      .date {
        color: @p-color;
        font-size: .7em;
        padding: 0 10px;
      }
      .title {
        color: @color;
        padding: 0 10px;
      }
      &:hover {
        box-shadow: 0 1px 1px @color;
      }
    }
  }
}
</style>


