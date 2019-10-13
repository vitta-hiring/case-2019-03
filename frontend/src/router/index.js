import Vue from 'vue'
import Router from 'vue-router'

import NewPrescription from '../views/NewPrescription'
import Doctors from '../views/Doctors'
import Patients from '../views/Patients'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/new-prescription',
      name: 'NewPrescription',
      component: NewPrescription
    },
    {
      path: '/doctors',
      name: 'Doctors',
      component: Doctors
    },
    {
      path: '/patients',
      name: 'Patients',
      component: Patients
    }
  ],
  mode: 'history'
})

router.replace({ path: 'new-prescription', redirect: '/new-prescription' })

export default router
