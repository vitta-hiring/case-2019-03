// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Notifications from 'vue-notification'
import HeaderPanel from './components/HeaderPanel.vue'
import VueMoment from 'vue-moment'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')

Vue.config.productionTip = false
Vue.use(Notifications)
Vue.component('header-panel', HeaderPanel)
Vue.use(VueMoment)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
