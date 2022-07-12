const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

// 创建用户规则
const LogSchema = new mongoose.Schema({
  user: {
    account: String,
    id: String
  },

  request: {
    method: String,
    url: String,
    status: Number,
  },

  // 显示标志符
  show: Boolean,

  startTime: Number,
  endTime: Number,

  meta: getMeta(),
})

// 注册之前做的事, pre('什么操作', 函数做什么事)
LogSchema.pre('save', preSave)

// 使用规则创建集合
mongoose.model("Log", LogSchema)
