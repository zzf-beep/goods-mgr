// 默认设置

const path = require('path')

module.exports = {
  DEFAULT_PASSWORD: '123456',
  JWT_SECRET: 'good-mgr',
  // 存放上传文件的地方 -> 默认命名为1.xlsx
  UPLOAD_DIR: path.resolve(__dirname, '../upload'),

  SERVER_PORT: 3001,  
}