<template>
  <div class="login-container">
    <div class="login-box">
      <h2>MYCARGO</h2>
      <form @submit.prevent="handleLogin">
        <input
          type="text" 
          v-model="USER_ID"
          placeholder="ID"
          class="login-input"
        />
        <input
          type="password"
          v-model="USER_PW" 
          placeholder="Password"
          class="login-input"
        />
        <label class="save-login">
          <input
            type="checkbox"
            v-model="saveLogin"
          />
          <span>Save ID/Password</span>
        </label>
        <button type="submit" :disabled="loading">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import axios from '@/config/axios'

const router = useRouter()
const store = useStore()
const loading = ref(false)

const USER_ID = ref('')
const USER_PW = ref('')
const saveLogin = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true

    const response = await axios.post('/auth/getToken', {
      USER_ID: USER_ID.value,
      USER_PW: USER_PW.value
    })

    if (saveLogin.value) {
      localStorage.setItem('savedUserId', USER_ID.value);
      localStorage.setItem('savedPassword', USER_PW.value);
      localStorage.setItem('saveCredentials', 'true');
    } else {
      localStorage.removeItem('savedUserId');
      localStorage.removeItem('savedPassword');
      localStorage.setItem('saveCredentials', 'false');
    }

    if (response?.data) {
      if (response?.data === 'Authorization header missing or invalid format' ||
          response?.data === 'Token is invalid due to another login' ||
          response?.data === 'Authorization token missing or invalid') {
        throw new Error(response.data);
      }

      const token = response.data
      const authHeader = 'Bearer ' + token
      
      store.commit('setAuthHeader', authHeader)
      
      const loginInfo = await axios.post('/webCommon/getLoginInfo', {}, {
        headers: {
          'Authorization': authHeader
        }
      })
      
      if (loginInfo?.data) {
        const userData = loginInfo.data[0]
        localStorage.setItem('sessionData', JSON.stringify(userData))
        store.commit('setUserInfo', userData)
      
        ElMessage.success('Login Success')
        router.push('/main')
      }
    }
  } catch (error) {
    const errorMessage = {
      401: 'Invalid ID or Password',
      500: 'Invalid ID or Password',
      undefined: 'Network Connection Error'
    }[error.response?.status] || 'Login Failed'
  
    ElMessage.error(errorMessage)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  USER_ID.value = localStorage.getItem('savedUserId') || '';
  USER_PW.value = localStorage.getItem('savedPassword') || '';
  saveLogin.value = localStorage.getItem('saveCredentials') === 'true';
})
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
}

.login-box {
  width: 100%;
  max-width: 360px;
  padding: 40px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.login-box h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #1890ff;
  font-size: clamp(40px, 8vw, 50px);
  font-weight: 600;
  letter-spacing: 1px;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-input {
  width: 280px;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
}

.save-login {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px;
  width: 280px;
}

.save-login input[type="checkbox"] {
  margin: 0;
}

button {
  width: 280px;
  height: 40px;
  background-color: #1890ff;
  border-color: #1890ff;
  color: white;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

button:disabled {
  background-color: #a0cfff;
  border-color: #a0cfff;
  cursor: not-allowed;
}

/* 자동완성 배경색 제어 */
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
  -webkit-text-fill-color: #000000 !important;
  transition: background-color 5000s ease-in-out 0s !important;
}

input:-internal-autofill-selected {
  background-color: #ffffff !important;
  appearance: none !important;
}
</style>
