import { isAdmin } from '@/helpers/character'

// 注册自定义指令

export const regDirectives = (app) => {
  app.directive('only-admin', {
    // binding为自定义指令传递过来的参数
    // value设置默认值true 当我们设置指定值的时候, 默认就要管理员才能显示了
    mounted(el, {value = true}) {
      const res = isAdmin()
      // console.log(binding); 一个对象 value才是传过来的值
      // 如果为res为true则为管理员登陆
      if(!res && value) {
        el.style.display = 'none'
      }
    },
  })
}
