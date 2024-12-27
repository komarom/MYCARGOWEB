import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from './store'
import router from './router'
import axios from 'axios'

// axios 인터셉터 설정
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // 토큰이 유효하지 않은 경우
      localStorage.removeItem('token') // 토큰 제거
      router.push('/') // 로그인 페이지로 리다이렉트
    }
    return Promise.reject(error)
  }
)

const app = createApp(App)
app.use(ElementPlus)
app.use(store)
app.use(router)
app.mount('#app')