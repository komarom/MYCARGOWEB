import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://27.71.17.99:9090'
})

// Rest of your axios configuration code...
export default instance