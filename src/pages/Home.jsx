import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import UserContext from '../UserContext'
import { Link, Navigate } from 'react-router-dom';

const Home = () => {

  const { user } = useContext(UserContext);

  return (
    <div className=' text-center my-5'>
        <h1 className=' fs-1 color-secondary my-5'>Welcome to ECommerce API Website</h1>
        {(user.id === null && user.id === null) ?
          <Button to="/login" variant="primary" as={Link}>View Products</Button>
        : <Button to="/products" variant="primary" as={Link}>View Products</Button>
        }
    </div>
  )
} 

export default Home
