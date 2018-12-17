import controle from '../service/ControleService'
import { withStatusCode } from '../util/response';
import Db from '../conexaoBancoDeDados';

const notFound = withStatusCode(404);
const ok = withStatusCode(200, JSON.stringify);

export const validaSeeder = async (event) => {
  const db = new Db();
  const { conn } = db;

  const retorno = await controle(conn);

  return ok({ insert: retorno })

};

