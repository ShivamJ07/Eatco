import React, { useState, useEffect } from 'react';
import Ingredients from '../ingredients/Ingredients';
import './Recipe.css';

function Recipe(props) {

  const {
    recipe,
    loggedIn,
    setShowRecipe,
    savedRecipes,
    setSavedRecipes
  } = props;

  const [playlistURI, setplaylistURI] = useState('');

  const saveRecipe = () => {
    console.debug('Save recipe');
    
    if (!savedRecipes.includes(recipe)) { // add recipe if not already in saved otherwise assume user wants to remove it
      setSavedRecipes([...savedRecipes, recipe]);
    } else {
      setSavedRecipes(savedRecipes.filter(otherRecipe => otherRecipe !== recipe));
    }
  }

  const generatePlaylist = () => {
    localStorage.setItem("recipe", JSON.stringify(recipe))
    var scope = 'playlist-modify-private playlist-modify-public';
    var spotifyLoginWindow = window.open("http://localhost:5000/login-spotify?recipe=" + JSON.stringify(recipe))
    console.debug('Generate playlist');
    setplaylistURI('37i9dQZF1E35azQvKUNASY'); // replace this with generated playlist uri
  }

  const backToSearch = e => {
    e.preventDefault();
    setShowRecipe(false);
  }

  return (
    <div className="Recipe">

      <div className="flex recipe-header">
        <div>
          <a href="#" onClick={backToSearch}>← Back to results</a>
          <h1>{recipe.title}</h1>
          <a href={recipe.url}>Source</a>
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

      <div className='flex recipe-steps-playlist'>
        <div className='recipe-steps'>
          <h2>Method</h2>
          <ol>
            {recipe.instructions.map(step => 
              <li key={step.index}>{step}</li>
            )}
          </ol>
        </div>
        {playlistURI && (
        <div className='recipe-playlist'>
          <div className='playlist-alert'>
            <p>A cooking playlist to keep you company :)</p>
          </div>
          <iframe id="embed-iframe" src={`https://open.spotify.com/embed/playlist/${playlistURI}?utm_source=generator`} width="100%" height="380" frameBorder="0" allowFullScreen></iframe>
        </div>
        )}
      </div>

    </div>
  );
}
  
  export default Recipe;
  