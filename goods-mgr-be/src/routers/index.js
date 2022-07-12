const auth = require('./auth/index')
const invite = require('./invite-code')
const good = require('./good')
const inventoryLog = require('./inventory-log')
const user = require('./user')
const character = require('./character')
const log = require('./log')
const forgetPassword = require('./forget-password')
const goodClassify = require('./good-classify')
const profile = require('./profile')
const dashboard = require('./dashboard')
const upload = require('./upload')
const notice = require('./notice')
const demand = require('./demand')

module.exports = (app) => {
  // 注册登陆注册路由
  app.use(auth.routes())
  // 注册邀请码路由
  app.use(invite.routes())
  // 注册商品路由
  app.use(good.routes())
  // 注册出入库路由
  app.use(inventoryLog.routes())
  // 注册用户路由
  app.use(user.routes())
  // 注册用户权限路由
  app.use(character.routes())
  //注册操作日志路由
  app.use(log.routes())
  // 注册忘记密码路由
  app.use(forgetPassword.routes())
  // 注册分类路由
  app.use(goodClassify.routes())
  // 个人设置路由
  app.use(profile.routes())
  // 仪表盘路由
  app.use(dashboard.routes())
  // 上传文件路由
  app.use(upload.routes())
  // 公告路由
  app.use(notice.routes())
  // 需求路由
  app.use(demand.routes())
}
