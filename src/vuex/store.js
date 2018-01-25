import Vue from 'vue'
import Vuex from 'vuex'
// import
import {GetSended} from '../api/api'
import {GetProds, GetProducts, GetUsers, Sendsed, Sendsing} from '../api/adminApi'
import {dateArray} from '../common/js/common'

Vue.use(Vuex)
// 创建基本状态
const state = {
  user: JSON.parse(sessionStorage.getItem('user')) || '', // 登录用户
  sended: [], // 个人已发货订单
  adminer: JSON.parse(sessionStorage.getItem('adminer')) || '', // 登录的管理员
  products: [], // 所有商品分类
  prods: [], // 所有商品
  sendsed: [], // 所有已发货订单
  users: [], // 所有注册用户
  sendsing: [], // 所有待打印订单
  sendspay: [] // 所有待用户付款订单
}
// 创建改变状态的方法
const mutations = {
  // 用户登录
  LOGIN (state) {
    state.user = JSON.parse(sessionStorage.getItem('user'))
  },
  // 用户登出
  LOGOUT (state) {
    state.user = ''
  },
  // 个人已发货
  SENDED (state) {
    if (state.user !== '') {
      let pars = {
        sender: state.user.name,
        sendstatus: '待发货'
      }
      GetSended(pars).then(res => {
        // console.log(res)
        state.sended = res.data.sended
      })
    }
  },
  // 管理员登录
  ADMINLOGIN (state) {
    state.adminer = JSON.parse(sessionStorage.getItem('adminer'))
  },
  // 管理员退出
  ADMINLOGOUT (state) {
    state.adminer = ''
  },
  // 商品分类
  PRODUCTS (state) {
    GetProducts({type: 'all'}).then(res => {
      state.products = res.data.products
    })
  },
  // 商品
  PRODS (state) {
    GetProds({type: 'all'}).then(res => {
      state.prods = res.data.prods
    })
  },
  // 获取所有正在发货订单
  SENDSED (state) {
    // 获取所有正在发货订单
    Sendsed().then(res => {
      state.sendsed = res.data.sendsed
    })
  },
  // 获取所有用户
  ALLUSERS (state) {
    GetUsers({type: 'all'}).then(res => {
      // console.log(res)
      state.users = res.data.users
    })
  },
  // 所有待用户付款订单
  SENDSPAY (state) {
    Sendsing({sendstatus: '待发货'}).then(res => {
      state.sendspay = res.data.sendsing
    })
  },
  // 所有待打印订单
  SENDSING (state) {
    Sendsing({sendstatus: '正在发货'}).then(res => {
      state.sendsing = res.data.sendsing
    })
  }
}
// getters
const getters = {
  // 最近7天发货统计
  sevensend: state => {
    let sendnum = []
    for (let i = 0; i < dateArray.length; i++) {
      let nums = state.sendsed.filter(num => {
        return num.senddate === dateArray[i]
      })
      sendnum.push(nums.length)
    }
    return sendnum
  },
  // 最近7天新增用户统计
  sevenuser: state => {
    let sendnum = []
    for (let i = 0; i < dateArray.length; i++) {
      let nums = state.users.filter(num => {
        return num.date === dateArray[i]
      })
      sendnum.push(nums.length)
    }
    return sendnum
  },
  // 用户最近7天发货数量
  sendedlast: state => {
    let sendnum = []
    for (let i = 0; i < dateArray.length; i++) {
      let nums = state.sended.filter(num => {
        return num.senddate === dateArray[i]
      })
      sendnum.push(nums.length)
    }
    return sendnum
  },
  // 用户代理等级折扣信息
  sender: state => {
    if (state.user !== '') {
      let sender = {
        total: state.sended.length,
        role: '',
        zhekou: '',
        num: '',
        next: ''
      }
      if (state.sended.length < 10) {
        sender.role = '初出茅庐'
        sender.zhekou = '10'
        sender.next = '渐入佳境'
        sender.num = 10 - state.sended.length
      } else if (state.sended.length < 100 && state.sended.length >= 10) {
        sender.role = '渐入佳境'
        sender.zhekou = '9.5'
        sender.next = '炉火纯青'
        sender.num = 100 - state.sended.length
      } else if (state.sended.length < 1000 && state.sended.length >= 100) {
        sender.role = '炉火纯青'
        sender.zhekou = '9'
        sender.next = '登峰造极'
        sender.num = 1000 - state.sended.length
      } else {
        sender.role = '登峰造极'
        sender.zhekou = '8.5'
        sender.next = '已经是最高等级'
        sender.num = 10000 - state.sended.length
      }
      return sender
    } else {
      return ''
    }
  },
  // 商品分类名
  sendedallleg: state => {
    let legend = []
    for (let i = 0; i < state.products.length; i++) {
      legend.push(state.products[i].name)
    }
    // console.log(legend)
    return legend
  },
  // 用户发货分类统计
  sendedall: state => {
    let sendedall = []
    for (let i = 0; i < state.products.length; i++) {
      let nums = state.sended.filter(num => {
        return num.sendtype === state.products[i].name
      })
      sendedall.push({
        value: nums.length,
        name: state.products[i].name
      })
    }
    // console.log(sendedall)
    return sendedall
  },
  // 总发货分类统计
  sortsend: state => {
    let sendedall = []
    for (let i = 0; i < state.products.length; i++) {
      let nums = state.sendsed.filter(num => {
        return num.sendtype === state.products[i].name
      })
      sendedall.push({
        value: nums.length,
        name: state.products[i].name
      })
    }
    // console.log(sendedall)
    return sendedall
  },
  // 管理首页基础信息
  admininit: state => {
    // 方法
    let sellingnum = state.prods.filter(num => {
      return num.selling === true
    })
    let sendyes = state.sendsed.filter(yes => {
      return yes.senddate === dateArray[6]
    })
    let useryes = state.users.filter(yes => {
      return yes.date === dateArray[6]
    })
    let init = {
      sendedtotal: state.sendsed.length,
      sendedyes: sendyes.length,
      prepay: state.sendspay.length,
      preprint: state.sendsing.length,
      userstotal: state.users.length,
      usersyes: useryes.length,
      prodstotal: state.prods.length,
      prodsselling: sellingnum.length
    }
    return init
  }
}
// 创建驱动actions可以使得mutations得以启动
const actions = {
  // 用户登录
  // 这里先来一个驱动LOGIN的东西就叫login吧
  login ({commit}) {
    commit('LOGIN')
  },
  // 用户登出
  logout ({commit}) {
    commit('LOGOUT')
  },
  // 用户发货统计
  sended ({commit}) {
    commit('SENDED')
  },
  // 管理员登录
  adminlogin ({commit}) {
    commit('ADMINLOGIN')
  },
  // 管理员登录
  adminlogout ({commit}) {
    commit('ADMINLOGOUT')
  },
  // 商品分类
  products ({commit}) {
    commit('PRODUCTS')
  },
  // 商品
  prods ({commit}) {
    commit('PRODS')
  },
  // 所有非待发货订单
  sendsed ({commit}) {
    commit('SENDSED')
  },
  // 所有用户
  users ({commit}) {
    commit('ALLUSERS')
  },
  // 所有待发货订单
  sendsing ({commit}) {
    commit('SENDSING')
  },
  // 所有待用户付款订单
  sendspay ({commit}) {
    commit('SENDSPAY')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
