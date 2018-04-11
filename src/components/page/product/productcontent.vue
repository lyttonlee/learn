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
            <p class="price">价  格：<span :class="hasuser">￥{{prod.price}}</span></p>
            <p v-if="user">折扣价：<span class="yprice">￥{{prod.price * user.zhekou * 0.1}}</span></p>
            <p>历史销量：{{prod.sellnum}}</p>
            <div>
              <p v-if="prod.selling" class="hot">热销中</p>
              <p v-else class="nhot">暂停销售，销售时间{{prod.selltime}}</p>
            </div>
          </div>
          <div class="action">
            <el-button type="danger" @click="tosend" :disabled="disabled">立刻去发货</el-button>
            <el-button type="info" @click="back">返回浏览其它商品</el-button>
          </div>
         </el-col>
     </el-row>
   </div>
   <!-- body -->
   <div class="body">
     <h4 class="tit">产品详情</h4>
     <mavon-editor
     class="md"
     :value="prop.value"
     :subfield = "prop.subfield"
     :default_open = "prop.default_open"
     :toolbarsFlag = "prop.toolbarsFlag"
     :editable="prop.editable"
     :scrollStyle="prop.scrollStyle"
     ></mavon-editor>
   </div>
 </div>
</template>
<script>
import {GetProd} from '../../../api/api'
export default {
  data () {
    return {
      prod: {}
    }
  },
  computed: {
    // ...
    prop () {
      let data = {
        subfield: false,
        default_open: 'preview',
        editable: false,
        value: this.prod.info,
        toolbarsFlag: false,
        scrollStyle: false
      }
      return data
    },
    user () {
      return this.$store.getters.sender
    },
    hasuser () {
      if (this.user) {
        return 'nprice'
      } else {
        return 'yprice'
      }
    },
    disabled () {
      if (this.prod.selling) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    CurProd () {
      let params = {
        name: this.$route.params.productname,
        type: this.$route.params.class
      }
      GetProd(params).then(res => {
        console.log(res)
        this.prod = res.data
      })
    },
    tosend () {
      this.$router.push('/manger/send')
    },
    back () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.CurProd()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
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
      margin: 20px 0;
    }
    .md {
      min-width: 100%;
      // height: 100%;
      display: inline;
      min-height: auto;
      z-index: 0;
      font-size: 1rem;
      @media screen and (max-width: 768px) {
        font-size: .7rem;
      }
    }
  }
}
</style>


