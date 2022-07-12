import { defineComponent, ref, onMounted } from 'vue'
import { inviteCode } from '@/service'
import { result } from '@/helpers/utils'
import { message, Modal } from 'ant-design-vue'

const columns = [
  {
    title: '邀请码',
    dataIndex: 'code'
  },
  {
    title: '使用状态',
    slots: {
      customRender: 'status'
    }
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
    // count 申请邀请码条数
    const count = ref(1)
    const curPage = ref(1)
    const list = ref([])
    const total = ref(0)

    const getList = async () => {
      const res = await inviteCode.list(curPage.value, 20)

      result(res)
        .success(({ data: { list: l, total: t } }) => {
          list.value = l
          total.value = t
        })
    }

    // 添加验证码功能
    const add = async () => {
      if (typeof count.value !== 'number' || count.value === '' || count.value === 0) {
        message.error('请输入数字')
        return
      }

      const res = await inviteCode.add(count.value)

      result(res)
        .success(({ msg }) => {
          message.success(`${msg}${count.value}条邀请码`)
          getList()
        })
    }

    onMounted(() => {
      getList()
    })

    const setPage = (page) => {
      curPage.value = page
      getList()
    }

    const remove = async ({ _id }) => {

      Modal.confirm({
        title: `确认要删除该邀请码吗？`,
        okType: 'danger',

        // 确定按钮
        onOk: async () => {
          const res = await inviteCode.remove(_id)

          result(res)
            .success(({ msg }) => {
              message.success(msg)
              getList()
            })
        }
      })
    }

    return {
      count,
      getList,
      total,
      list,
      columns,
      setPage,
      curPage,
      add,
      remove,
    }
  }
})