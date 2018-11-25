import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Prescription from '@/components/prescription/Main'
import PrescriptionCreate from '@/components/prescription/create/Main'
import PrescriptionMedication from '@/components/prescription/medication/Main'

Vue.use(Router)

export default new Router({
  html5: true,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/prescription',
      name: 'Prescription',
      component: Prescription
    },
    {
      path: '/prescription/:id/medication',
      name: 'Medication',
      component: PrescriptionMedication
    },
    {
      path: '/prescription/patient/:id',
      name: 'PrescriptionFilter',
      component: Prescription
    },
    {
      path: '/prescription/created',
      name: 'Created prescription',
      component: PrescriptionCreate
    }
  ]
})
