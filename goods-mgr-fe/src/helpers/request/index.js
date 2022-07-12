// 封装网络请求
import axios from 'axios'
// 设置默认请求头, 把token带过去  不限于这个文件, 全局配置, 发送请求都会把token带过去服务端
import { getToken } from '../../helpers/token'

// 设置默认域名 判断当前是本地环境还是生产环境
const domain = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'

// 拼接地址
const getURL = (path) =>{
  return `${domain}${path}`
}

export const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`
  }
}

export const post = (url, data = {}) => {
  return axios.post(getURL(url), data, {
    headers: getHeaders()
  })
}

export const del = (url) => {
  return axios.delete(getURL(url), {
    headers: getHeaders()
  })
}

export const get = (url, data = {}) => {
  return axios.get(getURL(url), {
    params: data,
    headers: getHeaders()
  })
}