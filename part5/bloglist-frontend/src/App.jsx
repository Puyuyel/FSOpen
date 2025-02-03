import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState({ message: null, isError: false })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (excption) {
      setNotificationMessage({ message: 'wrong username or password', isError: true })
      setTimeout(() => {
        setNotificationMessage({ ...notificationMessage, message: null })
      },2000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLike = async id => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = structuredClone(blogToLike)
    likedBlog.likes += 1

    const updatedBlog = await blogService.update(id, likedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  }

  const handleDelete = async id => {
    const blogToRemove = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}`)){
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setNotificationMessage({ message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, isError: false })
    setTimeout(() => {
      setNotificationMessage({ ...notificationMessage, message: null })
    },2000)
  }

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage.message} isError={notificationMessage.isError} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type='text'
              value={username}
              name='Username'
              data-testid='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type='text'
              value={password}
              name='Password'
              data-testid='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {
        user &&
        <>
          <h2>blogs</h2>
          <Notification message={notificationMessage.message} isError={notificationMessage.isError} />
          <p>{user.name} logged in<button onClick={handleLogOut}>log out</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef} >
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleDelete}
                currentUser={user}
              />
            )
          }
        </>
      }
    </div>
  )
}

export default App