import { React, useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog(
      {
        title: title,
        author: author,
        url: url,
      }
    )
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor='title'>title: </label>
        <input placeholder='name' type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label htmlFor='author'>author: </label>
        <input placeholder='author' type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <label htmlFor='url'>url: </label>
        <input placeholder='url' type='text' name='author' value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func
}

export default BlogForm