<template>
  <div class="main-page">
    <div class="welcome-container">
      <div class="logo">MYCARGO</div>
      <div class="welcome-message">
        <h1>Welcome, <span class="user-name">{{ userInfo?.USER_NAME }}</span></h1>
        <p class="sub-text">Have a great day at work!</p>
      </div>
      <div class="time-display">{{ currentTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const userInfo = computed(() => store.state.userInfo)
const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})
</script>

<style scoped>
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background-color: #f5f7fa;
}

.welcome-container {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 600px;
}

.logo {
  font-size: 36px;
  font-weight: 700;
  color: #1890ff;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.welcome-message h1 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 10px;
}

.user-name {
  color: #1890ff;
  font-weight: 700;
}

.sub-text {
  font-size: 18px;
  color: #606266;
  margin: 20px 0;
}

.time-display {
  font-size: 24px;
  color: #909399;
  margin-top: 30px;
  font-weight: 500;
}
</style>
