import { createSlice } from "@reduxjs/toolkit";

const initialState = null
const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayVote( _state, action ) {
      const content = action.payload
      return `You voted on:  "${content}" `
    },
    displayCreate(_state, action) {
      const content = action.payload
      return `anecdote "${content}" created`
    },
    emptyNotification( _state, _action ) {
      return initialState
    }
  }
})

export const { displayVote, emptyNotification, displayCreate } = notificationSlice.actions
export default notificationSlice.reducer