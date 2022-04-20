import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { addComment, addLike } from '../reducers/blogReducer'

const BlogView = () => {
  const id = useParams().id
  const [liked, setLiked] = useState(false)
  const blogs = useSelector((store) => store.blogs)
  const blog = blogs.find((blog) => blog.id === id)
  const dispatch = useDispatch()

  const handleLikes = () => {
    dispatch(addLike(blog))
    dispatch(
      setNotification({ message: `liked ${blog.title}`, status: 'ok' }, 5)
    )
    if (!liked) {
      setLiked(true)
    }
  }
  if (!blog) {
    return null
  }

  const handleComments = (event) => {
    event.preventDefault()
    const comment = event.target[0].value
    dispatch(
      addComment({
        blog: blog,
        comment: comment,
      })
    )
    event.target[0].value = ''
    console.log(blogs)
  }

  return (
    <div>
      <h3>{`${blog.title} by ${blog.author}`}</h3>
      <p>{blog.url}</p>
      <span>
        {`${blog.likes} likes`}
        {!liked && <button onClick={() => handleLikes()}>like</button>}
      </span>
      <p>added by {blog.user.name}</p>
      <h4>Comments</h4>
      <ul>
        {blog.comments.length !== 0 ? (
          blog.comments.map((comment, index) => <li key={index}>{comment}</li>)
        ) : (
          <li>No comments yet !</li>
        )}
      </ul>
      <form onSubmit={handleComments}>
        <input type="text" />
        <button>submit</button>
      </form>
    </div>
  )
}

export default BlogView
