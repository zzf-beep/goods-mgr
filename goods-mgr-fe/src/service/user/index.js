import { post, get, del } from '@/helpers/request'

export const list = (page, size, keyword) => {
  return get(
    '/user/list',
    {
      page,
      size,
      keyword,
    }
  )
}

export const remove = (id) => {
  return del(
    `/user/${id}`
  )
}

export const add = (account, password, character) => {
  return post('/user/add', {
    account,
    password,
    character,
  })
}

export const resetPassword = (id) => {
  return post('/user/reset/password', {
    id
  })
}

export const editCharacter = (characterId, userId) => {
  return post('/user/update/character', {
    character: characterId,
    userId,
  })
}

// 拿到用户信息
export const info = () => {
  return get('/user/info')
}

// 拿到服务器返回的文件名字并上传给服务端
export const addMany = (key) => {
  return post('/user/addMany', {
    key
  })
}