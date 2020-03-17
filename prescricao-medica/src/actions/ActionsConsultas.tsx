import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Consultas } from '../reducers/consultasReducer';
import ConsultaMedica from '../models/ConsultaMedica';
import PrescricaoMedica from '../models/PrescricaoMedica';

// Cria as constantes dos tipos de ação
export enum ActionsTypesConsultas {
  ADICIONA = 'ADICIONA',
  ADICIONAPRESCRICAO = 'ADICIONAPRESCRICAO',
  CARREGACONSULTAS = 'CARREGACONSULTAS',
}

// Cria interface que define parametros de cada ação
export interface ConsultasAdicionaAction {
  type: ActionsTypesConsultas.ADICIONA;
  novaConsulta: ConsultaMedica;
}
export interface ConsultasAdicionaPrescricaoAction {
  type: ActionsTypesConsultas.ADICIONAPRESCRICAO;
  novaPrescricao: PrescricaoMedica;
}
export interface CarregaConsultasAction {
  type: ActionsTypesConsultas.CARREGACONSULTAS;
  consultas: ConsultaMedica[];
}

// Combina as ações do tipo consulta
export type ActionsConsultas = 
  ConsultasAdicionaAction | 
  ConsultasAdicionaPrescricaoAction | 
  CarregaConsultasAction;

/* As ações devem seguir a tipagem:
<Promise<Tipo do retorno>, 
Tipo do reducer no qual ela está operando, 
Tipo do parametro que recebe,
Tipo da ação> */
export const adicionaConsulta: 
  ActionCreator<
    ThunkAction<Promise<any>, 
    Consultas, 
    void, 
    ConsultasAdicionaAction
  >
> = (medico: string,paciente: string) => {
  const novaConsulta =  new ConsultaMedica(medico,paciente,new Date());
  return async (dispatch: Dispatch) => {
    dispatch({
      novaConsulta: novaConsulta,
      type: ActionsTypesConsultas.ADICIONA,
    });
  };
};

export const adicionaPrescricao: 
  ActionCreator<
    ThunkAction<Promise<any>, 
    Consultas, 
    PrescricaoMedica, 
    ConsultasAdicionaPrescricaoAction
  >
> = (novaPrescricao) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      novaPrescricao: novaPrescricao,
      type: ActionsTypesConsultas.ADICIONAPRESCRICAO,
    });
  };
};

export const carregaConsultas: 
  ActionCreator<
    ThunkAction<Promise<any>, 
    Consultas, 
    ConsultaMedica[], 
    CarregaConsultasAction
  >
> = (consultas) => {
  return async (dispatch: Dispatch) => {
    dispatch({
      consultas: consultas,
      type: ActionsTypesConsultas.CARREGACONSULTAS,
    });
  };
};