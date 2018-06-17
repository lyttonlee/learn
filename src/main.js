// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui组件和css
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex
// import Vuex from 'vuex'
import store from './vuex/store'
// 引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 引入axios
import axios from 'axios'
// 引入moment
import moment from 'moment'
// 引入七牛云上传组件
import qiniuUpload from './utils/uploadUi'
import mdUpload from './utils/mdupload'
import mdShow from './utils/mdshow'
import mangeMenu from './utils/mangemenu'
// 引入fastclick
// import FastClick from 'fastclick'
// 引入echarts,最好是按需引入
// import ECharts from 'echarts'
// 引入mock并初始化
// import Mock from './data/mock'
// Mock.init()
Vue.component('qiniu-upload', qiniuUpload)
Vue.component('md-upload', mdUpload)
Vue.component('md-show', mdShow)
Vue.component('mange-menu', mangeMenu)
Vue.use(ElementUi)
// Vue.use(Vuex)
Vue.use(mavonEditor)
Vue.prototype.$axios = axios
Vue.prototype.$moment = moment
// FastClick.attach(document.body)

Vue.config.productionTip = false
// 这个官方名字叫导航守卫，挺形象的
router.beforeEach((to, from, next) => {
  // 如果是去登录或注册，那就先把user移除
  if (to.path === '/login' || to.path === '/regin') {
    sessionStorage.removeItem('user')
    store.dispatch('logout')
  }
  // 如果去管理员登录，那就先移除管理员adminer
  if (to.path === '/adminlogin') {
    sessionStorage.removeItem('adminer')
    store.dispatch('logout')
  }
  let user = store.state.user
  let adminer = store.state.adminer
  // if (!user && (to.path === '/manger/my' || to.path === '/manger/send' || to.path === '/manger/history')) {
  //   next({ path: '/login' })
  // } else {
  //   next()
  // }
  // 如果用户没有登录且前往需要用户登录才能访问的页面，那就让他先登录
  if (!user && to.meta.requireUser) {
    next({ path: '/login' })
  } else {
    next()
  }
  if (to.path === '/admin' && !adminer) {
    next({
      path: '/adminlogin'
      // query: {redirect: to.fullPath}
    })
  }
  // 如果管理员已经登录
  if (adminer) {
    // 判断路由是否生成
    if (store.state.addRoutes.length === 0) {
      // 判断已登录的管理员权限
      const role = adminer.role
      console.log(role)
      // 根据权限生成可访问的路由
      store.dispatch('adminRoutes', {role}).then(() => {
        // console.log(store.state.addRoutes)
        router.addRoutes(store.state.addRoutes)
        next({...to, replace: true})
      })
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
