// 封装路由获取body, 减少重复代码
const getBody = (ctx) => {
  // 返回请求体
  return ctx.request.body || {}
}

const getSimpleTime = (time) => {
  const date = new Date(Number(time))
  const YYYY = date.getFullYear()
  const MM = date.getMonth() + 1
  const DD = date.getDate()

  return `${YYYY}-${MM}-${DD}`
}

module.exports = {
  getBody,
  getSimpleTime,
};