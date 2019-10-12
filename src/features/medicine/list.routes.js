import React, { lazy } from 'react'

const ListMedicines = lazy(() => import('./pages/ListMedicines'))

const routes = {
    component: () => <ListMedicines />,
    name: 'ListMedicines',
    path: '/list-medicines'
}

export { routes }
