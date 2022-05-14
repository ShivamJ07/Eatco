import React, { useState } from 'react';
import './RecipeSearch.css';

function RecipeSearch(props) {

  const {
    setRecipeQuery,
  } = props;

  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value);
  }

  const handleSearch = e => {
    console.debug('searched for ', search);
    e.preventDefault();
    setRecipeQuery(search);
    setSearch('');
  }

  return (
    <div className="RecipeSearch">
      <h1>What do you feel like eating right now?</h1>
      <form className='recipe-search'>
        <input type="text" className='search-bar' onChange={handleChange} value={search} />
        <input type="submit" value="search" className='search-btn' onClick={handleSearch} />
      </form>
    </div>
  );
}
  
  export default RecipeSearch;
  