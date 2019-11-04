const { doctorQueries, pacientQueries, recipeQueries } = require('./db')
const { DoctorNotFound, PacientNotFound, MedicineNotFound } = require('../../server/error')
const { getMedicineByCode } = require('./medicine')
const interations = require('../../dados/interacao_medicamentosa.json')

const getDoctor = async (codeDoctor) => {
  const doctor = await doctorQueries.getDoctorByCode(codeDoctor)
  if (!doctor) throw new DoctorNotFound('Doctor is not authorized')
  return doctor
}

const getPacient = async (codePacient) => {
  const pacient = await pacientQueries.getPacient(codePacient)
  if (!pacient) throw new PacientNotFound(`Pacient ${codePacient} is not found`)
  return pacient
}

const getMedicines = async (listMedicines) => {
  let invalidMedicines = []
  const medicines = (await Promise.all(listMedicines.map(
    ({ id }) => {
      try {
        return getMedicineByCode(id)
      } catch (error) {
        invalidMedicines.push(id)
      }
    }
  ))).filter(el => el)
  if (invalidMedicines.length) throw new MedicineNotFound(`Medicine ${invalidMedicines[0]} is not valid`)
  return medicines
}

const getInterations = (medicines) => {
  let medicineInterations = []
  for (let i = 0; i < medicines.length - 1; i++) {
    const interation = [...medicines[i][0].Farmacos, ...medicines[i + 1][0].Farmacos]
    medicineInterations.push(interations.filter((iter) => {
      return Object.values(interation).includes(iter.Farmaco1) && Object.values(interation).includes(iter.Farmaco2)
    }))
  }
  return medicineInterations
}

const createRecipe = async (codeDoctor, codePacient, listMedicines) => {
  try {
    const doctor = await getDoctor(codeDoctor)
    const pacient = await getPacient(codePacient)
    const medicines = await getMedicines(listMedicines)
    const medicineInterations = getInterations(medicines)
    const recipe = await recipeQueries.addRecipe(doctor.id, pacient.id, JSON.stringify({ medicines, interations: medicineInterations }))
    return {
      message: 'Recipe maded with sucess',
      doctor: {
        name: doctor.name,
        login: doctor.login
      },
      pacient: {
        name: pacient.name,
        filliate: pacient.filliate
      },
      recipe: {
        id: recipe.id,
        interations: medicineInterations
      }
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createRecipe
}
