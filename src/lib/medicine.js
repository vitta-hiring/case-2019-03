const medicines = require('../../dados/medicamentos')
const { MedicineNotFound, PageLimitExceeded } = require('../../server/error')
const { resultsLimit } = require('../../configs')

const getMedicinesByPage = (page) => {
  const totalPages = Math.ceil(medicines.length / resultsLimit) - 1
  if (totalPages < page) throw new PageLimitExceeded(`Limit of page is ${totalPages}`)
  const initial = resultsLimit * page
  const final = initial + resultsLimit
  return {
    totalPages,
    page,
    data: medicines.slice(initial, final)
  }
}

const getMedicineByCode = (code) => {
  const medicine = medicines.filter(
    (medicine) => {
      return medicine.IdMedicamento === parseInt(code)
    }
  )
  if (!medicine.length) throw new MedicineNotFound(`Medicine ${code} is not valid`)
  return medicine
}

module.exports = {
  getMedicinesByPage,
  getMedicineByCode
}
