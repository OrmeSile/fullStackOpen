const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')


blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({}).populate(
    'user', { username: 1, name: 1 }
  )
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne({})
  const blog = new Blog({ ...request.body, user: user._id })

  if (!blog.url && !blog.title) {
    return response.status(400).json({ error: 'title or url required' })
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    return response.status(201).json(savedBlog)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  if (blog) {
    response.status(200).json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).end()
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(200).json(response.body)
})

module.exports = blogsRouter