import React, { useState } from 'react';
// import './Sidebar.css';

function RecipeThumbnail(props) {

  const {
    recipe,
  } = props;

  return (
    <div className="RecipeThumbnail">
      <h1>{recipe}</h1>
    </div>
  );
}
  
  export default RecipeThumbnail;
  