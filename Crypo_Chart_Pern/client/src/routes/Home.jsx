import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import SmallChart from '../components/SmallChart';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router-dom';
import CryptoTable from '../components/CryptoTable';
import useMarket from '../context/useMarket';

function Home() {
  const { coinResponse, volume, chartResponse, loading } = useMarket();
  const { days, setDays } = useContext(CryptoContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const total = chartResponse.bitcoin;
  // console.log('Chart Data', total);

  const daysOption = [1, 7, 14, 30, 90, 180, 365];

  const updateDays = (e) => {
    setDays(e.target.value);
  };

  // console.log('chartResponse', chartResponse);
  // console.log('coinResponse', coinResponse);
  return (
    <div>
      <div className='flex gap-16 justify-center mt-10'>
        {coinResponse &&
          coinResponse.map((coin) => {
            return (
              <NavLink to={`/${coin.id}`}>
                <SmallChart
                  coin={coin}
                  chartResponse={chartResponse}
                  key={coin.id}
                  loading={loading}
                />
              </NavLink>
            );
          })}
      </div>
      <CryptoTable response={coinResponse} volume={volume} key='CryptoTable' />
      <select id='daysBtn' onChange={updateDays}>
        {daysOption.map((days) => {
          return <option value={days}>{days}</option>;
        })}
      </select>
    </div>
  );
}

export default Home;
