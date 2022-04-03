const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')


blogsRouter.get('/',async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const blogPost = await blog.save()
  response.status(201).json(blogPost)
})

module.exports = blogsRouter