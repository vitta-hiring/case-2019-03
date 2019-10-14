import { listarTodosOsMedicos, listarTodosPacientes } from '../service/PessoaService';
import { withStatusCode } from '../util/response';
import Db from '../conexaoBancoDeDados';

const notFound = withStatusCode(404);
const ok = withStatusCode(200, JSON.stringify);

export const getMedicos = async () => {
  const db = new Db();
  const { conn } = db;
  const medicos = await listarTodosOsMedicos(conn);

  db.closeConection();

  if (!medicos) {
    return notFound();
  }

  return ok(medicos);
};

export const getPacientes = async () => {
  const db = new Db();
  const { conn } = db;

  const pacientes = await listarTodosPacientes(conn);

  db.closeConection();

  if (!pacientes) {
    return notFound();
  }

  return ok(pacientes);
};
