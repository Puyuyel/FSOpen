import { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';

const BlogInfo = ({
  blog,
  handleLike,
  handleRemove,
  handleAddComment,
  currentUser,
}) => {
  const [comment, setComment] = useState('');

  if (!blog) return null;
  return (
    <div className="container m-0">
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <Button onClick={() => handleLike(blog.id)}>like</Button>
      </div>
      <div>added by {blog.user.name}</div>
      {currentUser.username === blog.user.username && (
        <Button onClick={() => handleRemove(blog.id)}>remove</Button>
      )}
      <h2>comments</h2>
      <div>
        <div className="container d-flex m-0">
          <Form.Control
            className="w-50"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="add a new comment"
          />
          <Button
            className="m-0"
            onClick={() => handleAddComment(blog, comment)}
          >
            add comment
          </Button>
        </div>
        <ListGroup className="container p-2 m-1 w-50" numbered>
          {blog.comments.map((comment, index) => (
            <ListGroup.Item variant="info" action key={index}>
              {comment}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default BlogInfo;
