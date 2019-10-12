import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Theme from './assets/Theme'
import Routes from './_config/Routes'
import Header from './components/Header'
import Content from './components/Content'
import Sidebar from './components/SideBarMenu'

function App() {
    return (
        <BrowserRouter>
            <Theme />
            <Routes />
            <Header />
            <Sidebar />
            <Content />
        </BrowserRouter>
    )
}

export default App
