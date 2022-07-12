// 抽离数据库公共信息代码

const getMeta = () => {
  return {
    createdAt: {
      type: Number,
      default: (new Date()).getTime(),
    },
    updatedAt: {
      type: Number,
      default: (new Date()).getTime(),
    }
  }
}

// mongose钩子
const preSave = function(next) {
  if(this.isNew) {
    const ts = Date.now()

    this['meta'].createdAt = ts
    this['meta'].updatedAt = ts
  }else {
    this['meta'].updatedAt = Date.now()
  }

  next()
}

module.exports = {
  getMeta,
  preSave,
}
