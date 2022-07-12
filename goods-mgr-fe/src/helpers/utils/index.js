import { message } from 'ant-design-vue';

// 抽离前端验证部分代码，简化逻辑

export const result = (response, authShowErroMsg = true) => {
  // 获取response里面的data
  const { data } = response

  // 判断是否返回错误
  if ((data.code === 0) && authShowErroMsg) {
    message.error(data.msg)
  }

  return {
    success(cd) {
      if (data.code !== 0) {
        // message.success(data.msg)
        // 调用传入的回调函数
        cd(data, response)
      }
      // return this后可以链式调用
      return this
    },
    fail(cd) {
      if (data.code === 0) {
        // 调用传入的回调函数
        cd(data, response)
      }
      return this
    },
    finally(cd) {
      // 调用传入的回调函数
      cd(data, response)
      return this
    }
  }
}

// 实现深拷贝
export const clone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}
// 处理时间, 9:9:12 -> 09:09:12
const tsPadStart = (str) => {
  str = String(str)

  return str.padStart(2,'0')
}

// 格式化出厂时间
export const formatTimeStamp = (ts, flag) => {
  const date = new Date(Number(ts))
  const YYYY = date.getFullYear()
  const MM = tsPadStart(date.getMonth() + 1)
  const DD = tsPadStart(date.getDate())
  const hh = tsPadStart(date.getHours())
  const mm = tsPadStart(date.getMinutes())
  const ss = tsPadStart(date.getSeconds())

  // 如果flag存在就不返回时分秒
  if(flag) {
    return `${YYYY}/${MM}/${DD}`
  }

  return `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`
}

// 数组去重
export const uniqueArr = (arr) => {
  const set = new Set(arr)

  return [...set]
}

// 判断输入是否为小数
export const isFloat = (num) => {
  const x = String(num)
  
  // 如果找不到返回-1
  let index = x.indexOf('.') + 1

  // 如果>0证明是小数
  if(index > 0) {
    return true
  }
  return false
  
}