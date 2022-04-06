/* eslint-disable react/prop-types */
import React from 'react'

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) => {
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

export default LoginForm