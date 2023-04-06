import React, { useState } from 'react';
import { StarIcon } from '../icons/icons';

function CryptoTable({ response, volume }) {
  const daysOption = [1, 30, 365];
  const [tableNav1, setTableNav1] = useState(true);
  const [tableNav2, setTableNav2] = useState(false);
  const [tableNav3, setTableNav3] = useState(false);
  const [tableNav4, setTableNav4] = useState(false);
  const navFunctions = [
    function (onOff) {
      setTableNav1(onOff);
    },
    function (onOff) {
      setTableNav2(onOff);
    },
    function (onOff) {
      setTableNav3(onOff);
    },
    function (onOff) {
      setTableNav4(onOff);
    },
  ];

  const navBtnChanger = (e) => {
    const getIndex = e.target.className[0];
    navFunctions[getIndex](true);

    const newNavFunctions = [...navFunctions];

    newNavFunctions.splice(getIndex, 1);

    newNavFunctions.forEach((fn) => fn(false));
  };

  //   console.log(response);
  // Currency formatter

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

  const spacedName = (
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      Name
    </>
  );

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

  return (
    <div className=''>
      <div className='mt-14 mr-20 flex justify-between'>
        <div className='flex gap-10'>
          <button
            onClick={navBtnChanger}
            className={`0, ${
              tableNav1 == true ? 'table_nav_on' : 'table_nav_off'
            }`}
          >
            All Coins
          </button>
          <button
            onClick={navBtnChanger}
            className={`1, ${
              tableNav2 == true ? 'table_nav_on' : 'table_nav_off'
            }`}
          >
            Gainers
          </button>
          <button
            onClick={navBtnChanger}
            className={`2, ${
              tableNav3 == true ? 'table_nav_on' : 'table_nav_off'
            }`}
          >
            Losers
          </button>
          <button
            onClick={navBtnChanger}
            className={`3, ${
              tableNav4 == true ? 'table_nav_on' : 'table_nav_off'
            }`}
          >
            Favorites
          </button>
        </div>
        <select className='day_btn' id='daysBtn'>
          {daysOption.map((days) => {
            return <option value={`${days}D`}>{`${days}D`}</option>;
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

              return (
                <tr>
                  <td className='relative'>
                    <div className='pl-16'>
                      <div className='flex items-center justify-start gap-3'>
                        <img className='h-10' src={coin.image} alt='' />
                        <div className='text-left pr-16'>
                          <p className='font-medium w-52'> {coin.name}</p>
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
                    <div className='pr-28'>
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
                    <div className='pr-16'>
                      {chartPercent(coin.price_change_percentage_24h)}%
                    </div>
                  </td>
                  <td>
                    <div className='pr-16'>
                      {shortFormatter(coin.total_volume)}
                    </div>
                  </td>
                  <td>
                    <div className='pr-20'>
                      {shortFormatter(coin.market_cap)}
                    </div>
                  </td>
                  <td>
                    <div className='pr-7'>
                      <button className='table_btn'>Trade</button>
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
