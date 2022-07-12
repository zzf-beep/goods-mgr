const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
const { verify, getToken } = require('../../helpers/token')

const User = mongoose.model('User')

const router = new Router({
  prefix: '/profile'
})

// 修改密码
router.post('/update/password', async (ctx) => {
  const {
    password,
    oldPassword
  } = getBody(ctx)

  if(password === '' || oldPassword === '') {
    ctx.body ={
      code: 0,
      msg: '密码错误，请重新输入'
    }
    return 
  }

  // 获取当前登陆token的id
  const { _id } = await verify(getToken(ctx))

  const user = await User.findOne({
    _id
  }).exec()
  if (!user) {
    ctx.body = {
      code: 0,
      msg: '用户不存在'
    }
    return
  }

  if (user.password !== oldPassword) {
    ctx.body = {
      code: 0,
      msg: '密码错误',
    }
    return
  }

  user.password = password

  await user.save()

  ctx.body = {
    code: 1,
    msg: '修改成功，请重新登陆！'
  }

})

module.exports = router