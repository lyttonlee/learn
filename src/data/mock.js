import axios from 'axios'
import Adapter from 'axios-mock-adapter'
import {users, products} from './data'
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
        setTimeout(() => {
          if (hasUser) {
            resolve([200, { code: 200, msg: '登录成功', user }])
            // 如果没有这个人
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }])
          }
        }, 1500)
      })
    })

    // 模拟注册接口
    mock.onPost('/regin').reply(config => {
      // console.log(config)
      // console.log(config.data)
      let {username, password, tel, email, name} = JSON.parse(config.data)
      let adduser = {
        username: username,
        password: password,
        email: email,
        name: name,
        tel: tel,
        avatar: avatarDefault,
        time: new Date()
      }
      users.push(adduser)
      adduser.password = ''
      return new Promise((resolve, reject) => {
        resolve([200, {adduser}])
      })
    })
    // 模拟获取商品列表
    mock.onGet('/productlist').reply(config => {
      let productclass = config.params
      // console.log(productclass)
      let productlist = products.filter(p => {
        if (productclass === '') {
          return true
        } else if (p.productclass === productclass) {
          return true
        } else {
          return false
        }
      })
      // console.log(productlist)
      return new Promise((resolve, reject) => {
        resolve([200, {
          productlist
        }])
      })
    })
    // 模拟查询列表
    mock.onGet('/search').reply(config => {
      let searchname = config.params
      // console.log(searchname)
      let searchRes = []
      products.forEach(p => {
        if (p.productname.indexOf(searchname) !== -1) {
          searchRes.push(p)
        }
      })
      // console.log(searchRes)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (searchRes.length > 0) {
            resolve([200, {
              code: 200,
              searchRes
            }])
          } else {
            resolve([200, {
              code: 500,
              msg: '很抱歉没有查询到结果，请确定商品名'
            }])
          }
        }, 500)
      })
    })
    // 商品详情
    mock.onGet('/product').reply(config => {
      let {productclass, productname} = config.params
      let curproduct = {}
      products.forEach(p => {
        if (p.productclass === productclass && p.productname === productname) {
          curproduct = p
        }
      })
      return new Promise((resolve, reject) => {
        resolve([200, {curproduct}])
      })
    })
  }
}
