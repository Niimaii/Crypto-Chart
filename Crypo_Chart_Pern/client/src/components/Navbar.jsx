import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import vscodium from '../assets/vscodium.png';
import { Hamburger, SearchIcon } from '../icons/icons';

function Navbar() {
  console.log(window.innerWidth);
  return (
    <div className='relative'>
      <div className='nav_bg'></div>
      {/* I have no idea why, but having flex here causes the bg color to display properly */}
      <nav className='flex'>
        <div className='flex items-center justify-between w-full m-5 mb-0'>
          <div className='flex items-center'>
            <NavLink className='flex items-center gap-3' to='/'>
              <img src={vscodium} alt='' className='nav_logo w-14 h-14' />
              <h1
                className={`nav_response nav_title text-white text-2xl font-bold`}
              >
                Cryptonium
              </h1>
            </NavLink>

            <div className='nav_response flex items-center relative ml-24'>
              <SearchIcon />
              <input
                type='text'
                placeholder='Search Crypto Charts'
                className='searchbar pl-9 rounded-md h-11'
              />
            </div>
          </div>
          <button>
            <Hamburger />
          </button>
          <div className='nav_response w-full mt-5 flex justify-center items-center'>
            <div className='portfolio w-72 flex items-center justify-between'>
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
          <div className='nav_response mt-5 mr-5'>
            <NavLink to='/signin'>
              <button className='signin text-white rounded-md'>Sign In</button>
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
