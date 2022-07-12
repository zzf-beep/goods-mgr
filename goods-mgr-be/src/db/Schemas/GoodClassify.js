const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

const GoodClassifySchema = new mongoose.Schema({
  // 分类名
  title: String,
  
  // 基本信息
  meta: getMeta(),
})

// 注册之前做的事, pre('什么操作', 函数做什么事)
GoodClassifySchema.pre('save', preSave)

mongoose.model('GoodClassify', GoodClassifySchema)