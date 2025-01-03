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
          <!-- Level 1 -->
          <template v-for="menu in formattedMenuList" :key="menu.MENU_ID">
            <el-sub-menu 
              v-if="menu.MENU_TYPE === 'F'"
              :index="menu.MENU_ID"
            >
              <template #title>
                <span>{{ menu.MENU_NAME }}</span>
              </template>
              
              <!-- Level 2 -->
              <template v-for="subMenu in menu.children" :key="subMenu.MENU_ID">
                <el-sub-menu 
                  v-if="subMenu.MENU_TYPE === 'F'"
                  :index="subMenu.MENU_ID"
                >
                  <template #title>
                    <span>{{ subMenu.MENU_NAME }}</span>
                  </template>
                  
                  <!-- Level 3 -->
                  <template v-for="thirdMenu in subMenu.children" :key="thirdMenu.MENU_ID">
                    <el-sub-menu
                      v-if="thirdMenu.MENU_TYPE === 'F'"
                      :index="thirdMenu.MENU_ID"
                    >
                      <template #title>
                        <span>{{ thirdMenu.MENU_NAME }}</span>
                      </template>

                      <!-- Level 4 -->
                      <el-menu-item
                        v-for="fourthMenu in thirdMenu.children"
                        :key="fourthMenu.MENU_ID"
                        :index="fourthMenu.MENU_ID"
                        @click="handleMenuClick(fourthMenu)"
                      >
                        {{ fourthMenu.MENU_NAME }}
                      </el-menu-item>
                    </el-sub-menu>

                    <el-menu-item
                      v-else
                      :index="thirdMenu.MENU_ID"
                      @click="handleMenuClick(thirdMenu)"
                    >
                      {{ thirdMenu.MENU_NAME }}
                    </el-menu-item>
                  </template>
                </el-sub-menu>
                
                <el-menu-item
                  v-else
                  :index="subMenu.MENU_ID"
                  @click="handleMenuClick(subMenu)"
                >
                  {{ subMenu.MENU_NAME }}
                </el-menu-item>
              </template>
            </el-sub-menu>

            <el-menu-item
              v-else
              :index="menu.MENU_ID"
              @click="handleMenuClick(menu)"
            >
              {{ menu.MENU_NAME }}
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

    const formattedMenuList = computed(() => {
      const menus = menuList.value
      const formattedMenus = menus.filter(menu => !menu.PARENTS_MENU_ID)
      
      formattedMenus.forEach(menu => {
        if (menu.MENU_TYPE === 'F') {
          // Level 2
          const level2Items = menus.filter(item => item.PARENTS_MENU_ID === menu.MENU_ID)
          
          level2Items.forEach(l2Item => {
            if (l2Item.MENU_TYPE === 'F') {
              // Level 3
              const level3Items = menus.filter(item => item.PARENTS_MENU_ID === l2Item.MENU_ID)
              
              level3Items.forEach(l3Item => {
                if (l3Item.MENU_TYPE === 'F') {
                  // Level 4
                  l3Item.children = menus.filter(item => item.PARENTS_MENU_ID === l3Item.MENU_ID)
                }
              })
              
              l2Item.children = level3Items
            }
          })
          
          menu.children = level2Items
        }
      })
      
      return formattedMenus
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
      formattedMenuList,
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

:deep(.el-menu-item) {
  background-color: #1890ff !important;
  color: white !important;
}

:deep(.el-menu-item:hover) {
  background-color: #40a9ff !important;
}

:deep(.el-sub-menu__title) {
  background-color: #faad14 !important;
  color: white !important;
}

:deep(.el-sub-menu__title:hover) {
  background-color: #ffc53d !important;
}

:deep(.el-menu-item.is-active) {
  background-color: #096dd9 !important;
  color: white !important;
}

:deep(.el-menu-item), :deep(.el-sub-menu__title) {
  padding-left: 20px !important;
}

:deep(.el-sub-menu .el-menu-item) {
  padding-left: 40px !important;
}

:deep(.el-sub-menu .el-sub-menu .el-menu-item) {
  padding-left: 60px !important;
}

:deep(.el-sub-menu .el-sub-menu .el-sub-menu .el-menu-item) {
  padding-left: 80px !important;
}
</style>
