import map from 'lodash/map';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';
import flattenDepth from 'lodash/flattenDepth';
import union from 'lodash/union';

import drugs from '../services/mock/medicamentos.json';
import drugsIteraction from '../services/mock/interacao_medicamentosa.json';

const normalizeFilter = (data: any) => flattenDeep(data);

const safeDrugsIteraction = (data: any) => {
  const safeDrug = map(data, item => {
    const filtered = filter(drugsIteraction, iteraction => {
      const { Farmaco1, Farmaco2 } = iteraction;
      return item === Farmaco1 || item === Farmaco2;
    });
    return filtered;
  });
  return flattenDepth(safeDrug, 1);
};

const extractFarmacos = (data: any) => {
  const obj = map(data, item => {
    const { Farmacos } = item;
    return [Farmacos];
  });
  return union(flattenDepth(obj, 2));
};

const resultIteraction = (dataFarmacos: string[], dataIteraction: any) => {
  const resultFinal = map(dataFarmacos, item => {
    const filtered = filter(dataIteraction, { Farmaco1: item });
    const filtered2 = filter(dataIteraction, { Farmaco2: item });
    return { filtered, filtered2 };
  });
  return resultFinal;
};

export const verifyDrugsIteraction = (listOfDrugsById: string[]) => {
  const listFiltered = map(listOfDrugsById, drugId => {
    const filterById = filter(drugs, item => item.IdMedicamento === Number(drugId));
    return filterById;
  });

  const normalized = normalizeFilter(listFiltered);
  const objectExtractFarmacos = extractFarmacos(normalized);
  const drugsIteractionMapping = safeDrugsIteraction(objectExtractFarmacos);
  const resultDrugsIteraction = resultIteraction(objectExtractFarmacos, drugsIteractionMapping);

  return resultDrugsIteraction;
};
