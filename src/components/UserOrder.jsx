import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext'
import { Link, Navigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const UserOrder = () => {

    const { user } = useContext(UserContext); 
    
    const [data, setData] = useState([]);
    
    // For storing the data from the 2 fetch requests
    const [username, setUsername] = useState([]);
    const [productName, setProductName] = useState([]);

    // For storing the map data of username and productName
    const userIdToName = [];
    const productIdToName = [];

    useEffect(() =>{
        fetch(`${import.meta.env.VITE_API_URL}/order/all-orders`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data =>{
            console.log(data);
            setData(data.orders);
        })

    },[])

  // for fetching all profile (admin only)
    useEffect(() =>{
        fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setUsername(data.users)
        })
    },[])

    // for fetching all products (admin only)
    useEffect(() =>{
        fetch(`${import.meta.env.VITE_API_URL}/products/all`, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setProductName(data.products); 
        })
    },[])

    // To get the user name based on its ID
    username.forEach(user => {
        userIdToName[user._id] = `${user.firstName} ${user.lastName}`;
    });

    const productIdtoPrice = {}

    // To get the product name based on its ID
    productName.forEach(product =>{
        productIdToName[product._id] = `${product.name}`;
        productIdtoPrice[product._id] = `${product.price}`;
    })

    console.log(productIdtoPrice)
  return (
    // Papagandahin pa ang UI 
    (user.isAdmin)
    ? 
    <div className='p-5'>
        <Button variant='dark' as={Link} to='/products'>
            <FaArrowLeft/>
        </Button>
        <h1 className='text-center color-secondary mb-4'>User Order Overview</h1>
        {data.length > 0 
        ?
        (data.map((order, i) => (
            <div key={i} className='border p-3 my-2'>
                {console.log(order)}
                <h3 className=' mb-2 bg-orange-light p-2'>{userIdToName[order.userId]}</h3>
                <Table>
                    <thead>
                        <tr className=' text-center'>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.productsOrdered.map((product, j) => (
                            <tr key={j} className=' text-center'>
                                <td>{productIdToName[product.productId]}</td>
                                <td>&#8369; {productIdtoPrice[product.productId]}</td>
                                <td>{product.quantity}</td>
                                <td>&#8369; {product.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <p className=' text-danger'><span className=' fw-bold'>Total Price:</span> &#8369;{order.totalPrice}</p>
            </div>
        )))
        : <h1>No user has an existing order</h1>
        }
    </div>
    :
    <Navigate to="/products"/> 
  )
}

export default UserOrder
