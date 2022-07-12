import { defineComponent, ref, onMounted } from 'vue'
import { notice } from '@/service'
import { result, formatTimeStamp } from '@/helpers/utils'
import store from '@/store'
import { message, Modal } from 'ant-design-vue'
import AddOne from '@/views/Notice/AddOne/index.vue'

export default defineComponent({
  components: {
    AddOne
  },
  setup() {

    // 定义变量
    const columns = [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '发布者',
        dataIndex: 'promulgator'
      },
      {
        title: '发布时间',
        slots: {
          customRender: 'publishTime'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        }
      },
    ]

    // 显示隐藏添加公告表单变量
    const show = ref(false)

    const list = ref([])
    const total = ref(0)
    const curPage = ref(1)
    const showDetail = ref(false)
    const showUpdate = ref(false)
    const curData = ref({
      title: '',
      promulgator: '',
      content: '',
      meta: {
        updatedAt: ''
      }
    })
    const editForm = ref({
      _id: '',
      title: '',
      promulgator: '',
      content: '',
      meta: {
        updatedAt: ''
      }
    })


    // 获取公告
    const getList = async () => {
      const res = await notice.getList({
        page: curPage.value,
        size: 10,
      })

      result(res)
        .success(({ data: { list: l, total: t } }) => {
          list.value = l
          total.value = t
        })

    }

    // 点击详情按钮
    const detail = (data) => {
      showDetail.value = true
      Object.assign(curData.value, data.record)
    }

    // 点击编辑按钮
    const editNotice = async (data) => {
      showUpdate.value = true

      Object.assign(editForm.value, data.record)
      // 设置当前编辑者
      editForm.value.promulgator = store.state.userInfo.account
    }

    // 点击编辑确认按钮
    const updateNotice = async () => {
      
      if (editForm.value.title === '') {
        message.warning('标题不能为空')
        return
      }

      if (editForm.value.content === '') {
        message.warning('内容不能为空')
        return
      }

      const res = await notice.updateNotice(editForm.value)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
        })

      close()
      getList()
    }

    // 关闭编辑框
    const close = () => {
      showUpdate.value = false
    }

    // 删除公告
    const remove = async ({ record: { _id } }) => {

      Modal.confirm({
        title: `确认要删除该公告吗？`,
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',

        // 确定按钮
        onOk: async () => {
          // 发送删除请求
          const res = await notice.remove(_id)

          result(res)
            .success(({ msg }) => {
              message.success(msg)
              // 向服务端发送请求更新数据的方法
              // getList()

              // 直接在前端更新数据的方法 减少http请求,减轻服务端压力
              const idx = list.value.findIndex(item => {
                return item._id === _id
              })
              list.value.splice(idx, 1)
            })
        }
      })
    }

    const setPage = (page) => {
      // 点击当前页
      curPage.value = page
      // 重新获取商品列表
      getList()
    }

    onMounted(() => {
      getList()
    })

    return {
      columns,
      list,
      total,
      curPage,
      setPage,
      formatTimeStamp,
      showDetail,
      curData,
      detail,
      showUpdate,
      editNotice,
      updateNotice,
      editForm,
      remove,
      show,
      getList,
    }
  }
})