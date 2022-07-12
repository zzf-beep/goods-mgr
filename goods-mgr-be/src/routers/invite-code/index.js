const Router = require('@koa/router')
const mongoose = require('mongoose')
// 引入uuid创建唯一邀请码
const { v4: uuidv4 } = require('uuid')
const { getBody } = require('../../helpers/utils')

// 获取invite表
const InviteCode = mongoose.model('InviteCode')

// 创建路由
const router = new Router({
  prefix: '/invite'
})

// 接收到添加请求时
router.post('/add', async (ctx) => {

  // 创建邀请码数量
  const {
    count
  } = getBody(ctx)

  if (typeof count !== 'number' || count.value === '' || count.value === 0) {
    ctx.body = {
      code: 0,
      msg: '请输入正确的数值'
    }
    return
  }

  const arr = []

  // 批量创建邀请码
  for (let i = 0; i < count; i++) {
    arr.push({
      code: uuidv4(),
      user: '',
    })
  }

  // 插入表
  const res = await InviteCode.insertMany(arr)

  ctx.body = {
    code: 1,
    msg: '成功创建',
    data: res
  }

})

// 获取验证码列表
router.get('/list', async (ctx) => {
  let {
    page,
    size
  } = ctx.request.query

  page = Number(page)
  size = Number(size)

  const list = await InviteCode
    .find()
    .sort({
      _id: -1
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  const total = await InviteCode.countDocuments().exec()

  ctx.body = {
    code: 1,
    msg: '获取列表成功',
    data: {
      list,
      total,
      page,
      size,
    }
  }
})

// 删除邀请码
router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const res = await InviteCode.deleteOne({
    _id: id
  })

  if(!res) {
    ctx.body = {
      code: 0,
      msg: '不存在，删除失败',
    }
    return
  }

  ctx.body = {
    code: 1,
    msg: '删除成功',
    data: res
  }
})

// 导出路由
module.exports = router