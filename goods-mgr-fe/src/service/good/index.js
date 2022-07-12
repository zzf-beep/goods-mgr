import { del, post, get } from '@/helpers/request'

// 设置默认请求头, 把token带过去  不限于这个文件, 全局配置, 发送请求都会把token带过去服务端
// axios.defaults.headers['Authorization'] = `Bearer ${getToken()}`

// 添加商品请求
export const add = (form) => {
  return post(
    '/good/add',
    form,
  )
}

// 列表请求
export const list = (data) => {
  return get('/good/list', data)
}
// 删除请求
export const remove = (id) => {
  return del(
    // '/good/' + id
    `/good/${id}`
  )
}

// 更新库存
export const updateCount = (data = {}) => {
  return post(
    '/good/update/count', data
  )
}

// 修改商品信息
export const update = (data = {}) => {
  return post(
    '/good/update', data
  )
}

// 查询商品详情页
export const detail = (id) => {
  return get(
    `/good/detail/${id}`
  )
}

// 拿到服务器返回的文件名字并上传给服务端
export const addMany = (key) => {
  return post('/good/addMany', {
    key
  })
}

// 获取库存信息
export const getGoodStore = () => {
  return get('/good/getStore')
}