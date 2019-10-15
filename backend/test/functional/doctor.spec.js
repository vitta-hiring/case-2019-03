'use strict'

const { test, trait } = use('Test/Suite')('Doctor')

trait('Test/ApiClient')

test('test if get in /doctors get list of doctors', async ({ client, assert }) => {
  const response = await client.get('/doctors').end()

  response.assertStatus(200)
  assert.isOk(response.body[0].id)
  assert.isOk(response.body[0].name)
})
