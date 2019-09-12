import React, { lazy } from 'react'

const CreateMedicine = lazy(() => import('./CreateMedicine'))

const routes = {
    component: () => <CreateMedicine />,
    name: 'create-medicine',
    path: '/create-medicine'
}

export { routes }
