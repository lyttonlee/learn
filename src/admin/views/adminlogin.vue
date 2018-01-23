<template>
  <div class="container">
    <el-form 
      :model="LoginForm" 
      ref="LoginForm" 
      :rules="rule"
      label-width="0"
      class="login-form">
      <h3>管理员登录</h3>

      <el-form-item prop="username">
        <el-input 
          type="text" 
          v-model="LoginForm.username" 
          placeholder="姓名" >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="LoginForm.password" 
          placeholder="密码" >
        </el-input>
      </el-form-item>

      <el-form-item >
        <el-button 
          type="danger" 
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="logining">
          登录
        </el-button>
        <el-button 
          type="primary"
          class="resetBtn" 
          round
          @click.native.prevent="reset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {AdminLogin} from '../../api/adminApi'
export default {
  // ....
  data () {
    return {
      LoginForm: {
        username: '',
        password: ''
      },
      logining: false,
      rule: {
        username: [
          {
            required: true,
            max: 4,
            min: 2,
            message: '用户名是必须的，长度为2-4位的汉字',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码是必须的！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // ...
    submit () {
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          this.logining = true
          // 登录作为参数的用户信息
          let LoginParams = {
            name: this.LoginForm.username,
            password: this.LoginForm.password
          }
          // 调用axios登录接口
          AdminLogin(LoginParams).then(res => {
            // console.log(res)
            this.logining = false
            // 根据返回的code判断是否成功
            let {code, msg, adminer} = res.data
            if (code !== 200) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.$message({
                type: 'success',
                message: msg
              })
              // 将返回的管理员注入sessionStorage
              sessionStorage.setItem('adminer', JSON.stringify(adminer))
              // 在这里挂上，官方说的分发，管理员登录的action
              this.$store.dispatch('adminlogin')
              // 跳转到后端首页
              this.$router.push('/admin/mangesends/submitsends')
            }
            this.LoginForm.username = ''
            this.LoginForm.password = ''
          })
          .catch(err => {
            console.log(err)
          })
        } else {
          console.log('submit err')
        }
      })
    },
    reset () {
      this.$refs.LoginForm.resetFields()
    }
  }
}
</script>

<style scoped>
.login-form {
  margin: 120px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 30px 30px 30px 30px;
  border-radius: 25px; 
}
.submitBtn {
  width: 65%;
}
</style>
