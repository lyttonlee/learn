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
// 获取七牛云上传token
export const GetQiniuUpToken = params => {
  return axios.get(`${base}/gettoken`, {params: params})
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
// 添加待发货
export const newPreSend = params => {
  return axios.post(`${base}/newpresend`, params)
}
// 删除一条待发货记录
export const DeleteSend = params => {
  return axios.delete(`${base}/deletesend`, {params: params})
}
// 修改一条待发货记录
export const EditSend = params => {
  return axios.post(`${base}/editsend`, params)
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
export const GetPresends = params => {
  return axios.get(`${base}/presends`, {params: params})
}
// 个人已发货接口
export const GetSended = params => {
  return axios.get(`${base}/sended`, {params: params})
}
// 修改付款后发货单状态为正在发货
export const UpdateSends = params => {
  return axios.post(`${base}/updatesends`, params)
}
// 获取商品
export const GetProd = params => {
  return axios.get(`${base}/getprod`, {params: params})
}
