<template>
  <div>
    <a-card title="邀请码列表">
      <div>
        <a-input-number v-model:value="count" :min="1" :max="100" />
        &nbsp;
        <a-button type="primary" @click="add" v-model:value="count">创建邀请码</a-button>
      </div>

      <a-divider></a-divider>

      <div>
        <a-table
        bordered
        :pagination="false"
        :columns="columns"
        :data-source="list"
        >

        <template #actions='{record}'>
          <a-button 
          type="danger" 
          @click="remove(record)" 
          size="small">
          删除
          </a-button>
        </template>

        <template #status='{record}'>
          {{ record.user ? '已使用' : '未使用'}}
        </template>

        </a-table>

        <flex-end style="margin-top:24px;">
          <a-pagination
          v-model:value="curPage"
          :pageSize="20"
          :total="total"
          @change="setPage"
           />
        </flex-end>
      </div>
    </a-card>
  </div>
</template>

<script src="./index.js">
</script>

<style scoped>
</style>
