import React, { useEffect, useState, useMemo, useCallback } from 'react';
import CryptoTable from '../components/CryptoTable';
import { getMarket } from '../api/cryptoAPI';
import CryptoCarousel from '../components/CryptoCarousel';
import 'swiper/css';

function Home() {
  const [coinResponse, setCoinResponse] = useState();

  console.log('True Home');

  useEffect(() => {
    console.log('useEffect Home');
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

  // const total = chartResponse.bitcoin;

  const updateDays = (e) => {
    setDays(e.target.value);
  };

  return (
    <div className=''>
      <CryptoCarousel coinResponse={coinResponse} key='Carousel' />

      <div className='mt-8 flex justify-center'>
        <CryptoTable response={coinResponse} volume='123' key='CryptoTable' />
      </div>
    </div>
  );
}

export default Home;
