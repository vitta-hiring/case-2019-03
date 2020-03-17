import React from 'react';
import { connect } from 'react-redux';
import ConsultaMedica from '../../models/ConsultaMedica';
import { AplicativoState } from '../../store/store';
import { Typography, Button, makeStyles } from '@material-ui/core';
import LocalStorageCalls from '../../helpers/LocalStorageCalls';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop:10,
  },
  espacamentoBotao: {
    marginRight:20,
  }
}));

type TipoProps = {
  voltarPasso: Function,
  proximoPasso: Function,
}

type StateProps = {
  consultas: ConsultaMedica[];
};

type Props = StateProps & TipoProps;

const SalvarConsulta: React.FC<Props> = props => {
  const clases = useStyles();

  const salvarConsulta = () => {
    LocalStorageCalls.salvaConsultas(props.consultas);
    props.proximoPasso();
  }

  return (
    <div>
      <Typography>
        Agora que você adicionou todos as prescrições já pode encerrar esta 
        consulta. Caso tenha esquecido de adicionar alguma prescrição, também ainda dá tempo de 
        voltar.
      </Typography>
      <div className={clases.container}>
        <Button onClick={() => props.voltarPasso()} 
          className={clases.espacamentoBotao}>
          Voltar
        </Button>
        <Button variant='contained' color='primary' 
          onClick={salvarConsulta} >
          Salvar Consulta
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = (store: AplicativoState) => {
  return {
    consultas: store.consultasState.consultas,
  };
};

export default connect(mapStateToProps)(SalvarConsulta);
