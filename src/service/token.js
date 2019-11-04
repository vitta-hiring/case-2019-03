const { validationResult } = require('express-validator')
const { doctorQueries } = require('../lib/db')
const auth = require('../../server/auth')

const getToken = async (req, res) => {
  try {
    validationResult(req).throw()
    const { login, password } = req.body
    const doctor = await doctorQueries.loginDoctor(login, password)
    if (!doctor) res.status(401).send({ message: 'Login/Password is not valid' })
    res.send({ token: `Bearer ${await auth.generateToken(doctor)}` })
  } catch (error) {
    res.status(400).send({ message: error.array() })
  }
}

module.exports = {
  getToken
}
