import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import vscodium from '../assets/vscodium.png';
import {
  AboutIcon,
  Hamburger,
  LoginIcon,
  LogoutIcon,
  PieChartIcon,
  PortfolioIcon,
  RightToggleArrow,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from '../icons/icons';
import { CryptoContext } from '../context/CryptoContext';
import { fetchProtectedInfo, onLogout } from '../api/authAPI';
import SearchBar from './SearchBar';

function Navbar() {
  const { isAuth, unAuthenticateUser } = useContext(CryptoContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  useEffect(() => {
    const dropdownElement = document.getElementById('dropdown');

    if (isDropdownOpen) {
      dropdownElement.style.height = '200px';
      dropdownElement.style.padding = '15px';
    } else {
      dropdownElement.style.height = '0px';
      dropdownElement.style.padding = '0px';
    }
  }, [isDropdownOpen]);

  return (
    <div className='nav_bg'>
      {/* I have no idea why, but having flex here causes the bg color to display properly */}
      <nav className='flex'>
        <div className='flex items-center w-full m-3'>
          <div className='flex items-center'>
            <NavLink className='flex items-center gap-3' to='/'>
              <img src={vscodium} alt='' className='nav_logo w-14 h-14' />
              <h1
                className={`nav_response nav_title text-white text-2xl font-bold`}
              >
                Cryptonium
              </h1>
            </NavLink>

            <SearchBar />
          </div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className='hamburger'
          >
            <Hamburger />
          </button>
          <article id='dropdown' className='nav_dropdown'>
            <div className='nav_dropdown_pages'>
              <NavLink
                onClick={() => setIsDropdownOpen(false)}
                className='nav_dropdown_button'
                to='/portfolio'
              >
                <PortfolioIcon />
                <p>Portfolio</p>
              </NavLink>

              <NavLink
                onClick={() => setIsDropdownOpen(false)}
                to='/settings'
                className='nav_dropdown_settings nav_dropdown_button'
              >
                <div>
                  <SettingsIcon />
                </div>
                <p>Settings</p>
              </NavLink>
              <NavLink
                onClick={() => setIsDropdownOpen(false)}
                className='nav_dropdown_button'
                to='/about'
              >
                <AboutIcon />
                <p>About</p>
              </NavLink>
            </div>
            <hr />
            <div className='nav_dropdown_bottom'>
              {isAuth() ? (
                <button onClick={logout} className='nav_dropdown_button'>
                  <LogoutIcon />
                  <p>Logout</p>
                </button>
              ) : (
                <NavLink
                  onClick={() => setIsDropdownOpen(false)}
                  to='/signin'
                  className='nav_dropdown_button'
                >
                  <LoginIcon />
                  <p>Login</p>
                </NavLink>
              )}
            </div>
          </article>
          <div className='flex justify-between w-full'>
            <div className='nav_response w-full flex justify-center items-center'>
              <div className='nav_options w-60 flex items-center justify-between'>
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
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
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
