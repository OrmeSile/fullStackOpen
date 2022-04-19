import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    removeUser() {
      return initialState
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    dispatch(setUser(user))
    blogService.setToken(user.token)
    window.localStorage.setItem('user', JSON.stringify(user))
    console.log('user after', user)
    if (user) {
      dispatch(
        setNotification({ message: `${user.name} logged in`, status: 'ok' }, 5)
      )
    }
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch(removeUser())
    window.localStorage.removeItem('user')
  }
}

export default userSlice.reducer
