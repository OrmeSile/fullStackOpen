import { useSelector, useDispatch } from "react-redux"
import { incrementVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state)

  const sortedAnecdotes = anecdotes
    .sort((a, b) => a.id - b.id)
    .sort((a, b) => a.votes - b.votes)
    .reverse()
  
  const dispatch = useDispatch()

  const vote = (id) => {
     dispatch(incrementVote(id))
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
    </div>
  )
}

export default AnecdoteList