import React from 'react';
import { Typography, Button, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    margin:20,
    padding:10,
    marginRight:40
  },
  espacamentoTexto: {
    marginBottom:10
  },
}));

type Props = {
  passoAtivo: number,
  resetarPassos: Function,
}

const FimPassoAPasso: React.FC<Props> = props => {
  const clases = useStyles();

  return (
    <div>
    { (props.passoAtivo === 3) ? 
      <Paper square elevation={4} className={clases.container}>
        <Typography className={clases.espacamentoTexto} >Consulta encerrada <br></br>
        Você já pode começar uma nova consulta.</Typography>
        <Button variant='contained' color='primary' 
          onClick={() => props.resetarPassos()}>
          Nova Consulta
        </Button>
      </Paper> : null
    }
    </div>
  )
}

export default FimPassoAPasso;