import { defineComponent, reactive, } from 'vue'
import { good } from '@/service'
import { result, clone, isFloat } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import store from '@/store'

const defaultFormData = {
  name: '',
  price: 0,
  manufacturer: '',
  manufactureDate: 0,
  classify: store.state.goodClassifyList[0]._id,
  count: 0,
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context) {
    const addForm = reactive(clone(defaultFormData))

    // 设置分类默认值
    if (store.state.goodClassifyList.length) {
      addForm.classify = store.state.goodClassifyList[0]._id
    }

    // 提交按钮
    const submit = async () => {
      const form = clone(addForm)

      if (form.name === '') {
        message.warning('标题不能为空！')
        return
      }
      if (form.price < 0) {
        message.warning('价格设置错误，请重新设置！')
        return
      }
      if (form.manufacturer === '') {
        message.warning('请输入制造商名字！')
        return
      }
      if (form.count < 0) {
        message.warning('库存不能为负数！')
        addForm.count = 0
        return
      }
      if(isFloat(form.count)) {
        message.warning('库存不能为小数！')
        form.count = Math.floor(form.count)
        addForm.count = form.count
        return
      }

      // 把moment对象转换成时间戳
      form.manufactureDate = addForm.manufactureDate.valueOf()
      // 发送添加请求
      const res = await good.add(form)

      result(res)
        .success((d, { data }) => {
          message.success(data.msg)
          // 浅拷贝清空表单
          Object.assign(addForm, defaultFormData)
          props.show = false
          context.emit('getList')
          close()
        })
    }

    const close = () => {
      // 触发v-model双向绑定修改show
      context.emit('update:show', false)
    }

    return {
      addForm,
      submit,
      props,
      close,
      store: store.state,
    }
  }
})