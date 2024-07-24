import { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import { UserProvider } from "./UserContext";

import AppNavbar from "./components/AppNavbar";
import ProductsView from "./components/ProductsView";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import ProductsCatalog from "./pages/ProductsCatalog";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";


function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    fetch("http://localhost:4005/b5/users/details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (typeof data !== undefined) {
          setUser({
            id: data.user._id,
            isAdmin: data.user.isAdmin,
          });
        } else {
          setUser({
            id: null,
            isAdmin: null,
          });
        }
      });
  }, []);

  useEffect(() => {
    console.log('use effect appjsx');
  }, [user]);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser }}>
        <Router>
          <AppNavbar />
          <Container>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products-catalog" element={<ProductsCatalog />} />
              <Route path="/products/:productId" element={<ProductsView />} />
              <Route path='/products' element={<Products/>}/>
              <Route path='/addProduct' element={<AddProduct/>}/> 
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
