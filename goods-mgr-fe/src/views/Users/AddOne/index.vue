<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加用户"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6 }">
        <a-form-item label="账号">
          <a-input v-model:value.trim="addForm.account">
            <template #suffix>
              <UserAddOutlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item label="密码">
          <a-input-password v-model:value.trim="addForm.password" />
        </a-form-item>

        <a-form-item label="角色">
          <a-select v-model:value="addForm.character" style="width: 180px">
            <a-select-option
              v-for="item in characterInfo"
              :key="item._id"
              :value="item._id"
              >{{ item.title }}</a-select-option
            >
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src='./index.js'>
</script>

<style scoped>
</style>
