export default class AtendimentoRepository {
  constructor(conn) {
    this.db = conn;
  }

  getAtendimentoPorIdPaciente(idPaciente) {
    return new Promise((resolve) => {
      this.db.query(`select a.id, data, parecer, m.nome, m.documento from Atendimento a join Pessoa m on idMedico = m.id where idPaciente = ${idPaciente}`,
        [], (err, results) => {
          if (err) throw err;
          resolve(results);
        });
    });
  }

  getMedicamentosPorAtendimentoId(idAtendimento) {
    return new Promise((resolve) => {
      this.db.query(`select a.id, m.nome nomeMedicamento, viaAdministracao, descricao from AtendimentoItens a join Medicamento m on idMedicamento= m.id where idAtendimento= ${idAtendimento}`,
        [], (err, results) => {
          if (err) throw err;
          resolve(results);
        });
    });
  }
}
