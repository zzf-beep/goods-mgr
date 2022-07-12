import { del, post, get } from '@/helpers/request'
//  注册和登陆请求

export const register = (account, password, inviteCode) => {
  // 第二个为参数传过去后端, 返回一个promised
  return post('/auth/register', {
    account,
    password,
    inviteCode,
  })
}

export const login = (account, password) => {
  return post('/auth/login', {
    account,
    password
  })
}
