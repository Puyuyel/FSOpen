import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Menu = ({ user, handleLogOut }) => {
  const padding = {
    paddingRight: 5,
    paddingLeft: 10,
  };
  return (
    <Navbar bg="dark" variant="tabs">
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/">
          blogs
        </Link>
      </Nav.Link>
      <Nav.Link href="#" as="span">
        <Link style={padding} to="/users">
          users
        </Link>
      </Nav.Link>
      <div className="container-fluid justify-content-end">
        <p className="text-white m-0 p-2 "> {user.name} logged in </p>
        <Button onClick={handleLogOut}>log out</Button>
      </div>
    </Navbar>
  );
};

export default Menu;
