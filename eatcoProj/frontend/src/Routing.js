import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './app/App';
import Login from './Login';
import Register from './Register';

function Routing() {

    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn'));
    console.log(loggedIn);

    return (
    <Router>
        <Routes>
            <Route path="/" element={<App loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route exact path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
            <Route exact path="/register" element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
    </Router>
    );
}

export default Routing;