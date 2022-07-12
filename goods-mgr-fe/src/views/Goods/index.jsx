import { defineComponent, ref, onMounted } from 'vue'
import AddOne from './AddOne/index.vue'
import Update from './Update/index.vue'
import { useRouter } from 'vue-router'
import { good } from '@/service'
import { getClassifyTitleById } from '@/helpers/good-classify'
import { result, formatTimeStamp } from '@/helpers/utils'
import { message, Modal, Input } from 'ant-design-vue'
import { getHeaders } from '@/helpers/request'

export default defineComponent({
  components: {
    AddOne,
    Update,
  },
  props: {
    simple: Boolean,
  },
  setup(props) {

    // 比如前进页 后退页 跳到某一页
    const router = useRouter()

    const columns = [
      {
        title: '商品名',
        dataIndex: 'name',
      },
      {
        title: '价格',
        dataIndex: 'price',
      },
      {
        title: '库存',
        slots: {
          customRender: 'count',
        },
      },
      {
        title: '分类',
        slots: {
          customRender: 'classify',
        },
      },
      {
        title: '制造商',
        dataIndex: 'manufacturer',
      },
      {
        title: '出厂日期',
        dataIndex: 'manufactureDate',
        slots: {
          customRender: 'manufactureDate',
        },
      },
    ]

    if (!props.simple) {
      columns.push({
        title: '操作',
        slots: {
          customRender: 'actions',
        },
      })
    }
    // 显示隐藏添加商品表单变量
    const show = ref(false)
    // 显示隐藏修改商品表单变量
    const showUpdateModal = ref(false)
    // 正在修改的商品
    const curEditGood = ref({})

    const list = ref([])

    // 获取服务端传过来的数量
    const total = ref(0)

    // 创建当前页变量
    const curpage = ref(1)

    // 创建搜索关键词
    const keyword = ref('')

    // 检测是否处于搜索状态
    const isSearch = ref(false)

    // 抽离获取商品方法
    const getList = async () => {
      // 获取列表数据
      const res = await good.list({
        page: curpage.value,
        size: 10,
        keyword: keyword.value
      })

      result(res)
        .success(({ data: { list: l, total: t } }) => {
          list.value = l
          total.value = t
        })
    }

    // 列出商品
    onMounted(async () => {
      getList();
    })

    // 点击当前页面
    const setPage = (page) => {
      // 点击当前页
      curpage.value = page
      // 重新获取商品列表
      getList()
    }

    // 搜索功能
    const onSearch = () => {

      getList()
      // 字符串非空时 -> true
      // 字符串为空时 -> false
      // 可以加两个!!强转成boolean
      // 或者用Boolean(keyword.vale)做转换
      isSearch.value = !!keyword.value
    }

    // 清空搜索功能
    const clearSearch = () => {
      isSearch.value = false
      // 清空搜索关键词
      keyword.value = ''

      getList()
    }

    // 删除商品功能
    // 获取商品的id
    const remove = async ({ record: { _id: id } }) => {

      Modal.confirm({
        title: `确认要删除该商品吗？`,
        okText: '确定',
        cancelText: '取消',
        okType: 'danger',

        // 确定按钮
        onOk: async () => {
          // 发送删除请求
          const res = await good.remove(id)

          result(res)
            .success(({ msg }) => {
              message.success(msg)
              // 向服务端发送请求更新数据的方法
              getList()

            })
        }
      })

    }

    // 显示更新弹框
    const update = async ({ record }) => {
      showUpdateModal.value = true;
      // 这里直接把对象赋值过去, 如果curEditGood的值修改 那么这条数据的内容也自动会被修改
      curEditGood.value = record
    }

    // 更新列表的某一行数据
    // 接收编辑子组件传过来的更新数据操作 newData为子组件传过来的data
    const updateGood = (newData) => {
      Object.assign(curEditGood.value, newData)
    }

    // type 给服务端判断进出库的常量
    const updateCount = (type, record) => {
      let word = '增加'

      if (type === 'OUT_COUNT') {
        word = '减少'
      }

      Modal.confirm({
        title: `请输入${word}的库存`,
        okText: '确定',
        cancelText: '取消',
        content: (
          <div>
            <Input class="__good_input_count" />
          </div>
        ),

        // 确定按钮
        onOk: async () => {
          const el = document.querySelector('.__good_input_count')
          let num = el.value

          // 如果输入的不为数字
          if (!Number(num)) {
            message.error('请输入准确数字！')
            return
          }

          const res = await good.updateCount({
            id: record._id,
            num,
            type,
          })

          result(res)
            .success((data) => {

              if (type === 'IN_COUNT') {
                // 入库操作
                num = Math.abs(num)
              } else {
                // 出库操作
                num = -Math.abs(num)
              }

              // 查找当前进出库的商品
              const one = list.value.find((item) => {
                return item._id === record._id
              })
              // 修改前端进出库显示
              if (one) {
                one.count += num
              }

              message.success(`成功${word} ${Math.abs(num)} 库存`)
              // 如果库存为0, 需要刷新下列表, 隐藏库存为0的商品
              if(one.count === 0) {
                getList()
              }
            })
        }
      })
    }

    // 进入书籍详情页
    const toDetail = ({ record }) => {
      router.push(`/goods/${record._id}`)
    }

    // 批量上传
    const onUploadChange = ({ file }) => {
      // event里面的file
      // 如果服务端给相应了
      if (file.response) {
        result(file.response)
          .success(async (key) => {
            const res = await good.addMany(key)
            result(res)
              .success(({ data: { addCount } }) => {
                message.success(`成功添加${addCount}中商品`)
                getList()
              })
          })
      }
    }

    return {
      columns,
      show,
      list,
      formatTimeStamp,
      curpage,
      total,
      setPage,
      keyword,
      onSearch,
      clearSearch,
      isSearch,
      remove,
      updateCount,
      showUpdateModal,
      update,
      curEditGood,
      updateGood,
      toDetail,
      getList,
      getClassifyTitleById,
      // 总览的判断显示隐藏的simple
      simple: props.simple,
      onUploadChange,
      // 添加批量添加请求头
      headers: getHeaders(),
    }
  }
})