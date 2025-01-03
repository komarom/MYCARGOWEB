import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://27.71.17.99:9090'
})

export default instance