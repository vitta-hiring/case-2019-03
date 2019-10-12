import React, { lazy } from 'react'

const ListPatients = lazy(() => import('./pages/ListPatients'))

const routes = {
    component: () => <ListPatients />,
    name: 'ListPatients',
    path: '/list-patients'
}

export { routes }
