import React from 'react';
import { Router, Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Home from '~/pages/Home';
import Interacoes from '~/pages/Interacoes';
import New from '~/pages/New';
import NewInteration from '~/pages/NewInteration';
import Profile from '~/pages/Profile';
import history from '~/services/history';

export default function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/new" component={New} isPrivate />
                <Route
                    path="/newinteration"
                    component={NewInteration}
                    isPrivate
                />
                <Route path="/home" component={Home} isPrivate />
                <Route path="/interacoes" component={Interacoes} isPrivate />
                <Route path="/register" component={SignUp} />
                <Route path="/" exact component={SignIn} />
                <Route path="/profile" component={Profile} isPrivate />

                <Route path="/" component={() => <h1>404</h1>} />
            </Switch>
        </Router>
    );
}
