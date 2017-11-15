import Vue from 'vue'
import Router from 'vue-router'
// 引入组件
import Home from '@/components/home'
import Login from '@/components/login'
import Regin from '@/components/regin'
import Page404 from '@/components/404'
import Products from '@/components/page/products'
import FAQ from '@/components/page/FAQ'
import Manger from '@/components/page/manger'
import My from '@/components/page/manger/my'
import Send from '@/components/page/manger/send'
import MyHistory from '@/components/page/manger/history'

Vue.use(Router)

export default new Router({
  // 配置路由
  routes: [
    {
      path: '/',
      name: '首页',
      hidden: true,
      component: Home
    },
    {
      path: '/products',
      name: '商品',
      class: 'el-icon-goods',
      component: Products
    },
    {
      path: '/FAQ',
      name: 'FAQ使用文档',
      component: FAQ
    },
    {
      path: '/manger',
      name: '我的工作台',
      redirect: '/manger/my',
      component: Manger,
      hasChild: true,
      children: [
        {path: '/manger/my', name: '我的信息', component: My},
        {path: '/manger/send', name: '发货管理', component: Send},
        {path: '/manger/history', name: '发货记录', component: MyHistory}
      ]
    },
    {
      path: '/login',
      name: '',
      hidden: true,
      component: Login
    },
    {
      path: '/regin',
      name: '',
      hidden: true,
      component: Regin
    },
    {
      path: '*',
      hidden: true,
      component: Page404
    }
  ]
})
