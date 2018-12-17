import PessoaRepository from '../repository/pessoaRepository';
import Db from '../conexaoBancoDeDados';

export const listarTodosOsMedicos = conn => new Promise(async (resolve) => {
  // const db = new Db();

  const pessoasRepo = new PessoaRepository(conn);
  const medicos = await pessoasRepo.getMedicos();

  // await db.closeConection();

  resolve(medicos);
});

export const listarTodosPacientes = conn => new Promise(async (resolve) => {
  const pessoasRepo = new PessoaRepository(conn);
  const pacientes = await pessoasRepo.getPacientes();

  // const db = new Db();
  // await db.closeConection();

  resolve(pacientes);
});
