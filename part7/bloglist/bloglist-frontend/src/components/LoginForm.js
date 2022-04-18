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
    <form
      onSubmit={handleLogin}
      className='login-form'
    >
      <div>
        <label htmlFor="Username">Username: </label>
        <input
          type='text'
          name='Username'
          value={username}
          className='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="Password">Password: </label>
        <input
          type="password"
          name='Password'
          value={password}
          className='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        className='login'
        type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm