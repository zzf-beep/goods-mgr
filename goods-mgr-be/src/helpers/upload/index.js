const fs = require('fs')

// 得到前端上传的文件并保存到硬盘中
const saveFileToDisk = (ctx, filename) => {
  return new Promise((resolve, reject) => {

    const file = ctx.request.files.file

    // 读的流
    const reader = fs.createReadStream(file.path)
    // 写的流

    const writeStream = fs.createWriteStream(filename)
 
    // pipe读的流后给写的作处理
    reader.pipe(writeStream)

    reader.on('end', () => {
      resolve(filename)
    })

    reader.on('error', (err) => {
      console.log(1);
      reject(err)
    })

  })
}

// 获取上传的文件名后缀
const getUploadFileExt = (ctx) => {
  const { name = '' } = ctx.request.files.file

  return name.split('.').pop()
}

module.exports = {
  saveFileToDisk,
  getUploadFileExt,
}