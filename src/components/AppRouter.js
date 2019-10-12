import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Main from '../components/Main'

import NotFoundPage from '../components/NotFoundPage'
import AddPrescricao from './AddPrescricao'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={Main} exact={true}></Route>
                <Route path="/addprescricao/:medico" component={AddPrescricao} exact={true}></Route>
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter