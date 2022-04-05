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

    await new User(helper.initialUser).save()
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
    console.log(initialUsers)
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
  test('passwords need to be longer than 3 characters', async () => {
    const user = {
      username: 'hello',
      password: 'hi'
    }
    const response = await api.post('/api/users').send(user)
    expect(response.error.status).toBe(400)
  })
  test('cannot be created without an username', async () => {
    const initialState = await helper.usersInDB()
    const user = {
      password: 'secret'
    }
    const response = await api.post('/api/users').send(user)
    const afterState = await helper.usersInDB()
    expect(response.error.status).toBe(400)
    expect(initialState).toEqual(afterState)
  })
})

describe('users and blogs', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
  })
  test('have blogs associated with them', async () => {
    const blogs = await helper.initialBlogs.map(blog => new Blog(blog).save())
    await new User({ ...helper.initialUser, blogs: blogs }).save()
    const userInDb = await api.get('/api/users')
    expect(userInDb.blogs).toContainEqual(blogs)
  })
})
afterAll(() => {
  mongoose.connection.close()
})