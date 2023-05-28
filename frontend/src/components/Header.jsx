import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import { FaUserAlt, FaSignInAlt } from "react-icons/fa";

import { VscActivateBreakpoints } from "react-icons/vsc";

function Header() {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <VscActivateBreakpoints /> Bookeroo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className='ms-auto'>
            <Nav.Link href="/">
              <FaSignInAlt />&nbsp; Login</Nav.Link>
            <Nav.Link href="/register" className="">
              <FaUserAlt />&nbsp; Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
