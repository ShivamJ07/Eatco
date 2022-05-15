import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import RecipeSearch from './components/search/RecipeSearch';
import RecipeThumbnail from './components/recipe-thumbnail/RecipeThumbnail';
import Recipe from './components/recipe/Recipe';

function App() {

  const [loggedIn, setLoggedIn] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [recipeQuery, setRecipeQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [fetchedRecipes, setFetchedRecipes] = useState(false);
  const [showRecipe, setShowRecipe] = useState(false);
  const [openedRecipe, setOpenedRecipe] = useState({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted) {
      console.log('this happened');
      async function fetchData(){
        const response = await fetch("http://localhost:5000/get-recipe?search=" + recipeQuery).then(response => response.json()).then(data => data.recipes);
        setRecipes(response);
      }
      fetchData();
    setFetchedRecipes(true);
    }
  }, [recipeQuery]);

  const getRecipe = (recipe) => {
    console.debug('get recipe ', recipe.name);
    setOpenedRecipe(recipe);
    setShowRecipe(true);
  }

  const openMenu = () => {
    setShowHeader(false);
    setShowSidebar(true);
  }

  const closeMenu = () => {
    setShowSidebar(false);
    setShowHeader(true);
  }

  return (
    <div className="App">

      <Sidebar closeMenu={closeMenu} loggedIn={loggedIn} showSidebar={showSidebar} />

      <Header openMenu={openMenu} showHeader={showHeader} />

      {!showRecipe && (
        <>
          <RecipeSearch setRecipeQuery={setRecipeQuery} />

          <div className='recipe-thumbnails'>
            {recipes.map(recipe => 
              <RecipeThumbnail recipe={recipe} onClick={() => getRecipe(recipe)} key={recipe} />
            )}
          </div>

          {recipes.length === 0 && fetchedRecipes && (
            <div className='no-results'>
              <h3>Sorry, we couldn't find any recipes that taste like {recipeQuery}.</h3>
            </div>
          )}
        </>
      )}

      {showRecipe && (
        <Recipe recipe={openedRecipe} loggedIn={loggedIn} />
      )}

      <footer>
        <a href="#">© eatco 2022</a>
      </footer>

    </div>
  );
}

export default App;
