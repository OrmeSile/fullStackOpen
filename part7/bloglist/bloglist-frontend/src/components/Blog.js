import { React } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {

  return (
    <ListGroup.Item className='blog'>
      <span className='div-blog'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}</span>
    </ListGroup.Item>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
}

Blog.displayName = 'Blog'

export default Blog