const app = require('../../../server/app')
const medicines = require('../../../dados/medicamentos')
const request = require('supertest')
const auth = require('../../../server/auth')

describe.only('GET /medicine - should ensure that we are handling errors and successful scenarios', () => {
  let token

  beforeEach(async () => {
    token = await auth.generateToken({ id: 1, name: 'teste', login: 'testando', mail: 'teste@gmail.com' })
  })

  context('send a valid return page number', () => {
    it('should return a 200 status code, with valid values', async () => {
      const expected = {
        totalPages: 17751,
        page: '1',
        data: medicines.slice(1, 2)
      }
      await request(app).get('/medicine/page/1')
        .set('Authorization', token)
        .expect(200, expected)
    })
  })

  context('send a invalid page number', () => {
    it('should return a 422 status code', async () => {
      await request(app).get('/medicine/page/asd')
        .set('Authorization', token)
        .expect(422)
    })
    it('should return a 400 status code', async () => {
      await request(app).get('/medicine/page/100000000000000')
        .set('Authorization', token)
        .expect(400)
    })
  })

  context('send a valid medicine code', () => {
    it('should return a valid status code, with valid values', async () => {
      await request(app).get('/medicine/35715')
        .set('Authorization', token)
        .expect(200, [medicines[0]])
    })
  })

  context('send a invalid medicine code', () => {
    it('should return a 422 status code', async () => {
      await request(app).get('/medicine/asd')
        .set('Authorization', token)
        .expect(422)
    })
    it('should return a 404 status code', async () => {
      await request(app).get('/medicine/1')
        .set('Authorization', token)
        .expect(404)
    })
  })
})
