import { buscaInteracaoesPorListaMedicamentos } from '../service/InteracoesService';
import { withStatusCode } from '../util/response';
import Db from '../conexaoBancoDeDados';

const notFound = withStatusCode(404);
const ok = withStatusCode(200, JSON.stringify);

export const validaInteracoes = async (event) => {
  const db = new Db();
  const { conn } = db;

  const { medicamentos } = event.pathParameters;

  const retorno = await buscaInteracaoesPorListaMedicamentos(medicamentos, '-', conn);

  db.closeConection();

  if (!retorno) {
    return notFound();
  }

  return ok(retorno);
};
