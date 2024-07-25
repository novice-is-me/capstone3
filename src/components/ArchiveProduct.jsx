import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function ArchiveProduct({product, isActive, fetchData}) {

    const archiveToggle = (productId) => {
        fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/archive`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            if(data.message === "Product archived successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully disabled'
                })
                fetchData();

            }else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please Try again'
                })
                fetchData();
            }


        })
    }


    const activateToggle = (productId) => {
        fetch(`${import.meta.env.VITE_API_URL}/products/${productId}/activate`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        .then(res => res.json())
        .then(data => {
            if(data.message === "Product activated successfully") {
                Swal.fire({
                    title: 'Success',
                    icon: 'success',
                    text: 'Product successfully enabled'
                })
                fetchData();
            }else {
                Swal.fire({
                    title: 'Something Went Wrong',
                    icon: 'error',
                    text: 'Please Try again'
                })
                fetchData();
            }


        })
    }
 

    return(
        <>
            {isActive ?

                <Button variant="danger" size="sm" onClick={() => archiveToggle(product)}>Disable</Button>

                :

                <Button variant="success" size="sm" onClick={() => activateToggle(product)}>Activate</Button>

            }
        </>

    )
}