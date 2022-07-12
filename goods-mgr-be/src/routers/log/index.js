const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')


// 获取log表
const log = mongoose.model('Log')

// 创建路由
const router = new Router({
  prefix: '/log'
})

// 获取日志列表
router.get('/list', async (ctx) => {
  let {
    page,
    size,
  } = ctx.query

  page = Number(page)
  size = Number(size)

  const list = await log
    .find({
      show: true
    })
    .sort({
      endTime: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  const total = await log.countDocuments().exec()

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      list,
      page,
      size,
      total,
    }
  }

})

router.post('/delete', async (ctx) => {
  const {
    id
  } = getBody(ctx)

  const one = await log.findOne({
    _id: id
  }).exec()

  // 安全判断
  if(!one) {
    ctx.body = {
      code: 0,
      msg: '删除成功',
      data: {}
    }
    return
  }

  // 软删除, 只是不显示在前端, 但是还是存在于数据库
  one.show = false

  await one.save()

  ctx.body = {
    code: 1,
    msg: '删除成功'
  }

})

// 导出路由
module.exports = router