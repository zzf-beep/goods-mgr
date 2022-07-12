<template>
  <div>
    <a-card>
      <div class="header">
        <space-between>
          <h2>需求管理</h2>
          <a-button type="primary" @click="show = true">添加需求</a-button>
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
          <template #expandedRowRender="{ record }">
            <p style="margin: 0">
              {{ record.content }}
            </p>
          </template>

          <template #actions="data">
            <a-dropdown :trigger="['click']">
              <a-button type="danger" size="small">
                具体操作
                <DownOutlined />
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <a href="javascript:;" @click="editDemand(data)">编辑</a>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <a
                      v-only-admin
                      href="javascript:;"
                      @click="solveDemand(data)"
                      >处理</a
                    >
                  </a-menu-item>
                  <a-menu-item key="3">
                    <a href="javascript:;" @click="remove(data)">删除</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>

          <template #solveCondition="{ record }">
            <a-tag color="processing" v-if="record.status === 1">
              <template #icon>
                <sync-outlined :spin="true" />
              </template>
              {{ showStatus(record.status) }}
            </a-tag>
            <a-tag color="success" v-else-if="record.status === 2">
              <template #icon>
                <check-circle-outlined />
              </template>
              {{ showStatus(record.status) }}
            </a-tag>
            <a-tag color="error" v-else>
              <template #icon>
                <close-circle-outlined />
              </template>
              {{ showStatus(record.status) }}
            </a-tag>
          </template>

          <template #times="{ record }">
            {{ formatTimeStamp(record.meta.createdAt) }}
          </template>

          <template #solveTime="{ record }">
            {{
              record.status === 1
                ? "暂未处理"
                : formatTimeStamp(record.solveTime)
            }}
          </template>

          <template #promulgator="{ record }">
            {{ record.promulgator }}
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

      <!-- 需求框 -->
      <a-modal
        :visible="show"
        title="添加需求"
        @ok="submit"
        @cancel="close"
        ok-text="确定"
        cancel-text="取消"
      >
        <a-form :label-col="{ span: 6 }">
          <a-form-item label="标题">
            <a-input v-model:value.trim="addForm.title" style="width: 300px" />
          </a-form-item>

          <a-form-item label="需求内容">
            <a-textarea
              v-model:value.trim="addForm.content"
              placeholder="请输入需求内容..."
              allow-clear
              :rows="6"
              style="width: 300px"
            />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea
              v-model:value.trim="addForm.userAttach"
              placeholder="若有备注请输入..."
              allow-clear
              :rows="3"
              style="width: 300px"
            />
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 编辑框 -->
      <a-modal
        v-model:visible="showUpdate"
        title="编辑需求"
        @ok="updateDemand"
        ok-text="确认"
        cancel-text="取消"
      >
        <a-form :label-col="{ span: 6 }">
          <a-form-item label="标题">
            <a-input v-model:value.trim="editForm.title" style="width: 300px" />
          </a-form-item>

          <a-form-item label="需求内容">
            <a-textarea
              v-model:value.trim="editForm.content"
              placeholder="请输入需求内容..."
              allow-clear
              :rows="6"
              style="width: 300px"
            />
          </a-form-item>
          <a-form-item label="备注">
            <a-textarea
              v-model:value.trim="editForm.userAttach"
              placeholder="若有备注请输入..."
              allow-clear
              :rows="3"
              style="width: 300px"
            />
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 编辑框 -->
      <a-modal
        v-model:visible="showSolve"
        title="处理需求"
        @ok="submitSolveDemand"
        ok-text="确认"
        cancel-text="取消"
      >
        <a-form :label-col="{ span: 6 }">
          <a-form-item label="选择处理">
            <a-select style="width: 120px" v-model:value="solveForm.status">
              <a-select-option :value="2" :key="solveForm.status"
                >处理</a-select-option
              >
              <a-select-option :value="3">忽略</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="备注">
            <a-textarea
              v-model:value.trim="solveForm.adminAttach"
              placeholder="若有备注请输入..."
              allow-clear
              :rows="3"
              style="width: 300px"
            />
          </a-form-item>
        </a-form>
      </a-modal>
    </a-card>
  </div>
</template>

<script src='./index.js'>
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
