import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {  Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar(){


  const { user } = useContext(UserContext);

	return (
		<Navbar expand="lg" className="bg-orange p-4">
          <Container>
            <Navbar.Brand as={Link} to="/" className='text-white me-auto fs-2'>ECommerceAPI</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className=" ms-auto">

                {(user.id !== null && user.id !== undefined) ? 
                    user.isAdmin 
                        ?
                        <>
                            <Nav.Link as={Link} to="/logout" className='text-white fs-3'>Logout</Nav.Link>
                        </>
                        :
                        <>
                            <Nav.Link as={NavLink} to="/profile" exact="true" className='text-white fs-4'>Profile</Nav.Link>
                            <Nav.Link as={NavLink} to="/logout" exact="true" className='text-white fs-4'>Logout</Nav.Link>
                        </>
                    :
                    <>
                        <Nav.Link as={NavLink} to="/login" exact="true" className='text-white fs-4 me-3'>Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register" exact="true" className='text-white fs-4'>Register</Nav.Link>
                    </>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
	)
}