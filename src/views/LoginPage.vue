<template>
  <div class="login-container">
    <div class="login-box">
      <h2>MYCARGO</h2>
      <el-form :model="loginForm" ref="loginFormRef" :rules="rules">
        <el-form-item prop="USER_ID">
          <el-input 
            v-model="loginForm.USER_ID" 
            placeholder="ID"
          />
        </el-form-item>
        <el-form-item prop="USER_PW">
          <el-input 
            v-model="loginForm.USER_PW" 
            type="password" 
            placeholder="Password"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">
            Login
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ElMessage, ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import axios from '@/config/axios'

const router = useRouter()
const store = useStore()
const loading = ref(false)
const loginFormRef = ref(null)

const loginForm = reactive({
  USER_ID: '',
  USER_PW: ''
})

const rules = {
  USER_ID: [{ required: true, message: 'Please enter your ID', trigger: 'blur' }],
  USER_PW: [{ required: true, message: 'Please enter your password', trigger: 'blur' }]
}
  const handleLogin = async () => {
    if (!loginFormRef.value) return

    try {
      await loginFormRef.value.validate()
      loading.value = true

      const response = await axios.post('/auth/getToken', loginForm)
    
      if (response?.data) {
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
        500: 'Server Error',
        undefined: 'Network Connection Error'
      }[error.response?.status] || 'Login Failed'
    
      ElMessage.error(errorMessage)
    } finally {
      loading.value = false
    }
    }
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
  font-size: clamp(20px, 5vw, 28px);
  font-weight: 600;
  letter-spacing: 1px;
}

:deep(.el-form) {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

:deep(.el-form-item) {
  width: 280px;
  margin-bottom: 20px;
}

:deep(.el-input__wrapper) {
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  width: 100%;
  box-sizing: border-box;
}

:deep(.el-button) {
  width: 280px;
  height: 40px;
  background-color: #1890ff;
  border-color: #1890ff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 4px;
}

:deep(.el-button:hover) {
  background-color: #40a9ff;
  border-color: #40a9ff;
}
</style>

Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
