import React, { useState, useEffect } from 'react';
import { Layout } from '../../components/Layout';
import { FormIdentification } from '../../components/FormIdentification';
import {
  onRemoveSpecificItemInArray,
  genUniqueId,
  genDoctorRecordDate,
} from '../../utils/functions';
import { Container } from 'reactstrap';
import { verifyDrugsIteraction } from '../../utils/verifyDrugsInteraction';

export const MedicalRecords = () => {
  const [nameMedic, setNameMedic] = useState('');
  const [namePatient, setNamePatient] = useState('');
  const [selectMedicine, setSelecteMedicine] = useState<string[]>([]);
  const [hasPrescription, setHasPrescription] = useState(false);

  const [payloaStorage, setPayloadStorage] = useState<any>([]);

  const handleChangeMedic = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNameMedic(e.target.value);
  const handleChangePattient = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNamePatient(e.target.value);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setPayloadStorage([
      ...payloaStorage,
      {
        id: genUniqueId(),
        date: genDoctorRecordDate(),
        namePatient,
        nameMedic,
        selectMedicine,
      },
    ]);
  };

  useEffect(() => {
    const stringify = JSON.stringify(payloaStorage);
    localStorage.setItem('#prescription', stringify);
  }, [payloaStorage]);

  const handleChange = (e: any) => {
    const getCurrentElementId = (document.getElementById(e.currentTarget.id) as HTMLInputElement)
      .checked;
    const getCurrentElement = e.currentTarget.value;
    getCurrentElementId
      ? setSelecteMedicine([...selectMedicine, getCurrentElement])
      : setSelecteMedicine(onRemoveSpecificItemInArray(selectMedicine, getCurrentElement));
  };

  const handleClickSeeMedicine = () => setHasPrescription(!hasPrescription);

  // Fixme: funcao 'verifyDrugsIteraction()' ainda não retorna as interacoes medicamentosas
  // faz apenas a busca por tipo de farmaco a intersecção entre os
  // tipos de farmaco ficara para uma proxima; =/
  verifyDrugsIteraction(selectMedicine);
  return (
    <Layout>
      <Container>
        <section>
          <h2>Prescrição médica</h2>
          <FormIdentification
            onSubmit={handleSubmit}
            onClick={handleClickSeeMedicine}
            onChangeMedic={handleChangeMedic}
            onChangePattient={handleChangePattient}
            onChangeMedicine={handleChange}
            hasPrescription={hasPrescription}
          />
        </section>
      </Container>
    </Layout>
  );
};
