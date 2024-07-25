import React from 'react'
import { Button } from 'react-bootstrap'

const Home = () => {
  return (
    <div className=' text-center my-5'>
        <h1 className=' fs-1 color-secondary my-5'>Welcome to ECommerce API Website</h1>
        <Button href="/products" variant="primary">View Products</Button>
    </div>
  )
} 

export default Home
