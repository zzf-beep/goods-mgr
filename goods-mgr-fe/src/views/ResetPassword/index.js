import { defineComponent, ref, onMounted } from 'vue'
import { resetPassword } from '@/service'
import { result } from '@/helpers/utils'
import { message, Modal } from 'ant-design-vue'

const columns = [
  {
    title: '账户',
    dataIndex: 'account',
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions'
    }
  }
]

export default defineComponent({
  setup() {
    const list = ref([])
    const curPage = ref(1)
    const total = ref(0)

    const getList = async () => {
      const res = await resetPassword.list(curPage.value, 10)

      result(res)
        .success(({ data: { list: l, total: t } }) => {

          list.value = l
          total.value = t
        })
    }

    onMounted(() => {
      getList()
    })

    // 忽略是3, 重置是2, 未处理是1
    const changeStatus = async ({ _id }, status) => {

      Modal.confirm({
        title: `确认要${(status === 2) ? '重置该密码' : '忽略此申请'}吗？`,
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',

        // 确定按钮
        onOk: async () => {
          const res = await resetPassword.updateStatus(_id, status)

          result(res)
            .success(({ msg }) => {
              message.success(msg)
              getList()
            })
        }
      })


    }

    const setPage = (page) => {
      curPage.value = page
      getList()
    }

    return {
      list,
      curPage,
      total,
      getList,
      columns,
      changeStatus,
      setPage,
    }
  }
})