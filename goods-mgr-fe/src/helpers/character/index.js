import store from '@/store'

// 判断当前是哪个角色登陆分别显示相应的内容
export const isAdmin = () => {
  const uc = store.state.userCharacter

  // 如果是管理员返回true, 否则返回false
  return uc.name === 'admin'
}

// 角色相关工具函数
export const getCharacterInfoById = (id) => {
  const { characterInfo } = store.state

  const one = characterInfo.find((item) => {
    return item._id === id
  })

  return one || {
    title: '未定角色'
  }
} 