import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Switch } from 'react-router-dom';

// import './App.css';
// import '/public/assets/js/main.js'
import Home from './container/home';
import Page from './container/page';
import Error from './container/error';
import Contactus from './container/contactus';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' activeClassName="active" element={<Home />} />
          <Route exact path='/home' activeClassName="active" element={<Home />} />
          <Route exact path='/contact-us' activeClassName="active" element={<Contactus />} />
          <Route exact path='/:slug' activeClassName="active" element={<Page />} />
          <Route path='*' activeClassName="active" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
