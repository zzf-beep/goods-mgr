import { defineComponent, ref, onMounted, reactive } from 'vue'
import AddOne from './AddOne/index.vue'
import { notice } from '@/service'
import { result, formatTimeStamp } from '@/helpers/utils'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'

export default defineComponent({
  components: {
    AddOne,
  },
  props: {
    simple: Boolean,
  },
  setup(props) {

    const noticeForm = reactive({
      title: '',
      promulgator: '',
      content: '',
      time: '',
    })

    // 路由
    const router = useRouter()

    // 显示隐藏添加公告表单变量
    const show = ref(false)


    // 获取公告
    // 当accent存在时为最新一条, 也就是默认页面那条
    const getList = async (accent) => {
      const res = await notice.getList({
        accent,
      })

      result(res)
        .success(({data, msg}) => {
          // message.success(msg)
          // 如果accent存在, 即为进去公告首页
          if(accent) {
            noticeForm.title = data[0].title
            noticeForm.promulgator = data[0].promulgator
            noticeForm.content = data[0].content
            noticeForm.time = formatTimeStamp(data[0].meta.updatedAt) 
            return
          }

        })

    }

    const toNoticeList = () => {
      router.push('/notice/list')
    }

    onMounted(() => {
      // 获取列表 1 -> 表示只获取最新一条
      getList(1)
    })

    return {
      show,
      noticeForm,
      getList,
      toNoticeList,
      simple: props.simple
    }
  }
})