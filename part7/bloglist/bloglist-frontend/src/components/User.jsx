import { ListGroup } from 'react-bootstrap';

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="container m-0">
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ListGroup className="container p-2 m-1 w-50" numbered>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default User;
