// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui组件和css
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex
import Vuex from 'vuex'
import store from './vuex/store'
// 引入mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 引入fastclick
// import FastClick from 'fastclick'
// 引入echarts,最好是按需引入
// import ECharts from 'echarts'
// 引入mock并初始化
// import Mock from './data/mock'
// Mock.init()

Vue.use(ElementUi)
Vue.use(Vuex)
Vue.use(mavonEditor)
// Vue.prototype.$echarts = ECharts
// FastClick.attach(document.body)

Vue.config.productionTip = false
// 这个官方名字叫导航守卫，挺形象的
router.beforeEach((to, from, next) => {
  // 如果是去登录或注册，那就先把user移除
  if (to.path === '/login' || to.path === '/regin') {
    sessionStorage.removeItem('user')
    // 在这里挂上，官方说的分发，登出的action
    // 应该这样就行了把,不过在main.js里面貌似不一定管用啊,这个可是js啊，不是vue?????
    // this.$store.dispatch('logout')
    store.dispatch('logout')
  }
  if (to.path === '/adminer/login') {
    sessionStorage.removeItem('adminer')
    store.dispatch('logout')
  }
  let user = store.state.user
  let adminer = store.state.adminer
  if (!user && (to.path === '/manger/my' || to.path === '/manger/send' || to.path === '/manger/history')) {
    next({ path: '/login' })
  } else {
    next()
  }
  if (!adminer && to.path === '/admin/^') {
    next({ path: '/adminer/login' })
  } else {
    next()
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
