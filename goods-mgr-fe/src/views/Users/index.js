import { defineComponent, ref, onMounted, reactive } from 'vue'
import { user } from '@/service'
import { result, formatTimeStamp } from '@/helpers/utils'
import { getCharacterInfoById } from '@/helpers/character'
import { setToken } from '@/helpers/token'
import { useRouter } from 'vue-router'
import { message, Modal } from 'ant-design-vue'
import AddOne from './AddOne/index.vue'
import { EditOutlined } from '@ant-design/icons-vue'
import { getHeaders } from '@/helpers/request'
import store from '@/store'

export default defineComponent({
  components: {
    AddOne,
    EditOutlined,
  },

  setup() {

    // 用户数据展示
    const columns = [
      {
        title: '用户名',
        dataIndex: 'account',
      },
      {
        title: '注册时间',
        slots: {
          customRender: 'createdAt'
        }
      },
      {
        title: '角色',
        slots: {
          customRender: 'character'
        }
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        }
      },
    ]

    // 定义变量
    const list = ref([])
    const total = ref(0)
    const curPage = ref(1)
    const showAddModal = ref(false)
    const keyword = ref('')
    const isSearch = ref(false)
    const showEditCharacterModal = ref(false)
    const editForm = reactive({
      // 当前编辑的角色
      character: '',
      // 当前编辑的对象
      current: {}
    })
    const router = useRouter()

    // 获取用户列表
    const getUsers = async () => {
      const res = await user.list(curPage.value, 10, keyword.value)
      result(res)
        .success(({ data: { list: resList, total: resTotol } }) => {
          list.value = resList
          total.value = resTotol
        })
    }

    // 当组件挂载完
    onMounted(() => {
      getUsers()
    })

    // 删除用户方法
    const remove = async ({ _id }) => {
      Modal.confirm({
        title: `确认要删除该用户吗？`,
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',

        // 确定按钮
        onOk: async () => {
          const res = await user.remove(_id)

          result(res)
            .success(({ msg }) => {
              message.success(msg)
              getUsers()
            })
        }
      })
    }

    // 设置页码切换
    const setPage = (page) => {
      curPage.value = page

      getUsers()
    }

    // 重置密码功能
    const resetPassword = async ({ _id }) => {

      Modal.confirm({
        title: `确认要重置密码吗？`,
        okType: 'danger',

        // 确定按钮
        onOk: async () => {
          const res = await user.resetPassword(_id)

          result(res)
            .success(({ msg, data: { flag } }) => {
              message.success(msg)
              // 如果重置当前用户的账号密码, 触发清除token重新登陆
              if (flag) {
                // 清除token 触发重新登陆
                setToken('')
                router.replace('/auth')
              }
            })
        }
      })

    }

    // 点击搜索功能
    const onSearch = () => {
      console.log(keyword.value);
      // 如果搜索栏为空, !!keyword.value = !!'' = Boolean('') = false
      isSearch.value = !!keyword.value
      getUsers()
    }

    // 清空搜索功能
    const clearSearch = () => {
      keyword.value = ''
      isSearch.value = false
      getUsers()
    }

    // 点击编辑功能
    const onEdit = (record) => {
      editForm.current = record
      editForm.character = record.character
      showEditCharacterModal.value = true
    }

    // 更新角色功能
    const updateCharacter = async () => {
      const res = await user.editCharacter(editForm.character, editForm.current._id)

      result(res)
        .success(({ msg }) => {
          message.success(msg)
          showEditCharacterModal.value = false
          // editForm.current 拿到的是record对象的引用, 而editForm.character是选择框选择的值
          // 用选择的值去更新前端
          editForm.current.character = editForm.character
        })
    }

    // 上传
    const onUploadChange = ({ file }) => {
      // event里面的file
      // 如果服务端给相应了
      if (file.response) {
        result(file.response)
          .success(async (key) => {
            const res = await user.addMany(key)
            result(res)
              .success(({ data: { addCount } }) => {
                message.success(`成功添加${addCount}位用户`)
                getUsers()
              })
          })
      }
    }

    return {
      curPage,
      list,
      curPage,
      columns,
      formatTimeStamp,
      remove,
      showAddModal,
      getUsers,
      setPage,
      total,
      resetPassword,
      keyword,
      isSearch,
      onSearch,
      clearSearch,
      getCharacterInfoById,
      showEditCharacterModal,
      editForm,
      onEdit,
      characterInfo: store.state.characterInfo,
      updateCharacter,
      onUploadChange,
      // 添加批量添加请求头
      headers: getHeaders(),
      // 返回用户信息 用于判断是否当前用户操作 隐藏删除按钮
      user: store.state.userInfo.account,
    }
  }
})