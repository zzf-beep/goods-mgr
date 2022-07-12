const mongoose = require('mongoose')

// 运行规则集合文件
require('./Schemas/User')
require('./Schemas/Invite')
require('./Schemas/Good')
require('./Schemas/InventoryLog')
require('./Schemas/Character')
require('./Schemas/Log')
require('./Schemas/LogResponse')
require('./Schemas/ForgetPassword')
require('./Schemas/GoodClassify')
require('./Schemas/Notice')
require('./Schemas/Demand')

// 给哪个数据库
// 哪个集合
// 添加什么格式的文档)

const connect = () => {
  return new Promise((resolve) => {
    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/goods-mgr')

    // 当数据库被打开时,回调函数
    mongoose.connection.on('open', () => {
      console.log('连接数据库成功');
      resolve();
    })
  })
}

module.exports = {
  connect,
}