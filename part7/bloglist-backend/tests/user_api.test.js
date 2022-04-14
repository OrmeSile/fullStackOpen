const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const User = require('../models/User')
const Blog = require('../models/Blog')

describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await api.post('/api/users').send(helper.initialUser)
  })
  test('are returned as JSON', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('can be created with a new username', async () => {
    const user = {
      username: 'hello',
      name: 'mel',
      password: 'secrets'
    }
    const response = await api.post('/api/users').send(user)
    expect(response.status).toBe(201)
    expect(response.body.username).toEqual(user.username)
  })
  test('cannot be created with an existing username', async () => {
    const user = {
      username: 'root',
      name: 'hello',
      password: 'secret'
    }
    const response = await api.post('/api/users').send(user)
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'invalid username' })
  })
  test('cannot be created without a password', async () => {
    const initialUsers = await helper.usersInDB()
    const user = {
      username: 'hif',
      name: 'blabla'
    }
    const response = await api.post('/api/users').send(user)
    const afterState = await helper.usersInDB()
    expect(response.status).toBe(400)
    expect(response.body).toEqual({ error: 'invalid password' })
    expect(initialUsers).toEqual(afterState)
  })
  test('password needs to be longer than 3 characters', async () => {
    const user = {
      username: 'hello',
      password: 'hi'
    }
    const response = await api.post('/api/users').send(user)
    expect(response.error.status).toBe(400)
  })
  test('cannot be created without a username', async () => {
    const initialState = await helper.usersInDB()
    const user = {
      password: 'secret'
    }
    const response = await api.post('/api/users').send(user)
    const afterState = await helper.usersInDB()
    expect(response.error.status).toBe(400)
    expect(initialState).toEqual(afterState)
  })
  test('can login', async () => {
    const { username, password } = helper.initialUser
    const response = await api.post('/api/login')
      .send({ username, password })
    expect(response.status).toBe(200)
  })
})

describe('users and blogs --- ', () => {
  let token
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await api.post('/api/users').send(helper.initialUser)
    const { username, password } = helper.initialUser
    const login = await api.post('/api/login').send({ username, password })
    token = login.body.token
    await api.post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(helper.newBlog)
  })
  test('users have blogs associated with them', async () => {
    const response = await api.get('/api/users')
    const { author, id, title, url } = await Blog.findOne({})
    expect(response.body[0].blogs.length).toBe(1)
    expect(response.body[0].blogs).toContainEqual({ author, id, title, url })
  })
})
afterAll(() => {
  mongoose.connection.close()
})