import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import RecipeSearch from './components/search/RecipeSearch';
import RecipeThumbnail from './components/recipe-thumbnail/RecipeThumbnail';
import Recipe from './components/recipe/Recipe';

function App(props) {

  const {loggedIn, setLoggedIn} = props;
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
  const [trees, setTrees] = useState(0);


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
    console.debug('get recipe ', recipe.title);
    console.debug(myRecipes);
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
    async function fetchData() {
      // saved recipes
      const getSavedRecipes = await fetch("http://localhost:5000/update-saved?user=" + localStorage.getItem("user"), {mode:"cors", 'Access-Control-Allow-Origin': '*', credentials: 'same-origin'}).then(response =>response.json());
      setSavedRecipes(getSavedRecipes['recipesSaved']);
        // set trees
      const message = await fetch("http://localhost:5000/get-trees-saved?user=" + localStorage.getItem("user")).then(response =>response.json());
      setTrees(message['message']);
      console.log(trees);
      // viewed recipes
      const getViewedRecipes = await fetch("http://localhost:5000/update-viewed?user=" + localStorage.getItem("user"), {mode:"cors", 'Access-Control-Allow-Origin': '*', credentials: 'same-origin'}).then(response =>response.json());
      setMyRecipes(getViewedRecipes['recipesViewed']);
    }
    fetchData();
  }, []);

  useEffect(() => { 
    async function fetchData() {
      fetch("http://localhost:5000/update-saved",
      {
        method: 'POST',
        body: JSON.stringify({
          recipe: openedRecipe,
          user: localStorage.getItem("user")
        })
      }).then(response => response.json())
        .then(data => console.log(data))
      const message = await fetch("http://localhost:5000/get-trees-saved?user=" + localStorage.getItem("user")).then(response =>response.json())
      // setTrees(message['message']);
      // setTrees(7);
      console.log(trees)
    }
    fetchData();
  }, [savedRecipes]);

  useEffect(() => { 
    async function fetchData() {
      fetch("http://localhost:5000/update-viewed",
      {
        method: 'POST',
        body: JSON.stringify({
          recipe: openedRecipe,
          user: localStorage.getItem("user")
        })
      }).then(response => response.json())
        .then(data => console.log(data))
    }
    fetchData();
    console.log(trees)
  }, [myRecipes]);

  return (
    <div className="App">

      <Sidebar closeMenu={closeMenu} loggedIn={loggedIn} setLoggedIn={setLoggedIn} showSidebar={showSidebar} setShowSavedRecipes={setShowSavedRecipes} setShowMyRecipes={setShowMyRecipes} />

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
        <Recipe recipe={openedRecipe} loggedIn={loggedIn} setShowRecipe={setShowRecipe} savedRecipes={savedRecipes} setSavedRecipes={setSavedRecipes} setTrees={setTrees} />
      )}

      <footer>
        <a href="/">© eatco 2022</a>
      </footer>

    </div>
  );
}

export default App;
