/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const User = () => {
  const id = useParams().id
  const users = useSelector(store => store.users)

  const user = users.find(user => user.id === id)
  if (!user) {
    return null
  }
  const blogs = user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)
  return (
    <div>
      <h3>{user.name}</h3>
      <h4>added blogs</h4>
      <ul>{blogs}</ul>
    </div>
  )
}

export default User
