import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import SmallChart from '../components/SmallChart';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router-dom';
import CryptoTable from '../components/CryptoTable';
import useMarket from '../context/useMarket';

function Home() {
  console.log();

  const { coinResponse, volume, days, chartResponse, loading } = useMarket();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const total = chartResponse.bitcoin;
  // console.log('Chart Data', total);

  const volumeTotal = () => {};

  console.log('chartResponse', chartResponse);
  console.log('coinResponse', coinResponse);
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
                  days={days}
                  key={coin.id}
                  loading={loading}
                />
              </NavLink>
            );
          })}
      </div>
      <CryptoTable response={coinResponse} volume={volume} key='CryptoTable' />
    </div>
  );
}

export default Home;
