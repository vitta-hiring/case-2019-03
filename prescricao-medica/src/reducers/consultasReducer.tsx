import { Reducer } from 'redux';
import {
  ActionsConsultas,
  ActionsTypesConsultas,
} from '../actions/ActionsConsultas';
import ConsultaMedica from '../models/ConsultaMedica';

// Define o tipo consultas para tipar a o reducer
export interface Consultas {
  readonly consultas: ConsultaMedica[];
}

const estadoInicialConsultas: Consultas = {
  consultas: [],
};

export const consultasReducer: Reducer<Consultas, ActionsConsultas> = (
  state = estadoInicialConsultas,
  action
) => {
  switch (action.type) {
    case ActionsTypesConsultas.ADICIONA: {
      const novaConsultas = state.consultas.concat(action.novaConsulta);
      return {
        ...state,
        consultas: novaConsultas
      };
    }
    case ActionsTypesConsultas.ADICIONAPRESCRICAO: {
      const ultimaConsultaState = ultimaConsulta(state);
      ultimaConsultaState.adicionaPrescricao(action.novaPrescricao);
      return {
        ...state,
        consultas: [
          ...state.consultas.slice(0,state.consultas.length-1),
          ultimaConsultaState
        ]
      };
    }
    case ActionsTypesConsultas.CARREGACONSULTAS: {
      return {
        ...state,
        consultas: action.consultas
      };
    }
    default:
      return state;
  }
};

function ultimaConsulta(state: Consultas) {
  return state.consultas[state.consultas.length - 1];
}
