import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
  },
  {
    path: '/main',
    name: 'MainLayout',
    component: () => import('@/views/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'MainPage',
        component: () => import('@/views/MainPage.vue')
      }
    ],
    beforeEnter: (_to, _from, next) => {
      const authHeader = store.state.authHeader
      if (!authHeader) {
        next('/')
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router