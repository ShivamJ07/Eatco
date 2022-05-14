import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import RecipeSearch from './components/search/RecipeSearch';
import RecipeThumbnail from './components/recipe-thumbnail/RecipeThumbnail';

function App() {

  const [recipes, setRecipes] = useState(['vegan chicken']);

  return (
    <div className="App">

      <header className="App-header">
        <Header />
      </header>
      <h1>What do you feel like eating right now?</h1>
      <RecipeSearch />

      {recipes.map(recipe => {
        <div>
          <RecipeThumbnail recipe={recipe} />
        </div>
      })}
    </div>
  );
}

export default App;
