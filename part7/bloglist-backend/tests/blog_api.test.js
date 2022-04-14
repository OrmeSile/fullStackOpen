const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/Blog')
const User = require ('../models/User')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const user = await api.post('/api/users').send(helper.initialUser)
  const { username, password } = helper.initialUser
  const login = await api.post('/api/login').send({ username, password })
  token = login.body.token
  const dbUser = await User.findById(user.body.id)
  const blogObjects = helper.initialBlogs.map(blog => new Blog({ ...blog, user: dbUser._id }))
  const blogs = blogObjects.map(blog => blog.save())
  await Promise.all(blogs)
})

describe('blogs in database', () => {
  test('are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('are the correct amount', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('have a property id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('posted blogs', () => {
  test('are successfully created', async () => {
    const initialBlogs = await helper.blogsInDB()
    await api.post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send(helper.newBlog)
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length + 1)
  })

  test('have no info loss', async () => {
    const blog = await api.post('/api/blogs').send(helper.newBlog)
    const response = await api.get('/api/blogs')
    const blogInDb = response.body[response.body.length - 1]
    expect(blogInDb.data).toEqual(blog.res.data)
  })
  test('have like: 0 when not filled', async () => {
    const blog = await new Blog({
      title: 'heh',
      author: 'yo',
      url: 'here'
    }).save()
    const response = await api.get(`/api/blogs/${blog._id.toString()}`)
    expect(response.body.likes).toEqual(0)
  })
  test('return 400 when both url and title are empty', async () => {
    const response = await api.post('/api/blogs')
      .set('authorization', `Bearer ${token}`)
      .send({ author: 'me' })
    expect(response.status).toBe(400)
  })
})

describe('deleting', () => {
  test('an individual blog post works', async () => {
    const blogs = await helper.blogsInDB()
    const blogToDelete = blogs[0]
    const response = await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${token}`)
    const blogsAfter = await helper.blogsInDB()
    expect(response.status).toBe(204)
    expect(blogsAfter.length).toBe(blogs.length -1)
  })
  test('blogs can only be done by user that created it', async () => {
    const blogs = await helper.blogsInDB()
    const blogToDelete = blogs[0]
    const newUser = { username: 'hacker', password: 'elite' }
    await api.post('/api/users')
      .send(newUser)
    const newLogin = await api.post('/api/login')
      .send(newUser)
    const newToken = newLogin.body.token
    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `Bearer ${newToken}`)
      .expect(401)
  })
})

test('updating an individual blog post works', async () => {
  const blogs = await helper.blogsInDB()
  const blogToUpdate = blogs[0]
  const modifiedBlog = { ...blogToUpdate, likes: 150 }
  const response = await api.put(`/api/blogs/${modifiedBlog.id}`)
    .send(modifiedBlog)
  const modifiedBlogInDb = await Blog.findById(blogToUpdate.id)
  expect(response.status).toBe(200)
  expect(modifiedBlogInDb.likes).toEqual(modifiedBlog.likes)
})


test('return a blog with user attached when queried', async () => {
  const user = await new User(helper.initialUser).save()
  const blog = await new Blog({ ...helper.newBlog, user: user._id })
  await blog.save()
  const response = await api.get('/api/blogs')
  const lastAddedBlog = response.body[response.body.length - 1]
  const processedUser = JSON.parse(JSON.stringify(user))
  expect(processedUser.name).toEqual(lastAddedBlog.user.name)
})


afterAll(() => {
  mongoose.connection.close()
})