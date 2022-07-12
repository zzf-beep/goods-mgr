const mongoose = require('mongoose')
const { getMeta, preSave } = require('../helps')

const DemandSchema = new mongoose.Schema({
  // 标题
  title: String,
  // 发布者
  promulgator: String,
  // 内容
  content: String,
  // 用户备注
  userAttach: {
    type: String,
    default: '空'
  },
  // 处理状态 1 -> 未处理 2 -> 已经处理 3 -> 已忽略
  status: {
    type: Number,
    default: 1
  },
  // 处理人
  handler: {
    type: String,
    default: ''
  },
  //处理情况
  adminAttach: {
    type: String,
    default: '空'
  },
  // 处理时间
  solveTime: {
    type: Number,
    default: Date.now(),
  },
  meta: getMeta(),
})

DemandSchema.pre('save', preSave)

mongoose.model('Demand', DemandSchema)