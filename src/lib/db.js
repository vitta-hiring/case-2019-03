const { models } = require('../models')

const addDoctor = (name, login, mail, password) => {
  models.Doctor.create({ name, login, mail, password })
}
const getDoctorByCode = async (code) => models.Doctor.findOne({ where: { id: code } })

const loginDoctor = async (login, password) => models.Doctor.findOne({ where: { login, password } })

const getPacient = async (code) => models.Pacient.findOne({ where: { id: code } })

const addRecipe = async (doctor, pacient, recipesMedications) => models.Recipe.create({ doctor, pacient, recipesMedications })

const getRecipeByCode = async (code) => models.Recipe.findOne({
  include: [{ model: models.Doctor }, { model: models.Pacient }],
  where: { id: code }
})

const getDoctorRecipes = async (code) => models.Recipe.findAll(
  {
    include: [{ model: models.Doctor }, { model: models.Pacient }],
    where: { doctor: code }
  }
)

const getPacientRecipes = async (code) => models.Recipe.findAll(
  {
    include: [{ model: models.Pacient }],
    where: { pacient: code }
  }
)

module.exports = {
  doctorQueries:
  {
    getDoctorByCode,
    addDoctor,
    loginDoctor
  },
  pacientQueries:
  {
    getPacient
  },
  recipeQueries:
  {
    addRecipe,
    getRecipeByCode,
    getDoctorRecipes,
    getPacientRecipes
  }
}
