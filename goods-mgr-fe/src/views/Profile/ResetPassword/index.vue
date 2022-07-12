<template>
  <div>
    <a-card title="修改密码">
      <a-form
        :model="formState"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 5 }"
      >
        <a-form-item label="旧密码">
          <a-input-password v-model:value="form.oldPassword" />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input-password v-model:value="form.newPassword" />
        </a-form-item>
        <a-form-item label="确定新密码">
          <a-input-password v-model:value="form.confirmNewPassword" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4  }">
          <a-button type="primary" @click="resetPassword">确定修改</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script src="./index.js">
</script>

<style scoped>
</style>
