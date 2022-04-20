/* eslint-disable react/prop-types */
import React from 'react'
import { useSelector } from 'react-redux'

const UserStats = () => {
  const users = useSelector((store) => store.users)
  console.log('users after selection from store', users)

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
    console.log('user inside User component', user)
    return (
      <tr>
        <td>{user.name}</td>
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
