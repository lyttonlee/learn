<template>
  
    <el-form 
      :model="LoginForm" 
      ref="LoginForm" 
      :rules="rule"
      label-width="0"
      class="login-form">
      <h3>用户登录系统</h3>

      <el-form-item prop="username">
        <el-input 
          type="text" 
          v-model="LoginForm.username" 
          placeholder="username" >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="LoginForm.password" 
          placeholder="password" >
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
        <hr>
        <p>还没有账号，马上去<span class="to" @click="toregin">注册</span></p>
      </el-form-item>
    </el-form>
  
</template>

<script>
import {LoginUser} from '../api/api'
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
            max: 14,
            min: 3,
            message: '用户名是必须的，长度为3-14位',
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
          // console.log('开始请求后台数据，验证返回之类的操作！')
          // 登录作为参数的用户信息
          let LoginParams = {
            username: this.LoginForm.username,
            password: this.LoginForm.password
          }
          // 调用axios登录接口
          LoginUser(LoginParams).then(res => {
            this.logining = false
            // 根据返回的code判断是否成功
            let {code, msg, user} = res.data
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
              // 将返回的数据注入sessionStorage
              sessionStorage.setItem('user', JSON.stringify(user))
              // 在这里挂上，官方说的分发，登录的action
              // 应该这样就行了把
              this.$store.dispatch('login')
              // console.log(user)
              // 跳转到我的信息的页面
              this.$router.push('/manger/my')
            }
          })
        } else {
          console.log('submit err')
        }
      })
    },
    reset () {
      this.$refs.LoginForm.resetFields()
    },
    toregin () {
      this.$router.push('/regin')
    }
  }
}
</script>

<style scoped>
.login-form {
  margin: 120px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #B4BCCC;
  padding: 30px 30px 0 30px;
  border-radius: 25px; 
}
.submitBtn {
  width: 65%;
}
.to {
  color: #67C23A;
  cursor: pointer;
}
</style>

