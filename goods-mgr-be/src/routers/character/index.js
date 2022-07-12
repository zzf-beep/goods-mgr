const Router = require('@koa/router')
const mongoose = require('mongoose')
const character = mongoose.model('Character')

const router = new Router({
  prefix: '/character'
})

// 获取用户权限列表接口
router.get('/list', async (ctx) => {
  // 获取用户角色
  const list = await character.find().exec()

  ctx.body = {
    code: 1,
    msg: '获取权限列表成功',
    data: list
  }
})

module.exports = router