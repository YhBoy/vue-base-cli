
import axios from 'axios'
import { clearLoginInfo,closeLoading } from '@/utils'

const http = axios.create({
  timeout: 1000 * 60,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.baseURL= process.env.NODE_ENV === 'development' ? '/proxyApi' : '';
  config.headers['Authorization'] = localStorage.getItem('token')||''; // 请求头带上token
  // config.headers['Authorization'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbk5hbWUiOiIxODYyNTIxOTcwOSIsImV4cCI6MTYwMjE0MzMxOX0.SaDgJkT8R-MkurIQuXRCUiEO9uxrtTZETGe2_qiNE1Q';
  return config
}, error => {
  closeLoading();
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && (response.data.code === 401 || response.data.code === 302)) { // 4002,5002, token失效
    clearLoginInfo()
  }
  return response.data
}, error => {
  closeLoading();
  return Promise.reject(error)
})


export default http
