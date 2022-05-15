import React, { useState } from 'react';
import menu from './menu.svg'
import tree from './tree.svg'
import './Header.css';

function Header(props) {
  const {
    openMenu,
    showHeader,
    trees
  } = props;

  return (
    <div className={'Header' + (showHeader ? '' : ' hide-element')}>
      <nav>
        <div className='menu-icon' onClick={openMenu}>
          <img src={menu} />
        </div>
        <h1 className='logo'>eatco</h1>
        <div className='trees'>
          <p>{trees}</p>
          <img src={tree} id="tree-icon" />
        </div>
      </nav>
    </div>
  );
}

export default Header;
