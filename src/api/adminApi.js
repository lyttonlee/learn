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
