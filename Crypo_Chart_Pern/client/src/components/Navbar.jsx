import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import vscodium from '../assets/vscodium.png';
import { Hamburger, SearchIcon, UserIcon } from '../icons/icons';
import { CryptoContext } from '../context/CryptoContext';
import { fetchProtectedInfo, onLogout } from '../api/authAPI';

function Navbar() {
  console.log(window.innerWidth);
  const { isAuth, unAuthenticateUser } = useContext(CryptoContext);

  const logout = async () => {
    try {
      // Clear cookies
      await onLogout();

      unAuthenticateUser();
      localStorage.removeItem('localAuth');
      window.location.reload(false);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className='relative mb-5'>
      <div className='nav_bg'></div>
      {/* I have no idea why, but having flex here causes the bg color to display properly */}
      <nav className='flex'>
        <div className='flex items-center w-full m-3 mb-0'>
          <div className='flex items-center'>
            <NavLink className='flex items-center gap-3' to='/'>
              <img src={vscodium} alt='' className='nav_logo w-14 h-14' />
              <h1
                className={`nav_response nav_title text-white text-2xl font-bold`}
              >
                Cryptonium
              </h1>
            </NavLink>

            <div className='nav_response flex items-center relative mx-10'>
              <SearchIcon />
              <input
                type='text'
                placeholder='Search Crypto Charts'
                className='searchbar pl-9 rounded-md h-11'
              />
            </div>
          </div>
          <button className='hamburger'>
            <Hamburger />
          </button>
          <div className='flex justify-between w-full'>
            <div className='nav_response w-full flex justify-center items-center'>
              <div className='portfolio nav_options w-60 flex items-center justify-between'>
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
            <div className='nav_response ml-5'>
              {isAuth() ? (
                <button onClick={logout}>
                  <UserIcon />
                </button>
              ) : (
                <NavLink to='/signin'>
                  <button className='signin text-white rounded-md'>
                    Sign In
                  </button>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
