<template>
  <div class="container">
    <h3 class="tit">帮助文档</h3>
    <el-collapse class="main" accordion>
      <el-collapse-item v-for="item in faq" :key="item._id">
        <template slot="title">
          <h3><i class="myicon iconfont icon-wendabangzhu"></i>{{item.que}}</h3>
        </template>
        <!-- <mavon-editor
          class="md"
          :value="item.ans"
          :subfield = "prop.subfield"
          :default_open = "prop.default_open"
          :toolbarsFlag = "prop.toolbarsFlag"
          :editable="prop.editable"
          :scrollStyle="prop.scrollStyle"
          ></mavon-editor> -->
        <md-show class="md" :key="item.que" :mdvalue="item.ans"></md-show>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import {GetFaq} from '../../api/adminApi'
export default {
  // ..
  data () {
    return {
      faq: []
    }
  },
  // computed: {
  //   prop () {
  //     let data = {
  //       subfield: false,
  //       default_open: 'preview',
  //       editable: false,
  //       // value: this.news.info,
  //       toolbarsFlag: false,
  //       scrollStyle: true
  //     }
  //     return data
  //   }
  // },
  methods: {
    allfaq () {
      GetFaq().then(res => {
        console.log(res)
        this.faq = res.data
      })
    }
  },
  mounted () {
    this.allfaq()
  }
}
</script>

<style lang="less" scoped>
@import '../../common/less/index.less';
.container {
  max-width: 1280px;
  text-align: left;
  .tit {
    .leftborder;
  }
  .main {
    .learncontent;
    .myicon {
      color: rgb(26, 83, 97);
      margin: 0 10px;
    }
    .md {
      min-height: 300px;
      // border: 1px dashed @color;
      margin: 10px 20px 0 20px;
      background: rgb(248, 248, 248);
      z-index: 1;
      font-size: 1rem;
      @media screen and (max-width: 768px) {
        font-size: .7rem;
      }
    }
  }
}
</style>
