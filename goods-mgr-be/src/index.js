const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')
const { connect } = require('./db')
const Routes = require('./routers/index')
const koaStatic = require('koa-static')
const { middleware: koaJwtMiddleware, catchTokenError, checkUser } = require('./helpers/token')
const { logMiddleware } = require('./helpers/log')
const path = require('path')
const config = require('./project.config')

const app = new Koa()

app.use(koaStatic(path.resolve(__dirname, '../public')))

// 连接数据库成功后并进行下一步操作
connect().then(() => {

  // 使用koa/cors解决同源问题  增加http请求头的方式解决跨域问题
  app.use(cors())
  // 使用koa-body中间件
  app.use(koaBody({
    // 支持文件上传
    multipart: true,
    // 一个库
    formidable: {
      // 文件最大限制200M
      maxFileSize: 200 * 1024 * 1024
    }
  }))

  // 捕捉token错误  必须在koa-jwt中间件前, 这样才能捕获到它的错误
  app.use(catchTokenError)

  // 注册koa-jwt中间件
  koaJwtMiddleware(app)

  // 检验用户是否存在中间件
  app.use(checkUser)

  // 注册log中间件获取数据
  app.use(logMiddleware)

  // 注册路由
  Routes(app)

  // 开启一个 http 服务
  // 接受 http 请求 并作处理, 处理完响应
  // https 默认端口443
  app.listen(config.SERVER_PORT, () => {
    console.log('启动成功');
  })
})
