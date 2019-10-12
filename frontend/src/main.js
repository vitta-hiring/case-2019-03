import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

import axios from 'axios'

// allow use http client without Vue instance
const http = axios.create({
  baseURL: 'http://0.0.0.0:3333',
})

Vue.prototype.$http = http;

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')