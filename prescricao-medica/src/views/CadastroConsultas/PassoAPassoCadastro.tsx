import React, { useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import { Typography } from '@material-ui/core';
import FormularioNovaConsulta from './FormularioNovaConsulta';
import FormularioNovaPrescricao from './FormularioNovaPrescricao';
import SalvarConsulta from './SalvarConsulta';
import FimPassoAPasso from './FimPassoAPasso';

export default function PassoAPassoCadastro() {
  const [passoAtivo, setPassoAtivo] = useState(0);
  const passos = ['Preencha os envolvidos na consulta', 'Adicione remédios a consulta',
  'Finalize a consulta'];

  const proximoPasso = () => setPassoAtivo(passoAtivo+1);

  const voltarPasso = () => setPassoAtivo(passoAtivo-1);

  const resetar = () => setPassoAtivo(0);

  const conteudoPasso = (indice: number) => {
    switch (indice) {
      case 0:
        return <FormularioNovaConsulta proximoPasso={proximoPasso} />;
      case 1:
        return <FormularioNovaPrescricao proximoPasso={proximoPasso} />;
      case 2:
        return <SalvarConsulta voltarPasso={voltarPasso} proximoPasso={proximoPasso}/>;
      default:
        return 'Unknown step';
    }
  }

  return (
    <div>
      <Stepper activeStep={passoAtivo} orientation="vertical">
        {passos.map((passo, indice) => (
          <Step key={passo}>
            <StepLabel>
              <Typography>{passo}</Typography>
            </StepLabel>
            <StepContent>
              {conteudoPasso(indice)}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <FimPassoAPasso passoAtivo={passoAtivo} resetarPassos={resetar} />
    </div>
  );
}
