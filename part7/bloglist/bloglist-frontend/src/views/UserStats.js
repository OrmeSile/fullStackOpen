/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserStats = () => {
  const users = useSelector((store) => store.users)

  const Users = ({ users }) => {
    if (!users) {
      return (
        <tr>
          <td>No users found</td>
        </tr>
      )
    }
    return users.map((user) => <User key={user.id} user={user} />)
  }

  const User = ({ user }) => {
    return (
      <tr>
        <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
        <td>{user.blogs.length}</td>
      </tr>
    )
  }

  return (
    <div>
      <h3>Users</h3>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>blogs created</td>
          </tr>
          <Users users={users} />
        </tbody>
      </table>
    </div>
  )
}

export default UserStats
