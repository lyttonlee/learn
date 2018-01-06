import axios from 'axios'
// dev
let base = '/learn'
// // build
// let base = ''
// 后台登录接口
export const AdminLogin = params => {
  return axios.get(`${base}/admin/login`, {params: params})
}
