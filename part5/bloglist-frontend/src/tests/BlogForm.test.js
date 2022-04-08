import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

const user = {
  name: 'root',
  username: 'root'
}

const blog = {
  title: 'hello',
  author: 'me',
  url: 'http',
}

test('blogForm calls event handler with right details',async () => {

  const mockHandler = jest.fn()
  const { container } = render(<BlogForm createBlog={mockHandler}></BlogForm>)

  const button = screen.getByText('create')
  const name = screen.getByPlaceholderText('name')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  await userEvent.type(name, blog.title)
  await userEvent.type(author, blog.author)
  await userEvent.type(url, blog.url)

  await userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toEqual(blog)
  console.log(mockHandler.mock.calls)
})