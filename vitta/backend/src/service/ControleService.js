export default function (db) {
  return new Promise((resolve) => {
    db.query(`select insertsFeitos from ControleInsert where id = 1`, [], (err, results) => {
      if (err) throw err;
      resolve(results[0].insertsFeitos === 1);
    });
  });
}
