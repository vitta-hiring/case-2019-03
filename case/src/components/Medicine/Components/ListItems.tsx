import React from 'react';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import medicamentos from '../../../services/mock/medicamentos.json';
import { MedicineProps } from '../../../interfaces/index.js';
import { Label, Input, ListGroupItem } from 'reactstrap';
import styles from '../style.module.css';

export const ListItems = ({ onChange }: MedicineProps) => {
  const order = orderBy(medicamentos, ['Nome'], ['asc', 'desc']);
  const list = () =>
    map(order, (item, idx) => {
      const { IdMedicamento, Nome, Concentracao, ViaAdministracao } = item;
      return (
        <ListGroupItem key={`${Nome}--${idx}`}>
          <Input
            type="checkbox"
            name={Nome}
            id={`${Nome}-${IdMedicamento}`}
            onChange={onChange}
            value={IdMedicamento}
          />
          <Label for={`${Nome}-${IdMedicamento}`} className={styles.item}>
            <b> {Nome}</b>
            <br />
            <span> Posologia: {Concentracao}</span>
            <br />
            <span> Via administracao: {ViaAdministracao}</span>
            <span> Farmaco: {item.Farmacos}</span>
          </Label>
        </ListGroupItem>
      );
    });

  return <>{list()}</>;
};
