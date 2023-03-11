import React, { useContext, useEffect, useState } from 'react';
import { fetchProtectedInfo, onLogout } from '../api/authAPI';
import { CryptoContext } from '../context/CryptoContext';

function UserHome() {
  const { isAuth } = useContext(CryptoContext);
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const { unAuthenticateUser } = useContext(CryptoContext);

  const logout = async () => {
    try {
      // Clear cookies
      await onLogout();

      unAuthenticateUser();
      localStorage.removeItem('localAuth');
    } catch (err) {
      console.log(err.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();

      setProtectedData(data.info);
      setLoading(false);
    } catch (err) {
      console.log('force logout');
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <h1>Dashboard</h1>
      <h2>{protectedData}</h2>

      <button onClick={() => logout()} className=''>
        Logout
      </button>
    </div>
  );
}

export default UserHome;
