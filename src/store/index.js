import { createStore } from 'vuex'

const store = createStore({
  state: {
    authHeader: null,
    userInfo: null
  },
  mutations: {
    setAuthHeader(state, header) {
      state.authHeader = header
    },
    setUserInfo(state, info) {
      state.userInfo = info
    }
  }
})

export default store