import {useState} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditProduct({product, fetchData}){

	// state for productId for the fetchURL
	const [productId, setProductId] = useState('');
	
	// const { productId } = useParams();
	// Forms State
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [showEdit, setShowEdit] = useState(false);

	const openEdit = (productId) => {

		fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`)
		.then(res => res.json())
		.then(data => {
			
			setProductId(data.product._id);  
			setName(data.product.name);
			setDescription(data.product.description);
			setPrice(data.product.price)
		})
		// Then, open the modal
		setShowEdit(true);
	}

	// function for closing the modal
	const closeEdit = () => {
		setShowEdit(false);
		setName('');
		setDescription('');
		setPrice(0);
	}

	// function to update/edit the product
	const editproduct = (e, productId) => {
		e.preventDefault();
		fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/update`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem("token")}`
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
			if(data.message === "Product updated successfully"){

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'product Successfully updated'
				})
				closeEdit();
				fetchData();
			}else{

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeEdit();
				fetchData();
			} 
		})
	}

	return(
		<>
			<Button variant="primary" size="sm" onClick={() => openEdit(product)}>Update</Button>
 
			{/*EDIT MODAL*/}
            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={e => editproduct(e, productId)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={name}
                            	onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control 
                            	type="text" 
                            	required
                            	value={description}
                            	onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control 
	                            type="number" 
	                            required
	                            value={price}
                            	onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
		</>
	)
}