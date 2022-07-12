// 操作日志: 通过路径直接显示相应操作 文案

// 路径映射表
const LOG_MAP = [
  ['/character/list', '获取角色列表'],
  ['/log/list', '获取日志列表'],
  ['/user/info', '获取自己的登陆信息'],
  ['/user/list', '获取用户列表'],
  ['/good', '删除商品'],
  ['/good/add', '添加商品'],
  ['/good/update', '修改商品'],
  ['/good/list', '获取商品列表'],
  ['/good/getStore', '获取数据报表'],
  ['/good-classify', '删除分类'],
  ['/good-classify/update', '修改分类'],
  ['/good-classify/list', '获取分类列表'],
  ['/good-classify/add', '添加分类'],
  ['/upload/file', '上传文件'],
  ['/inventory-log/getSaleValue', '获取数据报表'],
  ['/invite/list', '获取邀请码列表'],
  ['/notice', '删除公告'],
  ['/notice/list', '获取公告列表'],
  ['/notice/add', '添加公告'],
  ['/notice/update', '修改公告'],
  ['/forget-password/list', '获取重置密码列表'],
  ['/invite', '删除邀请码'],
  ['/invite/list', '获取邀请码列表'],
  ['/invite/add', '添加邀请码'],
  ['/dashboard/base-info', '获取总览'],
  ['/demand', '删除需求'],
  ['/demand/list', '获取需求列表'],
  ['/demand/add', '添加需求'],
  ['/demand/update', '更改需求'],
  ['/inventory-log/list', '获取出入库列表'],
  ['/user/reset/password', '重置密码'],
  ['/user/add', '添加用户'],
]

export const getLogInfoByPath = (path) => {
  let title = ''

  LOG_MAP.forEach((item) => {
    // 如果包含此路径
    if (path.includes(item[0])) {
      title = path.replace(item[0], item[1])
    }
  })

  return title || path
}