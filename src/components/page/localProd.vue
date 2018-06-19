<template>
  <div class="container">
    <!-- head -->
    <div class="head">
      <el-row>
        <el-col class="left" :span="8" :xs="24">
          <img class="prodimg" :src="prod.image" alt="">
        </el-col>
        <el-col class="right" :span="16" :xs="24">
            <h3 v-text="prod.name"></h3>
            <p v-text="prod.desc"></p>
            <div class="info">
              <p class="price">价  格：<span :class="user ? 'nprice' : 'yprice'">￥{{prod.price}}</span></p>
              <p v-if="user">折扣价：<span class="yprice">￥{{prod.price * user.zhekou * 0.1}}</span></p>
              <p>历史销量：{{prod.sellnum}}</p>
              <div>
                <p v-if="prod.selling" class="hot">热销中</p>
                <p v-else class="nhot">暂停销售，销售时间{{prod.selltime}}</p>
              </div>
            </div>
            <div class="action">
              <el-button type="danger" @click="addToCart">添加到购物车</el-button>
              <el-button type="info" @click="back">返回浏览其它商品</el-button>
            </div>
          </el-col>
      </el-row>
    </div>
    <!-- body -->
    <div class="body">
      <h4 class="tit">产品详情</h4>
      <md-show :key="prod._id" :mdvalue="prod.info"></md-show>
    </div>
  </div>
</template>
<script>
import {getCulLocalprod} from '../../api/api'
import {
mapMutations,
mapGetters,
mapActions,
mapState} from 'vuex'
export default {
  data () {
    return {
      prod: {}
    }
  },
  methods: {
    ...mapActions(['asyncAdd']),
    ...mapMutations(['add']),
    getProd () {
      const par = {
        id: this.$route.params.id
      }
      getCulLocalprod(par).then(res => {
        this.prod = res.data
      })
    },
    addToCart () {
      const asyncParam = {num: 10, time: 1000}
      const addParam = 3
      this.asyncAdd(asyncParam)
      this.add(addParam)
    },
    back () {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState(['cart']),
    ...mapGetters({
      user: 'sender'
    })
  },
  mounted () {
    this.getProd()
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/index.less';
.container {
  width: 100%;
  margin: 65px auto;
  max-width: 1280px;
  .head {
    text-align: left;
    border-bottom: 1px solid rgba(92, 97, 92, .3);
    .left {
      padding: 10px 10px;
      border-right:  1px solid rgba(51, 112, 51, 0.2);
      .prodimg {
        width: 100%;
        border: 1px solid rgba(92, 97, 92, .3);
        border-radius: 15px;
      }
    }
    .right {
      padding: 5px 10px 10px 10px;
      .info {
        color: rgb(116, 114, 114);
        padding: 5px 10px;
        border: 1px solid rgba(196, 190, 190, .4);
        border-radius: 5px;
        // font-size: 14px;
        .yprice {
          color: red;
          font-size: 20px;
        }
        .nprice {
          text-decoration: line-through;
        }
        .hot {
          background: #bb4945;
          color: rgb(231, 228, 228);
          margin: 0;
          padding: 5px 12px;
          display: inline-block;
        }
        .nhot {
          background: #dad7d5;
          color: rgb(61, 57, 57);
          margin: 0;
          padding: 5px 12px;
          display: inline-block;
        }
      }
      .action {
        padding: 10px 5px;
      }
    }
  }
  .body {
    .tit {
      .leftborder;
      margin: 0;
    }
    
  }
}
</style>
