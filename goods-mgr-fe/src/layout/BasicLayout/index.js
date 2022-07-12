import { defineComponent } from 'vue'
import Nav from './Nav/index.vue'
import { setToken } from '@/helpers/token'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import store from '@/store'

export default defineComponent({
  components: {
    AppNav: Nav,
  },
  setup() {
    // 登出功能
    const router = useRouter()
    const logout = () => {
      setToken('')
      message.success('退出成功~')
      router.push('/auth')
    }

    return {
      logout,
      userInfo: store.state.userInfo.account
    }
  }
})