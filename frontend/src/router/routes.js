
import createAttendance from 'pages/createAttendance.vue'
import prescriptions from 'pages/prescriptions.vue'

const routes = [
  {
    path: '/',
    component: () => import('pages/Login.vue')
  },
  { path: '/login', name: 'login', component: () => import('pages/Login.vue') },
  { path: '/signup', name: 'signup', component: () => import('pages/SignUp.vue') },
  { path: '/dashboard',
    name: 'dashboard',
    component: () => import('layouts/Dashboard.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/createAttendance',
        name: 'createAttendance',
        component: createAttendance,
        meta: {
          title: 'More Doctors - Novo Atendimento',
          requiresAuth: true
        }
      },
      {
        path: '/prescriptions',
        name: 'prescriptions',
        component: prescriptions,
        meta: {
          title: 'More Doctors - Prescrições',
          requiresAuth: true
        }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
