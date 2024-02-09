import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoginFormModal from './LoginFormModal/LoginFormModal'
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import SignUpFormModal from './SignUpFormModal/SignUpFormModal';
import { Link, useNavigate } from "react-router-dom"
import * as userService from '../utilities/users-service'
import { useProducts } from '../contexts/ProductContext';
import './NavBar.css'

export default function NavBar({ user, setUser }) {
  const [showLoginFormModal, setShowLoginFormModal] = useState(false);
  const [showSignupFormModal, setShowSignupFormModal] = useState(false);
  const navigate = useNavigate();
  const { setResult } = useProducts();
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  function handleClick() {
    setResult(false);
  }

  function handleLogOut() {
    userService.logOut();
    navigate('/');
    setUser(null);
  }

  function checkScreenSize() {
    setIsSmallScreen(window.innerWidth < 768);
  }

  window.addEventListener('resize', checkScreenSize);

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
          <img
        src="https://cosmicokc.com/wp-content/uploads/2022/11/Cosmic_Collectibles_Logo-1.png"
        alt="cosmic collectibles logo"
        className="navbar-logo"
      />
            Cosmic Collectibles
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav">
            {isSmallScreen ? (
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" onClick={handleClick}>Home</Nav.Link>
                <Nav.Link as={Link} to="/products" onClick={handleClick}>Products</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" onClick={handleClick}>About Us</Nav.Link>
                <Nav.Link as={Link} to="/contactus" onClick={handleClick}>Contact Us</Nav.Link>
              </Nav>
            ) : (
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/" onClick={handleClick}>Home</Nav.Link>
                <Nav.Link as={Link} to="/products" onClick={handleClick}>Products</Nav.Link>
                <Nav.Link as={Link} to="/aboutus" onClick={handleClick}>About Us</Nav.Link>
                <Nav.Link as={Link} to="/contactus" onClick={handleClick}>Contact Us</Nav.Link>
              </Nav>
            )}
            <Nav>
              {user ?
                <>
                  <Nav.Link as={Link} to="/cart">
                    <img
                      src="https://www.shareicon.net/data/2016/02/07/281223_cart_512x512.png"
                      width="40vh"
                      height="35vh"
                      className="d-inline-block align-top"
                      alt="Shopping cart logo"
                    />
                  </Nav.Link>
                  &nbsp;
                  &nbsp;
                  <div className='d-flex align-items-center'>
                    <h5 style={{color: "white", paddingTop: '4%'}}>Welcome {user.name}</h5>
                    &nbsp;
                    &nbsp;
                    <Button variant="secondary" onClick={handleLogOut}>Log out</Button>
                  </div>
                </>
                :
                <div className='d-flex'>
                  <Button variant="secondary" onClick={() => setShowLoginFormModal(true)}>Log in</Button>
                  &nbsp;
                  &nbsp;
                  <Button variant="secondary" onClick={() => setShowSignupFormModal(true)}>Sign up</Button>
                </div>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginFormModal show={showLoginFormModal} handleClose={() => setShowLoginFormModal(false)} setUser={setUser} />
      <SignUpFormModal show={showSignupFormModal} handleClose={() => setShowSignupFormModal(false)} setUser={setUser} />
    </div>
  );
}
