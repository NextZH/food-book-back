import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import './plugins/element.js'

import './utils/request.js'//配置请求拦截的文件

Vue.prototype.$api=api;

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
