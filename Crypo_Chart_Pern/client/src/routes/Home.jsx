import React, { useEffect, useState, useMemo, useCallback } from 'react';
import CryptoTable from '../components/CryptoTable';
import { getMarket } from '../api/cryptoAPI';
import CryptoCarousel from '../components/CryptoCarousel';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['market'],
    queryFn: getMarket,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  console.log(data.data.market);
  const coinResponse = data.data.market;

  console.log('True Home');

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
