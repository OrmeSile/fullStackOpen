import { createSlice } from '@reduxjs/toolkit'

let timeOutFunction = null

const initialState = ['', 'hidden']
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(_state, action) {
      return action.payload
    },
    emptyNotification() {
      return initialState
    },
  },
})

const { displayNotification, emptyNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(displayNotification(content))
    if (timeOutFunction) {
      clearTimeout(timeOutFunction)
    }
    const timeOut = setTimeout(() => {
      dispatch(emptyNotification())
      timeOutFunction = null
    }, time * 1000)

    timeOutFunction = timeOut
  }
}

export default notificationSlice.reducer
