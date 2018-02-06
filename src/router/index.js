import Vue from 'vue'
import Router from 'vue-router'
// 引入公共组件
import Login from '@/components/login'
import Regin from '@/components/regin'
import AdminLogin from '@/admin/views/adminlogin'
import Page404 from '@/components/404'
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
// 引入后端管理组件
import Admin from '@/admin/admin'
import AdminHome from '@/admin/views/adminhome'
import MangerAdmin from '@/admin/views/mangeradmin'
import MangerProds from '@/admin/views/mangerprods'
import MangerSends from '@/admin/views/mangersends'
import MangerUser from '@/admin/views/mangeruser'
import SiteOption from '@/admin/views/siteoption'
import MangeNews from '@/admin/views/mangernews'
import MangeFAQ from '@/admin/views/mangerFAQ'
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
// 新闻动态子组件
import AllNews from '@/admin/views/news/allnews'
import AddNews from '@/admin/views/news/addnews'
// 帮助文档子组件
import AddFAQ from '@/admin/views/FAQ/addFAQ'
import AllFAQ from '@/admin/views/FAQ/allFAQ'
// 网站设置类子组件
import SetOption from '@/admin/views/siteoption/setoption'
import SetAbout from '@/admin/views/siteoption/setabout'
import NewSetAbout from '@/admin/views/siteoption/newsetoption'
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
          path: '/news/:id',
          hidden: true,
          component: NewsContent
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
          hasChild: true,
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
          name: '管理人员',
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
        },
        // 新闻管理
        {
          path: '/admin/mangenews',
          name: '新闻管理',
          component: MangeNews,
          meta: {
            requireAdminer: true
          },
          redirect: '/admin/mangenews/allnews',
          children: [
            {
              path: '/admin/mangenews/allnews',
              name: '全部新闻',
              component: AllNews,
              meta: {
                requireAdminer: true
              }
            },
            {
              path: '/admin/mangenews/addnews',
              name: '添加新闻动态',
              component: AddNews,
              meta: {
                requireAdminer: true
              }
            }
          ]
        },
        // FAQ文档管理
        {
          path: '/admin/mangeFAQ',
          name: '文档管理',
          component: MangeFAQ,
          meta: {
            requireAdminer: true
          },
          redirect: '/admin/mangeFAQ/all',
          children: [
            {
              path: '/admin/mangeFAQ/all',
              name: '全部帮助文档',
              component: AllFAQ,
              meta: {
                requireAdminer: true
              }
            },
            {
              path: '/admin/mangeFAQ/new',
              name: '添加FAQ文档',
              component: AddFAQ,
              meta: {
                requireAdminer: true
              }
            }
          ]
        },
        // 网站管理
        {
          path: '/admin/siteoption',
          name: '网站设置',
          component: SiteOption,
          meta: {
            requireAdminer: true
          },
          redirect: '/admin/siteoption/setoption',
          children: [
            {
              path: '/admin/siteoption/setoption',
              name: '网站基本设置',
              component: SetOption,
              meta: {
                requireAdminer: true
              }
            },
            {
              path: '/admin/siteoption/setabout',
              name: '关于我们',
              component: SetAbout,
              meta: {
                requireAdminer: true
              }
            },
            {
              path: '/admin/siteoption/newsetabout',
              name: '添加新内容',
              component: NewSetAbout,
              meta: {
                requireAdminer: true
              }
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
