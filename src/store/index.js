import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {
      realname: null,
    },
  },
  getters: {
    realname:state=>state.userInfo.realname,
  },
  mutations: {
    SET_USER_INFO(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
  },
  modules: {
  }
})
