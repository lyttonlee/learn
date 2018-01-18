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
// 管理员类子组件
import AllAdminer from '@/admin/views/adminer/alladminer'
import NewAdminer from '@/admin/views/adminer/newadminer'
// 发货管理类子组件
import SubmitSends from '@/admin/views/sends/submitsends'
import HasSends from '@/admin/views/sends/hassends'
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
    // 后端主路由
    {
      path: '/admin',
      component: Admin,
      type: 'admin',
      hidden: true,
      meta: {
        requireAdminer: true
      },
      children: [
        // 后端首页
        {
          path: '/admin',
          meta: {
            requireAdminer: true
          },
          component: AdminHome,
          name: '管理首页'
        },
        // 商品管理
        {
          path: '/admin/mangeprods',
          name: '商品管理',
          meta: {
            requireAdminer: true
          },
          component: MangerProds,
          redirect: '/admin/mangeprods/allprods',
          children: [
            {
              path: '/admin/mangeprods/allprods',
              name: '全部商品',
              meta: {
                requireAdminer: true
              },
              component: AllProds
            },
            {
              path: '/admin/mangeprods/addprodstype',
              name: '添加商品分类',
              meta: {
                requireAdminer: true
              },
              component: AddType
            },
            {
              path: '/admin/mangeprods/addprod',
              name: '新增商品',
              meta: {
                requireAdminer: true
              },
              component: AddProd
            }
          ]
        },
        // 订单管理
        {
          path: '/admin/mangesends',
          name: '订单管理',
          meta: {
            requireAdminer: true
          },
          component: MangerSends,
          redirect: '/admin/mangesends/submitsends',
          children: [
            {
              path: '/admin/mangesends/submitsends',
              name: '打印发货运单',
              meta: {
                requireAdminer: true
              },
              component: SubmitSends
            },
            {
              path: '/admin/mangesends/hassends',
              name: '已发货订单',
              meta: {
                requireAdminer: true
              },
              component: HasSends
            }
          ]
        },
        // 用户管理
        {
          path: '/admin/mangeuser',
          name: '用户管理',
          meta: {
            requireAdminer: true
          },
          component: MangerUser
        },
        // 管理员账户管理
        {
          path: '/admin/mangeadmin',
          name: '管理员账户',
          meta: {
            requireAdminer: true
          },
          component: MangerAdmin,
          redirect: '/admin/mangeadmin/alladminers',
          children: [
            {
              path: '/admin/mangeadmin/alladminers',
              name: '管理员列表',
              meta: {
                requireAdminer: true
              },
              component: AllAdminer
            },
            {
              path: '/admin/mangeadmin/newadminer',
              name: '新增管理员',
              meta: {
                requireAdminer: true
              },
              component: NewAdminer
            }
          ]
        }
      ]
    },
    // 登录注册以及404页面路由
    {
      path: '/adminer/login',
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
