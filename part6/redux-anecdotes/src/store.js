import anecdotesReducer from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer
  }
})

export default store