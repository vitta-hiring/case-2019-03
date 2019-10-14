export default class PessoaRepository {
  constructor(conn) {
    this.db = conn;
  }

  getMedicos() {
    return new Promise((resolve) => {
      this.db.query('SELECT * FROM Pessoa WHERE medico is true', [], (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }

  getPacientes() {
    return new Promise((resolve) => {
      this.db.query('SELECT * FROM Pessoa WHERE medico is false', [], (err, results) => {
        if (err) throw err;
        resolve(results);
      });
    });
  }
}
