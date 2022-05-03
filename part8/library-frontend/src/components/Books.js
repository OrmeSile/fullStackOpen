import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../query'
import { useState } from 'react'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('all')

  if (result.loading) {
    return <div>Loading...</div>
  }
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

  const filterBooks = () => {
    if (genre === 'all') {
      return books
    } else {
      return books.filter(book => book.genres.includes(genre))
    }
  }
  const bookGenres = books
    .map((book) => book.genres)
    .flat()
    .reduce((total, current) => {
      return !total.includes(current) ? total.concat(current) : total
    }, [])

  return (
    <div>
      <h2>books</h2>
      {genre !== 'all' && <h3>Showing books with genre {genre}</h3>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filterBooks().map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {bookGenres.map((genre) => (
        <button onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre('all')}>All books</button>
    </div>
  )
}

export default Books
