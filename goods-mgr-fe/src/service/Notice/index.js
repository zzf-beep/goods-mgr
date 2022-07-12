import { post, get, del } from '@/helpers/request'

export const addNotice = (title, promulgator, content) => {
  return post('/notice/add', {
    title,
    promulgator,
    content,
  })
}

export const getList = (data) => {
  return get('/notice/list', data)
}

export const updateNotice = (data) => {
  return post('/notice/update', data)
}

export const remove = (id) => {
  return del(`/notice/${id}`)
}