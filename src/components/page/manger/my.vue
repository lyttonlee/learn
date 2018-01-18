<template>
  <div>
    <el-row class="box">
      <div class="head">
        <h3>{{this.$route.name}}</h3>
      </div>
      <el-col class="last" :span="24" :xs="24">
        <div id="lastchart" :style="{width: '100%', height: '400px'}">

        </div>
      </el-col>
      <el-col class="all" :span="24" :xs="24">
        <div id="allchart" :style="{width: '100%', height: '400px'}">

        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {dateArray} from '../../../common/js/common'
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
    return {
      // .
      // username: ''
      // sendnum: [],
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    charts () {
      let lastchar = echarts.init(document.getElementById('lastchart'))
      let allchar = echarts.init(document.getElementById('allchart'))
      lastchar.setOption({
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
          data: this.$store.getters.sendedlast
        }]
      })
      allchar.setOption({
        title: {
          text: '综合统计',
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
            data: this.$store.getters.sendedall
          }
        ]
      })
      setTimeout(() => {
        window.onresize = function () {
          lastchar.resize()
          allchar.resize()
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
@import '../../../common/less/index.less';
.box {
  .head {
    .leftborder
  }
  .last {
    margin: 20px 0;
    border-bottom: 1px solid @color;
  }
}
</style>

