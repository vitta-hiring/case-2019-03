import React from 'react';
import styles from './style.module.css';
import { Medicines } from '../Medicine';
import { FormProps } from '../../interfaces';
import { Button, Form, FormGroup, Label, Input, Collapse, Card, CardBody } from 'reactstrap';

export const FormIdentification = ({
  onSubmit,
  onChangeMedic,
  onChangePattient,
  onChangeMedicine,
  onClick,
  hasPrescription,
}: FormProps) => {
  return (
    <>
      <Form className={styles.container} onSubmit={onSubmit}>
        <FormGroup>
          <Label for="medic">Nome médico</Label>
          <Input
            type="text"
            name="medic"
            id="medic"
            placeholder={`Digite o nome do/a Médico/a`}
            onChange={onChangeMedic}
          />
        </FormGroup>
        <FormGroup>
          <Label for="patient">Nome do/a paciente</Label>
          <Input
            type="text"
            name="patient"
            id="patient"
            placeholder={`Digite o nome do(a) paciente`}
            onChange={onChangePattient}
          />
        </FormGroup>
        <Button type="button" onClick={onClick}>
          Clique pare ver medicamentos disponíveis
        </Button>
        <Collapse isOpen={hasPrescription}>
          <Card>
            <CardBody className={styles.seeDrugs}>
              <Medicines onChange={onChangeMedicine} />
            </CardBody>
          </Card>
        </Collapse>

        <Button color="primary" type="submit">
          Criar prescrição
        </Button>
      </Form>
    </>
  );
};
