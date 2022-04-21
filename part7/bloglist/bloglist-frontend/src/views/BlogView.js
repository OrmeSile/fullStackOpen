import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { addComment, addLike } from '../reducers/blogReducer'
import { ListGroup, Button, Form } from 'react-bootstrap'

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
    console.log(event)
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
      <ListGroup>
        {blog.comments.length !== 0 ? (
          blog.comments.map((comment, index) => (
            <ListGroup.Item key={index}>{comment}</ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No comments yet !</ListGroup.Item>
        )}
      </ListGroup>
      <div>
        <Form onSubmit={handleComments}>
          <Form.Group>
            <Form.Label>Comment:</Form.Label>
            <Form.Control type="text" name="comment" />
            <Button variant="primary" type="submit">
              submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default BlogView
