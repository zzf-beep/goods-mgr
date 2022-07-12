import { defineComponent, reactive } from 'vue'
import { profile } from '@/service'
import { result } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import { setToken } from '@/helpers/token'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const form = reactive({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })

    const router = useRouter()

    const resetPassword = async () => {
      const {
        oldPassword,
        newPassword,
        confirmNewPassword,
      } = form
      
      if(newPassword === '' || oldPassword === '' || confirmNewPassword === '') {
        message.warning('密码不能为空! ')
        return
      }

      if(newPassword !== confirmNewPassword) {
        message.error('密码不一致, 请重新输入！')
        return
      }

      const res = await profile.resetPassword(
        newPassword,
        oldPassword,
      )

      result(res)
        .success(({msg}) => {
          message.success(msg)

          form.oldPassword = ''
          form.newPassword = ''
          form.confirmNewPassword = ''
          // 清除token 触发重新登陆
          setToken('')
          router.replace('/auth')
        })
    }

    return {
      form,
      resetPassword,
    }
  }
})