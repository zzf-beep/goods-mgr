<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <space-between>
          <h2>{{ d.name }}</h2>
          <div>
            <a-button
              v-only-admin
              size="small"
              type="primary"
              @click="showUpdateModal = true"
              >编辑</a-button
            >
            &nbsp;
            <a-button v-only-admin size="small" type="danger" @click="remove"
              >删除</a-button
            >
          </div>
        </space-between>

        <a-divider />

        <div class="base-info">
          <div class="items">
            <div class="item">
              <div class="title">价格</div>
              <div class="content">{{ d.price }}</div>
            </div>
            <div class="item">
              <div class="title">分类</div>
              <div class="content">{{ d.classifyTitle }}</div>
            </div>
            <div class="item">
              <div class="title">制造商</div>
              <div class="content">{{ d.manufacturer }}</div>
            </div>
          </div>
          <div class="items">
            <div class="item">
              <div class="title">出厂日期</div>
              <div class="content">
                {{ formatTimeStamp(d.manufactureDate, 1) }}
              </div>
            </div>
          </div>
        </div>
        <update
          v-model:show="showUpdateModal"
          :good="d"
          @update="updateGood"
          @getList="getDetail"
        />
      </a-card>
    </a-spin>

    <div class="log">
      <a-card title="出入库日志">
        <template #extra>
          <span>
            <a href="javascript:;" @click="logFilter('IN_COUNT')">
              <CheckOutlined v-if="curLogType === 'IN_COUNT'" />
              入库记录
            </a>
          </span>
          <span style="margin-left: 12px">
            <a href="javascript:;" @click="logFilter('OUT_COUNT')">
              <CheckOutlined v-if="curLogType === 'OUT_COUNT'" />
              出库记录
            </a>
          </span>
        </template>
        <div>
          <a-table
            :data-source="log"
            :columns="columns"
            bordered
            :pagination="false"
          >
            <template #createdAt="{ record }">
              {{ formatTimeStamp(record.meta.createdAt) }}
            </template>
          </a-table>
        </div>
        <space-between style="margin-top: 24px">
          <div />
          <a-pagination
            v-model:current="logCurPage"
            :total="logTotal"
            :pageSize="10"
            @change="setLogPage"
          />
        </space-between>
      </a-card>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
