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
// require('echarts/lib/component/markpoint')
// require('echarts/lib/component/markline')
require('echarts/lib/component/legend')
export default {
  data () {
    return {
      // .
      // username: ''
      // sendnum: [],
      lastoption: {
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
        yAxis: {

        },
        series: [{
          name: '发货',
          type: 'line',
          data: this.sendedlast
          // markPoint: {
          //   data: [
          //       {type: 'max', name: '最大值'},
          //       {type: 'min', name: '最小值'}
          //   ]
          // },
          // markLine: {
          //   data: [
          //       {type: 'average', name: '平均值'}
          //   ]
          // }
        }]
      },
      alloption: {
        title: {
          text: '历史发货分类信息',
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
          data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
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
            data: [
                {value: 335, name: '直达'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1048, name: '百度'},
                {value: 251, name: '谷歌'},
                {value: 147, name: '必应'},
                {value: 102, name: '其他'}
            ]
          }
        ]
      }
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    sendedlast () {
      return this.$store.getters.sendedlast
    },
    sendedall () {
      return this.$store.getters.sendedall
    }
  },
  methods: {
    charts () {
      let lastchar = echarts.init(document.getElementById('lastchart'))
      let allchar = echarts.init(document.getElementById('allchart'))
      lastchar.setOption(this.lastoption)
      allchar.setOption(this.alloption)
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
    let lastchar = echarts.init(document.getElementById('lastchart'))
    lastchar.setOption({
      series: [{
        data: this.sendedlast
      }]
    })
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

