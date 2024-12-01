/* const mock = require('sequelize-mock');

const userMock = new mock().define('User', {
  username: "testUser",
  email: "test@example.com",
  password: 'qweras12'
})

test('shouldCreate a new User', async () => {
  const user  = await userMock.create()
}) */
const request = require('supertest')
const app = require('../index') // App file path
const { sequelize } = require('../models')
const db = require('../models')

beforeAll(async () => {
  await sequelize.sync({ force: false })
  await app.listen(3000)
//  await db.User.create({
//   username: 'user',
//   email: 'test@ex.com',
//   password: 'password123',
//   role: 'student'
//  })
})

describe('User registration and login tests', () => {
  test('Redirects after successful registration', async () => {
    const res = await request(app).post('/register').send({
      username: 'WANDAKAJO',
      email: 'test@wandakajo.com',
      password: 'password123',
      role: 'student'
    })
    expect(res.statusCode).toBe(302)
    expect(res.header.location).toBe('/login')
  }, 60000)

  test('Redirects to dashboard on successful login', async () => {
    const res = await request(app).post('/login').send({
      username: 'user',
      password: 'password123'
    })

    expect(res.statusCode).toBe(302)
    expect(res.header.location).toBe('/dashboard')
  })

  test('Redirects to login on failed login', async () => {
    const res = await request(app).post('/login').send({
      email: 'wrong@example.com',
      password: 'wrongpassword'
    })

    expect(res.statusCode).toBe(302)
    expect(res.header.location).toBe('/login')
  })
})

afterAll(async () => {
  await sequelize.close()
await app.close()
})
