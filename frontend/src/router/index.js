import Vue from "vue"
import Router from "vue-router"

import NewPrescription from '../NewPrescription'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'NewPrescription',
            component: NewPrescription
        }
    ],
    mode: 'history'
})

export default router