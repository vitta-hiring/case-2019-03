import Vue from 'vue'
import Router from 'vue-router'

import NewPrescription from '../views/NewPrescription'
import Prescriptions from '../views/Prescriptions'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/new-prescription',
      name: 'NewPrescription',
      component: NewPrescription
    },
    {
      path: '/prescriptions',
      name: 'Prescriptions',
      component: Prescriptions
    }
  ],
  mode: 'history'
})

router.replace({ path: 'new-prescription', redirect: '/new-prescription' })

export default router
