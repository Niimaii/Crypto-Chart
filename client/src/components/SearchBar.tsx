import React, { useEffect, useRef, useState } from 'react';
import { SearchIcon } from '../icons/icons';
import { useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

function SearchBar() {
  const [input, setInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const searchOptions = useRef(null);

  const queryClient = useQueryClient();
  const market = queryClient.getQueryData(['market']);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        // Reset search when clicking off input
        setSearchOpen(false); // Removes event listener
        setFilteredData([]);
        setInput('');
        searchOptions.current.style.height = '0px';
        searchOptions.current.style.padding = '0px';
        inputRef.current.style.borderRadius = '0.375rem';
      }
    };

    // ONly adds event listener if the search bar is changed
    if (searchOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [searchOpen]);

  if (!market) {
    return <div></div>;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const filterCoins = (e) => {
    const searchWord = e.target.value;
    setInput(searchWord);
    setSearchOpen(true);

    const search = document.getElementById('search');
    const searchRadius = document.getElementById('searchInput');

    // Filter through each data set and find the correct object(s)

    const coinsFiltered = market.filter((coin) => {
      // If the data set (title) includes the input word then return it
      //   Set them to lowercase so capitalization doesn't affect searches
      return coin.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredData([]);
      setSearchOpen(false);
      search.style.height = '0px';
      search.style.padding = '0px';
      searchRadius.style.borderRadius = '0.375rem';
    } else {
      setFilteredData(coinsFiltered);
      search.style.height = '300px';
      search.style.padding = '5px 15px';
      searchRadius.style.borderRadius = '0.375rem 0.375rem 0 0';
    }
  };

  return (
    <div className='search_bar'>
      <div className='flex items-center relative'>
        <SearchIcon />
        <input
          onChange={filterCoins}
          ref={inputRef}
          type='text'
          placeholder='Search Crypto Charts'
          className='search_input'
          id='searchInput'
          value={input}
        />
      </div>

      <div
        ref={searchOptions}
        id='search'
        className='search_options search_options_on'
      >
        {filteredData.length != 0 &&
          filteredData.slice(0, 15).map((coin) => {
            return (
              <NavLink
                className='search_rows'
                key={coin.crypto_id}
                to={`/${coin.crypto_id}`}
              >
                <div className='search_rows_coin'>
                  <img className='h-10 w-10' src={coin.image} alt='' />
                  <h1>{coin.name}</h1>
                </div>
                <p>{formatter.format(coin.current_price)}</p>
              </NavLink>
            );
          })}
      </div>
    </div>
  );
}

export default SearchBar;
