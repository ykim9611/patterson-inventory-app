import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from './NavBar.module.css';
function NavBar() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Navbar
      expand='lg'
      data-bs-theme='dark'
      className={styles.customNavbar}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'
          className='d-flex align-items-center'
          onClick={() => setExpanded(false)}
        >
          <img
            alt=''
            src='/logo-dental.svg'
            width='90'
            height='50'
            className={`d-inline-block align-top ${styles.navBrandImage}`}
          />
          Inventory App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link
              as={Link}
              to='/add-order'
              className={styles.navLink}
              onClick={() => setExpanded(false)}
            >
              Add Order
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/modify-order'
              className={styles.navLink}
              onClick={() => setExpanded(false)}
            >
              Modify Order
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/view-all-order'
              className={styles.navLink}
              onClick={() => setExpanded(false)}
            >
              View All Order
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/install-checklist'
              className={styles.navLink}
              onClick={() => setExpanded(false)}
            >
              Install Checklist
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/location-update'
              className={styles.navLink}
              onClick={() => setExpanded(false)}
            >
              Location Update
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
