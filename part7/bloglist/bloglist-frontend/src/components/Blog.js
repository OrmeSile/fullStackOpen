import { React, useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Blog = forwardRef(({ blog, removeBlog, user, handleLikes }, ref) => {
  const [details, setDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [liked, setLiked] = useState(false)

  const showWhenVisible = { display: details ? '' : 'none' }

  const style = {
    border: 'solid black 2px',
    borderRadius: '5px',
    margin: '5px 0',
    padding: '2px 10px'
  }

  const addLike = () => {
    if (blog.likes === likes) {
      setLikes(blog.likes + 1)
      setLiked(!liked)
      handleLikes(blog)
    }
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
    <div className='blog' style={style}>
      <span className='div-blog'>{blog.title} {blog.author}</span> <button
        className='show-blog'
        onClick={showDetails}>
        {details ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible} className='hidden'>
        <div>
          {blog.url}
        </div>
        <div>
          <span className='likes-text'>likes {likes}</span>
          {!liked && <button className='like' onClick={addLike}>like</button>}
          {liked && <button style={{
            backgroundColor: '#52be80',
            color: 'white',
            border: 'none',
            margin: '0 5px'
          }}
          disabled={true}>
            liked
          </button>}
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