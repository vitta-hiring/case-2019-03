
const validaPessoa = (db, idPessoa, medico = false) => new Promise((resolve) => {
  db.query(`select 1 FROM Pessoa where id = ${idPessoa} and medico is ${medico}`, [],
    (err, results) => {
      if (err) throw new Error(`GerarAtendimentoCMD Erro SQL - ${err}`);
      resolve(results.length > 0);
    });
});

const validate = (atendimento, db) => new Promise(async (resolve) => {
  const { medico, paciente, parecer } = atendimento;

  const medicoValido = await validaPessoa(db, medico, true);
  if (!medicoValido) {
    throw new Error(`GerarAtendimentoCMD idMedico=${medico} não é valido`);
  }
  const pacienteValido = await validaPessoa(db, paciente, false);
  if (!pacienteValido) {
    throw new Error(`GerarAtendimentoCMD idMedico=${paciente} não é valido`);
  }
  if (!parecer || parecer === '') {
    throw new Error('GerarAtendimentoCMD parecer médico não pode ser nulo');
  }
  return resolve(true);
});

const insertMedicamentoAtendimento = (idAtendimento, idMedicamento, db) => {
  return new Promise((resolve) => {
    db.query(`INSERT INTO AtendimentoItens 
                 set idMedicamento = ${idMedicamento}, idAtendimento = ${idAtendimento}`, [],
    (err, result) => {
      if (err) {
        throw new Error(`GerarAtendimentoCMD insertMedicamento ${idMedicamento} e paciente ${idAtendimento} => ${err}`);
      }
      return resolve(result.insertId);
    });
  });
};

export default (dados, db) => new Promise(async (resolve) => {
  const dadosJson = JSON.parse(dados);
  const { atendimento } = dadosJson.data;
  await validate(atendimento, db);
  const {
    medico, paciente, parecer, medicamentos,
  } = atendimento;
  const atendimentoParaInsert = {
    idMedico: medico,
    idPaciente: paciente,
    parecer,
    data: new Date(),
  };
  db.query('INSERT INTO Atendimento SET ?', atendimentoParaInsert, (err, result) => {
    if (err) throw Error(`Falha ao inserir, GerarAtendimentoCMD: ${err}`);
    const idAtendimento = result.insertId;
    const medicamentosInsert = medicamentos
      .map(m => insertMedicamentoAtendimento(idAtendimento, m, db));
    return Promise.all(medicamentosInsert).then(() => resolve(idAtendimento));
  });
});
