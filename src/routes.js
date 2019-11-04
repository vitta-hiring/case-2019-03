const router = require('express').Router()
const { checkSchema } = require('express-validator')
const validators = require('../server/validator/schema')
const { medicine, token, recipe } = require('./service')
const auth = require('../server/auth')

router.get('/health', (req, res) => {
  res.send({ 'health': true })
})

router.get('/medicine/page/:id', checkSchema(validators.idValidator), auth.validateToken, (req, res) => {
  medicine.listMedicine(req, res)
})

router.get('/medicine/:id', checkSchema(validators.idValidator), auth.validateToken, (req, res) => {
  medicine.getMedicine(req, res)
})

router.post('/getToken', checkSchema(validators.token), async (req, res) => {
  await token.getToken(req, res)
})

router.post('/recipe', auth.validateToken, checkSchema(validators.recipe), async (req, res) => {
  await recipe.createRecipe(req, res)
})

router.get('/recipe/:id', auth.validateToken, checkSchema(validators.recipe), async (req, res) => {
  await recipe.getRecipe(req, res)
})

module.exports = router
