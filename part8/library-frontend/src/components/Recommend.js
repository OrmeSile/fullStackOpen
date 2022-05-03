import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../query'

const Recommend = ({show}) => {
  const userQuery = useQuery(ME)
  const booksQuery = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  const books = booksQuery.data.allBooks
  const favoriteGenre = userQuery.data.me.favoriteGenre

  const filterBooks = () => {
    return books.filter((book) => book.genres.includes(favoriteGenre))
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{favoriteGenre}</b>
      </p>
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
    </div>
  )
}

export default Recommend
