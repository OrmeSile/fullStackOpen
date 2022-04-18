const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  if (blogs.length === 1) {
    return blogs[0].likes
  }
  return blogs.reduce((a, b) => a + b.likes, 0)
}

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const mapped = Object.keys(grouped).map((key) => {
    return {
      author: key,
      blogs: grouped[key].length,
    }
  })
  return [...mapped].sort((a, b) => a.blogs - b.blogs)[mapped.length - 1]
}

//grouped[key].reduce((total, current) => total += current.likes, 0)

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const mapped = Object.keys(grouped).map((key) => {
    const likes = totalLikes(grouped[key])
    return {
      author: key,
      likes: likes,
    }
  })
  return [...mapped].sort((a, b) => a.likes - b.likes)[mapped.length - 1]
}

module.exports = {
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
}
