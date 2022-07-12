const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

const GoodSchema = new mongoose.Schema({
  // 商品名
  name: String,
  // 价格
  price: Number,
  // 制造商
  manufacturer: String,
  // 出厂日期
  manufactureDate: String,
  // 分类
  classify: String,
  // 库存
  count: Number,
  
  // 基本信息
  meta: getMeta(),
})

// 注册之前做的事, pre('什么操作', 函数做什么事)
GoodSchema.pre('save', preSave)


mongoose.model('Good', GoodSchema)