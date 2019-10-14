import mysql from 'mysql';

export default class ConexaoBancoDeDados {
  static instance;

  constructor() {
    if (this.instance) {
      return this.instance;
    }

    this.conn = mysql.createConnection({
      host: 'localhost',
      user: 'vitta',
      password: 'vitta',
      database: 'vitta',
    });

    this.instace = this;
  }

  closeConection() {
    return new Promise((resolve) => {
      this.conn.end((err) => {
        if (err) throw err;
        this.instace = undefined;
        resolve();
      });
    });
  }
}
