import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    incrementVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
      return state.map(anecdote => anecdote.id !== id
        ? anecdote
        : changedAnecdote
      )
    },
    createAnecdote(state, action) {
      const anecdote = action.payload
      state.push(anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { incrementVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer