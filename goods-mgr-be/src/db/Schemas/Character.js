const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

// 创建用户规则
const CharacterSchema = new mongoose.Schema({
  name: String,   // admin member
  title: String,  // 管理员 普通用户
  power: Object,

  meta: getMeta(),
})

// 注册之前做的事, pre('什么操作', 函数做什么事)
CharacterSchema.pre('save', preSave)

// 使用规则创建集合
mongoose.model("Character", CharacterSchema)
