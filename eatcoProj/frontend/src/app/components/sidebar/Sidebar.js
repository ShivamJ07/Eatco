import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar(props) {
  const {
    closeMenu,
    loggedIn,
    showSidebar
  } = props

  return (
    <div className={'Sidebar' + (showSidebar ? '' : ' hide-element')}>
      <div className='sidebar-heading'>
          <img src="https://www.flaticon.com/svg/vstatic/svg/3917/3917189.svg?token=exp=1652550997~hmac=585311d1a568899d1a0c61ea32bbf226" onClick={closeMenu} />
          <h1 className='logo'>eatco</h1>
      </div>
      <div className='nav-links'>
        <a href="/">Search</a>
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
