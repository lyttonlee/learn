<template>
  <div class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <div class="add">
      <h4 class="title">新增发货</h4>
      <div class="form">
        <el-form ref="sendprod" :rules="sendrules" :model="sendprod">
          <el-form-item label="发件人" prop="sendname">
            <el-input v-model="sendprod.sendname" placeholder="发件人姓名"></el-input>
          </el-form-item>
          <el-form-item label="发件地址" prop="sendaddr">
            <el-input v-model="sendprod.sendaddr" placeholder="发件地址(省市县街道门牌号)"></el-input>
          </el-form-item>
          <el-form-item label="发件人电话" prop="sendtel">
            <el-input v-model.number="sendprod.sendtel" placeholder="发件人电话"></el-input>
          </el-form-item>
          <el-form-item label="收件人" prop="recename">
            <el-input v-model="sendprod.recename" placeholder="收件人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收件地址" prop="receaddr">
            <el-input v-model="sendprod.receaddr" placeholder="收件地址(省市县街道门牌号)"></el-input>
          </el-form-item>
          <el-form-item label="收件人电话" prop="recetel">
            <el-input v-model.number="sendprod.recetel" placeholder="收件人电话"></el-input>
          </el-form-item>
          <el-form-item label="商品名" prop="sendprod">
            <el-select v-model="sendprod.sendprod" placeholder="请选择商品">
              <template v-for="item in prods">
                <el-option :label="item.name" :value="item.name" :key="item.type"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model.number="sendprod.sendprice " disabled placeholder="价格"></el-input>
          </el-form-item>
          <el-form-item label="商品类名">
            <el-input v-model="sendprod.sendtype " disabled placeholder="商品类名"></el-input>
          </el-form-item>
          <el-form-item label="发货留言">
            <el-input v-model="sendprod.sendmsg" placeholder="发货留言"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="addsendlist">添加到待发货清单</el-button>
            <el-button type="success" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 待发货清单 -->
    <div class="presend">
      <h4>待发货清单</h4>
      <el-table
        :data="presends"
        ref="presendsTab"
        style="width: 100%"
        @selection-change="SelectionChange"
        show-summary
        show-overflow-tooltip>
        <el-table-column
          type="selection"
          min-width="5%">
        </el-table-column>
        <el-table-column type="expand" min-width="5%">
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
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          class="tab-date"
          label="日期"
          min-width="20%"
          prop="senddate">
        </el-table-column>
        <el-table-column
          label="收件人"
          min-width="25%"
          prop="recename">
        </el-table-column>
        <el-table-column
          label="金额"
          min-width="20%"
          prop="sendprice">
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="25%">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                type="primary"
                size="mini"
                round
                @click="EditSend(scope.$index, scope.row)">修改</el-button>
              <el-button
                type="danger"
                size="mini"
                round
                @click="DelSend(scope.$index, scope.row)">删除</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-button-group v-if="haspresends">
        <el-button type="primary" round @click="toggleSelection(presends)" >全选 / 取消选择</el-button>
        <el-button v-if="hasselected" type="danger" round @click="submitSend()">提交发货</el-button>
      </el-button-group>
    </div>
     <!-- 编辑发货 -->
    <el-dialog title="编辑发货" :visible.sync="dialogFormVisible">
      <el-form ref="editsend" :rules="sendrules" :model="editsend">
        <el-form-item label="发件人" prop="sendname">
          <el-input v-model="editsend.sendname" placeholder="发件人姓名"></el-input>
        </el-form-item>
        <el-form-item label="发件地址" prop="sendaddr">
          <el-input v-model="editsend.sendaddr" placeholder="发件地址(省市县街道门牌号)"></el-input>
        </el-form-item>
        <el-form-item label="发件人电话" prop="sendtel">
          <el-input v-model.number="editsend.sendtel" placeholder="发件人电话"></el-input>
        </el-form-item>
        <el-form-item label="收件人" prop="recename">
          <el-input v-model="editsend.recename" placeholder="收件人姓名"></el-input>
        </el-form-item>
        <el-form-item label="收件地址" prop="receaddr">
          <el-input v-model="editsend.receaddr" placeholder="收件地址(省市县街道门牌号)"></el-input>
        </el-form-item>
        <el-form-item label="收件人电话" prop="recetel">
          <el-input v-model.number="editsend.recetel" placeholder="收件人电话"></el-input>
        </el-form-item>
        <el-form-item label="商品名" prop="sendprod">
          <el-select v-model="editsend.sendprod" placeholder="请选择商品">
            <template v-for="item in prods">
              <el-option :label="item.name" :value="item.name" :key="item.type"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model.number="editsend.sendprice " disabled placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item label="商品类名">
            <el-input v-model="editsend.sendtype " disabled placeholder="商品类名"></el-input>
          </el-form-item>
        <el-form-item label="发货留言">
          <el-input v-model="editsend.sendmsg" placeholder="发货留言"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="exitEdit">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确认付款发货" :visible.sync="paydialog">
      <h4>发货总金额为{{totalprice}}元，请选择支付方式</h4>
      <p>使用微信扫一扫支付</p>
      <div>
        <img class="pay-image" src="../../../assets/er.png" alt="">
      </div>
      <!-- 这一句在使用中是用不上的，现在只是模拟完成了支付 -->
      <el-button type="success" @click="testpay">支付</el-button>
    </el-dialog>
  </div>
</template>
<script>
import {GetPresends, newPreSend, DeleteSend, EditSend, UpdateSends} from '../../../api/api'
export default {
  // ..
  data () {
    let telCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('电话号码是必须的'))
      } else if (!Number.isInteger(value)) {
        return callback(new Error('电话号码必须是数字'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('电话号码必须是11位数字'))
      } else {
        callback()
      }
    }
    return {
      sendprod: {
        sendname: '',
        sendaddr: '',
        sendtel: '',
        recename: '',
        receaddr: '',
        recetel: '',
        sendprod: '',
        sendprice: '',
        sendtype: '',
        sendmsg: ''
      },
      presends: [],
      dialogFormVisible: false,
      paydialog: false,
      editsend: {
        sendname: '',
        sendaddr: '',
        sendtel: '',
        recename: '',
        receaddr: '',
        recetel: '',
        sendprod: '',
        sendprice: '',
        sendtype: '',
        sendmsg: ''
      },
      multipleSelection: [],
      sendrules: {
        sendname: [
          {
            required: true,
            message: '发件人是必须的',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 7,
            message: '长度在 2 到 7 个字',
            trigger: 'blur'
          }
        ],
        sendaddr: [
          {
            required: true,
            message: '发件地址是必须的',
            trigger: 'blur'
          },
          {
            min: 12,
            max: 50,
            message: '长度至少 12 个汉子',
            trigger: 'blur'
          }
        ],
        sendtel: [
          {
            required: true,
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        recename: [
          {
            required: true,
            message: '收件人是必须的',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 7,
            message: '长度在 2 到 7 个字',
            trigger: 'blur'
          }
        ],
        receaddr: [
          {
            required: true,
            message: '收件地址是必须的',
            trigger: 'blur'
          },
          {
            min: 12,
            max: 50,
            message: '长度至少 12 个汉子',
            trigger: 'blur'
          }
        ],
        recetel: [
          {
            required: true,
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        sendprod: [
          {
            required: true,
            trigger: 'change',
            message: '必须选择一个商品'
          }
        ]
      }
    }
  },
  methods: {
    // 获取待发货清单
    getpresends () {
      let pars = {
        sender: this.user.name,
        sendstatus: '待发货'
      }
      GetPresends(pars).then(res => {
        this.presends = res.data.presends
      })
    },
    // 新增发货
    addsendlist () {
      this.$refs.sendprod.validate(valid => {
        if (valid) {
          let sendpar = {
            sendname: this.sendprod.sendname,
            sendaddr: this.sendprod.sendaddr,
            sendtel: this.sendprod.sendtel,
            recename: this.sendprod.recename,
            receaddr: this.sendprod.receaddr,
            recetel: this.sendprod.recetel,
            sendprod: this.sendprod.sendprod,
            sendprice: this.sendprod.sendprice,
            sendtype: this.sendprod.sendtype,
            sendmsg: this.sendprod.sendmsg,
            sender: this.user.name,
            sendstatus: '待发货'
          }
          newPreSend(sendpar).then(res => {
            // console.log(res)
            let newsend = res.data.newsend
            if (newsend) {
              this.$notify({
                title: '成功！',
                type: 'success',
                message: '新增发货成功！',
                offset: 200
              })
              this.presends.unshift(newsend)
              this.$refs.sendprod.resetFields()
              this.sendprod.sendprice = ''
              this.sendprod.sendmsg = ''
              this.sendprod.sendtype = ''
            }
          })
        } else {
          this.$notify({
            title: '警告',
            type: 'warning',
            message: '请先完成验证',
            offset: 200
          })
        }
      })
    },
    // 重置发货表单
    reset () {
      this.$refs.sendprod.resetFields()
    },
    // 修改发货内容
    EditSend (index, rowIndex) {
      // console.log('edit')
      // 打开修改界面
      this.dialogFormVisible = true
      // 赋值
      this.editsend = rowIndex
    },
    // 退出修改发货
    exitEdit () {
      this.dialogFormVisible = false
      this.$notify({
        title: '警告',
        type: 'warning',
        message: '已退出修改',
        offset: 200
      })
    },
    // 确定修改发货并提交
    submitEdit () {
      // ..
      let editpar = {
        _id: this.editsend._id,
        sendname: this.editsend.sendname,
        sendaddr: this.editsend.sendaddr,
        sendtel: this.editsend.sendtel,
        recename: this.editsend.recename,
        receaddr: this.editsend.receaddr,
        recetel: this.editsend.recetel,
        sendprod: this.editsend.sendprod,
        sendprice: this.editsend.sendprice,
        sendmsg: this.editsend.sendmsg,
        sendtype: this.editsend.sendtype,
        sender: this.user.name,
        sendstatus: '待发货'
      }
      EditSend(editpar).then(res => {
        console.log(res)
        this.$notify({
          title: '成功',
          type: 'success',
          message: res.data.msg,
          offset: 200
        })
        this.dialogFormVisible = false
      })
    },
    // 删除该条发货
    DelSend (index, rowIndex) {
      // console.log('index', index)
      // console.log('rowIndex', rowIndex)
      this.$confirm('此操作将会删除该条发货信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let deletePar = {
          _id: rowIndex._id
        }
        DeleteSend(deletePar).then(res => {
          // console.log(res)
          this.$notify({
            title: '成功',
            type: 'warning',
            message: '删除成功',
            offset: 200
          })
          this.getpresends()
        })
      }).catch(() => {
        this.$notify({
          title: '提醒',
          type: 'info',
          message: '已取消删除发货信息',
          offset: 200
        })
      })
    },
    // 全选或取消全选
    toggleSelection (rows) {
      // console.log(rows)
      rows.forEach(row => {
        this.$refs.presendsTab.toggleRowSelection(row)
      })
    },
    // 选择的待发货条目
    SelectionChange (val) {
      this.multipleSelection = val
      console.log('选择的是', this.multipleSelection)
    },
    // 确定发货
    submitSend () {
      console.log('弹出支付界面!')
      console.log(this.totalprice)
      this.paydialog = true
    },
    // 模拟完成支付后的提交
    testpay () {
      let ids = []
      for (let i = 0; i < this.multipleSelection.length; i++) {
        let id = this.multipleSelection[i]._id
        ids.push(id)
      }
      console.log(ids)
      UpdateSends(ids).then(res => {
        console.log(res)
        this.paydialog = false
        this.multipleSelection = []
        // 更新待发货数据
        this.getpresends()
        // 更新已发货数据
        this.$store.dispatch('sended')
      })
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    prods () {
      return this.$store.state.prods
    },
    sender () {
      return this.$store.getters.sender
    },
    haspresends () {
      if (this.presends.length !== 0) {
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
    },
    totalprice () {
      let sums = 0
      for (let i = 0; i < this.multipleSelection.length; i++) {
        sums = sums + this.multipleSelection[i].sendprice
      }
      return sums
    }
  },
  watch: {
    'sendprod.sendprod': function (val) {
      if (this.sendprod.sendprod !== '') {
        const CurProd = this.prods.filter(p => {
          return p.name === val
        })
        if (CurProd) {
          this.sendprod.sendprice = CurProd[0].price * this.sender.zhekou * 0.1
          this.sendprod.sendtype = CurProd[0].typename
        }
      } else {
        console.log('没有选择商品')
      }
    },
    'editsend.sendprod': function (val) {
      if (this.editsend.sendprod !== '') {
        const CurProd = this.prods.filter(p => {
          return p.name === val
        })
        if (CurProd) {
          this.editsend.sendprice = CurProd[0].price * this.sender.zhekou * 0.1
          this.editsend.sendtype = CurProd[0].typename
        }
      } else {
        console.log('没有选择商品')
      }
    },
    deep: true
  },
  mounted () {
    this.getpresends()
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
@import '../../../common/css/init.css';
.box {
  .head {
    .leftborder
  }
  .add {
    // box-shadow: 0 1px 4px @color;
    // margin: 20px 15px;
    // border-radius: 10px;
    // padding-bottom: 10px;
    .learncontent;
    .form {
      margin: 0 5px 5px 5px;
      .el-form {
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .presend {
    .learncontent;
    .el-table {
      .tab-date {
        @media screen and (max-width: 768px) {
          display: none;
        }
      }
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
  .el-select {
    width: 100%;
  }
  .pay-image {
    width: 120px;
    height: 120px;
  }
}
</style>

