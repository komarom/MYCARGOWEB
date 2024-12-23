import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/LoginPage.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/fms',
    name: 'FMS',
    component: () => import('@/views/FMS/FMSPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tms',
    name: 'TMS',
    component: () => import('@/views/TMS/TMSPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wms',
    name: 'WMS',
    component: () => import('@/views/WMS/WMSPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/bms',
    name: 'BMS',
    component: () => import('@/views/BMS/BMSPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/Report/ReportPage.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 네비게이션 가드 추가
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 인증이 필요한 페이지에 접근하려고 할 때
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      next({ name: 'Login' })
    } else {
      next() // 토큰이 있으면 진행
    }
  } else {
    next() // 인증이 필요없는 페이지는 그냥 진행
  }
})

export default router 