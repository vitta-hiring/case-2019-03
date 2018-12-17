const fs = require('fs');
const mysql = require('mysql');
// const Db = require('../conexaoBancoDeDados');
//
// const db = new Db();

const db = mysql.createPool({
  host: 'localhost',
  user: 'vitta',
  password: 'vitta',
  database: 'vitta',
});

function insertTabelaVinculo(idMedicamento, farmaco) {
  return new Promise((resolve) => {
    db.query(`INSERT INTO VinculoMedicamentoFarmaco SET idMedicamento = ${idMedicamento}, farmaco = '${farmaco}'`, [], (err, result) => {
      if (err) {
        console.log(`idMedicamento = ${idMedicamento}, farmaco = '${farmaco}'`);
        throw err;
      }
      resolve({ farmaco, id: result.insertId });
    });
  });
}


function insertVinculos(medidamento) {
  return new Promise(async (resolve) => {
    const { farmacos, id: idMedicamento } = medidamento;
    const insertsFarmacos = farmacos.map(f => insertTabelaVinculo(idMedicamento, f));
    await Promise.all(insertsFarmacos);
    resolve();
  });
}

function insertTabelaMedicamento(medicamento) {
  const newInsertMedicamento = { ...medicamento };
  delete newInsertMedicamento.farmacos;

  return new Promise((resolve) => {
    db.query('INSERT INTO Medicamento SET ?', newInsertMedicamento, (err, retorno) => {
      if (err) {
        throw err;
      }
      resolve({ ...medicamento, id: retorno.insertId });
    });
  });
}


function insertMedicamento(medicamento) {
  return new Promise(async (resolve) => {
    const medicamentoInserido = await insertTabelaMedicamento(medicamento);
    resolve(await insertVinculos(medicamentoInserido));
  });
}


function medicamentos() {
  return new Promise((resolve) => {
    fs.readFile('../dados/medicamentos.json', 'utf8', async (err, data) => {
      if (err) {
        return console.log('Erro ao ler arquivo');
      }

      const inserts = JSON.parse(data.
        replace(',{"IdMedicamento":25822,"Nome":"TEIPLAN","Farmaco":null,"Farmacos":["TEICOPLANINA"],"Concentracao":"200","Unidade":"MG","TipoMedicamento":"SIMILAR","FormaFarmaceutica":"PO LIOFILO INJETAVEL","ViaAdministracao":"INTRAVENOSA","CodigoATC":"J01XA02","UsoInterno":false,"Antimicrobiano":true,"Bula":"http://www.an',
        ']')
        ).map(({
          Nome: nome,
          Farmacos: farmacos,
          Label: descricao,
          ViaAdministracao: viaAdministracao,
        }) => insertMedicamento({
          nome, farmacos, descricao, viaAdministracao,
        }));
      await Promise.all(inserts);
      resolve();
    });
  });
}


function insertTabelaIntercao(interacao) {
  return new Promise((resolve) => {
    db.query('INSERT INTO InteracaoMedicamentos SET ?', interacao, (err) => {
      if (err) {
        throw err;
      }

      resolve();
    });
  });
}

function interacoes() {
  return new Promise((resolve) => {
    fs.readFile('../dados/interacao_medicamentosa.json', 'utf8', async (err, data) => {
      if (err) {
        return console.log('Erro ao ler arquivo');
      }

      const inserts = JSON.parse(
        data.replace(',{"Farmaco1":"QUINIDINA","Farmaco2":"ZOLMITRIPTANA","Nome":"Grave","Descricao":"O uso concomitante de zolmitriptano e antiarrítmicos classe IA pode resultar em aumento do risco de cardiotoxicidade (prolongamento do intervalo QT, tors',
          ']'),
      ).map(({
        Farmaco1: farmaco1,
        Farmaco2: farmaco2,
        Descricao: descricao,
        Nome: gravidade,
      }) => insertTabelaIntercao({
        farmaco1, farmaco2, gravidade, descricao,
      }));
      await Promise.all(inserts);
      resolve();
    });
  });
}

function insertTabelaPessoa (pessoa) {
  return new Promise((resolve) => {
    db.query('INSERT INTO Pessoa SET ?', pessoa, (err) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
}

function pessoas() {
  return new Promise(async (resolve) => {
    const pessoas = [{
      nome: 'Dr. João da Silva Jr',
      documento: '35160506241',
      medico: 1
    },{
      nome: 'Dra. Maria Morais',
      documento: '33325861229',
      medico: 1
    },{
      nome: 'Dr. Joana Silveira',
      documento: '86833334692',
      medico: 1
    },{
      nome: 'Pedro José Pires',
      documento: '37050931853',
      medico: 0
    },{
      nome: 'Maria Lopoldina Santos',
      documento: '59474078335',
      medico: 0
    },{
      nome: 'Romário José',
      documento: '47252928004',
      medico: 0
    },{
      nome: 'Rivelino Prestes',
      documento: '31514048205',
      medico: 0
    },{
      nome: 'João Alves da Silva',
      documento: '44705417020',
      medico: 0
    },{
      nome: 'Arthur Dias',
      documento: '20494358866',
      medico: 0
    },{
      nome: 'Sheila Tavares',
      documento: '86356876638',
      medico: 0
    }];

    const inserts = await pessoas.map(p => insertTabelaPessoa(p));

    await Promise.all(inserts);
    resolve()
  })
}


function updateControle () {
  return new Promise((resolve) => {
    db.query(`update ControleInsert set insertsFeitos = 1 where id = 1`, [], (err) => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
}

async function migrar() {
  console.log('iniciando seeder');
  // await Promise.all([medicamentos(), interacoes(), pessoas()]);
  pessoas()
  await updateControle();
  console.log('fim seeder');
  process.exit();
}

migrar();
