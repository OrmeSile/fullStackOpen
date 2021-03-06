const Blog = require('../models/Blog')
const User = require('../models/User')

const initialBlogs = [
  {
    title: 'hey',
    author: 'me',
    url: 'localhost',
    likes: 10,
    user: '',
  },
  {
    title: 'listen',
    author: 'you',
    url: 'distant',
    likes: 5,
    user: '',
  }
]

const newBlog =
{
  title: 'majora',
  author: 'ganon',
  url: 'gerudo',
  likes: 1,
}

const initialUser = {
  username: 'root',
  name: 'root',
  password: 'secret',
}

const nonExistingId = async () => {
  const blog = new Blog(
    {
      title: 'link',
      author: 'zelda',
      url: 'hyrule',
      likes: 50,
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
const usersInDB = async () => {
  const users = await User.find({})
  return users.map(blog => blog.toJSON())
}

const blogById = async (id) => {
  const blog = await Blog.findById(id)
  return blog.map(blog => blog.toJSON())
}

module.exports = {
  newBlog,
  initialBlogs,
  initialUser,
  nonExistingId,
  blogsInDB,
  usersInDB,
  blogById,
}