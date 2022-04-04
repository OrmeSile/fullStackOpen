const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')


blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.url && !blog.title) {
    response.status(400).json({ error: 'title or url required' })
  } else {
    const blogPost = await blog.save()
    response.status(201).json(blogPost)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.status(200).json(blog)
  } else {
    response.status(404).end()
  }
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