import axios from 'axios'

axios.defaults.baseURL = 'http://27.71.17.99:9090'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default axios