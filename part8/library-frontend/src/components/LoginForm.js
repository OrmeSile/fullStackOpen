import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { LOGIN } from '../query'

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError
    },
  })
}

export default LoginForm
