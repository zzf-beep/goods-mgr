const Router = require('@koa/router')
const mongoose = require('mongoose')

const GoodClassify = mongoose.model('GoodClassify')

const router = new Router({
  prefix: '/good-classify'
})

// 获取分类
router.get('/list', async (ctx) => {
  let {
    page,
    size
  } = ctx.query

  page = Number(page)
  size = Number(size)

  const list = await GoodClassify
  .find()
  .sort({
    _id: -1
  })
  .skip((page - 1) * size)
  .limit(size)
  .exec()

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: list,
  }
})

// 添加分类
router.post('/add', async (ctx) => {
  const {
    title
  } = ctx.request.body

  if(title === '' || title.includes(' ')) {
    ctx.body = {
      code: 0,
      msg: '信息填写有误，请重新填写'
    }
    return
  }

  const one = await GoodClassify.findOne({
    title
  }).exec()

  if(one) {
    ctx.body = {
      code: 0,
      msg: '该分类已存在',
    }
    return
  }

  const saved = await new GoodClassify({
    title
  })

  const res = await saved.save()

  ctx.body = {
    code: 1,
    msg: '创建分类成功',
    data: res,
  }
})

//删除分类
router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const one = await GoodClassify.deleteOne({
    _id: id
  })

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: one
  }

})

// 更新分类
router.post('/update/title', async (ctx) => {
  const {
    id,
    title
  } = ctx.request.body

  if(title === '' || title.includes(' ')) {
    ctx.body = {
      code: 0,
      msg: '信息填写有误，请重新填写'
    }
    return
  }

  const one = await GoodClassify.findOne({
    _id: id
  })

  if(!one) {
    ctx.body = {
      code: 0,
      msg: '资源不存在',
    }
    return
  }

  one.title = title

  const res = await one.save()

  ctx.body = {
    code: 1,
    msg: '更新成功',
    data: res
  }
})

module.exports = router