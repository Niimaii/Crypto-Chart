import React, { useContext, useEffect, useState } from 'react';
import { fetchProtectedInfo, onLogout } from '../api/authAPI';
import { CryptoContext } from '../context/CryptoContext';
import CryptoCarousel from '../components/CryptoCarousel';
import CryptoTable from '../components/CryptoTable';
import BuyCard from '../components/BuyCard';

function UserHome() {
  const { unAuthenticateUser, market, portfolio } = useContext(CryptoContext);
  const [loading, setLoading] = useState(true);
  let protectedData = null;

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

  // Check to see if the user has a valid JWT token & not faking
  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      protectedData = data.info;
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  if (market.isLoading || portfolio.isLoading || loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className=''>
      <CryptoCarousel />

      <div className='flex justify-center'>
        <CryptoTable volume='123' key='CryptoTable' />
      </div>
      <BuyCard />
    </div>
  );
}

export default UserHome;
