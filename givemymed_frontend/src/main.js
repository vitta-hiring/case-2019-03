import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Notify from 'vue2-notify'

Vue.config.productionTip = false
Vue.use(Notify, { position: 'top-right'})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
