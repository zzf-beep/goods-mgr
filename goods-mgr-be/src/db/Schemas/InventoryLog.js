const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

const InventoryLogSchema = new mongoose.Schema({
  type: String,
  num: Number,
  goodName: String,
  user: {
    type: String,
    default: '神秘人'
  },

  meta: getMeta(),
})
// 注册之前做的事, pre('什么操作', 函数做什么事)
InventoryLogSchema.pre('save', preSave)

mongoose.model('InventoryLog', InventoryLogSchema)