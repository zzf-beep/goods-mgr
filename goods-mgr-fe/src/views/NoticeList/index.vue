<template>
  <div>
    <a-card>
      <div class="header">
        <space-between>
          <h2>公告列表</h2>
          <a-button v-only-admin type="primary" @click="show = true">添加公告</a-button>
        </space-between>
      </div>

      <a-divider></a-divider>
      <div>
        <a-table
          bordered
          :pagination="false"
          :data-source="list"
          :columns="columns"
        >
          <template #actions="data">
            <a href="javascript:;" @click="detail(data)">详情</a>
            &nbsp;
            <a v-only-admin href="javascript:;" @click="editNotice(data)"
              >编辑</a
            >
            &nbsp;
            <a v-only-admin href="javascript:;" @click="remove(data)">删除</a>
          </template>

          <template #publishTime="data">
            {{ formatTimeStamp(data.record.meta.updatedAt) }}
          </template>
        </a-table>

        <flex-end style="margin-top: 24px">
          <a-pagination
            v-model:current="curPage"
            :total="total"
            :pageSize="10"
            @change="setPage"
          ></a-pagination>
        </flex-end>
      </div>
    </a-card>

    <!-- 详情框 -->
    <a-modal
      v-model:visible="showDetail"
      title="查看公告详情"
      :footer="null"
      width="1165px"
    >
      <h2 style="text-align: center; font-weight: 700">{{ curData.title }}</h2>
      <p style="color: #666; margin: 24px 0">
        <space-between>
          <span>发布者：{{ curData.promulgator }}</span>
          <span>发布时间：{{ formatTimeStamp(curData.meta.updatedAt) }}</span>
        </space-between>
      </p>
      <p style="text-indent: 2em; font-size: 16px">
        {{ curData.content }}
      </p>
    </a-modal>

    <!-- 编辑框 -->
    <a-modal
      v-model:visible="showUpdate"
      title="编辑公告"
      @ok="updateNotice"
      ok-text="确认"
      cancel-text="取消"
      width="1165px"
    >
      <a-form :label-col="{ span: 6 }">
        <a-form-item label="标题">
          <a-input v-model:value="editForm.title" style="width: 600px" />
        </a-form-item>

        <a-form-item label="正文内容">
          <a-textarea
            v-model:value="editForm.content"
            placeholder="请输入正文内容..."
            allow-clear
            :rows="6"
            style="width: 600px"
            :auto-size="{ minRows: 2, maxRows: 20 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <add-one v-model:show="show" @getList="getList"></add-one>
  </div>
</template>

<script src='./index.js'>
</script>

<style lang='scss' scoped>
@import "./index.scss";
</style>

