import React, { useState } from 'react';
import exit from './exit.svg'
import logo from './logo.svg';
import './Sidebar.css';

function Sidebar(props) {
  const {
    closeMenu,
    loggedIn,
    setLoggedIn,
    showSidebar,
    setShowSavedRecipes,
    setShowMyRecipes
  } = props

  const getHistory = e => {
    if (loggedIn) {
      e.preventDefault()
      setShowSavedRecipes(false);
      setShowMyRecipes(true);
      closeMenu();
    }
  }
  
  const getSavedForLater = e => {
    if (loggedIn) {
      e.preventDefault();
      setShowSavedRecipes(true);
      setShowMyRecipes(false);
      closeMenu();
    }
  }

  const logout = e => {
    e.preventDefault()
    setLoggedIn(false);
    // redirect to index
  }

  return (
    <div className={'Sidebar' + (showSidebar ? '' : ' hide-element')}>
      <div className='sidebar-heading'>
          <img src={exit} onClick={closeMenu} />
          <img className='logo' src={logo} />
      </div>
      <div className='nav-links'>
        <a href="/">Search</a>
        <a href="/login" onClick={getHistory}>Recipe History</a>
        <a href="/" onClick={getSavedForLater}>Saved for Later</a>
      </div>
      <div className='auth-links'>
        {loggedIn && (
          <>
            <a href="#">Settings</a>
            <a href="/" onClick={logout}>Log Out</a>
          </>
        )}
        {!loggedIn && (
          <>
            <a href="/register">Create account</a>
            <a href="/login">Log In</a>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
