const app = require('../../../server/app')
const request = require('supertest')

describe('GET /health', () => {
  it('Get an OK', async () => {
    let expected = { 'health': true }

    await request(app).get('/health')
      .expect(200, expected)
  })
})
