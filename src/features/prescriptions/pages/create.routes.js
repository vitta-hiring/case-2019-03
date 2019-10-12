import React, { lazy } from 'react'

const CreatePrescription = lazy(() => import('./CreatePrescription'))

const routes = {
    component: () => <CreatePrescription />,
    name: 'create-prescription',
    path: '/create-prescription'
}

export { routes }
