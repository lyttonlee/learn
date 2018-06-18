import Vue from 'vue'
import Router from 'vue-router'
// 引入公共组件
import Login from '@/components/login'
import Regin from '@/components/regin'
import AdminLogin from '@/admin/views/adminlogin'

// 引入前端组件
import Home from '@/components/home'
import ConHome from '@/components/con-home'
import Products from '@/components/page/products'
import FAQ from '@/components/page/FAQ'
import News from '@/components/page/news'
import Manger from '@/components/page/manger'
import NewsContent from '@/components/page/newscontent'
// 工作台子组件
import My from '@/components/page/manger/my'
import Send from '@/components/page/manger/send'
import MyHistory from '@/components/page/manger/history'
// 商品子组件
import ProductList from '@/components/page/product/productlist'
import ProductContent from '@/components/page/product/productcontent'
// 添加新管理员
import NewAdminer from '@/admin/views/adminer/newadminer'
// lazyLoad components
const lazyComp = name => () => import(`@/components/${name}`)
Vue.use(Router)
// 无需权限就可以访问的常时路由,其实就是前端路由
export const constantRoutes = [
  // 前端路由
  {
    path: '/',
    hidden: true,
    type: 'client',
    component: Home,
    children: [
      {
        path: '/',
        hidden: true,
        component: ConHome
      },
      {
        path: '/products',
        name: '商品',
        class: 'el-icon-goods',
        component: Products,
        redirect: '/product/全部商品',
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
        path: '/news/:id',
        hidden: true,
        component: NewsContent
      },
      {
        path: '/localproduct',
        name: '批发',
        component: lazyComp('page/localProduct')
      },
      {
        path: '/localproduct/:id',
        hidden: true,
        component: lazyComp('page/localProd')
      },
      {
        path: '/FAQ',
        name: '文档',
        component: FAQ
      },
      {
        path: '/news',
        name: '动态',
        component: News
      },
      {
        path: '/manger',
        name: '工作台',
        redirect: '/manger/my',
        meta: {
          requireUser: true
        },
        component: Manger,
        // hasChild: true,
        children: [
          {
            path: '/manger/my',
            meta: {
              requireUser: true
            },
            name: '我的信息',
            component: My
          },
          {
            path: '/manger/send',
            name: '发货管理',
            meta: {
              requireUser: true
            },
            component: Send
          },
          {
            path: '/manger/history',
            name: '发货记录',
            meta: {
              requireUser: true
            },
            component: MyHistory
          }
        ]
      }
    ]
  },
  // 登录注册路由
  {
    path: '/adminlogin',
    hidden: true,
    component: AdminLogin
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
    path: '/addadminer',
    name: '添加管理员',
    component: NewAdminer
  }
]

export default new Router({
  routes: constantRoutes,
  mode: 'history'
})
