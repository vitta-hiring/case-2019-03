import React from 'react';
import { AnyAction } from "redux";
import { connect } from 'react-redux';
import { ThunkDispatch } from "redux-thunk";
import Formulario from './auxiliares/Formulario';
import { adicionaConsulta } from '../../actions/ActionsConsultas';
import { Consultas } from '../../reducers/consultasReducer';

type TipoProps = {
  proximoPasso: Function
}

type DispatchProps = {
  adicionaConsulta: (medico: string, paciente: string) => void
};

type Props = DispatchProps & TipoProps;

const FormularioNovaConsulta: React.FC<Props> = props => {

  let campos = [
    {
      'nome':'Médico',
      'validador': (value: string) => {
        if(value!=='') {
          return {
            valido: true,
            mensagem: '',
          };
        }
        return {
          valido: false,
          mensagem: 'Não há nada preenchido.',
        };
      }
    },
    {
      'nome':'Paciente',
      'validador': (value: string) => {
        if(value!=='') {
          return {
            valido: true,
            mensagem: '',
          };
        }
        return {
          valido: false,
          mensagem: 'Não há nada preenchido.',
        };
      }
    }
  ];

  const botaoContinuar = (medico: string,paciente: string) => {
    props.adicionaConsulta(medico,paciente);
    props.proximoPasso();
  }

  return (
    <Formulario campos={campos}
      submeter={botaoContinuar} textoSubmeter={'Continuar'} />
  )
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    Consultas, 
    void, 
    AnyAction
  >
): DispatchProps => ({
  adicionaConsulta: (medico: string, paciente: string) => 
    dispatch(adicionaConsulta(medico, paciente)),
});

export default connect(null,mapDispatchToProps)(FormularioNovaConsulta);
