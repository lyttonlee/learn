import axios from 'axios'
import Adapter from 'axios-mock-adapter'
import {users} from './data'
import avatarDefault from '../assets/logo.png'
export default {
  init () {
    // 创建Adapter 实例
    const mock = new Adapter(axios)

    // 模拟登录接口
    mock.onPost('/login').reply(config => {
      // 解析axios传过来的数据
      let {username, password} = JSON.parse(config.data)
      return new Promise((resolve, reject) => {
        // 先创建一个用户为空对象
        let user = {}
        // 判断模拟的假数据中是否有和传过来的数据匹配的
        let hasUser = users.some(person => {
          // 如果存在这样的数据
          if (person.username === username && person.password === password) {
            user = JSON.parse(JSON.stringify(person))
            user.password = ''
            return true
          } else {
            // 如果没有这个person
            return false
          }
        })
        // 如果有这么一个人
        if (hasUser) {
          resolve([200, { code: 200, msg: '登录成功', user }])
          // 如果没有这个人
        } else {
          resolve([200, { code: 500, msg: '账号或密码错误' }])
        }
      })
    })

    // 模拟注册接口
    mock.onPost('/regin').reply(config => {
      let {username, password, email, tel, name} = config.params
      users.push({
        username: username,
        password: password,
        email: email,
        name: name,
        tel: tel,
        avatar: avatarDefault
      })
      return new Promise((resolve, reject) => {
        resolve(config.data)
      })
    })
  }
}
