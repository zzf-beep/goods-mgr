import { defineComponent, reactive, ref, onMounted } from 'vue'
import { demand } from '@/service'
import { result, formatTimeStamp, clone } from '@/helpers/utils'
import { message, Modal } from 'ant-design-vue'
import { DownOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined, } from '@ant-design/icons-vue'
import store from '@/store'

const defaultForm = {
  title: '',
  content: '',
  userAttach: '',
  status: 1,
}

export default defineComponent({
  components: {
    DownOutlined,
    CheckCircleOutlined,
    SyncOutlined,
    CloseCircleOutlined,
  },
  setup() {
    const columns = [
      {
        title: '申请人',
        slots: {
          customRender: 'promulgator'
        }
      },
      {
        title: '标题',
        dataIndex: 'title',
      },
      {
        title: '内容',
        dataIndex: 'content',
        ellipsis: true,
      },
      {
        title: '用户备注',
        dataIndex: 'userAttach'
      },
      {
        title: '申请时间',
        slots: {
          customRender: 'times'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'   // 编辑 删除 -> 完成后无法编辑
        }
      },
      {
        title: '处理情况',
        slots: {
          customRender: 'solveCondition'
        }
      },
      {
        title: '处理人备注',
        dataIndex: 'adminAttach'
      },
      {
        title: '处理时间',
        slots: {
          customRender: 'solveTime'
        }
      },
    ]
    const list = ref([])
    const curPage = ref(1)
    const total = ref(0)
    const show = ref(false)
    const showUpdate = ref(false)
    const showSolve = ref(false)
    const addForm = reactive(clone(defaultForm))
    const editForm = reactive(clone(defaultForm))
    const solveForm = reactive({
      _id: '',
      status: 2,
      adminAttach: ''
    })

    // 获取列表
    const getList = async () => {
      const res = await demand.getList({
        page: curPage.value,
        size: 10,
      })

      result(res)
        .success(({ data: { list: l, total: t } }) => {
          list.value = l
          total.value = t
        })
    }

    // 提交按钮
    const submit = async () => {

      if(addForm.title === '') {
        message.warning('标题不能为空')
        return
      }
      if(addForm.content === '') {
        message.warning('内容不能为空')
        return
      }

      const res = await demand.add(addForm)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
          Object.assign(addForm, defaultForm)
          getList()
          close()
        })
    }

    // 关闭按钮
    const close = () => {
      show.value = false
    }

    // 删除按钮
    const remove = async ({ record: { _id } }) => {
      Modal.confirm({
        title: `确认要删除该需求吗？`,
        okType: 'danger',

        // 确定按钮
        onOk: async () => {
          // 发送删除请求
          const res = await demand.remove(_id)

          result(res)
            .success(({ msg }) => {
              message.success(msg)
              getList()
            })
        }
      })
    }

    // 根据status不同显示不同文字
    const showStatus = (status) => {
      if (status === 1) {
        return '未处理'
      } else if (status === 2) {
        return '已处理'
      } else {
        return '未通过'
      }

    }

    // 编辑
    const editDemand = (data) => {
      showUpdate.value = true

      Object.assign(editForm, data.record)
    }

    // 提交更新
    const updateDemand = async () => {

      if(editForm.title === '') {
        message.warning('标题不能为空')
        return
      }

      if(editForm.content === '') {
        message.warning('内容不能为空')
        return
      }

      const res = await demand.update(editForm)

      result(res)
        .success(({ msg, data }) => {
          message.success(msg)
          showUpdate.value = false
          getList()
        })
    }

    // 管理员处理显示
    const solveDemand = ({ record }) => {
      showSolve.value = true
      solveForm._id = record._id
      solveForm.status = 2
      solveForm.adminAttach = record.adminAttach
    }

    // 管理员处理提交
    const submitSolveDemand = async () => {
      const res = await demand.update(solveForm)

      result(res)
        .success(({ data, msg }) => {
          message.success(msg)
          showSolve.value = false
          getList()
        })
    }

    const setPage = (page) => {
      curPage.value = page
      getList()
    }

    onMounted(() => {
      getList()
    })

    // 如果是普通用户不显示申请人
    if (store.state.userCharacter.title === '成员') {
      columns.shift()
    }

    return {
      columns,
      list,
      curPage,
      total,
      setPage,
      show,
      submit,
      close,
      addForm,
      editDemand,
      remove,
      showStatus,
      formatTimeStamp,
      showUpdate,
      updateDemand,
      editForm,
      solveDemand,
      showSolve,
      solveForm,
      submitSolveDemand,
    }
  }
})