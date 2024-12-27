<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" type="text" placeholder="Username" />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" placeholder="Password" />
      </div>
      <button @click="handleLogin">Login</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import axiosInstance from '@/utils/axios';

const router = useRouter();
const store = useStore();
const USER_ID = ref('');
const USER_PW = ref('');

const handleLogin = async () => {
  try {
    const response = await axiosInstance.post('/auth/getToken', {
        USER_ID: USER_ID.value,
        USER_PW: USER_PW.value
    });
    
    if (response.data) {
      // 토큰 저장
      localStorage.setItem('token', response.data.token);
      
      // axios 인스턴스에 토큰 설정
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      
      // 메뉴 데이터 호출
      const menuResponse = await axiosInstance.get('/webCommon/getMenu');
      
      // Vuex store에 메뉴 데이터 저장
      store.commit('setMenuData', menuResponse.data);
      
      // main 페이지로 이동
      router.push('/main');
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
