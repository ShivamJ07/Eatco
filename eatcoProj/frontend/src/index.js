import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routing from './Routing';

const root = ReactDOM.createRoot(document.getElementById('root'));
localStorage.setItem('loggedIn', false);
localStorage.setItem("user", "Alyssa");
root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>
);
