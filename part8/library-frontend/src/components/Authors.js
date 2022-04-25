import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS, MODIFY_AGE } from '../query'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [option, setOption] = useState(null)

  const result = useQuery(ALL_AUTHORS)
  const [modifyAge] = useMutation(MODIFY_AGE, {
    refetchQueries: [ALL_AUTHORS],
  })

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  const options = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }))

  const handleModifyAuthorAge = (event) => {
    event.preventDefault()
    modifyAge({
      variables: {
        name: option.value,
        born: Number(born),
      },
    })
    setName('')
    setBorn('')
  }

  const handleOptionChange = (option) => {
    setOption(option)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={handleModifyAuthorAge}>
        <div>
          <label>
            {'name '}
            <Select
              value={option}
              onChange={handleOptionChange}
              options={options}
            />
          </label>
        </div>
        <div>
          <label>
            {'born '}
            <input
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </label>
        </div>
        <button>set date</button>
      </form>
    </div>
  )
}

export default Authors
