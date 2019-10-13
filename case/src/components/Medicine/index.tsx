import React from 'react';
import { ListItems } from './Components/ListItems';
import { MedicineProps } from '../../interfaces';
import { ListGroup } from 'reactstrap';

export const Medicines = ({ onChange }: MedicineProps) => {
  return (
    <section>
      <h3>Medicamentos disponivéis</h3>
      <ListGroup>
        <ListItems onChange={onChange} />
      </ListGroup>
    </section>
  );
};
