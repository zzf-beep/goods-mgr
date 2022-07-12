const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

// 创建用户规则
const ForgetPasswordSchema = new mongoose.Schema({
  account: String,

  // 1. 待处理
  // 2. 已重置
  // 3. 已忽略
  status: Number,

  meta: getMeta(),
})

// 注册之前做的事, pre('什么操作', 函数做什么事)
ForgetPasswordSchema.pre('save', preSave)

// 使用规则创建集合
mongoose.model("ForgetPassword", ForgetPasswordSchema)
