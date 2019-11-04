/**
 * @module utils/error
 * @method [utils/error] ApiError
 * @version v.1.0
 * @description Inherits from {Error} and adds api specific information with a descriptor property
 */
class MedicineNotFound extends Error {
}

class PageLimitExceeded extends Error {
}

class DoctorNotFound extends Error {
}

class PacientNotFound extends Error {
}

module.exports = {
  MedicineNotFound,
  PageLimitExceeded,
  DoctorNotFound,
  PacientNotFound
}
