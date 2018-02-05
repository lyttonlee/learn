import axios from 'axios'
import store from '../vuex/store'
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.adminer !== '') {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${store.state.adminer}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// dev
let base = '/learn'
// // build
// let base = ''
// 后台登录接口
export const AdminLogin = params => {
  return axios.get(`${base}/admin/login`, {params: params})
}
// 添加管理员接口
export const NewAdminer = params => {
  return axios.post(`${base}/admin/newadminer`, params)
}
// 获取管理员
export const GetAdminer = params => {
  return axios.get(`${base}/admin/getadminer`, {params: params})
}
// 修改管理员
export const EditAdminer = params => {
  return axios.post(`${base}/admin/editadminer`, params)
}
// 添加商品类
export const NewProducts = params => {
  return axios.post(`${base}/admin/newproducts`, params)
}
// 获取商品分类
export const GetProducts = params => {
  return axios.get(`${base}/admin/getproducts`, {params: params})
}
// 修改商品分类
export const EditProduct = params => {
  return axios.post(`${base}/admin/editproduct`, params)
}
// 添加一个商品
export const NewProd = params => {
  return axios.post(`${base}/admin/newprod`, params)
}

// 获取商品
export const GetProds = params => {
  return axios.get(`${base}/admin/getprods`, {params: params})
}

// 修改商品
export const EditProd = params => {
  return axios.post(`${base}/admin/editprod`, params)
}

// 获取用户
export const GetUsers = params => {
  return axios.get(`${base}/admin/getusers`, {params: params})
}

// 获取用户发货量
export const UserSendNum = params => {
  return axios.get(`${base}/admin/sendunm`, {params: params})
}

// 获取所有正在发货订单
export const Sendsing = params => {
  return axios.get(`${base}/admin/sendsing`, {params: params})
}

// 更新订单状态
export const UpdateSends = params => {
  return axios.post(`${base}/admin/updatesends`, params)
}

// 获取所有正在发货订单
export const Sendsed = params => {
  return axios.get(`${base}/admin/sendsed`, {params: params})
}
// 创建网站设置
export const NewOption = params => {
  return axios.post(`${base}/admin/siteoption`, params)
}
// 获取网站设置
export const GetOption = params => {
  return axios.get(`${base}/admin/siteoption`, {params: params})
}
// 更新网站基本设置
export const SiteOption = params => {
  return axios.put(`${base}/admin/siteoption`, params)
}
// 新增关于我们
export const NewAbout = params => {
  return axios.post(`${base}/admin/about`, params)
}
// 修改关于我们
export const EditAbout = params => {
  return axios.put(`${base}/admin/about`, params)
}
// 删除关于我们
export const DeleteAbout = params => {
  return axios.delete(`${base}/admin/about`, {params: params})
}
// 获取关于我们
export const GetAbout = params => {
  return axios.get(`${base}/admin/about`, {params: params})
}
// 新增新闻
export const NewNews = params => {
  return axios.post(`${base}/admin/news`, params)
}
// 修改新闻
export const EditNews = params => {
  return axios.put(`${base}/admin/news`, params)
}
// 获取新闻
export const GetNews = params => {
  return axios.get(`${base}/admin/news`, {params: params})
}
