const { models } = require('../../../src/models')
const faker = require('faker')

const addDoctor = () => {
  models.Doctor.create({
    name: faker.name.firstName(),
    login: faker.name.firstName(),
    mail: faker.internet.email(),
    password: faker.internet.password()
  })
}

const getDoctor = async () => models.Doctor.findOne({ where: { id: 1 } })

module.exports = {
  addDoctor,
  getDoctor
}
