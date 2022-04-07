/* eslint-disable react/prop-types */
import { React, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: details ? '' : 'none' }

  const style = {
    border: 'solid black 2px',
    borderRadius: '5px',
    margin: '5px 0',
    padding: '2px 10px'
  }

  const showDetails = () => {
    setDetails(!details)
  }

  const addLike = async () => {
    // eslint-disable-next-line no-unused-vars
    const { user, ...rest } = blog
    const newBlog = { ...rest, likes: likes + 1 }
    await blogService.update(newBlog.id, newBlog)
    setLikes(newBlog.likes)
  }

  return (
    <div style={style}>
      {blog.title} {blog.author}
      <button onClick={showDetails}>
        {details ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {likes} <button onClick={addLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    </div>  
  )
}

export default Blog