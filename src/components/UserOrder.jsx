import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../UserContext'
import { Navigate } from 'react-router-dom';

const UserOrder = () => {

    const { user } = useContext(UserContext); 
    
    const [data, setData] = useState([]);
    
    const [username, setUsername] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:4005/b5/order/all-orders',{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data =>{
            console.log(data);
            setData(data.orders);
        })

    },[])

  // for fetching all profile
    useEffect(() =>{
        fetch('http://localhost:4005/b5/users/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            setUsername(data.users)
        })

    },[])

    const userIdToName = [];

    // for mapping user id to user name
    username.forEach(user => {
        console.log(user); 
        userIdToName[user._id] = `${user.firstName} ${user.lastName}`;
    });
    
  return (
    // Papagandahin pa ang UI 
    (user.isAdmin)
    ? 
    <div className='p-5'>
        <h1 className='text-center'>User Order Overview</h1>
        {data.length > 0 
        ?
        (data.map((order => {
            return (
                <div key={order._id}>
                    <h2>User: {userIdToName[order.userId]}</h2>
                    {order.productsOrdered.map((product) => (
                        <>
                        <p>User Order: {product.productId}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>Total:{product.subtotal}</p>
                        </>
                    ))}
                    <p>Total Order: {order.totalPrice}</p>
                    <p>Order Status: {order.status}</p>
                </div>
            )
        })))
        : <h1>No user has an existing order</h1>
        }
    </div>
    :
    <Navigate to="/products"/> 
  )
}

export default UserOrder
