<template>
  <div>
      <a-card id="main">
        <flex-end v-if="!simple">
          <a-button type="primary" @click="show = true">添加</a-button>
          <a-button style="margin-left:12px;" @click="toNoticeList">往期公告</a-button>
        </flex-end>
        <h2>{{ noticeForm.title }}</h2>
        <p class="time">
          发布者: {{ noticeForm.promulgator }} &nbsp;&nbsp; 发布时间：{{
            noticeForm.time
          }}
        </p>
        <p class="content">
          {{ noticeForm.content }}
        </p>

      </a-card>

      <!-- 添加一条公告功能, 子传父通过子传过来的值修改父的值 -->
      <add-one v-model:show="show" @getList="getList"></add-one>

  </div>
</template>

<script src='./index.js'>
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>
