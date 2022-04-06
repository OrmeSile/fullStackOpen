/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => {
  return(
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="Username">Username: </label>
        <input
          type='text'
          name='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="Password">Password: </label>
        <input
          type="password"
          name='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    console.log('logging with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setSuccessMessage('Successfully logged in')
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

  return (
    <div>
      { errorMessage && <p>{ errorMessage }</p> }
      { successMessage && <p>{ successMessage }</p> }
      { user === null
        ? <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
        :
        <div>
          <h2>blogs</h2>
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App