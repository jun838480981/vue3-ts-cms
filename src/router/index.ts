import { createRouter, createWebHistory } from 'vue-router'
// routes使用源码里面定义好的类型 import type 表示导入的是一个类型
import { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    component: () => import('@/views/main/main.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  // 默认跳转到main 只要跳转的页面不是login就通过token判断跳转
  if (to.path !== '/login') {
    if (!token) {
      console.log('未登录')
      return '/login'
    }
  } else {
    if (token) {
      console.log('已登录')
      return '/main'
    }
  }
})

export default router
