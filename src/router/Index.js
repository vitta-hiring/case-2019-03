import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Prescricao from '@/components/Prescricao'

Vue.use(Router)

export default new Router({
  mode: 'history',
  children: [],
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Index',
      name: 'index',
      component: Index
    },
    {
      path: '/Prescricao',
      name: 'prescricao',
      component: Prescricao
    }
  ]
})
