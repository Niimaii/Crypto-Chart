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

import 'swiper/css';
import Carousel from '../components/Carousel';

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
  console.log('CoinResponse:', coinResponse);

  // const total = chartResponse.bitcoin;

  const daysOption = [1, 7, 14, 30, 90, 180, 365];

  const updateDays = (e) => {
    setDays(e.target.value);
  };

  return (
    <div className=''>
      <Carousel days={days} coinResponse={coinResponse} />

      <CryptoTable response={coinResponse} volume='123' key='CryptoTable' />
      <select id='daysBtn' onChange={updateDays}>
        {daysOption.map((days) => {
          return <option value={days}>{days}</option>;
        })}
      </select>
    </div>
  );
}

export default Home;
