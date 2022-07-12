<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加公告"
      @ok="submit"
      @cancel="close"
      ok-text = '确定'
      cancel-text = '取消'
    >

      <a-form :label-col="{ span: 6 }">
        <a-form-item label="标题">
          <a-input v-model:value.trim="addForm.title" style="width: 300px" />
        </a-form-item>

        <a-form-item label="正文内容">
          <a-textarea v-model:value.trim="addForm.content" placeholder="请输入正文内容..." allow-clear :rows="6" style="width: 300px"/>
        </a-form-item>

      </a-form>
    </a-modal>
  </div>
</template>

<script src='./index.js'>
</script>

<style scoped>
</style>
