import Vue from 'vue'
import Vuex from 'vuex'
// import
import {GetSended} from '../api/api'
import {dateArray} from '../common/js/common'

Vue.use(Vuex)
// 创建基本状态
const state = {
  user: JSON.parse(sessionStorage.getItem('user')) || '',
  sended: [],
  adminer: JSON.parse(sessionStorage.getItem('adminer')) || ''
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
      bename: state.user.name,
      status: '待发货'
    }
    GetSended(pars).then(res => {
      state.sended = res.data.sended
    })
  },
  // 管理员登录
  ADMINLOGIN (state) {
    state.adminer = JSON.parse(sessionStorage.getItem('adminer'))
  }
}
// getters
const getters = {
  // 用户最近7天发货数量
  sendedlast: state => {
    let sendnum = []
    for (let i = 0; i < dateArray.length; i++) {
      let nums = state.sended.filter(num => {
        return num.date === dateArray[i]
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
