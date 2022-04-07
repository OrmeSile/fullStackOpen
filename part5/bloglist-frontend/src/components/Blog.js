/* eslint-disable react/prop-types */
import {React, useState} from 'react'
const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false)
    
  const showDetails = () => {
    setDetails(!details)
  }

  const showWhenVisible = { display: details ? '' : 'none' }

  const style = {
    border: 'solid black 2px',
    borderRadius: '5px',
    margin: '5px 0',
    padding: '2px 10px'
  }

  return (
    <div style={style}>
      {blog.title} {blog.author}
      <button onClick={showDetails}>
        {details ? 'hide' : 'view'}
      </button>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
    </div>  
  )
}

export default Blog