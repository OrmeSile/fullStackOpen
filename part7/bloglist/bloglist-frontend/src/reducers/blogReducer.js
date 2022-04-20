import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(_state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const blogId = action.payload.id
      const newBlog = action.payload
      return state.map((blog) => (blog.id === blogId ? newBlog : blog))
    },
    removeBlog(state, action) {
      const blogId = action.payload.id
      return state.filter((blog) => blog.id !== blogId)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const blog = await blogService.create(content)
    dispatch(appendBlog(blog))
  }
}

export const deleteBlog = (content) => {
  return async (dispatch) => {
    await blogService.deleteBlog(content)
    dispatch(removeBlog(content))
  }
}

export const addComment = (content) => {
  console.log(content)
  return async (dispatch) => {
    const blog = content.blog
    const comments = [...blog.comments.concat(content.comment)]
    const newBlog = { ...blog, comments: comments }
    // eslint-disable-next-line no-unused-vars
    const { user, ...rest } = newBlog
    console.log(rest)
    const response = await blogService.updateComments(rest)
    console.log(response)
    dispatch(updateBlog(newBlog))
  }
}

export const addLike = (content) => {
  return async (dispatch) => {
    const { user, ...rest } = content
    const newBlog = { ...rest, likes: content.likes + 1 }
    await blogService.update(newBlog)
    const storeBlog = { ...newBlog, user: user }
    dispatch(updateBlog(storeBlog))
  }
}

export default blogSlice.reducer
