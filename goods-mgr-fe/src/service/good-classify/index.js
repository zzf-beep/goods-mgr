import { del, post, get } from '@/helpers/request'

export const list = () => {
  return get('/good-classify/list')
}

export const add = (title) => {
  return post('/good-classify/add', {
    title
  })
}

export const update = (id, title) => {
  return post('/good-classify/update/title', {
    id,
    title
  })
}

export const remove = (id) => {
  return del(`/good-classify/${id}`)
}
