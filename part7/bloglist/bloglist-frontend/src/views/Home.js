import React, { useState, useRef } from 'react'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import LoginForm from '../components/LoginForm'
import Togglable from '../components/Togglable'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { login, logout } from '../reducers/loginReducer'
import { ListGroup } from 'react-bootstrap'

const Home = () => {
  const dispatch = useDispatch()

  const sortBlogs = (blogs) => {
    return [...blogs]
      .sort((a, b) => a.likes - b.likes)
      .sort((a, b) => a.id - b.id)
      .reverse()
  }

  const blogs = useSelector((store) => sortBlogs(store.blogs))
  const loggedUser = useSelector((store) => store.loggedUser)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    )
  }

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }
  const Blogs = () => {
    return blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      setUsername('')
      setPassword('')
    } catch (e) {
      dispatch(
        setNotification({ message: 'wrong credentials', status: 'error' }, 5)
      )
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      dispatch(logout())
      dispatch(
        setNotification(
          {
            message: 'logging out...',
            status: 'ok',
          },
          5
        )
      )
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: `error logging out: ${e}`,
            status: 'error',
          },
          15
        )
      )
    }
  }
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(
        setNotification(
          {
            message: `created blog entry ${blogObject.title} by author ${blogObject.author}`,
            status: 'ok',
          },
          5
        )
      )
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: `couldn't create blog entry ${blogObject.title} by author ${blogObject.author}`,
            status: 'error',
          },
          5
        )
      )
      console.log(e)
    }
  }

  return (
    <div>
      {!loggedUser && loginForm()}
      {loggedUser && (
        <div>
          <form>
            <button type="submit" onClick={handleLogout}>
              logout
            </button>
          </form>
          <h2>blogs</h2>
          <ListGroup className="blogs">
            <Blogs />
          </ListGroup>
          {createBlogForm()}
        </div>
      )}
      <div></div>
    </div>
  )
}

Message.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
}

export default Home
