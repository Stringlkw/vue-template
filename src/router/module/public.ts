import type { RouteRecordRaw } from 'vue-router'

/*
 *公开路由表
 * */
const publicRoutes: RouteRecordRaw[] = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/index.vue'),
  },
  // 主页
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
  },
]

export default publicRoutes
