const Blog = require('../models/Blog')

const initialBlogs = [
  {
    title: 'hey',
    author: 'me',
    url: 'localhost',
    likes: 10
  },
  {
    title: 'listen',
    author: 'you',
    url: 'distant',
    likes: 5
  }
]

const newBlog =
{
  title: 'majora',
  author: 'ganon',
  url: 'gerudo',
  likes: 1
}


const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'link',
      author: 'zelda',
      url: 'hyrule',
      likes: 50
    }
  )
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const blogById = async (id) => {
  const blog = await Blog.findById(id)
  return blog.map(blog => blog.toJSON())
}

module.exports = {
  newBlog,
  initialBlogs,
  nonExistingId,
  blogsInDB,
  blogById,
}