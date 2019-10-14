import Db from '../conexaoBancoDeDados';
import MedicamentoRepository from '../repository/medicamentoRepository';

export const listarTodosOsMedicamentos = conn => new Promise(async (resolve) => {
  const medicamentosRepo = new MedicamentoRepository(conn);
  const results = await medicamentosRepo.getMedicamentos();

  // const db = new Db();
  // db.closeConection();

  resolve(results);
});

export const buscarFarmacosPorIdMedicamento = (idMedicamento, conn) => new Promise(async (resolve) => {
  const medicamentosRepo = new MedicamentoRepository(conn);
  const results = await medicamentosRepo.getFarmacos(idMedicamento);

  // const db = new Db();
  // db.closeConection();

  resolve(results);
});
