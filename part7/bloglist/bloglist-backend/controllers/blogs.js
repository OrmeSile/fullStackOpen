const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (_request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  if (!body.url && !body.title) {
    return response.status(400).json({ error: 'title or url required' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({ ...body, user: user._id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  if (blog) {
    response.status(200).json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/', async (_request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.decode(token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })

  if (blog.user._id.toString() !== decodedToken.id) {
    return response.status(401).send()
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).send()
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(response.body)
})

blogsRouter.put('/:id/comments', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.status(200).json(response.body)
})



module.exports = blogsRouter
