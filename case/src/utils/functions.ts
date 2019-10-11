import remove from 'lodash/remove';
import uniqueId from 'lodash/uniqueId';
import filter from 'lodash/filter';
import map from 'lodash/map';

import drugs from '../services/mock/medicamentos.json';

export const onRemoveSpecificItemInArray = (array: any[], value: string | number) => {
  remove(array, item => item === value);
  return array;
};

export const genUniqueId = () => {
  const timeStamp = new Date().getTime();
  return uniqueId(`patient_${timeStamp}`);
};

export const genDoctorRecordDate = () => new Date().toLocaleString('pt-br');

export const getMedicalRecords = (listOfDrugsById: string[]) => {
  const allMedicalRecordsByIdList = map(listOfDrugsById, drugId => {
    const filterById = filter(drugs, item => item.IdMedicamento === Number(drugId));
    return filterById;
  });
  return allMedicalRecordsByIdList;
};
