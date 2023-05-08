import React, { useEffect, useState, useMemo, useCallback } from 'react';
import CryptoTable from '../components/CryptoTable';
import { getMarket } from '../api/cryptoAPI';
import CryptoCarousel from '../components/CryptoCarousel';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import BuyCard from '../components/BuyCard';

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['market'],
    queryFn: getMarket,
    staleTime: 1000 * 60 * 3,
    refetchInterval: 1000 * 60 * 3,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const coinResponse = data.data.market;

  return (
    <div className=''>
      <CryptoCarousel key='Carousel' />

      <div className='mt-8 flex justify-center'>
        <CryptoTable volume='123' key='CryptoTable' />
      </div>
      <BuyCard />
    </div>
  );
}

export default Home;
