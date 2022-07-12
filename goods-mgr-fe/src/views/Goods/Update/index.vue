<template>
  <div>
    <a-modal
      :visible="props.show"
      title="编辑商品"
      @ok="submit"
      @cancel="close"
      okText='确定'
      cancelText='取消'
    >
      <!-- // 商品名
        name: String,
        // 价格
        price: Number,
        // 制造商
        manufacturer: String,
        // 出厂日期
        manufactureDate: String,
        // 分类
        classify: String,-->

      <a-form :label-col="{ span: 6 }">
        <a-form-item label="商品名">
          <a-input v-model:value.trim="editForm.name" />
        </a-form-item>

        <a-form-item label="价格">
          <a-input-number
            :min="0"
            :max="999999999999"
            v-model:value="editForm.price"
          />
        </a-form-item>

        <a-form-item label="制造商">
          <a-input v-model:value.trim="editForm.manufacturer" />
        </a-form-item>

        <a-form-item label="出产日期">
          <a-date-picker v-model:value="editForm.manufactureDate" />
        </a-form-item>

        <a-form-item label="分类">
          <a-select
            v-model:value="editForm.classify"
            style="width: 120px"
          >
          <!-- 把分类的id传给商品数据库 -->
            <a-select-option
            v-for="item in store.goodClassifyList"
            :value="item._id"
            :key="item._id"
            >{{item.title}}</a-select-option>
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
