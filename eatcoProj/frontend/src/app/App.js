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
      // const getViewedRecipes = {'recipesViewed': [{'trees_saved':7,'image': 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F01%2F20%2FVegan-General-Tsos-Chickn.jpg', 'title': 'Vegan General Tsos Chickn', 'ingredients': ['2 (10 ounce) packages frozen meatless chicken nuggets (such as MorningStar Farms)', '1 tablespoon peanut oil', '2 stalks green onions, chopped, white and green parts separated', '6 whole dried red chiles', '1 clove garlic, minced', '1 orange zest', '1/2 cup white sugar', '1/4 cup reduced-sodium soy sauce', '3 tablespoons low-sodium vegetable broth', '1 tablespoon rice vinegar', '2 teaspoons sesame oil', '2/3 teaspoon ground ginger', '1/4 teaspoon water', '2 teaspoons cornstarch', '3 cups hot cooked brown rice', '3 cups steamed broccoli', '2 teaspoons toasted sesame seeds, or to taste'], 'instructions': ['Preheat the oven to 375 degrees F (190 degrees C). Place frozen nuggets on a baking sheet.', 'Bake in the preheated oven for 7 minutes. Flip nuggets and continue to bake until heated through and crispy, 7 to 9 more minutes. Remove from the oven and keep warm.', 'While the nuggets are cooking, heat peanut oil in a wok or large skillet over high heat. Stir in white parts of green onions, garlic, and orange zest. Cook, stirring, until chiles and garlic are fragrant, 1 to 2 minutes.', 'Add sugar, soy sauce, broth, vinegar, sesame oil, and ginger to the wok. Bring to a boil and cook until sauce is slightly thickened, about 3 minutes.', 'Whisk together water and cornstarch in a small bowl; stir into the sauce. Return to a boil and cook until thickened, about 1 minute. Remove and discard orange zest.', 'Stir nuggets into sauce to coat. Reduce heat to low; cook, stirring frequently, until nuggets are heated through, 2 to 3 minutes.', 'Serve nugget mixture over rice with broccoli. Sprinkle with sesame seeds and green parts of green onions.']}]}
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
