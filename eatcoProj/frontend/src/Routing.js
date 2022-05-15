import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './app/App';
import Login from './Login';
import Register from './Register';

function Routing() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
    </Router>
  );
}

export default Routing;