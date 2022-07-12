import { defineComponent, reactive, watch } from 'vue'
import moment from 'moment'
import { good } from '@/service'
import { result } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import store from '@/store'

export default defineComponent({
  props: {
    show: Boolean,
    good: Object,
  },
  setup(props, context) {
    const editForm = reactive({
      name: '',
      price: 0,
      manufacturer: '',
      manufactureDate: 0,
      classify: '',
    })

    // 监听props.good变化   current修改后的值
    watch(() => props.good, (current) => {
      // 变化后的good赋值给editForm
      Object.assign(editForm, current)
      // 把时间戳转成moment对象, 这样ant-design才能解析
      editForm.manufactureDate = moment(Number(editForm.manufactureDate))
    })

    // 提交更新操作请求
    const submit = async () => {
      const res = await good.update({
        id: props.good._id,
        name: editForm.name,
        price: editForm.price,
        manufacturer: editForm.manufacturer,
        manufactureDate: editForm.manufactureDate.valueOf(),
        classify: editForm.classify,
      })
      result(res)
        .success(({data: {newOne, oldOne}, msg}) => {
          message.success(msg)
          // 向父组件发送更新数据操作
          // Object.assign(props.good, data)
          context.emit('update', newOne)
          // 如果修改了时间, 就更新下列表
          if(oldOne) {
            context.emit('getList')
          }
          close();
        })
    }

    const close = () => {
      // 触发v-model双向绑定修改show
      context.emit('update:show', false)
    }

    return {
      editForm,
      props,
      submit,
      close,
      store: store.state,
    }
  }
})