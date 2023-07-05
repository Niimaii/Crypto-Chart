import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '../icons/icons';
import { useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

function SearchBar() {
  const [input, setInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const queryClient = useQueryClient();
  const market = queryClient.getQueryData(['market']);

  if (!market) {
    return <h1>Loading...</h1>;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const filterCoins = (e) => {
    const searchWord = e.target.value;
    setInput(searchWord);

    const search = document.getElementById('search');

    // Filter through each data set and find the correct object(s)

    const coinsFiltered = market.filter((coin) => {
      // If the data set (title) includes the input word then return it
      //   Set them to lowercase so capitalization doesn't affect searches
      return coin.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
      search.style.height = '0px';
    } else {
      setFilteredData(coinsFiltered);
      search.style.height = '300px';
    }
  };

  return (
    <div className='search_bar'>
      <div className='flex items-center relative'>
        <SearchIcon />
        <input
          onChange={filterCoins}
          type='text'
          placeholder='Search Crypto Charts'
          className='search_input'
          id='searchInput'
          value={input}
        />
      </div>

      <div id='search' className='searchOptions'>
        {filteredData.length != 0 &&
          filteredData.slice(0, 15).map((coin) => {
            return (
              <NavLink
                className='searchResults'
                key={coin.crypto_id}
                to={`/${coin.crypto_id}`}
              >
                <img className='h-10 w-10' src={coin.image} alt='' />
                <h1>{coin.name}</h1>
                <p>{formatter.format(coin.current_price)}</p>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
}

export default SearchBar;
