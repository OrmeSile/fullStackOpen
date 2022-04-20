import React, { useEffect } from 'react'
import Home from './views/Home'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import UserStats from './views/UserStats'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { localLogin } from './reducers/loginReducer'
import User from './views/User'
import BlogView from './views/BlogView'
import Message from './components/Message'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [])

  const users = useSelector((store) => store.users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    const user = JSON.parse(loggedUserJSON)
    if (user) {
      dispatch(localLogin(user))
    }
  }, [])

  const match = useMatch('/users/:id')
  const usr = match
    ? users.find((user) => user.id === Number(match.params.id))
    : null
  console.log('user', usr)

  return (
    <div>
      <div>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
      </div>
      <Message/>
      <Routes>
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/users" element={<UserStats />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
