/* eslint-disable react/prop-types */
import React from 'react'

const BlogForm = ({
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  handleCreate
}) => {
  return (
    <form onSubmit={handleCreate}>
      <div>
        <label htmlFor='title'>title: </label>
        <input type='text' name='title' value={title} onChange={({target}) => setTitle(target.value)} />
      </div>
      <div>
        <label htmlFor='author'>author: </label>
        <input type='text' name='author' value={author} onChange={({target}) => setAuthor(target.value)} />
      </div>
      <div>
        <label htmlFor='url'>url: </label>
        <input type='text' name='author' value={url} onChange={({target}) => setUrl(target.value)} />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm