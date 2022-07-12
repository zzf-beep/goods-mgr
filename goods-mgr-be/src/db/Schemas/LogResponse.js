const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

// 创建用户规则
const LogResponseSchema = new mongoose.Schema({
  logId: String,
  data: String,

  meta: getMeta(),
})

// 注册之前做的事, pre('什么操作', 函数做什么事)
LogResponseSchema.pre('save', preSave)

// 使用规则创建集合
mongoose.model("LogResponse", LogResponseSchema)
