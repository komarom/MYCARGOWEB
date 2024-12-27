<template>
  <div class="main-page">
    <h1>MYCARGO</h1>
    <div class="welcome-message">
      <h2>Welcome {{ userInfo?.USER_NM }}</h2>
      <p>메뉴를 선택하여 시작하세요.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
</script>

<style scoped>
.main-page {
  padding: 40px;
  text-align: center;
}

.welcome-message {
  margin-top: 40px;
}

h1 {
  color: #1890ff;
  font-size: 36px;
}

h2 {
  color: #333;
  margin-bottom: 16px;
}

p {
  color: #666;
  font-size: 16px;
}
</style>
