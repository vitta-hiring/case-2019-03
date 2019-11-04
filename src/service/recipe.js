const { validationResult } = require('express-validator')
const errorHandler = require('./errorHandler')
const { recipe } = require('../lib')

const createRecipe = async (req, res) => {
  try {
    validationResult(req).throw()
    const codeDoctor = req.authentication.id
    const { pacient: codePacient, medicines } = req.body
    res.send(await recipe.createRecipe(codeDoctor, codePacient, medicines))
  } catch (error) {
    const { status, message } = errorHandler(error)
    res.status(status).send({ message })
  }
}

const getRecipe = async (req, res) => {
  try {
    validationResult(req).throw()
    const codeRecipe = req.params.id
    res.send()
  } catch (error) {
    const { status, message } = errorHandler(error)
    res.status(status).send({ message })
  }
}

module.exports = {
  createRecipe
}
