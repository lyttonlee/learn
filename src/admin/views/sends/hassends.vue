<template>
  <div class="section">
    <div class="main">
      <h4>已发货订单</h4>
      <el-table
        :data="sendsed"
        style="width: 100%"
        show-overflow-tooltip>
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
              <el-form-item label="运单号">
                <span>{{ props.row.sendcode }}</span>
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
          label="运单号"
          min-width="13%"
          prop="sendcode">
        </el-table-column>
        <el-table-column
          label="发货用户"
          min-width="13%"
          prop="sender">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {Sendsed} from '../../../api/adminApi'
export default {
  // ..
  data () {
    return {
      sendsed: []
    }
  },
  methods: {
    allsendsed () {
      Sendsed().then(res => {
        this.sendsed = res.data.sendsed
      })
    }
  },
  mounted () {
    this.allsendsed()
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