import React from 'react';
import { Provider } from 'react-redux';

import configuraStore from './store/store';
import ConsultasRouter from './ConsultasRouter';
import LocalStorageCalls from './helpers/LocalStorageCalls';
import { carregaConsultas } from './actions/ActionsConsultas';

export default function App() {

  const store = configuraStore();

  try {
    let consultas = LocalStorageCalls.getConsultas();

    store.dispatch(carregaConsultas(consultas));
  } catch (e) {
    console.log(e.message);
  }

  return (
    <Provider store={store}>
      <ConsultasRouter />
    </Provider>
  )
}