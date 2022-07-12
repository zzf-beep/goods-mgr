<template>
  <div>
    <a-card title="分类管理">
      <div>
        <a-input
         placeholder="请输入分类"
          style="width: 200px;"
          v-model:value.trim="title"></a-input>
        &nbsp;
        <a-button type="primary" @click="add">添加</a-button>
      </div>

      <a-divider></a-divider>

      <a-table
      bordered
      :pagination="false"
      :columns="columns"
      :data-source="list"
      >

      <template #actions="{ record }">
        <a href="javascript:;" @click="update(record)">修改</a>
        &nbsp;
        <a href="javascript:;" @click="remove(record)">删除</a>
      </template>

      </a-table>

      <flex-end>
        <a-pagination style="margin-top: 24px;" />
      </flex-end>
    </a-card>
  </div>
</template>

<script src='./index.jsx'>
</script>

<style scoped>
</style>
