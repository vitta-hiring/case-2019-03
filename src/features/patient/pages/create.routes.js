import React, { lazy } from 'react'

const CreatePatient = lazy(() => import('./CreatePatient'))

const routes = {
    component: () => <CreatePatient />,
    name: 'create-patient',
    path: '/create-patient'
}

export { routes }
