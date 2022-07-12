<template>
  <div>
    <a-card :title="simple ? '最近添加的商品' : ''">
      <div v-if="!simple">
        <h2>商品列表</h2>

        <a-divider />

        <!-- 插槽接口 -->
        <space-between>
          <div class="search">
            <a-input-search
              placeholder="根据商品名搜索"
              enter-button
              v-model:value="keyword"
              @search="onSearch"
              style="width: 200px"
            />
            <a v-if="isSearch" href="javascript:;" @click="clearSearch"
              >清空搜索结果</a
            >
          </div>

          <div>
            <a-button v-only-admin @click="show = true">添加一条</a-button>
            &nbsp;

            <a-upload
              @change="onUploadChange"
              action="http://localhost:3001/upload/file"
              :headers="headers"
            >
              <a-button v-only-admin type="primary">
                上传 Excel 添加
              </a-button>
            </a-upload>
          </div>
        </space-between>

        <a-divider />
      </div>

      <a-table
        :columns="columns"
        :data-source="list"
        :pagination="false"
        bordered
      >
        <template #manufactureDate="data">
          <!-- 格式化出厂日期 -->
          {{ formatTimeStamp(data.record.manufactureDate, 1) }}
        </template>

        <!-- 操作按钮 -->
        <template #actions="data" v-if="!simple">
          <a href="javascript:;" @click="toDetail(data)">详情</a>
          &nbsp;
          <a v-only-admin href="javascript:;" @click="update(data)">编辑</a>
          &nbsp;
          <a v-only-admin href="javascript:;" @click="remove(data)">删除</a>
        </template>

        <!-- 库存信息 -->
        <template #count="data">
          <a
            v-only-admin
            href="javascript:;"
            @click="updateCount('IN_COUNT', data.record)"
            >入库</a
          >
          {{ data.record.count }}
          <a href="javascript:;" @click="updateCount('OUT_COUNT', data.record)"
            >出库</a
          >
        </template>

        <!-- 分类信息 -->
        <template #classify="{ record }">
          {{ getClassifyTitleById(record.classify) }}
        </template>
      </a-table>
      <flex-end v-if="!simple" style="margin-top: 24px">
        <a-pagination
          v-model:current="curpage"
          :total="total"
          :pageSize="10"
          @change="setPage"
        />
      </flex-end>
      <!-- 添加一条商品功能 双向绑定show, 子传父通过子传过来的值修改父的值 -->
      <add-one v-model:show="show" @getList="getList" />
      <!-- 修改商品功能 -->
      <!-- curEditGood把数据传给子组件 -->
      <update
        v-model:show="showUpdateModal"
        :good="curEditGood"
        @update="updateGood"
        @getList="getList"
      />
    </a-card>
  </div>
</template>

<script src="./index.jsx">
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>