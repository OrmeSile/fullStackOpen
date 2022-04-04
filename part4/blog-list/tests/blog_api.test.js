const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/Blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
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
    await api.post('/api/blogs').send(helper.newBlog)
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
    const response = await api.post('/api/blogs', { author: 'me' })
    expect(response.status).toBe(400)
  })
})

test('deleting an individual blog post works', async () => {
  const blogs = await helper.blogsInDB()
  const blogToDelete = blogs[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
}, 10000)

test('updating an individual blog post works', async () => {
  const blogs = await helper.blogsInDB()
  const blogToUpdate = blogs[0]
  const modifiedBlog = { ...blogToUpdate, likes: 150 }
  const response = await api.put(`/api/blogs/${modifiedBlog.id}`).send(modifiedBlog)
  const modifiedBlogInDb = await Blog.findById(blogToUpdate.id)
  expect(response.status).toBe(200)
  expect(modifiedBlogInDb.likes).toEqual(modifiedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})