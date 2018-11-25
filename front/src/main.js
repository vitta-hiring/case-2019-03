// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import Moment from 'vue-moment'
import Toasted from 'vue-toasted'

Vue.use(VueSweetalert2)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(Moment)
Vue.use(Toasted, {
  theme: 'outline',
  position: 'bottom-right',
  duration: 5000,
  action: {
    text: 'FECHAR',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
