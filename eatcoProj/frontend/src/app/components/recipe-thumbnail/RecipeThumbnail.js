import React, { useState } from 'react';
// import './Sidebar.css';

function RecipeThumbnail(props) {

  const {
    recipe,
  } = props;

  return (
    <div className="RecipeThumbnail">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} className="recipe-thumbnail-img" />
    </div>
  );
}
  
  export default RecipeThumbnail;
  