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
  const [showSavedRecipes, setShowSavedRecipes] = useState(false);
  const [showMyRecipes, setShowMyRecipes] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);

  const trees = 3; // need to make api get request to trees

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
      },
      {
        name: 'Vegan Chicken',
        image: 'https://www.theedgyveg.com/wp-content/uploads/2020/08/P1499297-2WEB.jpg',
        source: 'https://www.theedgyveg.com/2020/08/04/vegan-chicken/',
        ingredients: ['1 lbs chicken breasts', '1 tbsp olive oils'],
        steps: ['Cook chicken', 'Eat chicken']
      },
      {
        name: 'Vegan Chicken',
        image: 'https://www.theedgyveg.com/wp-content/uploads/2020/08/P1499297-2WEB.jpg',
        source: 'https://www.theedgyveg.com/2020/08/04/vegan-chicken/',
        ingredients: ['1 lbs chicken breasts', '1 tbsp olive oils'],
        steps: ['Cook chicken', 'Eat chicken']
      },
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
    if (!myRecipes.includes(recipe)) {
      setMyRecipes([...myRecipes, recipe]);
    }
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

  useEffect(() => {
    setSavedRecipes([ // api GET request here for saved recipes
      {
        name: 'Vegan Chicken',
        image: 'https://www.theedgyveg.com/wp-content/uploads/2020/08/P1499297-2WEB.jpg',
        source: 'https://www.theedgyveg.com/2020/08/04/vegan-chicken/',
        ingredients: ['1 lbs chicken breasts', '1 tbsp olive oils'],
        steps: ['Cook chicken', 'Eat chicken']
      },
      {
        name: 'Vegan Chicken',
        image: 'https://www.theedgyveg.com/wp-content/uploads/2020/08/P1499297-2WEB.jpg',
        source: 'https://www.theedgyveg.com/2020/08/04/vegan-chicken/',
        ingredients: ['1 lbs chicken breasts', '1 tbsp olive oils'],
        steps: ['Cook chicken', 'Eat chicken']
      },
      {
        name: 'Vegan Chicken',
        image: 'https://www.theedgyveg.com/wp-content/uploads/2020/08/P1499297-2WEB.jpg',
        source: 'https://www.theedgyveg.com/2020/08/04/vegan-chicken/',
        ingredients: ['1 lbs chicken breasts', '1 tbsp olive oils'],
        steps: ['Cook chicken', 'Eat chicken']
      }
    ]);
    setMyRecipes([ // api GET request here for recipe history
      {
        name: 'Vegan Chicken',
        image: 'https://www.theedgyveg.com/wp-content/uploads/2020/08/P1499297-2WEB.jpg',
        source: 'https://www.theedgyveg.com/2020/08/04/vegan-chicken/',
        ingredients: ['1 lbs chicken breasts', '1 tbsp olive oils'],
        steps: ['Cook chicken', 'Eat chicken']
      }
    ]);
  }, []);

  useEffect(() => { // api POST request here for saved recipes using savedRecipes
  }, [savedRecipes]);

  useEffect(() => { // api POST request here for recipe history using myRecipes
  }, [myRecipes]);

  return (
    <div className="App">

      <Sidebar closeMenu={closeMenu} loggedIn={loggedIn} showSidebar={showSidebar} setShowSavedRecipes={setShowSavedRecipes} setShowMyRecipes={setShowMyRecipes} />

      <Header openMenu={openMenu} showHeader={showHeader} trees={trees} />

      {!showRecipe && !showSavedRecipes && !showMyRecipes && (
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

      {!showRecipe && showMyRecipes && (
        <>
        <h1>Recipes You've Viewed</h1>
          <div className='recipe-thumbnails'>
            {myRecipes.map(recipe => 
              <RecipeThumbnail recipe={recipe} onClick={() => getRecipe(recipe)} key={recipe} />
            )}
          </div>

          {savedRecipes.length === 0 && (
            <div className='no-results'>
              <h3>You haven't viewed any recipes yet!</h3>
            </div>
          )}
        </>
      )}

      {!showRecipe && showSavedRecipes && (
        <>
        <h1>Saved Recipes</h1>
          <div className='recipe-thumbnails'>
            {savedRecipes.map(recipe => 
              <RecipeThumbnail recipe={recipe} onClick={() => getRecipe(recipe)} key={recipe} />
            )}
          </div>

          {savedRecipes.length === 0 && (
            <div className='no-results'>
              <h3>You don't have any saved recipes yet!</h3>
            </div>
          )}
        </>
      )}

      {showRecipe && (
        <Recipe recipe={openedRecipe} loggedIn={loggedIn} setShowRecipe={setShowRecipe} savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes} />
      )}

      <footer>
        <a href="/">© eatco 2022</a>
      </footer>

    </div>
  );
}

export default App;
