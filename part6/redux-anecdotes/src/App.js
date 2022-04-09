import { useSelector, useDispatch } from 'react-redux'
import { incrementVote, createAnecdote } from './reducers/anecdoteReducer'
const App = () => {
  const anecdotes = useSelector(state => state)
  const sortedAnecdotes = anecdotes
    .sort((a, b) => a.id - b.id)
    .sort((a, b) => a.votes - b.votes)
    .reverse()
  const dispatch = useDispatch()

  const vote = (id) => {
     dispatch(incrementVote(id))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App