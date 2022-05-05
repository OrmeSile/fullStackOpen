import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../query'
import { useState, useEffect } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [booksByGenre, { loading, error, data }] = useLazyQuery(BOOKS_BY_GENRE)
  
  useEffect(() => {
    booksByGenre({variables: {genre}})
  }, [genre])

  if (loading) {
    return <div>Loading...</div>
  }
  if (!props.show) {
    return null
  }
  if (error) {
    console.log(error)
  }

  const bookGenres = data.allBooks
    .map((book) => book.genres)
    .flat()
    .reduce((total, current) => {
      return !total.includes(current) ? total.concat(current) : total
    }, [])
  
  const handleCLick = (genre) => {
    setGenre(genre)
    booksByGenre({ variables: { genre } })
  }

  return (
    <div>
      <h2>books</h2>
      {genre ? <h4>Showing books with genre {genre}</h4> : <h4>Showing all books</h4>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {bookGenres.map((genre) => (
        <button key={genre} onClick={() => handleCLick(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre(null)}>All books</button>
    </div>
  )
}

export default Books
