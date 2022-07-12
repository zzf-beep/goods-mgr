<template>
  <a-config-provider :locale="zh_CN">
    <div id="nav"></div>
    <router-view />
  </a-config-provider>
</template>
<script>
// 配置中文
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
export default {
  data() {
    return {
      zh_CN,
    };
  },
};
</script>
<style lang="scss">
body {
  background-color: #fafafa !important;
}
</style>
