import { defineComponent, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import store from '@/store'
import { good } from '@/service'
import { result } from '@/helpers/utils'
import { getStoreOption } from '@/helpers/out-input'

export default defineComponent({
  setup(props) {

    // 获取分类数据
    const { goodClassifyList } = store.state
    const goodClassifyTitle = []

    // 获取具体分类名字方法
    function goodClassify(goodClassifyTitle) {
      goodClassifyList.forEach(item => {
        goodClassifyTitle.push(item.title)
      })
    }

    let showStore = null

    // 显示库存数据
    const showStoreEchart = function (goodClassifyTitle, total) {

      // 去除没有商品的分类
      for (let i = 0; i < total.length; i++) {
        if (total[i] === 0) {
          goodClassifyTitle.splice(i, 1)
          total.splice(i, 1)
          // 上面删减后i会-1, 所以i要往后退一格, 否则紧邻的为0的数据就没有被检测到
          i -= 1
        }
      }


      // echarts配置
      const storeOption = getStoreOption(goodClassifyTitle, total)

      // 保存配置
      showStore.setOption(storeOption, true);

    }

    // 获取库存信息
    const getStore = async function () {
      const res = await good.getGoodStore()

      result(res)
        .success(({ data: total }) => {
          showStoreEchart(goodClassifyTitle, total)
        })
    }


    // 实例挂载时载入信息
    onMounted(async () => {
      // 获取设置元素
      showStore = echarts.init(document.getElementById('showStore'));
      getStore()
      goodClassify(goodClassifyTitle)
    })

    onUnmounted(() => {
      if (showStore) {
        showStore.dispose()
      }
    })


    return {

    }
  }
})