<template>
  <div class="basic-layout">
    <div class="app-header">
      <div class="left">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp9.itc.cn%2Fq_70%2Fimages03%2F20210419%2F666557ff41a742e0af1805ed3813bde0.png&refer=http%3A%2F%2Fp9.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651991871&t=b3733dd45ed1d538fd740ca0f7c56303" alt="">
        <div class="title">商品在线管理系统</div>
      </div>
      <div class="right">
        <div class="hello-msg">你好，{{ userInfo }}</div>
        <div class="logout" @click="logout">退出</div>
      </div>
    </div>

    <div class="app-header-placeholder"></div>

    <div class="app-content">
      <div class="left">
        <app-nav />
      </div>
      <div class="right">
        <!-- 渲染路由传过来的组件 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
