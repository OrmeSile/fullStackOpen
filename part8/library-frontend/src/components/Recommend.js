import { useLazyQuery, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { ME, BOOKS_BY_GENRE } from '../query'

const Recommend = ({ show, token }) => {
  const meResult = useQuery(ME, {skip: !token})
  console.log(meResult)
  const favoriteGenre = meResult.data ? meResult.data.me.favoriteGenre : ''
  const booksResult = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: favoriteGenre },
    skip: !meResult.data
  })

  if (!show) {
    return null
  }

  const books = booksResult.data.allBooks

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
          {books.map((a) => (
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
