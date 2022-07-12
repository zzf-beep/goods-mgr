<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <div class="list">
          <div class="item">
            <div class="count">共 {{ baseInfo.good }} 种</div>
            <div class="title">商品</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.toDayValueData }} 元</div>
            <div class="title">今日销售额</div>
          </div>
          <div class="item">
            <div class="count">共 {{ baseInfo.toDayOutStock }} 件</div>
            <div class="title">今日出库量</div>
          </div>
          <div class="item" id="notice">
            <a-popover title="最新公告" placement="right" >
              <template #content >
                <notice class="notice" simple />
              </template>
              <a-button type="primary" @click="goNotice">查看最新公告</a-button>
            </a-popover>
          </div>
        </div>
      </a-card>
    </a-spin>

    <div class="table-list">
      <div class="left">
        <a-card>
          <day-store-value simple @getOutStock="getOutStock" />
        </a-card>
      </div>

      <div class="right">
        <a-card>
          <show-store-value simple />
        </a-card>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
