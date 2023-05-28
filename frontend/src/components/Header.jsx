import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {useEffect} from "react"
import { Link } from 'react-router-dom';
import { userLogout, reset } from "../store/auth/authSlice";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'



import { FaUserAlt, FaSignInAlt } from "react-icons/fa";

import { VscActivateBreakpoints } from "react-icons/vsc";

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(userLogout());
    await dispatch(reset());
    navigate("/");
  }
  

  const checkUserInfo =() => {
    if(userInfo) {
      return (
        <Nav className='ms-auto'>
            <Nav.Link onClick={handleLogout}>logout
            </Nav.Link>
        </Nav>
      )
    } else {
      return (
        <Nav className='ms-auto'>
            <Nav.Link as={Link} to="/">
              <FaSignInAlt />&nbsp; Login
            </Nav.Link>
            <Nav.Link as={Link} to="/register" className="">
              <FaUserAlt />&nbsp; Register
            </Nav.Link>
        </Nav>
      )
    }
  }

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <VscActivateBreakpoints /> Bookeroo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          {
            checkUserInfo()
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
