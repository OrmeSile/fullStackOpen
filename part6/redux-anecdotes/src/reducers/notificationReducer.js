import { createSlice } from '@reduxjs/toolkit'

const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification( _state, action ) {
      return action.payload
    },
    emptyNotification( ) {
      return initialState
    }
  }
})

const { displayNotification, emptyNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(displayNotification(content))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer