import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import Message from './components/Message'
import { setNotification } from './reducers/notificationReducer'
import { useSelector } from 'react-redux'
// const Message = ({ errorMessage, successMessage }) => {
//   const errorStyle = {
//     color: 'red',
//     background: 'lightgrey',
//     fontSize: 20,
//     borderStyle: 'solid',
//     borderRadius: 5,
//     padding: 10,
//     marginBottom: 10,
//   }
//   const successStyle = { ...errorStyle, color: 'green' }
//   const message = errorMessage ? errorMessage : successMessage
//   return (
//     <div>
//       <p className="message" style={errorMessage ? errorStyle : successStyle}>
//         {message}
//       </p>
//     </div>
//   )
// }

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((store) => store.notification)

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
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
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
      dispatch(
        setNotification(
          {
            message: `${user.name} logged in`,
            status: 'ok',
          },
          5
        )
      )
    } catch (e) {
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
      console.log('logging out...')
      setUser(null)
      window.localStorage.removeItem('user')
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
      const blog = await blogService.create(blogObject)
      dispatch(
        setNotification(
          {
            message: `created blog entry ${blogObject.title} by author ${blogObject.author}`,
            status: 'ok',
          }, 5
        )
      )
      setBlogs(blogs.concat(blog))
    } catch (e) {
      dispatch(
        setNotification(
          {
            message: `couldn't create blog entry ${blogObject.title} by author ${blogObject.author}`,
            status: 'error'
          }, 5
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
        await blogService.deleteBlog(blogObject)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div>
      {notification && <Message />}
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
