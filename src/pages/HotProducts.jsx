import React, { useEffect, useState } from 'react'
import { FaFire } from 'react-icons/fa'
import HotProductCards from '../components/HotProductCards';

const HotProducts = () => {

    const [products, setProducts] = useState([]);

    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/products/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            setProducts(data.products)
        })
    }, [])

    useEffect(() => {
        if (products.length > 0) {
          const randomProducts = (productsArr, numRandom) => {
            // creates new array of productsArr then suffle it
            const random = [...productsArr].sort(() => 0.5 - Math.random());
            return random.slice(0, numRandom);
          };
     
          const finalProduct = randomProducts(products, 6);
          setSelectedProducts(finalProduct);
        }
      }, [products]);

  return (
    <div className=' mb-lg-4'>
        <h1 className=' color-secondary text-uppercase fw-bold my-lg-3 mt-5'>Hot Products</h1>
        <div className=' d-flex w-100'>
            <HotProductCards products={selectedProducts}/>
        </div> 
    </div>
  )
}
 
export default HotProducts
