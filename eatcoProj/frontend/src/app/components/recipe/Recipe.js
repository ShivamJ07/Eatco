import React, { useState } from 'react';
import Ingredients from '../ingredients/Ingredients';
import './Recipe.css';

function Recipe(props) {

  const {
    recipe,
    loggedIn
  } = props;

  const saveRecipe = () => {
    console.debug('Save recipe');
  }

  const generatePlaylist = () => {
    console.debug('Generate playlist');
  }

  return (
    <div className="Recipe">

      <div className="flex recipe-header">
        <div>
          <a href="/">← Back to search</a>
          <h1>{recipe.name}</h1>
          <a href={recipe.source}>Source</a>
        </div>
        <div className='right-side-buttons'>
          <button className='playlist-btn' onClick={generatePlaylist}>Generate cooking playlist</button>
          {loggedIn && (
            <img src="https://cdn-icons-png.flaticon.com/128/3916/3916593.png" onClick={saveRecipe} className='bookmark' />
          )}
        </div>
      </div>

      <hr />

      <div className='flex recipe-image-ingredients'>
        <div className='recipe-thumbnail-img'>
          <img src={recipe.image} className="recipe-img" />
        </div>
        <Ingredients ingredients={recipe.ingredients} />
      </div>

      <div className='recipe-steps'>
        <h2>Method</h2>
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
  