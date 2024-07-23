import React from 'react'
import { useEffect, useState } from 'react'
import ProductsCatalogCards from '../components/ProductsCatalogCards'

const ProductsCatalog = () => {

    const [products, setProducts] = useState([])

    useEffect(() =>{
        fetch('http://localhost:4005/b5/products/active', {
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setProducts(data.products.map(product =>{
                return (
                    <ProductsCatalogCards key={product._id} product={product}/>
                )
            }))
            
        })
    },[]) 

  return (
    <div className='p-5'>
      <h1 className=' text-danger text-uppercase fw-bold'>Our Products</h1> 
      <div className='d-flex justify-content-evenly my-5'> 
        {products}
      </div>
    </div>
  )
}

export default ProductsCatalog
