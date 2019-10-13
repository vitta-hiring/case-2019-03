import map from 'lodash/map';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';

import medicamentos from '../../../services/mock/medicamentos.json';

export const findDataDrug = (data: any) => {
  const result = map(data, drugId => {
    const findItems = filter(medicamentos, item => item.IdMedicamento === Number(drugId));
    return findItems;
  });
  return flattenDeep(result);
};
