<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <!-- 数据统计 -->
    <div class="section">
      <el-row>
        <el-col class="item" :span="6">
          <p>总发货量：<span class="big">{{init.sendedtotal}}</span></p>
          <p>昨日新增发货：<span class="big">{{init.sendedyes}}</span></p>
        </el-col>
        <el-col class="item" :span="6">
          <p>待用户付款订单：<span class="big">{{init.prepay}}</span></p>
          <p>待打印发货订单：<span class="big">{{init.preprint}}</span></p>
        </el-col>
        <el-col class="item" :span="6">
          <p>总注册用户：<span class="big">{{init.userstotal}}</span></p>
          <p>昨日新注册用户：<span class="big">{{init.usersyes}}</span></p>
        </el-col>
        <el-col class="item" :span="6">
          <p>总商品量：<span class="big">{{init.prodstotal}}</span></p>
          <p>上架商品：<span class="big">{{init.prodsselling}}</span></p>
        </el-col>
      </el-row>
    </div>
    <!-- 近七日发货 -->
    <div class="section">
      <div id="sendchart" :style="{width: '100%', height: '400px'}"></div>
    </div>
    <!-- 近七日新增管理员 -->
    <div class="section">
      <div id="userchart" :style="{width: '100%', height: '400px'}"></div>
    </div>
    <!-- 历史发货分类统计 -->
    <div class="section">
      <div id="sortchart" :style="{width: '100%', height: '400px'}"></div>
    </div>
  </section>
</template>
<script>
import {dateArray} from '../../common/js/common'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
// 引入提示框和title等组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
export default {
  data () {
    return {}
  },
  computed: {
    init () {
      return this.$store.getters.admininit
    }
  },
  methods: {
    charts () {
      let sendchar = echarts.init(document.getElementById('sendchart'))
      let userchar = echarts.init(document.getElementById('userchart'))
      let sortchar = echarts.init(document.getElementById('sortchart'))
      sendchar.setOption({
        title: {
          text: '最近7天发货统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: dateArray
        },
        yAxis: {},
        series: [{
          name: '发货',
          type: 'line',
          data: this.$store.getters.sevensend
        }]
      })
      userchar.setOption({
        title: {
          text: '最近7天新增用户',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          data: dateArray
        },
        yAxis: {},
        series: [{
          name: '新注册用户',
          type: 'line',
          data: this.$store.getters.sevenuser
        }]
      })
      sortchar.setOption({
        title: {
          text: '历史发货分类统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          x: 'center',
          y: '30',
          data: this.$store.getters.sendedallleg
        },
        series: [
          {
            name: '历史发货',
            type: 'pie',
            radius: ['0', '45%'],
            label: {
              normal: {
                formatter: '{b}\n{c}({d}%)'
              }
            },
            data: this.$store.getters.sortsend
          }
        ]
      })
      setTimeout(() => {
        window.onresize = function () {
          sendchar.resize()
          userchar.resize()
          sortchar.resize()
        }
      }, 200)
    }
  },
  mounted () {
    this.charts()
  }
}
</script>
<style lang="less" scoped>
@import '../../common/less/index.less';
.box {
  .head {
    .leftborder;
  }
  .section { 
    .learncontent;
    .item {
      border-right: 1px solid rgba(78, 64, 64, .3);
      .big {
        color: #e60d0d;
        font-size: 24px;
      }
    }
  }
}
</style>


