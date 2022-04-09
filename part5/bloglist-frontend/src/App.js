import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'

const Message = ({ errorMessage, successMessage }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const successStyle = { ...errorStyle, color: 'green' }
  const message = errorMessage ? errorMessage : successMessage
  return (
    <div>
      <p
        className='message'
        style={errorMessage ? errorStyle : successStyle}>
        {message}
      </p>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = useRef()
  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes - b.likes).reverse()
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return <LoginForm
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  }

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref ={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }
  const Blogs = () => {
    return (blogs.map(blog =>
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
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setSuccessMessage(`${user.name} logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (e) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      console.log('logging out...')
      setUser(null)
      window.localStorage.removeItem('user')
      setSuccessMessage('logged out')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (e) {
      setErrorMessage('error logging out:', e)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create( blogObject )
      setSuccessMessage(`created blog entry ${blogObject.title} by author ${blogObject.author}`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
      setBlogs(blogs.concat(blog))
    } catch (e) {
      setErrorMessage(`couldn't create blog entry ${blogObject.title} by author ${blogObject.author}`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
      console.log(e)
    }
  }
  const removeBlog = async (blogObject) => {
    try {
      const choiceWindow = window.confirm(`remove blog ${blogObject.title} by ${blogObject.author} ?`)
      if (choiceWindow) {
        await blogService.deleteBlog(blogObject)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      {(errorMessage || successMessage) &&
        <Message
          errorMessage={errorMessage}
          successMessage={successMessage}
        />
      }
      {user === null && loginForm()}
      {user !== null &&
        <div>
          <form>
            <button type='submit' onClick={handleLogout}>logout</button>
          </form>
          <h2>blogs</h2>
          <div className='blogs'>
            <Blogs/>
          </div>
          {createBlogForm()}
        </div>
      }
    </div>
  )
}

Message.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string
}

export default App