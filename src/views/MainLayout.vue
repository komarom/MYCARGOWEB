<template>
  <div class="layout-container">
    <div class="header">
      <div class="system-title">MYCARGO SYSTEM</div>
      <div class="user-info">
        <span>{{ userInfo?.USER_NAME }}</span>
        <el-button type="text" @click="handleLogout">Logout</el-button>
      </div>
    </div>
    <div class="main-content">
      <div class="side-menu">
        <el-menu class="menu-vertical">
          <!-- 1레벨 메뉴 -->
          <template v-for="menu in menuList" :key="menu.MENU_ID">
            <el-sub-menu 
              v-if="menu.children && menu.children.length > 0" 
              :index="String(menu.MENU_ID)"
            >
              <template #title>
                <span>{{ menu.MENU_NM }}</span>
              </template>
              
              <!-- 2레벨 메뉴 -->
              <template v-for="subMenu in menu.children" :key="subMenu.MENU_ID">
                <el-sub-menu 
                  v-if="subMenu.children && subMenu.children.length > 0"
                  :index="String(subMenu.MENU_ID)"
                >
                  <template #title>
                    <span>{{ subMenu.MENU_NM }}</span>
                  </template>
                  
                  <!-- 3레벨 메뉴 -->
                  <el-menu-item 
                    v-for="lastMenu in subMenu.children"
                    :key="lastMenu.MENU_ID"
                    :index="String(lastMenu.MENU_ID)"
                    @click="handleMenuClick(lastMenu)"
                  >
                    {{ lastMenu.MENU_NM }}
                  </el-menu-item>
                </el-sub-menu>
                
                <el-menu-item 
                  v-else
                  :index="String(subMenu.MENU_ID)"
                  @click="handleMenuClick(subMenu)"
                >
                  {{ subMenu.MENU_NM }}
                </el-menu-item>
              </template>
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

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from '@/config/axios'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const menuList = ref([])
    const userInfo = computed(() => store.state.userInfo)

    onMounted(async () => {
      // 사용자 정보 로드
      const userData = localStorage.getItem('userInfo')
      if (userData) {
        store.commit('setUserInfo', JSON.parse(userData))
      }

      // 메뉴 로드
      try {
        const authHeader = store.state.authHeader
        console.log("authHeader : "  + authHeader);
       
        const response = await axios.post('/webCommon/getMenu', {}, {
        headers: {
          'Authorization': authHeader
        }
      })

        menuList.value = response.data
        console.log("response : " + response);
        console.log("menuList : " + menuList.value);
      } catch (error) {
        console.error('Failed to load menu:', error)
      }
    })

    const handleLogout = () => {
      store.commit('setUserInfo', null)
      localStorage.removeItem('userInfo')
      router.push('/')
    }

    const handleMenuClick = (menu) => {
      if(menu.SRC_PATH) {
        router.push(menu.SRC_PATH)
      }
    }

    return {
      menuList,
      userInfo,
      handleLogout,
      handleMenuClick
    }
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
