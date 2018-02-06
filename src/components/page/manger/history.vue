<template>
  <div>
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <div class="data">
      <el-table
        :data="sended"
        style="width: 100%">
        <el-table-column type="expand" min-width="10%">
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
              <el-form-item label="发货留言">
                <span>{{ props.row.sendmsg }}</span>
              </el-form-item>
              <el-form-item label="物流单号">
                <span>{{ props.row.sendcode }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="日期"
          min-width="22%"
          prop="senddate">
        </el-table-column>
        <el-table-column
          label="收件人"
          min-width="22%"
          prop="recename">
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="22%"
          prop="sendstatus">
        </el-table-column>
        <el-table-column
          label="单号"
          min-width="22%"
          prop="sendcode">
        </el-table-column>
      </el-table>
    </div>
  </div>
  
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    sended () {
      return this.$store.state.sended
    },
    zhekou () {
      return this.$store.getters.sender.zhekou
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/less/index.less';
@import '../../../common/css/init.css';
.head {
  .leftborder
}
.data {
  .el-table {
    .table-expand {
      // font-size: 0;
      .el-form {
        font-size: 1rem;
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
