import React, { useContext, useEffect, useState } from 'react';
import { fetchProtectedInfo, onLogout } from '../api/authAPI';
import { CryptoContext } from '../context/CryptoContext';
import { getMarket } from '../api/cryptoAPI';
import CryptoCarousel from '../components/CryptoCarousel';
import CryptoTable from '../components/CryptoTable';

function UserHome() {
  // const { isAuth } = useContext(CryptoContext);
  // const [loading, setLoading] = useState(true);
  // const [protectedData, setProtectedData] = useState(null);

  // const { unAuthenticateUser } = useContext(CryptoContext);

  // const logout = async () => {
  //   try {
  //     // Clear cookies
  //     await onLogout();

  //     unAuthenticateUser();
  //     localStorage.removeItem('localAuth');
  //   } catch (err) {
  //     console.log(err.response);
  //   }
  // };

  // const protectedInfo = async () => {
  //   try {
  //     const { data } = await fetchProtectedInfo();

  //     setProtectedData(data.info);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log('force logout');
  //     logout();
  //   }
  // };

  // useEffect(() => {
  //   protectedInfo();
  // }, []);

  const [coin, setCoin] = useState('bitcoin');
  const [coinResponse, setCoinResponse] = useState();

  useEffect(() => {
    const market = async () => {
      const result = await getMarket();
      if (result) {
        setCoinResponse(result.data.market);
      }
    };

    market();
  }, []);

  if (!coinResponse) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className=''>
      <CryptoCarousel coinResponse={coinResponse} />

      <div className='mt-8 flex justify-center'>
        <CryptoTable response={coinResponse} volume='123' key='CryptoTable' />
      </div>
    </div>
  );
}

export default UserHome;
