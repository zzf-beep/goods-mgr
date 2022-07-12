<template>
  <div>
    <a-modal
      :visible="props.show"
      title="添加商品"
      @ok="submit"
      @cancel="close"
    >
      <a-form :model="addForm" :label-col="{ span: 6 }">
        <a-form-item label="商品名">
          <a-input v-model:value.trim="addForm.name" />
        </a-form-item>

        <a-form-item label="价格">
          <a-input-number
            :min="0"
            :max="999999999999"
            v-model:value="addForm.price"
          />
        </a-form-item>

        <a-form-item label="制造商">
          <a-input v-model:value.trim="addForm.manufacturer" />
        </a-form-item>

        <a-form-item label="出厂日期">
          <a-date-picker
            placeholder="请选择出厂日期"
            v-model:value="addForm.manufactureDate"
          />
        </a-form-item>

        <a-form-item label="分类">
          <a-select v-model:value="addForm.classify" style="width: 120px">
            <!-- 把分类的id传给商品数据库 -->
            <a-select-option
              v-for="item in store.goodClassifyList"
              :value="item._id"
              :key="item._id"
              >{{ item.title }}</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item label="库存">
          <a-input-number :min="0" :max="999999999999" v-model:value="addForm.count" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src='./index.js'>
</script>

<style scoped>
</style>
