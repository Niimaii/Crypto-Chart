import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import SmallChart from '../components/SmallChart';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router-dom';
import CryptoTable from '../components/CryptoTable';
import useDB from '../hooks/useDB';
import { getMarket } from '../api/cryptoAPI';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import CryptoCarousel from '../components/CryptoCarousel';
import 'swiper/css';

function Home() {
  const [coin, setCoin] = useState('bitcoin');
  const [days, setDays] = useState(30);
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

  // const total = chartResponse.bitcoin;

  const updateDays = (e) => {
    setDays(e.target.value);
  };

  return (
    <div className=''>
      <CryptoCarousel days={days} coinResponse={coinResponse} />

      <div className='mt-8 flex justify-center'>
        <CryptoTable response={coinResponse} volume='123' key='CryptoTable' />
      </div>
    </div>
  );
}

export default Home;
