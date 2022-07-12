// 根据分类id获取分类  -> 商品管理分类栏目显示
import store from '@/store'

export const getClassifyTitleById = (id) => {
  const one = store.state.goodClassifyList.find(item => item._id === id)

  // 如果one存在, 就返回one.title
  return one && one.title || '未知分类'
}