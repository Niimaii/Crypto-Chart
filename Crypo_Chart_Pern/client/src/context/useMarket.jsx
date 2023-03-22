import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import useAxios from '../hooks/useAxios';
import { CryptoContext } from './CryptoContext';

function useMarket(param) {
  const [volume, setVolume] = useState({});
  const { days, setDays } = useContext(CryptoContext);

  const [coinResponse, setCoinResponse] = useState();

  const [chartResponse, setChartResponse] = useState({});
  const [loading, setLoading] = useState(false);
  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3';

  // let response;
  // localStorage.setItem('count', 0);
  // console.log('TEST');

  const { response } = useAxios(
    `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false`
  );

  // const updateDebounceResponse = debounce(async () => {
  //   localStorage.getItem('count');
  //   console.log('I ran', count);
  //   const firstResponse = await axios(
  //     `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
  //   );
  //   response = firstResponse.data;
  // });

  // function debounce(cb, delay = 1000) {
  //   let timeout;
  //   return (...args) => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => {
  //       cb(...args);
  //     }, delay);
  //   };
  // }
  // updateDebounceResponse();

  useEffect(() => {
    const getData = async () => {
      let count = 0;
      try {
        setCoinResponse(response);
        setLoading(true);

        if (response) {
          console.log('response', response);
          response.map(async (coin) => {
            const result = await axios(
              `coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`
            );

            if (result) {
              count++;
              //   console.log('result', result.data);
              setChartResponse((previous) => ({
                ...previous,
                [coin.id]: result,
              }));

              setVolume((previous) => ({
                ...previous,
                [coin.id]: result.data.total_volumes.at(-1)[1],
              }));

              if (response.length === count) {
                setLoading(false);
              }
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [response, days]);

  return { coinResponse, volume, chartResponse, loading };
}

export default useMarket;

// let id = undefined;
// let LastRequest = 1679277589152;
// let response = undefined;
// let counter = 0;

// // const getStuff = () => {
// //   console.log('getStuff');
// //   if (id) clearTimeout(id);
// //   id = setTimeout(async () => {
// //     console.log('Timeout');

// //     const geckoResponse = await axios(
// //       `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
// //     );
// //     response = geckoResponse.data;
// //     LastRequest = Date.now();
// //   }, 1000);
// // };

// const getStuff = async () => {
//   const geckoResponse = await axios(
//     `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`
//   );

//   response = geckoResponse.data;
//   counter++
//   console.log('response',counter, response);

//   setTimeout(() => {
//     counter = 0;
//   }, 1000);
// };

// if (Date.now() - LastRequest >= 5000) {
//   if (counter <= 0) {
//     counter++;
//     console.log('Counter++', counter);
//     getStuff();
//   }
// }
