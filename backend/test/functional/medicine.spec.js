'use strict'

const { test, trait } = use('Test/Suite')('Medicine')

trait('Test/ApiClient')

test('test if post in /medicines/search get list of medicines', async ({ client, assert }) => {
  const response = await client
    .post('/medicines/search')
    .send({
      query: 'brometo',
    })
    .end()

  response.assertStatus(200)
  assert.lengthOf(response.body, 31)
  assert.isOk(response.body[0].id)
  assert.isOk(response.body[0].name)
})
