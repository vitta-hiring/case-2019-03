export default class MedicamentoRepository {
  constructor(conn) {
    this.db = conn;
  }

  getMedicamentos() {
    return new Promise((resolve) => {
      this.db.query('SELECT * FROM Medicamento', [], (err, results) => {
        if (err) throw err;

        resolve(results);
      });
    });
  }

  getFarmacos(idMedicamento) {
    return new Promise((resolve) => {
      this.db.query(`select farmaco2
                          from Medicamento m
                                 join VinculoMedicamentoFarmaco v on m.id = v.idMedicamento
                                 join InteracaoMedicamentos i on v.farmaco=farmaco1
                          where m.id = ${idMedicamento}
                          UNION
                          select farmaco1
                          from Medicamento m
                                 join VinculoMedicamentoFarmaco v on m.id = v.idMedicamento
                                 join InteracaoMedicamentos i on v.farmaco=farmaco2
                          where m.id = ${idMedicamento}`, [], (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }
}
