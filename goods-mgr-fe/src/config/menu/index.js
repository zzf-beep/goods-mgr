export default [
  {
    title: '总览',
    url: '/dashboard',
    onlyAdmin: false,
  },
  {
    title: '统计报表',
    url: '/out-input',
    onlyAdmin: false,
  },
  {
    title: '商品管理',
    url: '/goods',
    onlyAdmin: false,
  },
  {
    title: '需求管理',
    url: '/demand',
    onlyAdmin: false,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin: true,
  },
  {
    title: '操作日志',
    url: '/log',
    onlyAdmin: true,
  },
  {
    title: '其它',
    onlyAdmin: true,
    children: [
      {
        title: '分类管理',
        url: '/good-classify',
        onlyAdmin: true
      },
      {
        title: '公告功能',
        url: '/notice',
        onlyAdmin: true
      },
      {
        title: '邀请码',
        url: '/invite-code',
        onlyAdmin: true
      },
      {
        title: '重置密码列表',
        url: '/reset/password',
        onlyAdmin: true
      },
    ]
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin: false,
  },
]