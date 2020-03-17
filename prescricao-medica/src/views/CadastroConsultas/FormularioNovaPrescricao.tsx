import React from 'react';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import PrescricaoMedica from '../../models/PrescricaoMedica';
import ConsultaMedica from '../../models/ConsultaMedica';
import medicamentos from '../../models/Medicamentos';
import Formulario from './auxiliares/Formulario';
import { AplicativoState } from '../../store/store';
import { adicionaPrescricao } from '../../actions/ActionsConsultas';
import { Consultas } from '../../reducers/consultasReducer';
import ListaPrescricoes from './ListaPrescricoes';
import ListaInteracoes from './ListaInteracoes';

type TipoProps = {
  proximoPasso: Function
}

type DispatchProps = {
  adicionaPrescricao: (novaPrescricao: PrescricaoMedica) => void;
};

type StateProps = {
  consultas: ConsultaMedica[];
};

type Props = StateProps & DispatchProps & TipoProps;

const FormularioNovaPrescricao: React.FC<Props> = props => {

  let campos = [
    {
      'nome':'Remédio',
      'validador': (value: string) => {
        if(medicamentos.buscaRemedio(value)!==null) {
          return {
            valido: true,
            mensagem: '',
          };
        }
        return {
          valido: false,
          mensagem: 'Esse não é um remédio válido.',
        };
      }
    },
    {
      'nome':'Posologia',
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
      'nome':'Via de administração',
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
  ];

  const botaoPrescrever = (remedio: string,posologia: string,viaAdm: string) => {
    let objetoRemedio = medicamentos.buscaRemedio(remedio);
    if(objetoRemedio !== null) {
      const prescricao = new PrescricaoMedica(objetoRemedio,posologia,viaAdm);
      props.adicionaPrescricao(prescricao);
      return true;
    }
  }
  const botaoEncerrar = () => {
    props.proximoPasso();
  }

  const prescricoesAtuais = props.consultas[props.consultas.length - 1].prescricoes;
  const interacoesAtuais = props.consultas[props.consultas.length - 1].interacoesDasPrescricoes;
  
  return (
    <div>
      <ListaPrescricoes prescricoes={prescricoesAtuais} />
      <ListaInteracoes interacoes={interacoesAtuais} />
      <Formulario campos={campos}
        submeter={botaoPrescrever} textoSubmeter={'Prescrever'} 
        encerrar={botaoEncerrar} textoEncerrar={'Continuar'} />
    </div>
  )
}

const mapStateToProps = (store: AplicativoState) => {
  return {
    consultas: store.consultasState.consultas,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<
    Consultas, 
    PrescricaoMedica, 
    AnyAction
  >
): DispatchProps => ({
  adicionaPrescricao: (novaPrescricao: PrescricaoMedica) => dispatch(adicionaPrescricao(novaPrescricao))
});

export default connect(mapStateToProps,mapDispatchToProps)(FormularioNovaPrescricao);
