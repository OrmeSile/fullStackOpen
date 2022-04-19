import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Message from './components/Message'
import { setNotification } from './reducers/notificationReducer'
import { createBlog, deleteBlog, initializeBlogs } from './reducers/blogReducer'
import { login, logout, setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const sortBlogs = (blogs) => {
    return [...blogs]
      .sort((a, b) => a.likes - b.likes)
      .sort((a, b) => a.id - b.id)
      .reverse()
  }

  const blogs = useSelector((store) => sortBlogs(store.blogs))
  const user = useSelector((store) => store.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()
  const blogRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])

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
    return blogs.map((blog) => (
      <Blog
        removeBlog={removeBlog}
        key={blog.id}
        blog={blog}
        user={user}
        ref={blogRef}
        handleLikes={() => handleLikes(blog)}
      />
    ))
  }
  const handleLikes = async (blog) => {
    // eslint-disable-next-line no-unused-vars
    const { user, ...rest } = blog
    const newBlog = { ...rest, likes: rest.likes + 1 }
    await blogService.update(newBlog)
    dispatch(
      setNotification({ message: `liked ${blog.title}`, status: 'ok' }, 5)
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password }))
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log(e)
      dispatch(
        setNotification(
          {
            message: 'wrong credentials',
            status: 'error',
          },
          5
        )
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
  const removeBlog = async (blogObject) => {
    try {
      const choiceWindow = window.confirm(
        `remove blog ${blogObject.title} by ${blogObject.author} ?`
      )
      if (choiceWindow) {
        dispatch(deleteBlog(blogObject))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      <div>
        <Message />
      </div>
      {user === null && loginForm()}
      {user !== null && (
        <div>
          <form>
            <button type="submit" onClick={handleLogout}>
              logout
            </button>
          </form>
          <h2>blogs</h2>
          <div className="blogs">
            <Blogs />
          </div>
          {createBlogForm()}
        </div>
      )}
    </div>
  )
}

Message.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
}

export default App
