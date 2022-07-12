import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import SpaceBetween from './components/SpaceBetween/index.vue'
import FlexEnd from './components/FlexEnd/index.vue'
import { regDirectives } from '@/helpers/directive'


const app = createApp(App)

// 注册自定义指令
regDirectives(app)

app
  .use(store)
  .use(router)
  .use(Antd)
  // 注册全局组件
  .component('space-between', SpaceBetween)
  .component('flex-end', FlexEnd)
  .mount('#app');
