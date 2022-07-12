const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
const config = require('../../project.config')
const { verify, getToken } = require('../../helpers/token')
const { loadExcel, getFirstSheet } = require('../../helpers/excel')

const User = mongoose.model('User')
const Character = mongoose.model('Character')

const router = new Router({
  prefix: '/user'
})

// 获取用户列表
router.get('/list', async (ctx) => {
  let {
    page,
    size,
    keyword,
  } = ctx.query

  // 如果处于搜索用户状态
  const query = {}
  if (keyword) {
    query.account = keyword
  }

  page = Number(page)
  size = Number(size)

  const list = await User
    .find(query)
    .sort({
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec()

  const total = await User.countDocuments().exec()

  ctx.body = {
    code: 1,
    msg: '查询用户成功',
    data: {
      list,
      total,
      page,
      size,
    }
  }

})

// 删除用户操作
router.delete('/:id', async (ctx) => {
  const {
    id
  } = ctx.params

  const delMsg = await User.deleteOne({
    _id: id
  }).exec()

  ctx.body = {
    code: 1,
    msg: '删除用户成功',
    data: delMsg,
  }
})

// 添加用户操作
router.post('/add', async (ctx) => {
  const {
    account,
    password,
    character,
  } = getBody(ctx)

  if (account === '' || password === '') {
    ctx.body = {
      code: 0,
      msg: '信息填写有误，请冲洗填写'
    }
    return
  }

  // 获取传过来的角色
  const char = await Character.findOne({
    _id: character
  })

  // 如果角色不存在
  if (!char) {
    ctx.body = {
      code: 0,
      msg: '出错了',
    }
    return
  }

  const user = new User({
    account,
    password: password || '123456',
    character,
  })

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '添加成功',
    data: res,
  }

})

// 重置密码
router.post('/reset/password', async (ctx) => {
  // 获取需要重置用户的id
  const {
    id
  } = getBody(ctx)

  const user = await User.findOne({
    _id: id
  })

  if (!user) {
    ctx.body = {
      code: 0,
      msg: '用户不存在',
    }
    return
  }

  // 获取token上的用户_id, 如果重置的是现在正在登陆的, 重置后清除token重新登陆
  const { _id } = await verify(getToken(ctx))
  const nowUser = await User.findOne({
    _id
  })
  // flag标识, 如果true是同一用户, false则不是
  let flag = (user.account === nowUser.account)

  // 设置默认密码 123456
  user.password = config.DEFAULT_PASSWORD

  const res = await user.save()

  ctx.body = {
    code: 1,
    msg: '重置密码成功',
    data: {
      id: res._id,
      account: res.account,
      flag,
    }
  }

})

// 修改用户角色
router.post('/update/character', async (ctx) => {
  const {
    character,
    userId,
  } = getBody(ctx)

  // 获取传过来的角色
  const char = await Character.findOne({
    _id: character
  })

  // 如果角色不存在
  if (!char) {
    ctx.body = {
      code: 0,
      msg: '出错了',
    }
    return
  }

  const one = await User.findOne({
    _id: userId
  })

  if (!one) {
    ctx.body = {
      code: 0,
      msg: '出错了',
    }
    return
  }

  // 修改角色
  one.character = character

  const res = one.save();

  ctx.body = {
    code: 1,
    msg: '修改角色成功',
    data: res
  }

})

// 通过token换取用户信息
router.get('/info', async (ctx) => {
  // token存放于Authorization 请求头中 : Bearer token 
  ctx.body = {
    code: 1,
    msg: '获取成功',
    // 这里解析出来的就是一个user对象
    data: await verify(getToken(ctx)),
  }
})

router.post('/addMany', async (ctx) => {
  const {
    key
  } = getBody(ctx)

  const path = `${config.UPLOAD_DIR}/${key}`

  // 获取到excel
  const excel = loadExcel(path)

  // 解析excel成数组形式
  const sheet = getFirstSheet(excel)

  // 给批量添加的用户默认使用成员身份
  const character = await Character.find().exec()
  // 获取到成员身份的数据, 通过member._id就可以给批量添加的用户设置默认用户了
  const member = character.find(item => {
    return item.name === 'member'
  })

  const arr = []
  sheet.forEach(record => {
    const [account, password = config.DEFAULT_PASSWORD] = record

    arr.push({
      account,
      password,
      character: member._id,
    })
  });

  await User.insertMany(arr)

  ctx.body = {
    code: 1,
    msg: '批量添加成功',
    data: {
      addCount: arr.length
    }
  }
})

module.exports = router