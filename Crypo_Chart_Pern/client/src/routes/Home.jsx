import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import SmallChart from '../components/SmallChart';
import useAxios from '../hooks/useAxios';
import { NavLink } from 'react-router-dom';
import CryptoTable from '../components/CryptoTable';
import useDB from '../hooks/useDB';
import { getMarket } from '../api/cryptoAPI';

function Home() {
  const [coin, setCoin] = useState('bitcoin');
  const [days, setDays] = useState(30);
  const [coinResponse, setCoinResponse] = useState();
  const loop = [0, 1, 2, 3, 4];

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
      <h1>TESTING</h1>
      <div className='flex gap-16 justify-center mt-10'>
        {coinResponse &&
          loop.map((i) => {
            let coin = coinResponse[i];
            return (
              <NavLink to={`/${coin.id}`}>
                <SmallChart coin={coin} key={coin.id} days={days} />
              </NavLink>
            );
          })}
      </div>
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
