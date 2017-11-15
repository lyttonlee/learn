import axios from 'axios'
let base = ''
// 注册接口
export const ReginUser = params => {
  return axios.post(`${base}/regin`, params)
}
// 登录接口
export const LoginUser = params => {
  return axios.post(`${base}/login`, params)
}
