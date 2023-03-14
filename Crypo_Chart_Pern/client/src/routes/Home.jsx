import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import SmallChart from '../components/SmallChart';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router-dom';

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
      <div className='flex gap-16 justify-center mt-10'>
        {response &&
          response.map((coin) => {
            return (
              <NavLink to={`/${coin.id}`}>
                <SmallChart coin={coin} key={coin.id} />
              </NavLink>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
