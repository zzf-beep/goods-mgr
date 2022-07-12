const Router = require('@koa/router')
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
const { verify, getToken } = require('../../helpers/token')
const { v4: uuidv4 } = require('uuid')
const { saveFileToDisk, getUploadFileExt } = require('../../helpers/upload')
const config = require('../../project.config')
const path = require('path')

// 上传文件相关接口
const router = new Router({
  prefix: '/upload'
})

router.post('/file', async (ctx) => {
  // 获取文件后缀名
  const ext = getUploadFileExt(ctx)
  // 设置上传后的名字
  const filename = `${uuidv4()}.${ext}`

  await saveFileToDisk(ctx, path.resolve(config.UPLOAD_DIR, filename))

  ctx.body = {
    code: 1,
    msg: '',
    data: filename
  }
})

module.exports = router