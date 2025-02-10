import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import {
  setErrorMessage,
  setNotification,
} from './reducers/notificationReducer';
import {
  commentBlog,
  createBlog,
  deleteBlog,
  initializeBlogs,
  likeBlog,
} from './reducers/blogReducer';
import { initializeUser, loginUser, logOutUser } from './reducers/userReducer';
import Users from './components/Users';
import axios from 'axios';
import User from './components/User';
import BlogInfo from './components/BlogInfo';
import Menu from './components/Menu';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const blogFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/users').then((response) => setUsers(response.data));
    dispatch(initializeBlogs());
    dispatch(initializeUser());
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginUser({ username, password }));
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setErrorMessage('wrong username or password', 5));
    }
  };

  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch(logOutUser());
  };

  const handleLike = (id) => {
    dispatch(likeBlog(id));
  };

  const handleDelete = (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id);
    if (
      window.confirm(`Remove ${blogToRemove.title} by ${blogToRemove.author}`)
    ) {
      dispatch(deleteBlog(id));
      navigate('/');
    }
  };

  const handleAddComment = (blog, comment) => {
    const updatedBlog = { ...blog, comments: blog.comments.concat(comment) };
    dispatch(commentBlog(updatedBlog));
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));

    dispatch(
      setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        5
      )
    );
  };

  const userMatch = useMatch('/users/:id');
  const userView = userMatch
    ? users.find((u) => u.id == userMatch.params.id)
    : null;

  const blogMatch = useMatch('/blogs/:id');
  const blogView = blogMatch
    ? blogs.find((b) => b.id == blogMatch.params.id)
    : null;

  const loginForm = () => {
    return (
      <div className="container d-grid justify-content-center align-items-center">
        <h2 className="text-center mb-4 mt-3">Log in to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              name="Username"
              data-testid="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="text"
              value={password}
              name="Password"
              data-testid="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="container d-grid w-50"
            >
              login
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  };

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <>
          <Menu user={user} handleLogOut={handleLogOut} />
          <h1>blog app</h1>
          <Notification />
          <Routes>
            <Route
              path=""
              element={
                <>
                  <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                  </Togglable>
                  {[...blogs]
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                      <Link key={blog.id} to={`/blogs/${blog.id}`}>
                        <Blog blog={blog} />
                      </Link>
                    ))}
                </>
              }
            />
            <Route
              path="/blogs/:id"
              element={
                <BlogInfo
                  blog={blogView}
                  handleLike={handleLike}
                  handleRemove={handleDelete}
                  handleAddComment={handleAddComment}
                  currentUser={user}
                />
              }
            />
            <Route path="/users/:id" element={<User user={userView} />} />
            <Route path="/users" element={<Users users={users} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
