const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')

// 获取公告表
const Notice = mongoose.model('Notice')

// 创建路由
const router = new Router({
  prefix: '/notice'
})

// 获取公告
router.get('/list', async (ctx) => {
  const {
    accent,
    page = 1,
  } = ctx.query

  let {
    size
  } = ctx.query

  size = Number(size)

  // 当accent存在时表示在公告主页面
  if (accent) {
    const data =
      await Notice
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .exec()

    ctx.body = {
      code: 1,
      msg: '获取成功',
      data
    }
    return
  }

  // 获取公告列表
  const list = await Notice
    .find()
    .sort({ _id: -1 })
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  // 获取公告数量
  const total = await Notice.countDocuments().exec()

  ctx.response.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      list,
      total
    }
  }

})

// 添加公告
router.post('/add', async (ctx) => {
  const {
    title,
    content,
    promulgator,
  } = getBody(ctx)

  if (title === '' || content === '') {
    ctx.body = {
      code: 0,
      msg: '信息填写有误，请重新填写'
    }
    return
  }

  // 创建公告
  const notice = new Notice({
    title,
    promulgator,
    content
  })

  // 公告插入表
  const res = await notice.save()

  ctx.body = {
    code: 1,
    msg: '创建成功',
    data: res
  }
})

// 更新公告
router.post('/update', async (ctx) => {
  const {
    _id,
    title,
    promulgator,
    content,
  } = getBody(ctx)

  if (title === '' || content === '') {
    ctx.body = {
      code: 0,
      msg: '信息填写有误，请重新填写'
    }
    return
  }

  const one = await Notice.findOne({
    _id
  }).exec()

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '公告不存在'
    }
    return
  }

  one.title = title
  one.promulgator = promulgator
  one.content = content
  one.meta.updatedAt = new Date().getTime()

  const res = await one.save()

  ctx.body = {
    code: 1,
    msg: '修改成功',
    data: res
  }

})

// 删除公告
router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const res = await Notice.deleteOne({
    _id: id
  })

  if (!res) {
    ctx.body = {
      code: 0,
      msg: '删除失败，需求不存在！',
    }
    return
  }

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }

})

module.exports = router