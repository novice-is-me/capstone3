import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {  Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar(){


  const { user } = useContext(UserContext);

	return (
		<Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand as={Link} to="/">ECommerceAPI</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">

                {/* <Nav.Link as={NavLink} to="/" exact="true">Home</Nav.Link> */}
                {/* <Nav.Link as={NavLink} to="/products-catalog" exact="true">Products</Nav.Link> */}
                {/*<Nav.Link as={NavLink} to="/news" exact="true">News</Nav.Link> */}
                {(user.id !== null && user.id !== undefined) ? 
                    user.isAdmin 
                        ?
                        <>
                            <Nav.Link as={Link} to="/addProduct">Add Product</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link as={NavLink} to="/products-catalog" exact="true">Products</Nav.Link>
                            {/* <Nav.Link as={NavLink} to="/profile" exact="true">Profile</Nav.Link> */}
                            <Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
                        </>
                    :
                    <>
                        <Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
                    </>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
	)
}