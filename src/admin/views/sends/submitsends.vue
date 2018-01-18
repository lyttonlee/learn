<template>
  <div class="section">
    <div class="main">
      <h4>打印订单</h4>
      <el-table
        :data="sendsing"
        ref="sendsingTab"
        style="width: 100%"
        @selection-change="SelectionChange"
        show-summary
        show-overflow-tooltip>
        <el-table-column
          type="selection"
          min-width="13%">
        </el-table-column>
        <el-table-column type="expand" min-width="12%">
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="发件时间">
                <span>{{ props.row.senddate }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.sendprod }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.sendprice }}</span>
              </el-form-item>
              <el-form-item label="发件人姓名">
                <span>{{ props.row.sendname }}</span>
              </el-form-item>
              <el-form-item label="发件人地址">
                <span>{{ props.row.sendaddr }}</span>
              </el-form-item>
              <el-form-item label="发件人电话">
                <span>{{ props.row.sendtel }}</span>
              </el-form-item>
              <el-form-item label="收件人姓名">
                <span>{{ props.row.recename }}</span>
              </el-form-item>
              <el-form-item label="收件人地址">
                <span>{{ props.row.receaddr }}</span>
              </el-form-item>
              <el-form-item label="收件人电话">
                <span>{{ props.row.recetel }}</span>
              </el-form-item>
              <el-form-item label="发货用户">
                <span>{{ props.row.sender }}</span>
              </el-form-item>
              <el-form-item label="发货留言">
                <span>{{ props.row.sendmsg }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          class="tab-date"
          label="日期"
          min-width="13%"
          prop="senddate">
        </el-table-column>
        <el-table-column
          label="收件人"
          min-width="13%"
          prop="recename">
        </el-table-column>
        <el-table-column
          label="金额"
          min-width="13%"
          prop="sendprice">
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="13%"
          prop="sendstatus">
        </el-table-column>
        <el-table-column
          label="发货用户"
          min-width="13%"
          prop="sender">
        </el-table-column>
      </el-table>
      <el-button-group v-if="hassendsing">
        <el-button type="primary" round @click="toggleSelection(sendsing)" >全选 / 取消选择</el-button>
        <el-button v-if="hasselected" type="danger" round @click="submitSending()">确定打印</el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script>
import {Sendsing, UpdateSends} from '../../../api/adminApi'
export default {
  // ..
  data () {
    return {
      sendsing: [],
      multipleSelection: []
    }
  },
  methods: {
    // 获取所有正在发货订单
    getsendsing () {
      Sendsing().then(res => {
        this.sendsing = res.data.sendsing
      })
    },
    // 全选或取消全选
    toggleSelection (rows) {
      // console.log(rows)
      rows.forEach(row => {
        this.$refs.sendsingTab.toggleRowSelection(row)
      })
    },
    // 选择的正在发货条目
    SelectionChange (val) {
      this.multipleSelection = val
      console.log('选择的是', this.multipleSelection)
    },
    // 确认打印发货
    submitSending () {
      // 这一步是模拟
      this.$notify({
        title: '打印完成',
        type: 'success',
        message: '成功打印了' + this.multipleSelection.length + '张运单',
        offset: 200
      })
      // 这里才是开始
      let ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let id = this.multipleSelection[i]._id
        ids.push(id)
      }
      console.log(ids)
      let par = {
        ids: ids,
        sendstatus: '已发货',
        sendcode: 1009065186901
      }
      UpdateSends(par).then(res => {
        console.log(res)
        this.$notify({
          title: '提交成功',
          type: 'success',
          message: res.data.msg,
          offset: 200
        })
        this.multipleSelection = []
        // 更新待发货数据
        this.getsendsing()
      })
    }
  },
  computed: {
    hassendsing () {
      if (this.sendsing.length !== 0) {
        return true
      } else {
        return false
      }
    },
    hasselected () {
      if (this.multipleSelection.length !== 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.getsendsing()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.section {
  .main {
    .learncontent;
    .el-table {
      .table-expand {
        font-size: 0;
        .el-form-item {
          color: @color;
          width: 30%;
          @media screen and (max-width: 768px) {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>


