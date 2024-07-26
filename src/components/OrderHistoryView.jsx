import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import { Link, Navigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

const UserOrder = () => {
    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});

    useEffect(() => {
        // Fetch the current user's orders
        fetch(`${import.meta.env.VITE_API_URL}/order/my-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setOrders(data.orders || []);
            })
            .catch((error) => console.error('Error fetching orders:', error));
    }, []);

    useEffect(() => {
        // Fetch all products to get names and prices
        fetch(`${import.meta.env.VITE_API_URL}/products/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                const productMap = {};
                data.products.forEach((product) => {
                    productMap[product._id] = {
                        name: product.name,
                        price: product.price,
                    };
                });
                setProducts(productMap);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    if (!user) return <Navigate to="/login" />; 

    return user.isAdmin ? (
        <Navigate to="/products" />
    ) : (
        <div className='p-5'>
            <Button variant='dark' as={Link} to='/products'>
                <FaArrowLeft />
            </Button>
            <h1 className='text-center color-secondary mb-4'>My Order History</h1>
            {orders.length > 0 ? (
                orders.map((order, i) => (
                    <div key={i} className='border p-3 my-2'>
                        <h3 className='mb-2 bg-orange-light p-2'>Order #{order._id}</h3>
                        <Table>
                            <thead>
                                <tr className='text-center'>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.productsOrdered.map((product, j) => (
                                    <tr key={j} className='text-center'>
                                        <td>{products[product.productId]?.name}</td>
                                        <td>&#8369; {products[product.productId]?.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>&#8369; {product.subtotal}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <p className='text-danger'>
                            <span className='fw-bold'>Total Price:</span> &#8369;{order.totalPrice}
                        </p>
                    </div>
                ))
            ) : (
                <h1>No orders found</h1>
            )}
        </div>
    );
};

export default UserOrder;
