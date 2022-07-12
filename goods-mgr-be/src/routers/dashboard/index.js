const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

const User = mongoose.model('User')
const Good = mongoose.model('Good')
const Log = mongoose.model('Log')

const router = new Router({
  prefix: '/dashboard'
})

router.get('/base-info', async (ctx) => {
  // const userTotal = await User.countDocuments()
  // const LogTotal = await Log.countDocuments()
  const goodTotal = await Good.countDocuments()

  ctx.body = {
    code: 1,
    msg: '获取成功',
    data: goodTotal,
  }
})

module.exports = router