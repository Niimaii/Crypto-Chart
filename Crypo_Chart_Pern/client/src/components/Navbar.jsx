import React from 'react';
import { NavLink } from 'react-router-dom';
import vscodium from '../assets/vscodium.png';
import { SearchIcon } from '../icons/icons';

function Navbar() {
  return (
    <nav className='flex relative items-center justify-between w-full'>
      <div className='nav_bg'></div>
      <div className='mt-5 ml-5 flex items-center'>
        <NavLink className='flex items-center gap-3' to='/'>
          <img src={vscodium} alt='' className='h-14' />
          <h1 className='text-white text-2xl font-bold'>Cryptonium</h1>
        </NavLink>

        <div className='flex items-center relative ml-24'>
          <SearchIcon />
          <input
            type='text'
            placeholder='Search Crypto Charts'
            className='searchbar pl-9 rounded-md h-11'
          />
        </div>
      </div>
      <div className='w-full mt-5 flex justify-center items-center'>
        <div className='ml-10 w-72 flex items-center justify-between'>
          <NavLink to='/portfolio'>
            <span className='text-white'>Portfolio</span>
          </NavLink>
          <NavLink to='/settings'>
            <span className='text-white'>Settings</span>
          </NavLink>
          <NavLink to='/about'>
            <span className='text-white'>About</span>
          </NavLink>
        </div>
      </div>
      <div className='mt-5 mr-5'>
        <NavLink to='/signin'>
          <button className='signin text-white rounded-md'>Sign In</button>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
