import axios from 'axios'

// dev
let base = '/learn'
// // build
// let base = ''
// 注册接口
export const ReginUser = params => {
  return axios.post(`${base}/regin`, params)
}
// 登录接口
export const LoginUser = params => {
  return axios.get(`${base}/login`, {params: params})
}
// 上传图片接口
export const UploadFile = params => {
  return axios({
    url: base + '/upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: params
  })
}
// 获取商品列表接口
export const GetProductList = params => {
  return axios.get(`${base}/productlist`, {params: params})
}

// 获取查询商品接口
export const SearchProductList = params => {
  return axios.get(`${base}/search`, {params: params})
}

// 商品详情接口
export const GetProduct = params => {
  return axios.get(`${base}/product`, {params: params})
}
// 个人待发货接口
export const GetPresend = params => {
  return axios.get(`${base}/presend`, {params: params})
}
// 个人已发货接口
export const GetSended = params => {
  return axios.get(`${base}/sended`, {params: params})
}
