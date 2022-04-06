/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
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
    return <BlogForm
      title={title}
      author={author}
      url={url}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
      handleCreate={handleCreate}
    />
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setSuccessMessage('logged in')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (e) {
      setErrorMessage('Wrong credentials')
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
  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({ title, author, url })
      setSuccessMessage(`created blog entry ${title} by author ${author}`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(blog))
    } catch (e) {
      setErrorMessage(`couldn't create blog entry ${title} by author ${author}`)
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
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
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
          {createBlogForm()}
        </div>
      }
    </div>
  )
}

export default App