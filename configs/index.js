const dotenv = require('dotenv')
const configVars = require('../server/config-vars')
const logger = require('morgan')

if (process.env.npm_lifecycle_event === 'dev') {
  dotenv.config({ silent: true })
}

const requiredVars = [
  'NODE_ENV',
  'API_PORT',
  'SEQUELIZE_DB',
  'RESULT_LIMIT',
  'AUTH_JWT_ALGORITHM',
  'AUTH_JWT_PRIVATE_KEY_PATH'
]

const envExportedVars = ['NODE_ENV']

const missingVars = requiredVars.filter(
  required =>
    // eslint-disable-next-line no-prototype-builtins
    !configVars.hasOwnProperty(required) || configVars[required] === undefined || configVars[required === null]
)
if (missingVars.length > 0) {
  const missingVarsText = missingVars.reduce((acc, curr) => `'${acc}, ${curr}'`, '')
  console.log({ nodeEnv: configVars.NODE_ENV, miss: missingVarsText })
  process.exit(1)
}

// exporting variables
envExportedVars.forEach(v => {
  process.env[v] = configVars[v]
})

const config = {
  node_env: configVars.NODE_ENV,
  api: {
    env: configVars.NODE_ENV,
    port: configVars.API_PORT
  },
  db: {
    ...configVars['SEQUELIZE_DB'],
    logging: false,
    pool: {
      min: 0,
      max: parseInt(configVars.DB_POOL_SIZE),
      idle: parseInt(configVars.DB_DB_CONNECTION_IDLE)
    }
  },
  resultsLimit: configVars.RESULT_LIMIT,
  jwt: {
    algorithm: configVars.AUTH_JWT_ALGORITHM,
    privateKeyPath: configVars.AUTH_JWT_PRIVATE_KEY_PATH,
    expiration: configVars.AUTH_JWT_EXPIRE,
    expireCustomer: configVars.AUTH_JWT_EXPIRE_CUSTOMER,
    expireCustomerPeriod: configVars.AUTH_JWT_EXPIRE_CUSTOMER_PERIOD
  }
}

module.exports = config
