const Router = require('@koa/router')
const mongoose = require('mongoose')
// 封装路由获取body, 减少重复代码
const { getBody } = require('../../helpers/utils')
const jwt = require('jsonwebtoken')
const config = require('../../project.config')

// 获取user表
const User = mongoose.model('User')
const InviteCode = mongoose.model('InviteCode')
const character = mongoose.model('Character')

// 创建路由
const router = new Router({
  prefix: '/auth'
})

// 如果请求为 /auth/register
router.post('/register', async (ctx) => {

  // 获取前端传过来的账户和密码
  const { account, password, inviteCode } = getBody(ctx)

  // 增加空段验证, 避免来自非浏览器端的攻击
  if (account === '' || password === '' || inviteCode === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null
    }
    return
  }

  // 查询邀请码是否存在
  const findCode = await InviteCode.findOne({
    code: inviteCode,
  }).exec()

  // 判断邀请码是否存在 和 是否已被使用
  if ((!findCode) || findCode.user) {
    ctx.body = {
      code: 0,
      msg: '邀请码不正确',
      data: null
    }
    return
  }

  // 查询传递上来的账户是否存在
  const findUser = await User.findOne({
    account,
  }).exec()

  // 判断用户是否存在
  if (findUser) {
    // ctx.body = ctx.response.body
    // 如果用户已经存在,返回注册失败信息,return
    ctx.body = {
      code: 0,
      msg: '用户已存在，注册失败',
      data: null
    }
    return
  }

  // 注册用户 -> 默认为普通用户
  // 获取用户角色的id
  const normal = await character.findOne({
    title: '成员'
  }).exec()

  const user = new User({
    account,
    password,
    character: normal._id,
  })

  // 保存用户插入表 同步到mongodb
  const res = await user.save()

  // 把创建好的用户_id传给邀请码,形成一对一关系 顺带更新下更新日期
  findCode.user = res._id;
  findCode.meta.updatedAt = (new Date()).getTime()
  
  // 保存邀请码信息
  await findCode.save()

  // 信息脱敏用于返回前端
  const newUser = {
    account: res.account,
    _id: res._id
  }

  // 注册成功, 返回信息
  ctx.body = {
    code: 1,
    msg: '注册成功',
    data: newUser
  }

})

// 处理登录逻辑
router.post('/login', async (ctx) => {
  // 获取前端传过来的账户和密码
  const { account, password } = getBody(ctx)

  if (account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: '字段不能为空',
      data: null
    }
    return
  }

  // 查询用户是否存在
  const one = await User.findOne({
    account
  }).exec()

  // 如果用户不存在
  if (!one) {
    ctx.body = {
      code: 0,
      msg: '账号或者密码错误',
      data: null
    }
    return
  }

  // 用户存在, 开始匹配密码
  if (one.password === password) {
    // 信息脱敏用于返回前端
    const user = {
      account: one.account,
      _id: one._id,
      character: one.character,
    }

    // 生成token
    const token = jwt.sign(user, config.JWT_SECRET)
 
    // 返回信息和token到前端
    ctx.body = {
      code: 1,
      msg: '登陆成功',
      data: {
        user,
        token
      }
    }
    return
  }

  // 如果密码错误
  ctx.body = {
    code: 0,
    msg: '账号或者密码错误',
    data: null
  }

})

// 导出路由
module.exports = router
