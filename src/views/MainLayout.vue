<template>
  <div class="layout-container">
    <div class="header">
      <div class="system-title">MYCARGO SYSTEM</div>
      <div class="user-info">
        <span>{{ userInfo?.USER_NAME }}</span>
        <el-button type="text" @click="handleLogout">Logout</el-button>
      </div>
    </div>
    <!-- 메뉴 영역 -->
    <div class="main-content">
      <div class="side-menu">
        <el-menu class="menu-vertical">
          <template v-for="menu in menuList" :key="menu.MENU_ID">
            <el-sub-menu 
              v-if="menu.MENU_TYPE === 'F'" 
              :index="String(menu.MENU_ID)"
            >
              <template #title>
                <span>{{ menu.MENU_NM }}</span>
              </template>
              <el-menu-item 
                v-for="subMenu in menu.children" 
                :key="subMenu.MENU_ID"
                :index="String(subMenu.MENU_ID)"
                @click="handleMenuClick(subMenu)"
              >
                {{ subMenu.MENU_NM }}
              </el-menu-item>
            </el-sub-menu>

            <el-menu-item 
              v-else 
              :index="String(menu.MENU_ID)"
              @click="handleMenuClick(menu)"
            >
              {{ menu.MENU_NM }}
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { ElButton } from 'element-plus'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const userInfo = computed(() => store.state.userInfo)

onMounted(() => {
  const authHeader = store.state.authHeader
  if (!authHeader) {
    router.push('/')
  }
})

const handleLogout = () => {
  store.commit('setAuthHeader', null)
  store.commit('setUserInfo', null)
  localStorage.removeItem('sessionData')
  localStorage.removeItem('token')
  router.push('/')
}

const handleMenuClick = (menu) => {
  if(menu.MENU_TYPE === 'M' && menu.SRC_PATH) {
    router.push(menu.SRC_PATH)
  }
}
</script>
<style scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.system-title {
  color: #1890ff;
  font-weight: 700;
  font-size: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
/* 로그아웃 버튼 스타일 추가 */
:deep(.el-button) {
  font-weight: 600;
}

.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.side-menu {
  width: 240px;
  background-color: #fff;
  border-right: 1px solid #dcdfe6;
  overflow-y: auto;
}

.menu-vertical {
  border-right: none;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}
</style>
