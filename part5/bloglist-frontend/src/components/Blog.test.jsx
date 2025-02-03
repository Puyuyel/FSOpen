import { expect, test, vi } from 'vitest'
import Blog from './Blog'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'test title',
  author: 'test author',
  url: 'https://test-url.com',
  likes: 10,
  user: {
    username: 'testuser',
    name: 'Test User'
  }
}

test('renders content without url and number of likes initially', () => {
  render(<Blog blog={blog} />)

  const titleAuthor = screen.getByText('test title test author')
  expect(titleAuthor).toBeDefined()

  const url = screen.queryByText('https://test-url.com')
  const likes = screen.queryByText('likes 10')
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('renders url and number of likes when view button is clicked', async () => {
  render(<Blog blog={blog} currentUser={{ username: 'testuser' }} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.getByText('https://test-url.com')
  const likes = screen.getByText('likes 10')
  expect(url).toBeDefined()

})

test('clicking the like button twice calls the event handler two times', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} currentUser={{ username: 'testuser' }} handleLike={mockHandler} />)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
