import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://27.71.17.99:9090'
})

export default instance