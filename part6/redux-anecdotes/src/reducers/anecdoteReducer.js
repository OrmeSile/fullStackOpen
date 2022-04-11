import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    incrementVote(state, action) {
      const newAnecdote = action.payload
      const id = newAnecdote.id
      return state.map(anecdote => anecdote.id !== id
        ? anecdote
        : newAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(_state, action) {
      return action.payload
    }
  }
})

export const { incrementVote,appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const addVote = content => {
  return async dispatch => {
    const newAnecdote = { ...content, votes: content.votes + 1 }
    const finalanecdote = await anecdoteService.update(newAnecdote)
    dispatch(incrementVote(finalanecdote))
  }
}

export default anecdoteSlice.reducer