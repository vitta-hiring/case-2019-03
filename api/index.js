const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./app/models');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const db = require('./app/models/index.js');
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync with { force: true }');
  
  User.create({ name: 'Claudio', email: 'claudio@rocketseat.com.br', password: '123456' });

});
 



app.listen(3000);