import React from 'react';
import { SearchIcon } from '../icons/icons';

function SearchBar() {
  return (
    <div className='nav_response flex items-center relative mx-10'>
      <SearchIcon />
      <input
        type='text'
        placeholder='Search Crypto Charts'
        className='searchbar pl-9 rounded-md h-11'
      />
    </div>
  );
}

export default SearchBar;
