import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import ('./views/Login.vue')
    },
    // {
    //   path: '/pacientes',
    //   name: '/pacientes',
    //   component: () => import('./views/Pacientes.vue'),
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/medicos',
      name: 'medicos',
      component: () => import('./views/Medicos.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/medico/:id',
      component: () => import('./views/Medico.vue'),
    },
    {
      path: '/medico/:id/addPaciente',
      component: () => import('./views/AddPaciente.vue'),
    },
    {
      path: '/addmedico',
      component: () => import('./views/AddMedico.vue')
    },
    {
      path: '/medico/:medicoId/paciente/:id',
      component: () => import('./views/Paciente.vue')
    },
    {
      path: '/cadastrar',
      component: () => import('./views/Cadastrar.vue')
    },
    {
      path: '/medico/:medicoId/paciente/:id/addmedicamento',
      component: () => import('./views/AddMedicamento.vue')
    }
  ]
})

router.beforeEach((to,from,next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(localStorage.getItem('userId') == null){


      next({
        path: '/login'
      })
    } else {
      next()
    }

  } else {
    next()
  }
})

export default router
