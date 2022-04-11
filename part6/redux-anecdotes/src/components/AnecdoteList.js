import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { displayVote, emptyNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filterString = useSelector(state => state.filter)

  let regex = new RegExp(filterString, 'i')

  const filteredAnecdotes = [...anecdotes]
    .filter((anecdote) => regex.test(anecdote.content))
  
  const sortedAnecdotes = [...filteredAnecdotes]
    .sort((a, b) => a.content.toLowerCase() < b.content.toLowerCase())
    .sort((a, b) => a.votes < b.votes)
  
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(displayVote(content))
    dispatch(incrementVote(id))
    setTimeout(() => {
      dispatch(emptyNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList