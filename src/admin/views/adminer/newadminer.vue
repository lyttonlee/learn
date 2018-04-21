<template>
  <div class="addadminer">
    <h4>新增管理员</h4>
    <el-form ref="addadminer" :rules="addadminerRules" :model="addadminer">
      <el-form-item prop="name">
        <el-input v-model="addadminer.name" placeholder="管理员姓名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="addadminer.password" placeholder="管理员密码"></el-input>
      </el-form-item>
      <el-form-item prop="confirmpassword">
        <el-input type="password" v-model="addadminer.confirmpassword" placeholder="确认管理员密码"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-select v-model="addadminer.role" placeholder="请设置管理员角色">
          <el-option label="超级管理员" value="超级管理员"></el-option>
          <el-option label="管理员" value="管理员"></el-option>
          <el-option label="发货员" value="发货员"></el-option>
          <el-option label="商品管理员" value="商品管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" round @click="newadminer">确认提交</el-button>
        <el-button type="primary" round @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {NewAdminer} from '../../../api/adminApi'
export default {
  // ..
  data () {
    let confirmpasswordCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码是必须的'))
      } else if (value !== this.addadminer.password) {
        return callback(new Error('两次输入的密码不一致'))
      } else {
        return callback()
      }
    }
    let hasSameAdminerName = (rule, value, callback) => {
      let base = 'learn'
      let hasReginedPar = {
        name: value
      }
      this.$axios.get(`${base}/admin/hasregined`, {params: hasReginedPar}).then(res => {
        console.log(res)
        let {hasRegined, msg} = res.data
        if (hasRegined) {
          return callback(new Error(msg))
        } else {
          return callback()
        }
      })
    }
    return {
      addadminer: {
        name: '',
        password: '',
        confirmpassword: '',
        role: ''
      },
      addadminerRules: {
        name: [
          {
            required: true,
            message: '管理员姓名是必须的',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 7,
            message: '长度在 2 到 7 个字',
            trigger: 'blur'
          },
          {
            validator: hasSameAdminerName,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码是必须的！',
            trigger: 'blur'
          }
        ],
        confirmpassword: [
          {
            required: true,
            validator: confirmpasswordCheck,
            trigger: 'blur'
          }
        ],
        role: [
          {
            required: true,
            message: '管理员角色是必须选择的',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    newadminer () {
      this.$refs.addadminer.validate(valid => {
        if (valid) {
          // console.log('完成添加的操作')
          let params = {
            name: this.addadminer.name,
            password: this.addadminer.password,
            role: this.addadminer.role
          }
          NewAdminer(params).then(res => {
            console.log(res)
            let {code, msg, name} = res.data
            if (code === 200) {
              this.$refs.addadminer.resetFields()
              this.$notify({
                title: msg,
                message: '管理员' + name,
                type: 'success',
                offset: 100
              })
              this.$router.push('/admin')
            }
          })
        } else {
          console.log('submit err')
          this.$message({
            type: 'danger',
            message: '请先完成验证'
          })
        }
      })
    },
    reset () {
      this.$refs.addadminer.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../common/less/index.less';
.addadminer {
  .learncontent;
  .el-button {
    width: 45%;
  }
  .el-select {
    width: 100%;
  }
}

</style>
