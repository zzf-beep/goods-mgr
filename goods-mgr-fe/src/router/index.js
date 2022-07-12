import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import store from '@/store'
import { user } from '@/service'
import { message } from 'ant-design-vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth/index.vue'),
  },
  {
    path: '/',
    name: 'BasicLayout',
    redirect: '/auth',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "basicLayout" */ '../layout/BasicLayout/index.vue'),
    children: [
      // 设置嵌套路由
      {
        path: 'goods',
        name: 'Goods',
        component: () => import(/* webpackChunkName: "goods" */ '../views/Goods/index.vue')
      },
      {
        path: 'goods/:id',
        name: 'GoodDetail',
        component: () => import(/* webpackChunkName: "goodDetail" */ '../views/GoodDetail/index.vue')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "user" */ '../views/Users/index.vue')
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import(/* webpackChunkName: "log" */ '../views/Log/index.vue')
      },
      {
        path: 'reset/password',
        name: 'ResetPassword',
        component: () => import(/* webpackChunkName: "resetPassword" */ '../views/ResetPassword/index.vue')
      },
      {
        path: 'invite-code',
        name: 'InviteCode',
        component: () => import(/* webpackChunkName: "inviteCode" */ '../views/InviteCode/index.vue')
      },
      {
        path: 'good-classify',
        name: 'GoodClassify',
        component: () => import(/* webpackChunkName: "goodClassify" */ '../views/GoodClassify/index.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile/index.vue')
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "bashboard" */ '../views/Dashboard/index.vue')
      },
      {
        path: 'out-input',
        name: 'OutInput',
        component: () => import(/* webpackChunkName: "outInput" */ '../views/OutInput/index.vue')
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import(/* webpackChunkName: "notice" */ '../views/Notice/index.vue')
      },
      {
        path: 'notice/list',
        name: 'NoticeList',
        component: () => import(/* webpackChunkName: "noticeList" */ '../views/NoticeList/index.vue')
      },
      {
        path: 'demand',
        name: 'Demand',
        component: () => import(/* webpackChunkName: "demand" */ '../views/Demand/index.vue')
      },
    ]
  },
];

const router = createRouter({
  history: createWebHistory(),
  // 注册路由
  routes,
});

// 导航守卫
router.beforeEach(async (to, from, next) => {

  let res = {}

  try {
    res = await user.info()
  } catch(e) {
    if(e.message.includes('code 401')) {
      res.code = 401
    }
  }

  const { code } = res

  if(code === 401) {
    // 如果下一个路由的auth, 直接放行
    if (to.path === '/auth') {
      next()
      return
    }

    message.error('认证失败, 请重新登陆！')
    // 跳转到auth路由
    next('/auth')

    return
  }


  // 设置处理请求用户数据的数组
  // const reqArr = []

  // 如果stote下的character不为空 获取角色信息大全
  if (!store.state.characterInfo.length) {
    await store.dispatch('getCharacterInfo')
  }

  // 进入先发送info请求
  if (!store.state.userInfo.length) {
    await store.dispatch('getUserInfo')
  }

  // 获取分类信息
  await store.dispatch('getGoodClassify')

  // 统一处理promise请求, all请求全部完成后
  // await Promise.all(reqArr)

  // 如果走到这便是已经登陆就不让进入auth页面了
  if(to.path === '/auth') {
    next('/dashboard')
    return
  }

  next()
})

export default router;
