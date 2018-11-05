import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'
import store from './store/store'
import Vuelidate from 'vuelidate'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import App from './App.vue'
import Patients from './pages/patients.page.vue'
import Doctors from './pages/doctors.page.vue'
import Medications from './pages/medications.page.vue'
import Prescriptions from './pages/prescriptions.page.vue'
import Interactions from './pages/interactions.page.vue'

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(Vuelidate)
Vue.config.productionTip = false

const routes = [{
  path: '/patients',
  component: Patients
},
{
  path: '/doctors',
  component: Doctors
},
{
  path: '/medications',
  component: Medications
},
{
  path: '/prescriptions',
  component: Prescriptions
},
{
  path: '/interactions',
  component: Interactions
}
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
