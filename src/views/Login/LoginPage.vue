<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo-text">MyCargo</div>
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <input 
            type="ID" 
            v-model="ID" 
            placeholder="ID"
            required
          >
        </div>
        <div class="form-group">
          <input 
            type="PW" 
            v-model="PW" 
            placeholder="PW"
            required
          >
        </div>
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      ID: '',
      PW: '',
      error: null,
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.error = null;
      this.loading = true;

      try {
        const response = await axios.post('/auth/getToken', {
          USER_ID: this.ID,
          USER_PW: this.PW
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        });

        if (response.data) {
          localStorage.setItem('token', response.data);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
          this.$router.push('/fms');
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.error('Login error:', error);
        
        // 에러 메시지 처리 로직
        if (error.response && error.response.data) {
          // 서버에서 오는 특정 에러 메시지에 따른 처리
          switch(error.response.data.message) {
            case 'DB Query Failed':
              this.error = 'Invalid ID or Password';
              break;
            case 'Invalid credentials':
              this.error = 'Invalid ID or Password';
              break;
            default:
              this.error = 'Login failed. Please try again.';
          }
        } else if (error.request) {
          this.error = 'Unable to connect to server';
        } else {
          this.error = 'Login failed. Please try again later';
        }
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.logo-text {
  font-family: 'Montserrat', sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: #390ed1;
  margin-bottom: 30px;
  letter-spacing: -1px;
  text-transform: uppercase;
  background: linear-gradient(45deg, #390ed1, #390ed1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
}

.form-group input:focus {
  border-color: #390ed1;
}

.login-button {
  background-color: #390ed1;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #3aa876;
}

/* 모바일 반응형 스타일 */
@media (max-width: 480px) {
  .login-box {
    padding: 20px;
  }
  
  .form-group input {
    padding: 10px;
  }
}

.error-message {
  color: #ff4444;
  margin-bottom: 10px;
  text-align: center;
}

.login-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style> 