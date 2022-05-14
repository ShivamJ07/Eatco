import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import RecipeSearch from './components/search/RecipeSearch';
import RecipeThumbnail from './components/recipe-thumbnail/RecipeThumbnail';

function App() {

  const [mounted, setMounted] = useState(false);
  const [showHeader, setshowHeader] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [recipeQuery, setRecipeQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [fetchedRecipes, setFetchedRecipes] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted) {
      setRecipes([ // api request here for recipe search
      {
        name: recipeQuery,
        image: 'https://www.theedgyveg.com/wp-content/uploads/2020/08/P1499297-2WEB.jpg',
        source: ''
      }
    ]);
    }
  }, [recipeQuery]);

  return (
    <div className="App">

      <Header />
      <RecipeSearch setRecipeQuery={setRecipeQuery} />

      {recipes.map(recipe => 
        <RecipeThumbnail recipe={recipe} key={recipe} />
      )}

      {recipes.length === 0 && fetchedRecipes && (
        <div className='no-results'>
          <h3>Sorry, we couldn't find any recipes that taste like {recipeQuery}.</h3>
        </div>
      )}
    </div>
  );
}

export default App;
