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
      setRecipes([ // api request here for recipe search
      {
        name: 'Vegan Chicken',
        image: 'https://www.theedgyveg.com/wp-content/uploads/2020/08/P1499297-2WEB.jpg',
        source: 'https://www.theedgyveg.com/2020/08/04/vegan-chicken/',
        ingredients: ['1 lbs chicken breasts', '1 tbsp olive oils'],
        steps: ['Cook chicken', 'Eat chicken']
      }
    ]);
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

      {showHeader && (
        <Header openMenu={openMenu} />
      )}

      {showSidebar && (
        <Sidebar closeMenu={closeMenu} loggedIn={loggedIn} />
      )}

      {!showRecipe && (
        <>
          <RecipeSearch setRecipeQuery={setRecipeQuery} />

          {recipes.map(recipe => 
            <RecipeThumbnail recipe={recipe} onClick={() => getRecipe(recipe)} key={recipe} />
          )}

          {recipes.length === 0 && fetchedRecipes && (
            <div className='no-results'>
              <h3>Sorry, we couldn't find any recipes that taste like {recipeQuery}.</h3>
            </div>
          )}
        </>
      )}

      {showRecipe && (
        <Recipe recipe={openedRecipe} />
      )}

    </div>
  );
}

export default App;
