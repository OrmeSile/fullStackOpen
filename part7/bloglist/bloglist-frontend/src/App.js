import React from 'react'
import Home from './views/Home'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import UserStats from './views/UserStats'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from './reducers/usersReducer'
import { localLogin } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    const user = JSON.parse(loggedUserJSON)
    if(user){
      dispatch(localLogin(user))
    }
  }, [])

  return (
    <Router>
      <div>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
      </div>
      <Routes>
        <Route path="/users" element={<UserStats />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
