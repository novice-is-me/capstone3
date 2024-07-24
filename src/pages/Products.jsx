import { useState, useEffect, useContext } from 'react';
import AdminView from '../components/AdminView';
import ProductsCatalogCards from '../components/ProductsCatalogCards'
import UserView from '../components/UserView';


import UserContext from '../UserContext';

export default function Products() {

    const {user} = useContext(UserContext);

    const [products, setProducts] = useState([]);


    const fetchData = () => {
        let fetchUrl = user.isAdmin === true ? "http://localhost:4005/b5/products/all" : "http://localhost:4005/b5/products";
    
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

    return(
        (user.isAdmin === true)
        ?
            <AdminView productsData={products} fetchData={fetchData}/>
        :
            <UserView productsData={products} />
    )
}