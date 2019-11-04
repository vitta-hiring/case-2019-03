const express = require('express')
const logger = require('morgan')
const config = require('../configs')
const routes = require('../src/routes')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))
app.use('/', routes)

app.listen(config.api.port)

module.exports = app
