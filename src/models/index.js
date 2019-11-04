const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const { db: dbConfig } = require('../../configs')

const db = { models: {} }
console.log(dbConfig)
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig)
const findModelFiles = file =>
  file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js'
const addModelFileToSequelize = file => {
  const model = sequelize.import(path.join(__dirname, file))
  db.models[model.name] = model
}

fs.readdirSync(__dirname)
  .filter(findModelFiles)
  .forEach(addModelFileToSequelize)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
