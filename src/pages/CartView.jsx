import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import { Table, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartView = () => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const [products, setProducts] = useState([]); 
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart) {
      calculateTotalQuantity();
    }
  }, [cart]);

  // Showing cart
  const fetchCart = () => {
    fetch(`${import.meta.env.VITE_API_URL}/cart/get-cart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.cart) {
          setCart(data.cart);
        } else {
          setCart(null);
        }
      })
      .catch((error) => console.error("Error fetching cart:", error));
  };

  // Removing
  const handleRemoveItem = (productId) => {
    fetch(`${import.meta.env.VITE_API_URL}/cart/${productId}/remove-from-cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Item removed from the cart successfully") {
          Swal.fire({
            title: "Item Removed",
            icon: "success",
            text: "Item removed from cart successfully.",
          }).then(() => {
            fetchCart()
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to remove item from cart. Please try again.",
          });
        }
      })
      .catch((error) =>
        console.error("Error removing item from cart:", error)
      );
  };

  // getting the product name and price
  useEffect(() =>{  
    fetch(`${import.meta.env.VITE_API_URL}/products`, {
        headers:{
          'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data); 
      setProducts(data.products)
    })
  },[])

  const productIdtoName = {};
  const productIdtoPrice = {};

  products.forEach(product =>{
    console.log(product)
    productIdtoName[product._id] = product.name
    productIdtoPrice[product._id] = product.price
  })

  const handleCheckout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/order/checkout`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())  
    .then(data =>{
      console.log(data); 
      if(data.message === "Ordered successfully."){
        Swal.fire({
          title: 'Order Successful',
          icon: 'success',
          text: 'Order placed successfully.'
        }).then(() => handleClearCart())
      }else if(data.error === "No items to Checkout"){
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'No items in the cart to checkout.'
        })
      }
    })
  }

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    fetch(`${import.meta.env.VITE_API_URL}/cart/update-cart-quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Item quantity updated successfully") {
          Swal.fire({
            title: "Quantity Updated",
            icon: "success",
            text: "Item quantity updated successfully.",
          }).then(() => fetchCart());
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to update item quantity. Please try again.",
          });
        }
      })
      .catch((error) =>
        console.error("Error updating item quantity:", error)
      );
  };

  const handleClearCart = () => {
    fetch(`${import.meta.env.VITE_API_URL}/cart/clear-cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.message === "Cart cleared successfully") {
          Swal.fire({
            title: "Cart Cleared",
            icon: "success",
            text: "Cart cleared successfully.",
          }).then(() => {
            fetchCart()
          });
        } else if(data.message === "Cart is already empty"){
          Swal.fire({
            title: "No items in the cart",
            icon: "error",
            text: "Cart is already empty"
          })
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to clear cart. Please try again.",
          })
        }
        setTotalQuantity(0); 
      })
      .catch((error) => console.error("Error clearing cart:", error));
  };

  const calculateTotalQuantity = () => {
    let total = 0;
    cart.cartItems.forEach((item) => {
      total += item.subtotal;
    });
    setTotalQuantity(total);
  };

  const renderCartItems = () => {
    if (!cart || cart.cartItems.length === 0) {
      return (
        <tr>
          <td colSpan="5">No items in the cart</td>
        </tr>
      );
    }

    return cart.cartItems.map((item, i) => (
      <tr key={item.productId} className=" text-center">
        <td>{productIdtoName[item.productId]}</td>
        {console.log(item.quantity)} 
        <td>&#8369;{productIdtoPrice[item.productId]}</td>
        <td key={i} className=" d-flex justify-content-evenly">
          <Button
            variant="light"
            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>
            <FaMinus />
          </Button>  
          <span>{item.quantity}</span>
          <Button
            variant="light"
            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>
            <FaPlus />
          </Button>
        </td>
        <td>&#8369;{item.subtotal}</td>
        <td>
          <Button
            variant="danger"
            onClick={() => handleRemoveItem(item.productId)}>
            Remove
          </Button>
        </td>
      </tr>
    ));
  };

  useEffect(() =>{
    fetchCart()
  },[handleClearCart, handleCheckout])

  return (
    <div className="p-5">
      <Button variant='dark' as={Link} to='/products'>
            <FaArrowLeft/>
        </Button>
      <h2 className="text-center my-4">Your Shopping Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr className=" text-center">
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>{renderCartItems()}</tbody>
      </Table>
      <div className="text-center my-4">
        <Card.Text className='fs-4'>Total: &#8369;{totalQuantity}</Card.Text>
        <Button variant="success mx-3" onClick={handleCheckout}>Checkout</Button>
        <Button variant="danger" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartView;


