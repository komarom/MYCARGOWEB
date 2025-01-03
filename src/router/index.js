import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const routes = [
  {
    path: '/',
    redirect: '/index.html'
  },
  {
    path: '/index.html',
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
      },
      {
        path: '/common/user',
        name: 'UserManagement',
        component: () => import('@/views/common/user.vue')
      },
      {
        path: '/common/code',
        name: 'CodeManagement',
        component: () => import('@/views/common/code.vue')
      },
      {
        path: '/common/Customer',
        name: 'CustomerManagement',
        component: () => import('@/views/common/Customer.vue')
      },
      // FMS - AIR - IMPORT
      {
        path: '/FMS/AIR/IMPORT/AirImportHblList',
        name: 'AirImportHblList',
        component: () => import('@/views/FMS/AIR/IMPORT/AirImportHblList.vue')
      },
      {
        path: '/FMS/AIR/IMPORT/AirImportHblCreate',
        name: 'AirImportHblCreate',
        component: () => import('@/views/FMS/AIR/IMPORT/AirImportHblCreate.vue')
      },
      {
        path: '/FMS/AIR/IMPORT/AirImportMblList',
        name: 'AirImportMblList',
        component: () => import('@/views/FMS/AIR/IMPORT/AirImportMblList.vue')
      },
      {
        path: '/FMS/AIR/IMPORT/AirImportMblCreate',
        name: 'AirImportMblCreate',
        component: () => import('@/views/FMS/AIR/IMPORT/AirImportMblCreate.vue')
      },
      // FMS - AIR - EXPORT
      {
        path: '/FMS/AIR/EXPORT/AirExportHblList',
        name: 'AirExportHblList',
        component: () => import('@/views/FMS/AIR/EXPORT/AirExportHblList.vue')
      },
      {
        path: '/FMS/AIR/EXPORT/AirExportHblCreate',
        name: 'AirExportHblCreate',
        component: () => import('@/views/FMS/AIR/EXPORT/AirExportHblCreate.vue')
      },
      {
        path: '/FMS/AIR/EXPORT/AirExportMblList',
        name: 'AirExportMblList',
        component: () => import('@/views/FMS/AIR/EXPORT/AirExportMblList.vue')
      },
      {
        path: '/FMS/AIR/EXPORT/AirExportMblCreate',
        name: 'AirExportMblCreate',
        component: () => import('@/views/FMS/AIR/EXPORT/AirExportMblCreate.vue')
      },
      // FMS - OCN - IMPORT
      {
        path: '/FMS/OCN/IMPORT/OcnImportHblList',
        name: 'OcnImportHblList',
        component: () => import('@/views/FMS/OCN/IMPORT/OcnImportHblList.vue')
      },
      {
        path: '/FMS/OCN/IMPORT/OcnImportHblCreate',
        name: 'OcnImportHblCreate',
        component: () => import('@/views/FMS/OCN/IMPORT/OcnImportHblCreate.vue')
      },
      {
        path: '/FMS/OCN/IMPORT/OcnImportMblList',
        name: 'OcnImportMblList',
        component: () => import('@/views/FMS/OCN/IMPORT/OcnImportMblList.vue')
      },
      {
        path: '/FMS/OCN/IMPORT/OcnImportMblCreate',
        name: 'OcnImportMblCreate',
        component: () => import('@/views/FMS/OCN/IMPORT/OcnImportMblCreate.vue')
      },
      // FMS - OCN - EXPORT
      {
        path: '/FMS/OCN/EXPORT/OcnExportHblList',
        name: 'OcnExportHblList',
        component: () => import('@/views/FMS/OCN/EXPORT/OcnExportHblList.vue')
      },
      {
        path: '/FMS/OCN/EXPORT/OcnExportHblCreate',
        name: 'OcnExportHblCreate',
        component: () => import('@/views/FMS/OCN/EXPORT/OcnExportHblCreate.vue')
      },
      {
        path: '/FMS/OCN/EXPORT/OcnExportMblList',
        name: 'OcnExportMblList',
        component: () => import('@/views/FMS/OCN/EXPORT/OcnExportMblList.vue')
      },
      {
        path: '/FMS/OCN/EXPORT/OcnExportMblCreate',
        name: 'OcnExportMblCreate',
        component: () => import('@/views/FMS/OCN/EXPORT/OcnExportMblCreate.vue')
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