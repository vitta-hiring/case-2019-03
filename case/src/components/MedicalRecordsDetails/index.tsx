import React from 'react';
import map from 'lodash/map';
import styles from './style.module.css';

import { ListGroup, ListGroupItem, Alert } from 'reactstrap';
import { findDataDrug } from './utils/findDrugs';

export const MedicalRecordsDetails = ({ data }: any) => {
  if (!data || data.length === 0) {
    return (
      <Alert color="warning">
        <h5>Ainda não foram prescritos medicamentos!</h5>
      </Alert>
    );
  }
  const listItems = findDataDrug(data);

  const list = map(listItems, (item, idx) => {
    const { Nome, ViaAdministracao, Concentracao } = item;

    return (
      <ListGroupItem key={`${idx}`} className={styles.listDrugs}>
        <b>Nome do medicamento: {Nome}</b>
        {Concentracao && <span>Posologia: {Concentracao}</span>}
        <span>Via adminstração: {ViaAdministracao}</span>
      </ListGroupItem>
    );
  });

  return (
    <section>
      <h4>Medicamentos prescritos</h4>
      <ListGroup>{list}</ListGroup>
    </section>
  );
};
