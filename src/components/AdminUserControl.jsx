import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AdminUserControl = () => {

    const [users, setUsers] = useState([])

    useEffect(() =>{
        fetch(`${import.meta.env.VITE_API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            setUsers(data.users); 
        })
    },[])
    
    const changeAdmin = (userId) =>{
        console.log(userId)
        fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/set-as-admin`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.updatedUser){
                setUsers(users => users.filter(data => data._id !== userId))

                Swal.fire({
                    title: 'Succesfully Updated!',
                    icon: 'success',
                    text: 'The user is now an admin'
               })
            }
        })
    } 

    const userOnly = users.filter(user => user.isAdmin === false);

    const changeToAdmin = (userId) =>{
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            text: 'This will set the user as an admin',
            showCancelButton: true,
        }).then((result) =>{
            if(result.isConfirmed){
               changeAdmin(userId)
            }
        })
    }
  return (
    <div className=' py-5'>
        <Button variant='dark' as={Link} to="/products"><FaArrowLeft/></Button>
        <h1 className=' text-center color-secondary mt-md-0 mt-4'>Admin User Control</h1>
        <div className=' border mt-3 mt-md-5 p-3'>
            <Table>
                <thead>
                    <tr className=' text-center'>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {userOnly.map((user) => (
                        <tr key={user._id} className=' text-center'>
                            <td>{user.email}</td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td><Button variant='danger' onClick={() => changeToAdmin(user._id)}>Set As Admin</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </div>
  )
}

export default AdminUserControl
