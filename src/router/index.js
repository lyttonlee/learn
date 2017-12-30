import Vue from 'vue'
import Router from 'vue-router'
// 引入前端组件
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
import ProductList from '@/components/page/product/productlist'
import ProductContent from '@/components/page/product/productcontent'
// 引入后端管理组件
import Admin from '@/admin/admin'

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
      component: Products,
      redirect: '/product/all',
      // 这里不要加haschild = true,不然这个路由会出错
      children: [
        {
          // 这里用的动态路由，需要一个冒号：
          path: '/product/:class',
          component: ProductList
        }
      ]
    },
    {
      path: '/product/:class/:productname',
      hidden: true,
      component: ProductContent
    },
    {
      path: '/FAQ',
      name: '文档',
      component: FAQ
    },
    {
      path: '/manger',
      name: '工作台',
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
      path: '/admin',
      name: '管理首页',
      component: Admin,
      type: 'admin',
      hidden: true,
      children: []
    },
    {
      path: '*',
      hidden: true,
      component: Page404
    }
  ]
})
