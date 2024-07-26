import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
// import ProductsCatalogCards from '../components/ProductsCatalogCards'
import UserView from '../components/UserView';
import CartView from './CartView';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


import UserContext from '../UserContext';
import { FaCartShopping } from 'react-icons/fa6';

export default function Products() {

    const {user} = useContext(UserContext);

    const [products, setProducts] = useState([]);


    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ? `${import.meta.env.VITE_API_URL}/products/all` : `${import.meta.env.VITE_API_URL}/products`;
    
        fetch(fetchUrl, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            
            if (data.message === "No products found") {
                setProducts([]);
            } else {
                setProducts(data.products); 
            }
        })
    };

    useEffect(() => {

    	fetchData();

    }, [user]);

    return (
        <div style={{ position: 'relative' }}>
            {user.isAdmin ? (
                <AdminView productsData={products} fetchData={fetchData} />
            ) : (
                <>
                <UserView productsData={products} />
                <Link to="/get-cart" style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '100' }}>
                    <Button variant="success">
                        <FaCartShopping className=' me-2'/>
                        View Cart</Button>
                </Link>
                </>
            )}
        </div>
    );
}