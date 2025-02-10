import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    });

    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div className="container m-0">
      <h2>create new</h2>
      <Form onSubmit={addBlog} className="w-50">
        <Form.Group>
          title:
          <Form.Control
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            required
            placeholder="Title"
          />
        </Form.Group>
        <Form.Group>
          author:
          <Form.Control
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="Author"
          />
        </Form.Group>
        <Form.Group>
          url:
          <Form.Control
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="Url"
          />
        </Form.Group>
        <Button className="mt-3" type="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
