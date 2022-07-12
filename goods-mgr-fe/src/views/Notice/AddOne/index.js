import { defineComponent, reactive } from 'vue'
import { notice } from '@/service'
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import store from '@/store'

const defaultFormData = {
  title: '',
  content: '',
}

export default defineComponent({
  props: {
    show: Boolean,
  },

  setup(props, context) {
    const addForm = reactive(clone(defaultFormData))

    const submit = async () => {

      if (addForm.title === '') {
        message.warning('标题不能为空')
        return
      }

      if (addForm.content === '') {
        message.warning('内容不能为空')
        return
      }

      const res = await notice.addNotice(addForm.title, store.state.userInfo.account, addForm.content)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
          // 置空表单
          Object.assign(addForm, defaultFormData)
          // 触发父级getList方法
          context.emit('getList', 1)
          close()
        })
    }

    // 关闭
    const close = () => {
      context.emit('update:show', false)
    }

    return {
      submit,
      close,
      props,
      addForm,
    }
  }
})