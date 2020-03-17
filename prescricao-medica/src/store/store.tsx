import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import {
  Consultas,
  consultasReducer,
} from '../reducers/consultasReducer';

// Cria interface para tipar a store da aplicação
export interface AplicativoState {
  consultasState: Consultas;
}

const rootReducer = combineReducers<AplicativoState>({
  consultasState: consultasReducer,
});

export default function configuraStore(): Store<AplicativoState, any> {
  const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
  return store;
}