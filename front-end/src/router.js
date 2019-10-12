import Vue from 'vue'
import Router from 'vue-router'

import AttendanceView from './views/Attendance/View'
import PrescriptionList from './views/Prescription/List'
import PrescriptionForm from './views/Prescription/Form'
import PrescriptionView from './views/Prescription/View'

Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: '/attendance/1'},
        {path: '/attendance', redirect: '/attendance/1'},
        {
            path: '/attendance/:id', component: AttendanceView, children: [
                {path: '', component: PrescriptionList},
                {path: 'prescription/form', component: PrescriptionForm},
                {path: 'prescription/:idPrescription/view', component: PrescriptionView}
            ]
        },
        {path: '*', redirect: '/attendance/1'}
    ]
})
