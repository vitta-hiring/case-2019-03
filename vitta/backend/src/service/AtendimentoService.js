import AtendimentoRepository from '../repository/atendimentoRepository';

export const listaAtendimentosPorIdPessoa = (idPessoa, conn) => new Promise(async (resolve) => {
  const atendimentoRepo = new AtendimentoRepository(conn);
  const atendimentos = await atendimentoRepo.getAtendimentoPorIdPaciente(idPessoa);

  resolve(atendimentos);
});

export const buscaMedicamentosPorIdAtendimento = (idAtendimento, conn) => {
  return new Promise(async (resolve) => {
    const atendimentoRepo = new AtendimentoRepository(conn);
    const medicamentos = await atendimentoRepo.getMedicamentosPorAtendimentoId(idAtendimento);

    resolve(medicamentos);
  });
};
