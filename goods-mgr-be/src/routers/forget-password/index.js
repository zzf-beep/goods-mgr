const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
const config = require('../../project.config')

const ForgetPassword = mongoose.model('ForgetPassword')
const User = mongoose.model('User')

const router = new Router({
  prefix: '/forget-password'
})

// 获取用户权限列表接口
router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.request.query

  page = Number(page)
  size = Number(size)

  const list = await ForgetPassword
  // 只去找还没有处理的数据请求
  .find({
    status: 1
  })
  .skip((page - 1) * size)
  .limit(size)
  .exec()

  const total = await ForgetPassword.find({
    status: 1
  }).countDocuments().exec()

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      list,
      page,
      size,
      total
    }
  }

})

router.post('/add', async (ctx) => {
  const {
    account
  } = getBody(ctx)

  const user = await User.findOne({
    account
  }).exec()
  
  // 首先得有这个用户
  // 安全策略, 避免恶意访问
  if(!user) {
    ctx.body = {
      code: 1,
      msg: '申请重置成功'
    }
    return
  }

  // 在用户存在的前提下, 已经申请过重置了
  const one = await ForgetPassword.findOne({
    account,
    status: 1,
  }).exec()

  if(one) {
    ctx.body = {
      code: 1,
      msg: '申请重置成功'
    }
    return
  }

  // 创建一条申请记录
  const forgetPwd = new ForgetPassword({
    account,
    status: 1
  })

  await forgetPwd.save()

  ctx.body = {
    code: 1,
    msg: '申请重置成功'
  }

})

router.post('/update/status', async (ctx) => {
  const {
    id,
  } = getBody(ctx)

  let {
    status
  } = getBody(ctx)

  const one = await ForgetPassword.findOne({
    _id: id
  }).exec()

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '该申请记录不存在',
    }
    return
  }

  status = Number(status)

  // 把该条记录修改成传进来的status, 有可能是已处理2和忽略3
  one.status = status

  // 如果是要重置的话, 就是重置这个用户的密码
  // 2重置密码
  if(one.status === 2) {

    const user = await User.findOne({
      account: one.account
    })

    // 如果用户存在, 则重置密码
    if(user) {
      user.password = config.DEFAULT_PASSWORD
      await user.save()
    }
  }

  const res = await one.save()

  ctx.body = {
    code: 1,
    msg: '处理成功',
    data: res
  }

})

module.exports = router