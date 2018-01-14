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
            <el-input v-model="sendprod.sendprice " disabled placeholder="价格"></el-input>
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
    <div class="presend">

    </div>
  </div>
</template>
<script>
import {GetPresend} from '../../../api/api'
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
        sendmsg: ''
      },
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
    addsendlist () {
      this.$refs.sendprod.validate(valid => {
        if (valid) {
          console.log('ke yi fahuo')
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
    reset () {
      this.$refs.sendprod.resetFields()
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
    }
  },
  watch: {
    'sendprod.sendprod': function (val) {
      const CurProd = this.prods.filter(p => {
        return p.name === val
      })
      if (CurProd) {
        this.sendprod.sendprice = CurProd[0].price * this.sender.zhekou * 0.1
      }
    },
    deep: true
  },
  mounted () {
    let presendparams = {
      bename: this.user.name,
      status: '待发货'
    }
    GetPresend(presendparams).then(res => {
      console.log(res)
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
  .add {
    box-shadow: 0 1px 4px @color;
    margin: 20px 15px;
    border-radius: 10px;
    padding-bottom: 10px;
    .title {
      text-align: left;
      border-bottom: 1px solid #999;
      padding: 10px 0 5px 20px;
      background: @color;
      color: #eee;
    }
    .form {
      margin: 0 5px 5px 5px;
      .el-form {
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>

