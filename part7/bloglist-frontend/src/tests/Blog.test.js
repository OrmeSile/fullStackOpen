import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

const user = {
  name: 'root',
  username: 'root'
}

const blog = {
  title: 'hello',
  author: 'me',
  url: 'http',
  likes: 27,
  user: user
}

test('blog only shows title and author when first rendered', () => {

  const { container } = render(<Blog blog={blog} user={ user }/>)

  const fullSpan = container.querySelector('.div-blog')
  const hiddenDiv = container.querySelector('.hidden')
  expect(fullSpan).toHaveTextContent('hello me')
  expect(hiddenDiv).toHaveStyle('display: none')

})

test('blog shows url and likes when view button clicked', async () => {

  const { container } =
    render(
      <Blog blog={blog} user={user} />
    )
  const button = screen.getByText('view')
  await userEvent.click(button)
  const hiddenDiv = container.querySelector('.hidden')

  expect(hiddenDiv).not.toHaveStyle('display: none')
})

test('event handler called twice when like button clicked twice', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} user={user} handleLikes={mockHandler} />
  )

  const button = screen.getByText('like')

  await userEvent.click(button)
  await userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})