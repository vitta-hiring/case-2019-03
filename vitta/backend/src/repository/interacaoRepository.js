export default class InteracaoRepository {
  constructor(conn) {
    this.db = conn;
  }

  getInteracoes(farmaco1, farmaco2) {
    return new Promise((resolve) => {
      this.db.query(`select gravidade, descricao from InteracaoMedicamentos where farmaco1 = '${farmaco1}' and farmaco2 = '${farmaco2}'`, [], (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }

  validaInteracoes(ids) {
    return new Promise((resolve) => {
      this.db.query(`
         select m1.nome medicamento1, m2.nome medicamento2, i.*
         from Medicamento m1
                join VinculoMedicamentoFarmaco v1 on m1.id = v1.idMedicamento
                join InteracaoMedicamentos i on v1.farmaco=farmaco1
                join VinculoMedicamentoFarmaco v2 on i.farmaco2=v2.farmaco
                join Medicamento m2 on v2.idMedicamento=m2.id
         where m1.id in(${ids.join(', ')})  and m2.id in (${ids.join(', ')});`, [], (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }
}
