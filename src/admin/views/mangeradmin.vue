<template>
  <section class="box">
    <div class="head">
      <h3>{{this.$route.name}}</h3>
    </div>
    <div class="addadminer">
      <h4>添加管理员</h4>
      <el-form ref="addadminer" :rules="addadminerRules" :model="addadminer">
        <el-form-item prop="name">
          <el-input v-model="addadminer.name" placeholder="管理员姓名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="addadminer.password" placeholder="管理员密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmpassword">
          <el-input type="password" v-model="addadminer.confirpassword" placeholder="确认管理员密码"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <el-select v-model="addadminer.role" placeholder="请设置管理员角色">
            <el-option label="超级管理员" value="super"></el-option>
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="发货员" value="sender"></el-option>
            <el-option label="商品管理员" value="proder"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" round @click="newadminer">确认提交</el-button>
          <el-button type="primary" round @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
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
            min: 3,
            max: 15,
            message: '长度在 2 到 5 个字',
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
          console.log('完成添加的操作')
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
@import '../../common/less/index.less';
.box {
  .head {
    .leftborder
  }
  .addadminer {
    .learncontent;
    .el-button {
      width: 45%;
    }
    .el-select {
      width: 100%;
    }
  }
}
</style>


