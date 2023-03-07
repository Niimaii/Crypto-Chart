import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import SmallChart from '../components/SmallChart';
import useAxios from '../hooks/useAxios';

function Home() {
  const { test, setTest } = useContext(CryptoContext);

  console.log();
  const { response } = useAxios(
    `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false`
  );

  if (!response) {
    return <h1>Loading...</h1>;
  }

  console.log('home', response);
  return (
    <div>
      <h1>Home</h1>
      <div className='flex gap-5'>
        {response &&
          response.map((coin) => {
            return <SmallChart coin={coin} key={coin.id} />;
          })}
      </div>
    </div>
  );
}

export default Home;
