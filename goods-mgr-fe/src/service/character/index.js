import { get } from '@/helpers/request'

// 设置默认值
export const list = () => {
  return get(
    '/character/list', 
  )
}