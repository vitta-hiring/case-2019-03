import React, { lazy } from 'react'

const ListPrescriptions = lazy(() => import('./pages/ListPrescriptions'))

const routes = {
    component: () => <ListPrescriptions />,
    name: 'ListPrescriptions',
    path: '/list-prescriptions'
}

export { routes }
