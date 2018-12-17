import { listarTodosOsMedicamentos } from '../service/MedicamentoService';
import { withStatusCode } from '../util/response';
import Db from '../conexaoBancoDeDados';

const notFound = withStatusCode(404);
const ok = withStatusCode(200, JSON.stringify);

export const getMedicamentos = async () => {
  const db = new Db();
  const { conn } = db;

  const retorno = await listarTodosOsMedicamentos(conn);

  db.closeConection();

  if (!retorno) {
    return notFound();
  }

  return ok(retorno);
};
