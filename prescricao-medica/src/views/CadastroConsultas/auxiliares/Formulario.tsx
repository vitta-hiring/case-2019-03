import React, { useRef, useState } from 'react';
import { Grid, Button, makeStyles } from '@material-ui/core';
import CampoFormulario from './CampoFormulario';

const useStyles = makeStyles(theme => ({
  containerFormulario: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridFormulario: {
    width: '80%',
    display: 'flex',
  },
  segundoBotao: {
    marginTop: 10
  }
}));

interface Campo {
  nome: string,
  validador: Function,
}

type TipoProps = {
  campos: Campo[],
  submeter: Function,
  textoSubmeter: string,
  encerrar?: Function,
  textoEncerrar?: string,
}

export default function Formulario ({ campos,  submeter, textoSubmeter, encerrar, 
  textoEncerrar }: TipoProps) {
  
  const clases = useStyles();

  const refFormulario = useRef<HTMLFormElement>(null);

  const [camposPreenchidos,setCamposPreenchidos] = 
    useState(new Array(campos.length).fill(''));

  const [camposValidos,setCamposValidos] = 
    useState(new Array(campos.length).fill(false));

  const atualiza = (novoTexto:string,valido:boolean, i: number) => {
    camposPreenchidos[i] = novoTexto;
    setCamposPreenchidos([...camposPreenchidos]);
    camposValidos[i] = valido;
    setCamposValidos([...camposValidos]);
  }

  const formValido = () => {
    let resposta = camposValidos.reduce((prev,current) => 
      current ? prev : false ,true
    );
    return resposta;
  }

  const primeiroBotao = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    submeter(...camposPreenchidos);
    if(refFormulario.current !== null) {
      refFormulario.current.reset();
    }
  }

  const segundoBotao = () => {
    if(encerrar !== undefined)
      encerrar();
  }

  return (
    <form ref={refFormulario}>
      <div className={clases.containerFormulario} >
        <Grid className={clases.gridFormulario} container justify='space-evenly' 
          direction='column' alignItems='stretch'>

          {campos.map((campo,i) => 
            <CampoFormulario key={i} {...campo} index={i} atualiza={atualiza} />)}

          <Button variant='contained' type='submit' color='primary' 
            onClick={primeiroBotao} disabled={!formValido()} >
            {textoSubmeter}
          </Button>
          
          {(encerrar !== undefined) ? 
            <Button variant='outlined' color='primary' onClick={segundoBotao}
              className={clases.segundoBotao} >
              {textoEncerrar}
            </Button>
            : null
          }
        </Grid>
      </div>
    </form>
  )
}