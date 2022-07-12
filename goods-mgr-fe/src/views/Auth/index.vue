<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp9.itc.cn%2Fq_70%2Fimages03%2F20210419%2F666557ff41a742e0af1805ed3813bde0.png&refer=http%3A%2F%2Fp9.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651991871&t=b3733dd45ed1d538fd740ca0f7c56303" alt="" />
      <h2 class="title">商品在线管理系统</h2>
    </div>
    <form action="">
      <div class="form">
        <a-tabs>
          <a-tab-pane key="1" tab="登陆">
            <div class="item">
              <a-input
                size="large"
                placeholder="账户"
                v-model:value.trim="loginForm.account"
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </div>

            <div class="item">
              <a-input-password
                size="large"
                placeholder="密码"
                v-model:value.trim="loginForm.password"
                @keydown.enter.native="login"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </div>

            <div class="item">
              <a href="javascript:;" @click="forgetPassword">忘记密码</a>
            </div>
            <jc-range
              :successFun="onMpanelSuccess"
              :errorFun="onMpanelError"
            ></jc-range>
            <div class="item" style="margin-top: 12px">
              <a-button size="large" type="primary" @click="login"
                >登陆</a-button
              >
            </div>
          </a-tab-pane>

          <a-tab-pane key="2" tab="注册">
            <div class="item">
              <a-input
                size="large"
                v-model:value="regForm.account"
                placeholder="用户名"
              >
                <template #prefix>
                  <UserOutlined />
                </template>
              </a-input>
            </div>

            <div class="item">
              <a-input-password
                size="large"
                v-model:value="regForm.password"
                placeholder="密码"
              >
                <template #prefix>
                  <LockOutlined />
                </template>
              </a-input-password>
            </div>

            <div class="item">
              <a-input
                size="large"
                placeholder="邀请码"
                v-model:value="regForm.inviteCode"
              >
                <template #prefix>
                  <MessageOutlined />
                </template>
              </a-input>
            </div>
            <jc-range
              :successFun="onRegisSuccess"
              :errorFun="onRegisError"
            ></jc-range>
            <div class="item" style="margin-top: 12px;">
              <a-button size="large" @click="register" type="primary"
                >注册</a-button
              >
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </form>
  </div>
</template>

<script src='./index.jsx'>
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
