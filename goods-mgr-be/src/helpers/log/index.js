const { verify, getToken } = require('../token')
const mongoose = require('mongoose')
const Log = mongoose.model('Log')
const LogResponse = mongoose.model('LogResponse')

// 日志中间件
const logMiddleware = async (ctx, next) => {
  // 设置访问开始时间
  const startTime = Date.now()

  await next()

  let payload = {}

  try {
    // 获取数据
    payload = await verify(getToken(ctx))
  } catch(e) {
    payload = {
      account: '未知用户',
      id: '',
    }
  }

  //设置 -> 访问地址 访问方法 访问状态码 响应体
  const url = ctx.url
  const method = ctx.method
  const status = ctx.status
  let responseBody = ''
  let show = true

  if(url === '/log/delete') {
    show = false
  }

  if(typeof ctx.body === 'string') {
    responseBody = ctx.body
  }else {
    try {
      // 如果为json对象就转为json字符串
      responseBody = JSON.stringify(ctx.body)
    } catch {
      responseBody = ''
    }
  }

  const endTime = Date.now()

  // 创建日志
  const log = new Log({
    user: {
      account: payload.account,
      id: payload.id
    },
    request: {
      url: url,
      method: method,
      status,
    },
    show,
    startTime,
    endTime,
  })

  const logResponse = new LogResponse({
    logId: log._id,
    data: responseBody
  })

  await log.save()

  await logResponse.save()

}

module.exports = {
  logMiddleware,
}