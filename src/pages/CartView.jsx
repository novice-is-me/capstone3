import React, { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";
import { Table, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";

const CartView = () => {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart) {
      calculateTotalQuantity();
    }
  }, [cart]);

  const fetchCart = () => {
    fetch("http://localhost:4005/b5/cart/get-cart", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.cart) {
          setCart(data.cart);
        } else {
          setCart(null);
        }
      })
      .catch((error) => console.error("Error fetching cart:", error));
  };

  const handleRemoveItem = (productId) => {
    fetch(`http://localhost:4005/b5/cart/${productId}/remove-from-cart`, {
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
          }).then(() => fetchCart());
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

  const handleUpdateQuantity = (productId, quantity) => {
    fetch("http://localhost:4005/b5/cart/update-cart-quantity", {
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
    fetch("http://localhost:4005/b5/cart/clear-cart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Cart cleared successfully") {
          Swal.fire({
            title: "Cart Cleared",
            icon: "success",
            text: "Cart cleared successfully.",
          }).then(() => fetchCart());
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to clear cart. Please try again.",
          });
        }
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
    console.log(cart.cartItems);
    return cart.cartItems.map((item) => (
      <tr key={item.productId}>
        <td>{item.productName}</td>
        <td>&#8369;{item.price}</td>
        <td>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              handleUpdateQuantity(item.productId, parseInt(e.target.value))
            }
          />
        </td>
        <td>&#8369;{item.subtotal}</td>
        <td>
          <Button
            variant="danger"
            onClick={() => handleRemoveItem(item.productId)}
          >
            Remove
          </Button>
        </td>
      </tr>
    ));
  };

//   if (!user || !user.id) {
//     return <Navigate to="/login" />;
//   }

  return (
    <div className="p-5">
      <h2 className="text-center">Your Shopping Cart</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>{renderCartItems()}</tbody>
      </Table>
      <div className="text-center my-4">
        <Card.Text className='fs-4'>Total: &#8369;{totalQuantity}</Card.Text>
        <Button variant="success mx-3">Checkout</Button>
        <Button variant="danger" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default CartView;


