import React, { useState } from 'react';
import Ingredients from '../ingredients/Ingredients';
import './Recipe.css';

function Recipe(props) {

  const {
    recipe
  } = props;

  const generatePlaylist = () => {
    console.debug('Generate playlist');
  }

  return (
    <div className="Recipe">

      <div className="recipe-header">
        <div>
          <h1>{recipe.name}</h1>
          <a href={recipe.source}>Source</a>
        </div>
        <div>
          <button onClick={generatePlaylist}>Generate cooking playlist</button>
        </div>
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
  