import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://27.71.17.99:9090',
  timeout: 10000,
  headers: { 
    'Content-Type': 'application/json'
  }
})

// Rest of your axios configuration code...
export default instance