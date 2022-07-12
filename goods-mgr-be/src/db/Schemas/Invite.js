const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

const InviteSchema = new mongoose.Schema({
  code: String,
  user: String,

  meta: getMeta(),
})

// 注册之前做的事, pre('什么操作', 函数做什么事)
InviteSchema.pre('save', preSave)

mongoose.model("InviteCode", InviteSchema)