import { useState, useEffect, useContext } from 'react';
import { Form,Button } from 'react-bootstrap';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import UserContext from '../UserContext';
import { FaArrowLeft } from 'react-icons/fa';

export default function AddProduct(){

    const navigate = useNavigate();

    const {user} = useContext(UserContext);

    //input states
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState("");

    function createProduct(e){

        //prevent submit event's default behavior
        e.preventDefault();

        let token = localStorage.getItem('token');

        fetch(`${import.meta.env.VITE_API_URL}/products/`,{

            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);  
            if(data.message === "Product already exists"){

                Swal.fire({
                    title: "Product Creation Error",
                    icon: "error",
                    text: "Product already exists.",
                });

            } else if (data) {
                setName("")
                setDescription("")
                setPrice(0);

                Swal.fire({
                    title: "Product Creation Successful",
                    icon: "success",
                    text: "Product Added successfully.",
                });
                navigate("/products");
            } else {
                Swal.fire({
                    title: "Product Creation Error",
                    icon: "error",
                    text: "Unsuccessful Product Creation.",
                });
            }
            setName("");
            setDescription("");
            setPrice(0);
        })
    }

    return (

            (user.isAdmin === true && user.id !== null)
            ?
            <div className=' p-5'>
                <Button variant='dark' as={Link} to='/products'>
                    <FaArrowLeft/>
                </Button>
                <h1 className="my-5 text-center color-secondary">Add Product</h1>
                <Form onSubmit={e => createProduct(e)}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            required
                            value={name}
                            onChange={e => {setName(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            required
                            value={description}
                            onChange={e => {setDescription(e.target.value)}}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Price"
                            required
                            value={price}
                            onChange={e => {setPrice(e.target.value)}}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </div>
            :
            <Navigate to="/products" />

    )


}