import React, { lazy } from 'react'

const Home = lazy(() => import('./Home'))

const routes = {
    component: () => <Home />,
    name: 'home',
    path: '/'
}

export { routes }
