const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')


blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  if (!blog.url && !blog.title) {
    response.status(400).json({error: 'title or url required'})
  } else {
    const blogPost = await blog.save()
    response.status(201).json(blogPost)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.status(200).json(blog)
})

module.exports = blogsRouter