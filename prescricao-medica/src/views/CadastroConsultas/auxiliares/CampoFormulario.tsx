import React, { useState } from 'react';
import { TextField, makeStyles, Grid } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

type TipoProps = {
  nome: string,
  validador: Function,
  atualiza: Function,
  index: number,
}

const useStyles = makeStyles(theme => ({
  entradasDeTexto: {
    marginBottom: 10
  },
}));

export default function CampoFormulario ({ nome, validador, atualiza, index }: TipoProps) {
  const clases = useStyles();

  const [erro,setErro] = useState(false);
  const [mensagem,setMensagem] = useState('');

  const validacao = (event: React.ChangeEvent<HTMLInputElement>) => {
    let novoTexto = event.target.value;
    let respostaValidador = validador(novoTexto);
    atualiza(novoTexto,respostaValidador.valido,index);
    if(respostaValidador.valido) {
      setErro(false);
      return;
    }
    setMensagem(respostaValidador.mensagem);
    setErro(true);
  }
  
  return (
    <Grid container justify='space-evenly' 
          direction='column' alignItems='stretch'>
      <TextField required className={clases.entradasDeTexto} 
        label={nome} variant='outlined' error={erro} onChange={validacao} />
      { (erro) ?
      <MuiAlert className={clases.entradasDeTexto} elevation={4} 
        variant="outlined" severity="error">{mensagem}</MuiAlert> : null}
    </Grid>
  )
}