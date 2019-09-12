import React, { lazy } from 'react'

const CreateDoctor = lazy(() => import('./CreateDoctor'))

const routes = {
    component: () => <CreateDoctor />,
    name: 'create-doctor',
    path: '/create-doctor'
}

export { routes }
