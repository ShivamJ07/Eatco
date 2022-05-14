import React, { useState } from 'react';
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
          <img src="https://www.flaticon.com/svg/vstatic/svg/3917/3917215.svg?token=exp=1652550997~hmac=ff8e97d05155bf77a55389cf2fbec99f" />
        </div>
        <h1 className='logo'>eatco</h1>
        <h1></h1>
      </nav>
    </div>
  );
}

export default Header;
