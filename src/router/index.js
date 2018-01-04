import Vue from 'vue'
import Router from 'vue-router'
// 引入前端组件
import Home from '@/components/home'
import ConHome from '@/components/con-home'
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
import AdminLogin from '@/admin/views/adminlogin'
import AdminHome from '@/admin/views/adminhome'
import MangerAdmin from '@/admin/views/mangeradmin'
import MangerProds from '@/admin/views/mangerprods'
import MangerSends from '@/admin/views/mangersends'
import MangerUser from '@/admin/views/mangeruser'
// 引入后端子组件
// 商品类组件
import AddType from '@/admin/views/prods/addtype'
import AddProd from '@/admin/views/prods/addprod'
import AllProds from '@/admin/views/prods/allprods'
import EditProd from '@/admin/views/prods/editprod'

Vue.use(Router)

export default new Router({
  // 配置路由
  routes: [
    // 前段页面路由
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
          redirect: '/product/all',
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
        }
      ]
    },
    // 后端页面路由
    {
      path: '/admin',
      component: Admin,
      type: 'admin',
      hidden: true,
      children: [
        {
          path: '/admin',
          component: AdminHome,
          name: '管理首页'
        },
        {
          path: '/admin/mangeprods',
          name: '商品管理',
          component: MangerProds,
          redirect: '/admin/mangeprods/allprods',
          children: [
            {
              path: '/admin/mangeprods/allprods',
              name: '全部商品',
              component: AllProds
            },
            {
              path: '/admin/mangeprods/addprodstype',
              name: '添加商品分类',
              component: AddType
            },
            {
              path: '/admin/mangeprods/addprod',
              name: '新增商品',
              component: AddProd
            },
            {
              path: '/admin/mangeprods/editprod',
              name: '修改商品',
              component: EditProd
            }
          ]
        },
        {
          path: '/admin/mangesends',
          name: '订单管理',
          component: MangerSends
        },
        {
          path: '/admin/mangeuser',
          name: '用户管理',
          component: MangerUser
        },
        {
          path: '/admin/mangeadmin',
          name: '管理员账户',
          component: MangerAdmin
        }
      ]
    },
    // 登录注册以及404页面路由
    {
      path: '/admin/login',
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
      path: '*',
      hidden: true,
      component: Page404
    }
  ]
})
