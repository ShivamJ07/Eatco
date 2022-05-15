import React, { useState } from 'react';
import menu from './menu.svg'
import './Header.css';

function Header(props) {
  const {
    openMenu,
    showHeader
  } = props;

  return (
    <div className={'Header' + (showHeader ? '' : ' hide-element')}>
      <nav>
        <div className='menu-icon' onClick={openMenu}>
          <img src={menu} />
        </div>
        <h1 className='logo'>eatco</h1>
        <h1></h1>
      </nav>
    </div>
  );
}

export default Header;
