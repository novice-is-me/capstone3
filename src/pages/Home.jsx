import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import UserContext from '../UserContext'
import { Navigate } from 'react-router-dom';

const Home = () => {

  const { user } = useContext(UserContext);

  return (
    <div className=' text-center my-5'>
        <h1 className=' fs-1 color-secondary my-5'>Welcome to ECommerce API Website</h1>
        {(user.id === null && user.id === undefined) ?
          <Button href="/login" variant="primary">View Products</Button>
        : <Button href="/products" variant="primary">View Products</Button>
        }
    </div>
  )
} 

export default Home
