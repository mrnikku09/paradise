import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

// import './App.css';
// import '/public/assets/js/main.js'
import Home from './container/home';
import Page from './container/page';
import Error from './container/error';
import Contactus from './container/contactus';
import Product from './container/product';
import ProductDetails from './container/productDetails';
import Cart from './Components/Cart';
import { ToastContainer } from 'react-toastify';
import Account from './container/user/Account';
import { useContext } from 'react';
import DataContext from './Components/Context';
import Address from './container/user/Address';
import Order from './container/user/Order';

function App() {
  const { existingUserSession } = useContext(DataContext)
  return (
    <div className="App">
      <ToastContainer />

      <Router>
        <Routes>
          <Route exact path='/' activeClassName="active" element={<Home />} />
          <Route exact path='/home' activeClassName="active" element={<Home />} />
          <Route exact path='/cart' activeClassName="active" element={<Cart />} />
          <Route exact path='/product' activeClassName="active" element={<Product />} />
          <Route exact path='/product/:slug' activeClassName="active" element={<ProductDetails />} />
          <Route exact path='/contact-us' activeClassName="active" element={<Contactus />} />
          <Route exact path='/:slug' activeClassName="active" element={<Page />} />
          <Route path='*' activeClassName="active" element={<Error />} />


          {/* User */}
          {
            existingUserSession != '' ?
            <>
              <Route exact path='/account' activeClassName="active" element={<Account />} />
              <Route exact path='/address' activeClassName="active" element={<Address />} />
              <Route exact path='/order' activeClassName="active" element={<Order />} />
            </>
              :
              <Route exact path='/error' activeClassName="active" element={<Error />} />
          }

        </Routes>
      </Router>
    </div>
  );
}

export default App;
