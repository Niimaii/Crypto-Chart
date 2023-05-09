import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { StarIcon } from '../icons/icons';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function CryptoTable() {
  let navigateTo = useNavigate();

  // Context function to open buy card
  const { openBuyCard, isAuth } = useContext(CryptoContext);

  // Get cached data from React Query
  const queryClient = useQueryClient();
  const cachedResponse = queryClient.getQueryData(['market']);
  const response = cachedResponse.data.market;

  const { days, setDays } = useContext(CryptoContext);

  const daysOption = [1, 30, 365];

  const [allCoins, setAllCoins] = useState(true);
  const [gainers, setGainers] = useState(false);
  const [losers, setLosers] = useState(false);
  const [favorites, setFavorites] = useState(false);

  const changeDays = (e) => {
    // Remove the last letter to get the number
    const newChartDays = parseInt(e.target.value.slice(0, -1));
    setDays(newChartDays);
  };

  // I couldn't call a function in my array unless I add an empty function and add the function of interest in it
  const navFunctions = [setAllCoins, setGainers, setLosers, setFavorites];

  // Turn on the button being clicked on and turn all other buttons off
  const navBtnChanger = (e) => {
    const getIndex = e.target.className[0];
    navFunctions[getIndex](true);

    const newNavFunctions = [...navFunctions];

    newNavFunctions.splice(getIndex, 1);

    newNavFunctions.forEach((fn) => fn(false));
  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const chartPercent = (num) => {
    if (num > 0) {
      return '+' + num.toFixed(2);
    } else {
      return num.toFixed(2);
    }
  };

  const handleTradeBtn = () => {
    if (isAuth()) {
      openBuyCard();
    } else {
      navigateTo('/signin');
    }
  };

  // Hacky solution to get the table "Name" head to look right
  const spacedName = (
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Name
    </>
  );

  // Money formatter
  const shortFormatter = (amount) => {
    if (amount >= 1e9) {
      return `$${(amount / 1e9).toFixed(1)}B`;
    } else if (amount >= 1e6) {
      return `$${(amount / 1e6).toFixed(1)}M`;
    } else if (amount >= 1e3) {
      return `$${(amount / 1e3).toFixed(1)}K`;
    } else {
      return `$${amount.toFixed(2)}`;
    }
  };

  // ========== Favorite Coin Retrieval Logic ==========

  // // Create an object containing all coins as keys equal to false
  const userCoinFavorites = response.reduce((accumulator, coin) => {
    accumulator[coin.crypto_id] = false;
    return accumulator;
  }, {});

  // Insert the favorites boolean values in the new object based on info from the db

  return (
    <div className='w-screen market_data'>
      <div className='px-2 coin_nav mt-14 flex justify-between'>
        <div className='opt_btn flex items-center'>
          <button
            onClick={navBtnChanger}
            className={`0, ${
              allCoins == true ? 'table_nav_on' : 'table_nav_off'
            }`}
          >
            All Coins
          </button>
          <button
            onClick={navBtnChanger}
            className={`1, ${
              gainers == true ? 'table_nav_on' : 'table_nav_off'
            }`}
          >
            Gainers
          </button>
          <button
            onClick={navBtnChanger}
            className={`2, ${
              losers == true ? 'table_nav_on' : 'table_nav_off'
            }`}
          >
            Losers
          </button>
          <button
            onClick={navBtnChanger}
            className={`3, ${
              favorites == true ? 'table_nav_on' : 'table_nav_off'
            }`}
          >
            Favorites
          </button>
        </div>
        <select onChange={changeDays} className='day_btn' id='daysBtn'>
          {daysOption.map((days, index) => {
            return <option key={index} value={`${days}D`}>{`${days}D`}</option>;
          })}
        </select>
      </div>
      <table className='mt-8 coin_table'>
        <thead>
          <tr>
            <th width='290px'>{spacedName}</th>
            <th width=''>Price</th>
            <th>Change</th>
            <th>Volume</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {response &&
            response.map((coin) => {
              const [fill, setFill] = useState(false);
              const coinPercent = coin.price_change_percentage_24h;

              // If the gainers button is pressed, only display positive percentages
              if (gainers && coinPercent < 0) {
                return false;
              }
              // If the gainers button is pressed, only display negative percentages
              if (losers && coinPercent > 0) {
                return false;
              }

              return (
                <tr key={coin.crypto_id}>
                  <td className='relative'>
                    <div className='pl-12'>
                      <div className='flex items-center justify-start gap-3'>
                        <img className='h-10' src={coin.image} alt='' />
                        <div className='coin_icon text-left'>
                          <p className='font-medium w-full'> {coin.name}</p>
                          <p className='font-light'>
                            {coin.symbol.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setFill(!fill)}
                      className='absolute left-1 top-8'
                    >
                      <StarIcon fill={fill} />
                    </button>
                  </td>
                  <td>
                    <div className='coin_price pr-28'>
                      {formatter.format(coin.current_price)}
                    </div>
                  </td>
                  <td
                    className={`${
                      coin.price_change_percentage_24h > 0
                        ? 'percentGreen'
                        : 'percentRed'
                    } table_change`}
                  >
                    <div
                      className={`coin_percent pr-16 ${
                        coin.price_change_percentage_24h > 0
                          ? 'percentGreen'
                          : 'percentRed'
                      } table_change`}
                    >
                      {chartPercent(coin.price_change_percentage_24h)}%
                    </div>
                  </td>
                  <td>
                    <div className='coin_volume pr-16'>
                      {shortFormatter(coin.total_volume)}
                    </div>
                  </td>
                  <td>
                    <div className='coin_market pr-20'>
                      {shortFormatter(coin.market_cap)}
                    </div>
                  </td>
                  <td>
                    <div className=''>
                      <button onClick={handleTradeBtn} className='table_btn'>
                        Trade
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CryptoTable;
