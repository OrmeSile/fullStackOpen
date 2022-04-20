import { React } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

  const style = {
    border: 'solid black 2px',
    borderRadius: '5px',
    margin: '5px 0',
    padding: '2px 10px'
  }

  return (
    <div className='blog' style={style}>
      <span className='div-blog'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}</span>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

Blog.displayName = 'Blog'

export default Blog