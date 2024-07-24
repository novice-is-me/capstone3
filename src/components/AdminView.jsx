import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';
import { Link } from 'react-router-dom';

export default function AdminView({ productsData, fetchData }) {


    const [products, setProducts] = useState([])


    useEffect(() => {
        const productsArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>
                        {product.isActive ? "Available" : "Unavailable"}
                    </td>
                    <td className="text-center">
                        <EditProduct product={product._id} fetchData={fetchData}/>
                        <ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData}/>
                    </td>
                </tr>
                )
        })

        setProducts(productsArr)

    }, [productsData])


    return(
        <>
            <h1 className="text-center my-4"> Admin Dashboard</h1>
            <div className='d-flex border mb-5 justify-content-center gap-4'>
                <Link 
                    to='/addProduct'
                    className=' btn btn-info'>Add New Product
                </Link>
                <Link 
                    to='/user-order'
                    className=' btn btn-warning'>Show Users Orders
                </Link>
            </div>
            
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products}
                </tbody>
            </Table>    
        </>

        )
}