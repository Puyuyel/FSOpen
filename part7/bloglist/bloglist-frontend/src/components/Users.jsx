import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Users = ({ users }) => {
  return (
    <div className="container-fluid m-0">
      <h1>Users</h1>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="bg-secondary text-white">Name</th>
            <th className="bg-secondary text-white">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
