import React from 'react';
import map from 'lodash/map';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import styles from './style.module.css';
import { MedicalRecordsDetails } from '../MedicalRecordsDetails';

export const ListOfMedicalRecords = ({ data }: any) => {
  if (!data || data.length === 0) {
    return null;
  }
  const str = JSON.parse(data);
  const list = () =>
    map(str, (item, idx) => {
      const { date, nameMedic, namePatient, selectMedicine } = item;
      return (
        <ListGroupItem key={`${idx}--${date}`} className={styles.medicalRecords}>
          <div className={styles.boxIdentification}>
            <span>
              <b>Data: </b>
              {date || '--'}
            </span>
            <span>
              <b>Médico: </b>
              {nameMedic || '--'}
            </span>
            <span>
              <b>Paciente: </b>
              {namePatient || '--'}
            </span>
          </div>
          <MedicalRecordsDetails data={selectMedicine} />
        </ListGroupItem>
      );
    });

  return (
    <Container>
      <ListGroup>{list()}</ListGroup>
    </Container>
  );
};
