const Router = require('@koa/router')
const mongoose = require('mongoose')


// 获取Inventory表
const InventoryLog = mongoose.model('InventoryLog')

// 创建路由
const router = new Router({
  prefix: '/inventory-log'
})

router.get('/list', async (ctx) => {
  const {
    type,
    goodName,
  } = ctx.query

  let {
    page,
    size,
  } = ctx.query

  size = Number(size)
  page = Number(page)

  let total = 0
  let list = []

  if (goodName === '') {
    total = await InventoryLog.find({
      type,
    }).countDocuments().exec()
    list = await InventoryLog
    .find({
      type,
    })
    .sort({
      // 倒序
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec()
  } else {
    // 获取查询到几条日志
    total = await InventoryLog.find({
    type,
    goodName,
  }).countDocuments().exec()

    list = await InventoryLog
    .find({
      type,
      goodName,
    })
    .sort({
      // 倒序
      _id: -1,
    })
    .skip((page - 1) * size)
    .limit(size)
    .exec()
  }

  ctx.body = {
    code: 1,
    msg: '查询出入库列表成功',
    data: {
      total,
      list,
      page,
      size,
    }
  }

})

router.get('/getSaleValue', async (ctx) => {
  const {
    startTime,
    endTime,
  } = ctx.query

  const list = await InventoryLog
    .find(
      // 查询近五天的数据
      {
        "meta.updatedAt": { $gt: startTime, $lt: endTime }
      }
    )
    .sort({
      _id: -1
    })
    .exec()

  ctx.body = {
    code: 1,
    msg: '查询数据成功',
    data: list
  }
})

// 导出路由
module.exports = router