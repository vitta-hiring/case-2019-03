import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CadastroConsultas from './views/CadastroConsultas/CadastroConsultas';
import HistoricoConsultas from './views/HistoricoConsultas/HistoricoConsultas';

export default function ConsultasRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CadastroConsultas} />
        <Route path="/historico" component={HistoricoConsultas} />
      </Switch>
    </BrowserRouter>
  )
}