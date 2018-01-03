import axios from 'axios'
let base = '/learn'
// 后台登录接口
export const AdminLogin = params => {
  return axios.get(`${base}/admin/login`, {params: params})
}
