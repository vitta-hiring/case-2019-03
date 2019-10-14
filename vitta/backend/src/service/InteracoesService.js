import Repository from '../repository/interacaoRepository';
import Db from '../conexaoBancoDeDados';

export const buscaInteracaoesPorListaMedicamentos = async (medicamentos, split = '-', conn) => new Promise(async (resolve) => {
  const repo = new Repository(conn);
  const interacoes = await repo.validaInteracoes(medicamentos.split(split));

  // const db = new Db();
  // db.closeConection();

  resolve(interacoes);
});
