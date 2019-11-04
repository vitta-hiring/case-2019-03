module.exports = {
  idValidator: {
    id: {
      in: ['params', 'query'],
      isInt: true,
      errorMessage: 'ID is not found'
    }
  },
  token: {
    login: {
      in: ['body'],
      exists: {
        errorMessage: 'Login has to be informed'
      }
    },
    password: {
      in: ['body'],
      exists: {
        errorMessage: 'Password has to be informed'
      }
    }
  },
  recipe: {
    pacient: {
      in: ['body'],
      exists: {
        errorMessage: 'Pacient has to be informed'
      }
    },
    medicines: {
      in: ['body'],
      exists: {
        errorMessage: 'Medicines has to be informed'
      }
    }
  }
}
