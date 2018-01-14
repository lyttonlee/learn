import Vue from 'vue'
import Vuex from 'vuex'
// import
import {GetSended} from '../api/api'
import {GetProds, GetProducts} from '../api/adminApi'
import {dateArray} from '../common/js/common'

Vue.use(Vuex)
// 创建基本状态
const state = {
  user: JSON.parse(sessionStorage.getItem('user')) || '',
  sended: [],
  adminer: JSON.parse(sessionStorage.getItem('adminer')) || '',
  products: [],
  prods: []
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
    let pars = {
      sender: state.user.name,
      sendstatus: {'$ne': '待发货'}
    }
    GetSended(pars).then(res => {
      state.sended = res.data.sended
    })
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
  }
}
// getters
const getters = {
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
  },
  // 用户发货分类统计
  sendedall: state => {
    console.log(state.sended)
    let sendedall = []
    sendedall.push({
      name: state.sended.sendprodtype
    })
    return true
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
