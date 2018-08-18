<template>
  <div class="container">
    <div class="banner">
      <img @click="toProduct" :src="siteoption.banner" alt="">
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
    <!-- <div class="join">
      <h2>使用微信扫一扫立刻成为代理商，开始赚钱</h2>
      <p class="desc">四川大凉山一品源已累计发货 <span class="hot"> {{sendsed}} </span> 余件</p>
      <p class="desc">合作代理商 <span class="hot">{{users}}</span> 余位,期待您的加入！</p>
      <img class="er" :src="siteoption.erweima" alt="">
    </div> -->
    <div class="news">
      <h2>最新动态</h2>
      <el-row class="items">
        <template v-for="item in news">
          <el-col class="item" :key="item._id" :span="8" :xs="24">
            <router-link :to="'/news/' + item._id" :key="item._id">
              <img class="img" :src="item.img" alt="">
            </router-link>
            <p class="date">{{item.date}}</p>
            <p class="title">{{item.title}}</p>
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>
<script>
import {GetAbout, GetNews} from '../api/adminApi'
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
    // 获取about
    getabouts () {
      GetAbout().then(res => {
        // console.log(res)
        this.abouts = res.data
      })
    },
    // 获取新闻
    getnews () {
      let par = {
        limit: 3
      }
      GetNews(par).then(res => {
        // console.log(res)
        this.news = res.data
      })
    },
    toProduct () {
      this.$router.push('/product/全部商品')
    }
  },
  mounted () {
    this.getabouts()
    this.getnews()
    this.$store.dispatch('sendsed')
    this.$store.dispatch('users')
  }
}
</script>
<style lang="less" scoped>
@import '../common/less/index.less';
.container {
  .banner {
    cursor: pointer;
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
      padding: 0 10px;
      text-align: left;
      @media screen and (max-width: 768px) {
        margin: 0;
        padding: 10px;
      }
      .img {
        width: 100%;
        cursor: pointer;
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
        border-top: 1px solid @color; 
      }
    }
  }
}
</style>


