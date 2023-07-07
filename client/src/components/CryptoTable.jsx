import React, { useContext, useEffect, useState } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import { LeftArrow, RightArrow, StarIcon } from '../icons/icons';
import { useQueryClient } from '@tanstack/react-query';
import { NavLink, useNavigate } from 'react-router-dom';
import { getFavorites, patchFavorites } from '../api/cryptoAPI';
import { formatter, shortFormatter } from '../utils/Formatter';

function CryptoTable() {
  let navigateTo = useNavigate();

  const [allCoins, setAllCoins] = useState(true);
  const [gainers, setGainers] = useState(false);
  const [losers, setLosers] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  // Context function to open buy card
  const { openBuyCard, isAuth, buyCard } = useContext(CryptoContext);

  // const cachedResponse = queryClient.getQueryData(['market']);

  /*
  After too much consideration I decided to paginate the data on the client side
  simply because it would reduce the load on the data base. I didn't like how
  when I had server side pagination the db was pinged every time a user clicks
  on "next" page. This way I only ping the db once and from there I just interact 
  with the cached data
  */
  // Paginating Data
  const start = (page - 1) * 20;
  const finish = page * 20;

  // Get cached data from React Query
  const queryClient = useQueryClient();
  // If the user pressed the "Gainers", "Losers" or "Favorites" button, then don't paginate
  const response =
    gainers || losers || favorites
      ? queryClient.getQueryData(['market'])
      : queryClient.getQueryData(['market']).slice(start, finish);

  const { days, setDays } = useContext(CryptoContext);

  const daysOption = [1, 7, 30, 365];

  const changeDays = async (e) => {
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

  const chartPercent = (num) => {
    if (num > 0) {
      return '+' + num.toFixed(2);
    } else {
      return num.toFixed(2);
    }
  };

  const handleTradeBtn = (coin, e) => {
    e.stopPropagation();
    if (isAuth()) {
      openBuyCard(coin);
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

  // ========== Favorite Coin Retrieval Logic ==========

  // // Create an object containing all coins as keys equal to false
  const userCoinFavorites = response.reduce((accumulator, coin) => {
    accumulator[coin.crypto_id] = false;
    return accumulator;
  }, {});

  const [favoriteList, setFavoriteList] = useState(userCoinFavorites);

  // If the authenticated, insert the favorites boolean values in the new object based on info from the db
  const insertUserFavorites = async () => {
    try {
      const { data } = await getFavorites();
      const userFavorites = data.favorites;
      // Check if user has favorites, then return if not
      if (userFavorites.length === 0) {
        return;
      }

      userFavorites.forEach((coin) => {
        userCoinFavorites[coin.coin] = coin.is_favorite;
      });

      setFavoriteList((prev) => {
        return { ...prev, ...userCoinFavorites };
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Update the users favorite coin in the DB & screen
  const handleFavorites = async (coin, fill, e) => {
    e.stopPropagation();
    if (!isAuth()) navigateTo('/signin');
    setFavoriteList({ ...favoriteList, [coin]: !fill });
    await patchFavorites({
      coin: coin,
      is_favorite: !fill,
    });
  };

  const handleTable = (coin) => {
    navigate(`/${coin}`);
  };

  useEffect(() => {
    if (isAuth()) insertUserFavorites();
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  }

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
              const fill = favoriteList[coin.crypto_id];
              const coinPercent = coin.price_change_percentage_24h;

              // If the gainers button is pressed, only display positive percentages
              if (gainers && coinPercent < 0) {
                return false;
              }
              // If the losers button is pressed, only display negative percentages
              if (losers && coinPercent > 0) {
                return false;
              }
              //  If the favorite button was pressed, only display the users favorite coins
              if (favorites && favoriteList[coin.crypto_id] != true) {
                return false;
              }

              return (
                <tr
                  onClick={() => handleTable(coin.crypto_id)}
                  key={coin.crypto_id}
                  className='crypto_table_row'
                >
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
                      onClick={(e) => handleFavorites(coin.crypto_id, fill, e)}
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
                      <button
                        onClick={(e) => handleTradeBtn(coin.crypto_id, e)}
                        className='table_btn'
                      >
                        Trade
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className='flex justify-center gap-24 my-10'>
        <button
          className='next_previous'
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          <div className='mr-1'>
            <LeftArrow />
          </div>
        </button>
        <button
          className='next_previous'
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page > 5}
        >
          <div className='ml-1'>
            <RightArrow />
          </div>
        </button>
      </div>
    </div>
  );
}

export default CryptoTable;
