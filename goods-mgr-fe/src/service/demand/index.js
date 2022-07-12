import { del, post, get } from '@/helpers/request'

// 添加需求请求
export const add = (form) => {
  return post(
    '/demand/add',
    form,
  )
}

export const getList = (data) => {
  return get('/demand/list', data)
}

export const update = (data) => {
  return post('/demand/update', data)
}

export const remove = (id) => {
  return del(`/demand/${id}`)
}