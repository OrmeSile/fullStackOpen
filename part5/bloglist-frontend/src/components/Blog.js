import { React, useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef(({ blog, removeBlog, user, handleLikes }, ref) => {
  const [details, setDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: details ? '' : 'none' }

  const style = {
    border: 'solid black 2px',
    borderRadius: '5px',
    margin: '5px 0',
    padding: '2px 10px'
  }

  const addLike = () => {
    setLikes(likes + 1)
    handleLikes(blog)
  }

  const removeButton = () => <button onClick={() => removeBlog(blog)}>remove</button>

  const showDetails = () => {
    setDetails(!details)
  }
  useImperativeHandle (ref, () => {
    return (
      addLike
    )
  })

  return (
    <div style={style}>
      <span className='div-blog'>{blog.title} {blog.author}</span> <button
        onClick={showDetails}>
        {details ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className='hidden'>
        <div>
          {blog.url}
        </div>
        <div>
          likes {likes} <button onClick={addLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {user.username === blog.user.username && removeButton()}
      </div>
    </div>
  )
})

Blog.propTypes = {
  blog: PropTypes.object,
  removeBlog: PropTypes.func,
  user: PropTypes.object,
  handleLikes: PropTypes.func
}

Blog.displayName = 'Blog'

export default Blog