import { defineComponent, ref, onMounted } from 'vue'
import { goodClassify } from '@/service'
import { result } from '@/helpers/utils'
import { message, Modal, Input } from 'ant-design-vue'

const columns = [
  {
    title: '类名',
    dataIndex: 'title',
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions'
    }
  },
]

export default defineComponent({
  setup() {

    // 标题
    const title = ref('')
    const total = ref(0)
    const curPage = ref(1)
    const list = ref([])

    const getList = async () => {
      const res = await goodClassify.list()

      result(res)
        .success(({ data }) => {
          list.value = data
        })
    }

    const add = async () => {

      if(title.value === '') {
        message.warning('分类名不能为空')
        return
      }

      if(title.value.includes(' ')) {
        message.warning('分类名不能含空格，请重新输入')
        return
      }

      const res = await goodClassify.add(title.value)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
          getList()
          title.value = ''
        })
    }

    const remove = async ({ _id }) => {
      Modal.confirm({
        title: `确认要删除该分类吗？`,
        okType: 'danger',

        // 确定按钮
        onOk: async () => {
          const res = await goodClassify.remove(_id)

          result(res)
            .success(({ msg }) => {
              message.success(msg)
              getList()
            })
        }
      })
    }

    const update = async ({ _id }) => {
      Modal.confirm({
        title: `请输入新的分类名`,
        content: (
          <div>
            <Input class="__good_classify_new_title" />
          </div>
        ),

        // 确定按钮
        onOk: async () => {
          const el = document.querySelector('.__good_classify_new_title')
          if(el.value === '') {
            message.warning('分类名不能为空')
            return
          }

          if(el.value.includes(' ')) {
            message.warning('分类名不能含空格，请重新输入')
            return
          }

          const res = await goodClassify.update(_id, el.value)

          result(res)
            .success(({ msg }) => {
              message.success(msg)
              getList()
              // 减少服务端请求
              // list.value.forEach(item => {
              //   if (item._id === _id) {
              //     item.title = el.value
              //   }
              // })
            })
        }
      })

    }

    onMounted(() => {
      getList()
    })

    return {
      add,
      title,
      total,
      curPage,
      list,
      columns,
      remove,
      update,
    }
  }
})