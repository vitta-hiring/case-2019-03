'use strict'

const { test, trait } = use('Test/Suite')('Patient')

trait('Test/ApiClient')

test('test if get in /patients get list of patients', async ({ client, assert }) => {
  const response = await client.get('/patients').end()

  response.assertStatus(200)
  assert.isOk(response.body[0].id)
  assert.isOk(response.body[0].name)
})
