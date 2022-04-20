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
    likeBlog(state, action) {
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

export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogSlice.actions

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

export const addLike = (content) => {
  return async (dispatch) => {
    const { user, ...rest } = content
    const newBlog = { ...rest, likes: content.likes + 1 }
    await blogService.update(newBlog)
    const storeBlog = { ...newBlog, user: user }
    dispatch(likeBlog(storeBlog))
  }
}

export default blogSlice.reducer
