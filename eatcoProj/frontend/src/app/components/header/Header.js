import React, { useState } from 'react';
import './Header.css';

function Header(props) {
  const {
    openMenu,
  } = props;

  return (
    <div className="Header">
      <nav>
        <div className='menu-icon' onClick={openMenu}>
          <img src="https://www.flaticon.com/svg/vstatic/svg/3917/3917215.svg?token=exp=1652545610~hmac=61047083c7b0c17b879a98a1a2fab204" />
        </div>
        <h1 className='logo'>eatco</h1>
        <h1></h1>
      </nav>
    </div>
  );
}

export default Header;
