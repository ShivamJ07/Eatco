import React, { useState } from 'react';
import './RecipeThumbnail.css';

function RecipeThumbnail(props) {

  const {
    recipe,
    onClick
  } = props;

  return (
    <div className="RecipeThumbnail" onClick={onClick}>
      <img src={recipe.image} className="recipe-thumbnail-img" />
      <h3 className='recipe-thumbnail-name'>{recipe.name} </h3>
    </div>
  );
}
  
  export default RecipeThumbnail;
  