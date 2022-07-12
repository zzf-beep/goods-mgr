const jwt = require('jsonwebtoken');
const config = require('../../project.config')
const koaJwt = require('koa-jwt')
const mongoose = require('mongoose')

const User = mongoose.model('User')

// 获取token方法
const getToken = (ctx) => {
  let { authorization } = ctx.header
  // 处理token
  return authorization.replace('Bearer', '').replace('bearer', '').trim()
}

const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
      if (err) {
        reject(err)
        return
      }
      // 解析后的结果
      resolve(payload)
    })
  })
}

// 规定检验秘钥, 以及规定哪些接口是不需要检验的
const middleware = (app) => {
  app.use(
    koaJwt({
      // 检验秘钥
      secret: config.JWT_SECRET,
    }).unless({
      // 哪些接口是不需要检验的
      path: [
        /^\/auth\/login/,
        /^\/auth\/register/,
        /^\/forget-password\/add/,
      ],
    })
  )
}

const res401 = (ctx) => {
  ctx.status = 401
  ctx.body = {
    code: 0,
    msg: '用户校验失败'
  }
}

// 检验用户是否存在
const checkUser = async (ctx, next) => {
  const { path } = ctx
  // 如果登陆注册的话不拦截验证
  if (path === '/auth/login' || path === '/auth/register' || path === '/forget-password/add') {
    await next()
    return
  }

  const { _id, account, character } = await verify(getToken(ctx))

  const user = await User.findOne({
    _id
  }).exec()

  if (!user) {
    res401(ctx)
    return
  }

  if (account !== user.account) {
    res401(ctx)
    return
  }

  if (character !== user.character) {
    res401(ctx)
    return
  }

  await next()
}

// 捕捉错误中间件
const catchTokenError = async (ctx, next) => {
  // next捕捉到下一个中间件的错误
  return next().catch((error) => {
    if (error.status === 401) {
      ctx.status = 401

      ctx.body = {
        code: 0,
        msg: 'token error'
      }
    } else {
      throw error
    }
  })
}

module.exports = {
  verify,
  getToken,
  middleware,
  catchTokenError,
  checkUser,
}