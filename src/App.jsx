import { useState, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; 
import { Container } from 'react-bootstrap';
import ProductsCatalog from './pages/ProductsCatalog';
import { UserProvider } from './UserContext';
import ProductsView from './components/ProductsView';


function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null
  });

  function unsetUser(){
    localStorage.clear();
  };

  useEffect(() => {
    fetch('http://localhost:4005/b5/users/details', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => res.json())
    .then(data => {

      // console.log(data)
      // console.log(typeof data !== undefined)
      if(typeof data !== undefined){
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin
        });
      } else {
        setUser({
          id: null,
          isAdmin: null
        });
      }
    })
  }, [])


  useEffect(() => {
    console.log(user);
    console.log(localStorage);
  }, [user]);

  return (
    <>
      <UserProvider value={{ user, setUser, unsetUser}}>
        <Router> 
          <Container>
            <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/products-catalog' element={<ProductsCatalog/>}/>
              <Route path='/products/:productId' element={<ProductsView/>}/> 
            </Routes>
          </Container>
        </Router>
      </UserProvider>
    </> 
  )
}

export default App
