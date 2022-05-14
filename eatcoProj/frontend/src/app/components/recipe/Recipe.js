import React, { useState } from 'react';
import Ingredients from '../ingredients/Ingredients';
// import './Sidebar.css';

function Recipe(props) {

  const {
    recipe
  } = props;

  return (
    <div className="Recipe">

      <div className="recipe-header">
        <h1>{recipe.name}</h1>
        <a href={recipe.source}>Source</a>
      </div>

      <div className='recipe-image-ingredients'>
        <img src={recipe.image} className="recipe-thumbnail-img" />
        <Ingredients ingredients={recipe.ingredients} />
      </div>

      <div className='recipe-steps'>
        <ol>
          {recipe.steps.map(step => 
            <li key={step.index}>{step}</li>
          )}
        </ol>
      </div>

    </div>
  );
}
  
  export default Recipe;
  