const config = require('../configs')
const fs = require('fs')
const jwt = require('jsonwebtoken')

function readLocalKey (path) {
  return fs.readFileSync(path)
}

const generateToken = async (doctor) => {
  const { id, name, login, mail } = doctor
  return jwt.sign({ id, name, login, mail }, readLocalKey(config.jwt.privateKeyPath), { algorithm: 'RS256' })
}

const validateToken = (req, res, next) => {
  if (req.header('Authorization')) {
    const token = req.header('Authorization').replace('Bearer ', '')
    req.authentication = jwt.verify(token, readLocalKey(config.jwt.privateKeyPath), { algorithms: ['RS256'] })
    next()
  } else {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}

module.exports = {
  generateToken,
  validateToken
}
