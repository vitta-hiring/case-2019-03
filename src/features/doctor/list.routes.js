import React, { lazy } from 'react'

const ListDoctors = lazy(() => import('./pages/ListDoctors'))

const routes = {
    component: () => <ListDoctors />,
    name: 'ListDoctors',
    path: '/list-doctors'
}

export { routes }
