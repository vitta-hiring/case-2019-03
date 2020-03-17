import React from 'react';
import PassoAPassoCadastro from './PassoAPassoCadastro';
import NavegadorSuperior from '../NavegadorSuperior';

const CadastroConsultas = () => {
  return (
    <NavegadorSuperior cabecalho={'Prescrições médicas'}>
      <PassoAPassoCadastro/>
    </NavegadorSuperior>
  );
}

export default CadastroConsultas;
