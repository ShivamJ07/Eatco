import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar(props) {
  const {
    closeMenu,
    loggedIn
  } = props

  return (
    <div className="Sidebar">
      <div className='sidebar-heading'>
          <img src="https://www.flaticon.com/svg/vstatic/svg/3917/3917189.svg?token=exp=1652547761~hmac=6ba7683db1541b158df6dc3f444c1a9b" onClick={closeMenu} />
          <h1 className='logo'>eatco</h1>
      </div>
      <div className='nav-links'>
        <a href="#">Search</a>
        <a href="#">Recipes I've Made</a>
        <a href="#">Saved for Later</a>
      </div>
      <div className='auth-links'>
        {loggedIn && (
          <>
            <a href="#">Settings</a>
            <a href="#">Log Out</a>
          </>
        )}
        {!loggedIn && (
          <>
            <a href="#">Create account</a>
            <a href="#">Log In</a>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
