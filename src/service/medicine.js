const { validationResult } = require('express-validator')
const { medicine } = require('../lib')
const errorHandler = require('./errorHandler')

const listMedicine = (req, res) => {
  try {
    validationResult(req).throw()
    const page = req.params.id
    res.send(medicine.getMedicinesByPage(page))
  } catch (error) {
    const { status, message } = errorHandler(error)
    res.status(status).send({ message })
  }
}

const getMedicine = async (req, res) => {
  try {
    validationResult(req).throw()
    const code = req.params.id
    res.send(medicine.getMedicineByCode(code))
  } catch (error) {
    const { status, message } = errorHandler(error)
    res.status(status).send({ message })
  }
}

module.exports = {
  listMedicine,
  getMedicine
}
