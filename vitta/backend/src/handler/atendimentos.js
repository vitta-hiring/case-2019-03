import { listaAtendimentosPorIdPessoa, buscaMedicamentosPorIdAtendimento } from '../service/AtendimentoService';
import { withStatusCode } from '../util/response';
import GeraAtendimentoCmd from '../cmd/GerarAtendimentoCmd';
import Db from '../conexaoBancoDeDados';

const notFound = withStatusCode(404);
const ok = withStatusCode(200, JSON.stringify);
const error = withStatusCode(500, JSON.stringify);


export const getAtendimentos = async (event) => {
  const db = new Db();
  const { conn } = db;

  const { idPessoa } = event.pathParameters;

  const atendimentos = await listaAtendimentosPorIdPessoa(idPessoa, conn);

  db.closeConection();

  if (!atendimentos) {
    return notFound();
  }

  return ok(atendimentos);
};

export const getMedicamentosAtendimento = async (event) => {
  const db = new Db();
  const { conn } = db;

  const { idAtendimento } = event.pathParameters;

  const medicamentos = await buscaMedicamentosPorIdAtendimento(idAtendimento, conn);

  db.closeConection();

  if (!medicamentos) {
    return notFound();
  }

  return ok(medicamentos);
};

export const novoAtendimento = async (event) => {
  const db = new Db();
  const { conn } = db;

  try {
    const idAtendimento = await GeraAtendimentoCmd(event.body, conn);
    db.closeConection();
    return ok(idAtendimento);
  } catch (err) {
    db.closeConection();
    return error(err);
  }
};
