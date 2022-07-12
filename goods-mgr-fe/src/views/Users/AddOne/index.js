import { defineComponent, reactive } from 'vue'
import { user } from '@/service'
import { result, clone } from '@/helpers/utils'
import { UserAddOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import store from '@/store'

const defaultFormData = {
  account: '',
  password: '',
  character: '',
}

export default defineComponent({
  components: {
    UserAddOutlined
  },
  props: {
    show: Boolean,
  },
  setup(props, context) {
    // 获取角色默认值
    const { characterInfo } = store.state

    const addForm = reactive(clone(defaultFormData))
    // 设置默认第一项
    addForm.character = characterInfo[1]._id
    // 关闭按钮
    const close = () => {
      // 触发v-model双向绑定修改show
      context.emit('update:show', false)
    }

    // 提交按钮
    const submit = async () => {
      const form = clone(addForm)

      if (form.account === '') {
        message.warning('用户名不能为空')
        return
      }

      if (form.password === '') {
        message.warning('密码不能为空')
        return
      }

      // 发送添加请求
      const res = await user.add(form.account, form.password, form.character)

      result(res).success((d, { data }) => {
        message.success(data.msg)
        // 浅拷贝清空表单
        Object.assign(addForm, defaultFormData)
        close()

        // 触发父组件的getList方法
        context.emit('getList')
      })
    }

    return {
      addForm,
      submit,
      props,
      close,
      store,
      characterInfo,
    }
  }
})