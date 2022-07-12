import { defineComponent, onMounted, ref } from 'vue'
import { dashboard, inventoryLog, good } from '@/service'
import { result } from '@/helpers/utils'
import { useRouter } from 'vue-router'
import Notice from '@/views/Notice/index.vue'
import DayStoreValue from '@/views/OutInput/DayStoreValue/index.vue'
import showStoreValue from '@/views/OutInput/showStoreValue/index.vue'

export default defineComponent({
  components: {
    Notice,
    DayStoreValue,
    showStoreValue
  },
  setup() {
    const loading = ref(true)

    const baseInfo = ref({
      good: 0,
      toDayValueData: 0,
      toDayOutStock: 0,
    })

    const router = useRouter()

    const getBaseInfo = async () => {
      loading.value = true
      const res = await dashboard.baseInfo()
      loading.value = false

      result(res)
        .success(({ data }) => {
          baseInfo.value.good = data
        })
    }
    const saleDayValueData = async () => {
      const resLog = await inventoryLog.list('OUT_COUNT')
      const goodLog = await good.list({
        page: 1,
        size: 1000
      })
      let resultArray = []
      let resLogArray = []
      result(resLog).success(({data}) => {
        resLogArray = data.list
        console.log(resLogArray);
      })
      result(goodLog).success(({data}) => {
        console.log(data.list);
        data.list.forEach(goodLogItem => {
          resLogArray.forEach(resLogItem => {
            if (goodLogItem._id === resLogItem.goodName) {
              resultArray.push({num: resLogItem.num, price: goodLogItem.price})
            }
          })
        })
      })
      resultArray.forEach(item => {
        baseInfo.value.toDayValueData += (item.num * item.price)
      })
    }

    // 获得子组件传过来的值
    const getOutStock = (value) => {
      baseInfo.value.toDayOutStock = value[5]
    }

    // 前往公告
    const goNotice = () => {
      router.push('/notice/list')
    }

    onMounted(() => {
      getBaseInfo()
      saleDayValueData()
    })

    return {
      baseInfo,
      loading,
      saleDayValueData,
      getOutStock,
      goNotice,
    }
  }
})