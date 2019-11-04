const { MedicineNotFound, PageLimitExceeded } = require('../../server/error')

module.exports = (error) => {
  if (error.array) {
    return { status: 422, message: error.array() }
  }
  if (error instanceof MedicineNotFound) {
    return { status: 404, message: error.message }
  }
  if (error instanceof PageLimitExceeded) {
    return { status: 400, message: error.message }
  }
}
