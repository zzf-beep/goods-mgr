import { defineComponent, ref, onMounted } from 'vue'
import menu from '@/config/menu'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({

  setup() {
    const router = useRouter()
    const route = useRoute()

    const openKeys = ref(['其它'])
    const selectedKeys = ref([])

    onMounted(() => {
      selectedKeys.value = [route.path]

      menu.forEach(item => {
        (item.children || []).forEach(child => {
          if (child.url === route.path) {
            openKeys.value.push(item.title)
          }
        })
      });
    })

    // 导航切换功能
    const to = (url) => {
      router.push(url)
    }

    return {
      openKeys,
      selectedKeys,
      menu,
      to,
    }
  }
})