<template>
  
    <el-form 
      :model="ReginForm"
      ref="ReginForm"
      :rules="rule"
      class="regform"
      label-width="0">

      <h3>用户注册</h3>

      <el-form-item prop="username">
        <el-input 
          type="text"
          v-model="ReginForm.username"
          placeholder="用户名">
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input 
          type="password"
          v-model="ReginForm.password"
          placeholder="密码">
        </el-input>
      </el-form-item>

      <el-form-item prop="confirmpassword">
        <el-input 
          type="password"
          v-model="ReginForm.confirmpassword"
          placeholder="确认密码">
        </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input 
          type="email"
          v-model="ReginForm.email"
          placeholder="电子邮件">
        </el-input>
      </el-form-item>

      <el-form-item prop="tel">
        <el-input 
          type="text"
          v-model.number="ReginForm.tel"
          placeholder="电话号码">
        </el-input>
      </el-form-item>

      <el-form-item prop="name">
        <el-input 
          type="text"
          v-model="ReginForm.name"
          placeholder="昵称">
        </el-input>
      </el-form-item>

      <el-form-item >
        <el-button 
          type="success" 
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="logining">
          注册
        </el-button>
        <el-button 
          type="primary"
          class="resetBtn" 
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p>已经有账号，马上去<span class="to" @click="tologin">登录</span></p>
      </el-form-item>

    </el-form>
  
</template>
<script>
// 引入api接口
import {ReginUser} from '../api/api'
export default {
  data () {
    let confirmpasswordCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码是必须的'))
      } else if (value !== this.ReginForm.password) {
        return callback(new Error('两次输入的密码不一致'))
      } else {
        return callback()
      }
    }
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
      ReginForm: {
        username: '',
        password: '',
        confirmpassword: '',
        tel: '',
        email: '',
        name: ''
      },
      logining: false,
      rule: {
        username: [
          {
            required: true,
            max: 14,
            min: 7,
            message: '用户名是必须的，长度为7-14位',
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
        tel: [
          {
            required: true,
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的电子邮件格式(xxx@xxx.com)',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            max: 12,
            min: 2,
            message: '昵称是必须的，最好是汉字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // ...
    submit () {
      this.$refs.ReginForm.validate(valid => {
        if (valid) {
          this.logining = true
          // console.log('开始写入后台数据！')
          // 这是要注册的数据
          let ReginParams = {
            username: this.ReginForm.username,
            password: this.ReginForm.password,
            tel: this.ReginForm.tel,
            email: this.ReginForm.email,
            name: this.ReginForm.name,
            date: new Date()
          }
          // 调用借口，执行axios请求获取返回的数据
          ReginUser(ReginParams).then(res => {
            console.log(res)
            // 让注册按钮不要在转了
            this.logining = false
            // 让页面给个提示
            this.$message({
              type: 'success',
              message: '注册成功'
            })
            let user = res.data.adduser
            // console.log(user)
            // 将返回的数据注入内存
            sessionStorage.setItem('user', JSON.stringify(user))
            // 在这里挂上，官方说的分发，登录的action
            // 应该这样就行了把
            this.$store.dispatch('login')
            // 跳转到我的信息的页面
            this.$router.push('/manger/my')
          })
        } else {
          console.log('submit err')
        }
      })
    },
    reset () {
      this.$refs.ReginForm.resetFields()
    },
    tologin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.regform {
  margin: 120px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 10px #B4BCCC;
  padding: 30px 30px 0 30px;
  border-radius: 25px; 
}
.submitBtn {
  width: 65%;
}
.to {
  color: #FA5555;
  cursor: pointer;
}
</style>
